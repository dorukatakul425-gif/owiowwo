import { describe, expect, it } from "vitest";
import { appearanceChoices } from "@/lib/appearance";

describe("Screenshot appearance catalog", () => {
  it("contains 36 styles in reference order", () => {
    expect(appearanceChoices.map((choice) => choice.id)).toEqual(Array.from({ length: 36 }, (_, index) => index + 1));
  });
  it("keeps every center icon separate from its frame", () => {
    for (const choice of appearanceChoices) {
      expect(choice.frame.url).not.toEqual(choice.icon.url);
      expect(choice.price).toEqual(500);
    }
  });
  it("preserves reference locks", () => {
    expect(appearanceChoices.filter((choice) => choice.locked).map((choice) => choice.id)).toEqual([1, 3, 33, 34, 35, 36]);
  });
});