import { describe, expect, it } from "vitest";
import { achievements, initialAchievementProgress, updateAchievementProgress } from "../lib/achievements";

describe("achievement progress", () => {
  it("starts with three stars and two earned medals", () => {
    expect(Object.values(initialAchievementProgress).reduce((sum, value) => sum + value, 0)).toBe(3);
    expect(Object.keys(initialAchievementProgress)).toHaveLength(2);
    expect(achievements).toHaveLength(95);
    expect(achievements.reduce((sum, item) => sum + item.stars, 0)).toBe(333);
  });
  it("earns a locked medal without changing other medals", () => {
    const next = updateAchievementProgress(initialAchievementProgress, "achievement-3", 1);
    expect(next["achievement-3"]).toBe(1);
    expect(next["achievement-1"]).toBe(2);
    expect(initialAchievementProgress["achievement-3"]).toBeUndefined();
  });
  it("bounds and validates incoming progress", () => {
    expect(updateAchievementProgress({}, "achievement-3", 100)["achievement-3"]).toBe(5);
    expect(updateAchievementProgress({}, "achievement-3", -1)["achievement-3"]).toBe(0);
    expect(updateAchievementProgress({}, "invalid", 1)).toEqual({});
    expect(updateAchievementProgress({}, "achievement-3", NaN)).toEqual({});
  });
});