import { describe, expect, it } from "vitest";
import { tomatoMotion, TOMATO_FLIGHT_MS } from "../lib/tomato-motion";

const source = { left: 20, top: 30, width: 100, height: 100 };
const target = { left: 400, top: 500, width: 120, height: 120 };
describe("reference tomato delivery", () => {
  it("flies for exactly five seconds", () => {
    expect(tomatoMotion(TOMATO_FLIGHT_MS - 1, source, target).arrived).toBe(false);
    expect(tomatoMotion(TOMATO_FLIGHT_MS, source, target).arrived).toBe(true);
    expect(tomatoMotion(2500, source, target).progress).toBe(0.5);
  });
  it("docks inside the upper-left area of the avatar", () => {
    const result = tomatoMotion(6000, source, target);
    expect(result.x + result.size / 2).toBeCloseTo(436);
    expect(result.y + result.size / 2).toBeCloseTo(548);
    expect(result.size).toBeCloseTo(45.6);
    expect(result.splatScale).toBe(1);
  });
  it("follows a moving recipient after impact", () => {
    const a = tomatoMotion(6000, source, target);
    const b = tomatoMotion(7000, source, { ...target, left: 100, top: 150 });
    expect(b.x - a.x).toBeCloseTo(-300);
    expect(b.y - a.y).toBeCloseTo(-350);
  });
  it("briefly expands the broken skin without fading the attached gift", () => {
    expect(tomatoMotion(5090, source, target).splatScale).toBeCloseTo(1.22);
    expect(tomatoMotion(-100, source, target).progress).toBe(0);
  });
});