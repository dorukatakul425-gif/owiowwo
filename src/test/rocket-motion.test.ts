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
    expect(end.x).toBe(209);
    expect(end.y).toBeCloseTo(810.2);
    expect(end.arrived).toBe(true);
    expect(rocketMotion(6000, source, { ...target, left: 156 }).x).toBe(309);
  });
  it("finishes the burst and clamps negative elapsed time", () => {
    expect(rocketMotion(ROCKET_FLIGHT_MS + ROCKET_BURST_MS, source, target).complete).toBe(true);
    expect(rocketMotion(-1, source, target).progress).toBe(0);
  });
});