import { describe, expect, it } from "vitest";
import { rocketMotion, ROCKET_FLIGHT_MS, ROCKET_BURST_MS } from "@/lib/rocket-motion";

const source = { left: 627, top: 780, width: 203, height: 210 };
const target = { left: 56, top: 680, width: 204, height: 210 };
describe("Recorded rocket motion", () => {
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
});