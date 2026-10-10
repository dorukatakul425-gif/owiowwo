import { describe, expect, it } from "vitest";
import { teaMotion, TEA_FLIGHT_MS } from "@/lib/tea-motion";

const sender = { left: 50, top: 500, width: 200, height: 200 };
const recipient = { left: 800, top: 100, width: 200, height: 200 };
describe("Recorded tea delivery", () => {
  it("leaves the sender's upper-right edge", () => {
    const frame = teaMotion(0, sender, recipient, 1000);
    expect(frame.x + frame.size / 2).toBe(240);
    expect(frame.y + frame.size / 2).toBe(510);
    expect(frame.fill).toBe(0);
  });
  it("travels at constant speed for the measured five seconds", () => {
    expect(TEA_FLIGHT_MS).toBe(5000);
    const frame = teaMotion(2500, sender, recipient, 1000);
    expect(frame.progress).toBe(0.5);
    expect(frame.x + frame.size / 2).toBe(620);
    expect(frame.y + frame.size / 2).toBe(393);
    expect(frame.arrived).toBe(false);
  });
  it("fills during the first 1.4 seconds rather than the whole flight", () => {
    expect(teaMotion(700, sender, recipient, 1000).fill).toBe(0.5);
    expect(teaMotion(1400, sender, recipient, 1000).fill).toBe(1);
  });
  it("docks at the recipient's lower-right edge without drifting afterward", () => {
    const frame = teaMotion(5000, sender, recipient, 1000);
    expect(frame.arrived).toBe(true);
    expect(frame.x + frame.size / 2).toBe(1000);
    expect(frame.y + frame.size / 2).toBe(276);
    expect(teaMotion(10000, sender, recipient, 1000)).toEqual(frame);
  });
});