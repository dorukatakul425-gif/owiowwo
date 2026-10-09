import { describe, expect, it } from "vitest";
import { bottles } from "@/lib/bottles";

describe("Reference bottle catalog", () => {
  it("contains all nine bottles in the reference order", () => {
    expect(bottles.map((bottle) => bottle.id)).toEqual(["green", "brown", "orange", "cola", "clear", "sprite", "champagne", "whiskey", "baby"]);
  });
  it("lists each bottle at five hearts", () => {
    expect(bottles.map((bottle) => bottle.price)).toEqual([5, 5, 5, 5, 5, 5, 5, 5, 5]);
  });
});