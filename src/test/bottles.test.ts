import { describe, expect, it } from "vitest";
import { bottles } from "@/lib/bottles";

describe("Reference bottle catalog", () => {
  it("contains all fourteen objects from both supplied references in order", () => {
    expect(bottles.map((bottle) => bottle.id)).toEqual(["hand", "new-year", "green", "brown", "beer", "orange", "cola", "clear", "sprite", "vodka", "champagne", "whiskey", "baby", "vip"]);
  });
  it("lists each bottle at five hearts", () => {
    expect(bottles.map((bottle) => bottle.price)).toEqual(Array(14).fill(5));
  });
});