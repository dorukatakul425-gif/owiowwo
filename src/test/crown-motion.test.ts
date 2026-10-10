import { describe, expect, it } from "vitest";
import { crownMotion, crownStars, CROWN_FLIGHT_MS } from "@/lib/crown-motion";

const sender = { left: 620, top: 1260, width: 200, height: 200 };
const recipient = { left: 874, top: 425, width: 200, height: 200 };
describe("Reference crown delivery", () => {
  it("departs from the sender's profile at half-avatar size", () => {
    const frame = crownMotion(0, sender, recipient);
    expect(frame.centerX).toBe(720);
    expect(frame.centerY).toBe(1360);
    expect(frame.size).toBe(100);
  });
  it("decelerates over five seconds", () => {
    expect(CROWN_FLIGHT_MS).toBe(5000);
    expect(crownMotion(2500, sender, recipient).centerX).toBe(835.5);
    expect(crownMotion(2500, sender, recipient).centerY).toBe(658.75);
    expect(crownMotion(4999, sender, recipient).arrived).toBe(false);
  });
  it("pins the crown to the upper-left of the recipient and retains its size", () => {
    const frame = crownMotion(5000, sender, recipient);
    expect(frame.centerX).toBe(874);
    expect(frame.centerY).toBe(425);
    expect(frame.size).toBe(100);
    expect(frame.rotation).toBe(-40);
    expect(frame.arrived).toBe(true);
    expect(crownMotion(9000, sender, recipient)).toEqual(frame);
  });
  it("starts upright and gradually leans left through the middle of the flight", () => {
    expect(crownMotion(0, sender, recipient).rotation).toBe(0);
    expect(crownMotion(1250, sender, recipient).rotation).toBe(-6.25);
    expect(crownMotion(2500, sender, recipient).rotation).toBe(-20);
    expect(crownMotion(3750, sender, recipient).rotation).toBe(-33.75);
    const frames = Array.from({ length: 101 }, (_, index) => crownMotion(index * 50, sender, recipient));
    expect(frames.every((frame, index) => index === 0 || frame.rotation <= (frames[index - 1]?.rotation ?? 0))).toBe(true);
  });
  it("keeps the accompanying trail behind the crown and clears it after arrival", () => {
    const stars = crownStars(2500, sender, recipient);
    expect(stars.length).toBeGreaterThan(20);
    expect(stars.every(star => star.y > crownMotion(2500, sender, recipient).centerY)).toBe(true);
    expect(crownStars(5300, sender, recipient).length).toBeGreaterThan(0);
    expect(crownStars(6100, sender, recipient)).toEqual([]);
  });
});