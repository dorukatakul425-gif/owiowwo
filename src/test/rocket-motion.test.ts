import { describe, expect, it } from "vitest";
import { rocketMotion, rocketTrailParticles, rocketArrivalPhase, rocketProfileStars, ROCKET_FLIGHT_MS, ROCKET_BURST_MS } from "@/lib/rocket-motion";

const source = { left: 627, top: 780, width: 203, height: 210 };
const target = { left: 56, top: 680, width: 204, height: 210 };
describe("Recorded rocket motion", () => {
  it("retains the profile gift after the arrival animation finishes", () => {
    expect(rocketArrivalPhase(100)).toBe("stars");
    expect(rocketArrivalPhase(900)).toBe("gold");
    expect(rocketArrivalPhase(2600)).toBe("profile");
    expect(rocketArrivalPhase(60000)).toBe("profile");
  });
  it("keeps the retained stars anchored to the recipient rather than the flight source", () => {
    const before = rocketProfileStars(target);
    const after = rocketProfileStars({ ...target, left: target.left + 100, top: target.top + 50 });
    expect(after[0]?.x).toBeCloseTo((before[0]?.x ?? 0) + 100);
    expect(after[0]?.y).toBeCloseTo((before[0]?.y ?? 0) + 50);
  });
  it("starts at the sender and flies for five seconds", () => {
    const start = rocketMotion(0, source, target);
    expect(start.x).toBeCloseTo(718.35);
    expect(start.arrived).toBe(false);
    expect(rocketMotion(4999, source, target).arrived).toBe(false);
  });
  it("docks inside the recipient and follows its current bounds", () => {
    const end = rocketMotion(ROCKET_FLIGHT_MS, source, target);
    expect(end.x).toBeCloseTo(223.28);
    expect(end.y).toBeCloseTo(814.4);
    expect(end.arrived).toBe(true);
    expect(rocketMotion(6000, source, { ...target, left: 156 }).x).toBeCloseTo(323.28);
  });
  it("rotates throughout flight and eases into the profile", () => {
    const early = rocketMotion(1000, source, target);
    const middle = rocketMotion(2500, source, target);
    const late = rocketMotion(4000, source, target);
    expect(early.rotation).toBe(60);
    expect(middle.rotation).toBe(150);
    expect(late.rotation).toBe(240);
    expect(Math.abs(late.x - middle.x)).toBeLessThan(Math.abs(middle.x - early.x));
    expect(rocketMotion(ROCKET_FLIGHT_MS, source, target).size).toBeCloseTo(target.width * 0.48);
  });
  it("finishes the burst and clamps negative elapsed time", () => {
    expect(rocketMotion(ROCKET_FLIGHT_MS + ROCKET_BURST_MS, source, target).complete).toBe(true);
    expect(rocketMotion(-1, source, target).progress).toBe(0);
  });
  it("keeps the reference's dense falling trail alive after arrival", () => {
    const stars = rocketTrailParticles(3000, source, target);
    expect(stars).toHaveLength(51);
    expect(Math.max(...stars.map(star => star.radius))).toBeGreaterThan(target.width * 0.08);
    expect(rocketTrailParticles(5500, source, target).length).toBeGreaterThan(0);
    expect(rocketTrailParticles(6201, source, target)).toHaveLength(0);
  });
  it("does not recycle expired stars into a new post-arrival trail", () => {
    const early = rocketTrailParticles(3000, source, target);
    const later = rocketTrailParticles(3100, source, target);
    const before = early.find(star => star.id === 120);
    const after = later.find(star => star.id === 120);
    expect(before).toBeDefined();
    expect(after).toBeDefined();
    if (!before || !after) return;
    expect(after.y).toBeGreaterThan(before.y);
    expect(after.radius).toBeLessThan(before.radius);
    expect(rocketTrailParticles(8000, source, target)).toHaveLength(0);
  });
});