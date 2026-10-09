import { describe, expect, it } from "vitest";
import { initialRound, pickBotTarget, roundReducer, targetAngle, turnIndicatorGeometry } from "@/lib/game-round";

describe("Reference bot table rounds", () => {
  it("points the turn arrow toward each seat and keeps its text upright", () => {
    const bottom = turnIndicatorGeometry(0);
    const top = turnIndicatorGeometry(1);
    const right = turnIndicatorGeometry(2);
    expect(bottom.tip.y).toBeGreaterThan(bottom.tail.y);
    expect(top.tip.y).toBeLessThan(top.tail.y);
    expect(right.tip.x).toBeGreaterThan(right.tail.x);
    expect(right.tip.y).toBeLessThan(right.tail.y);
    expect(bottom.rock).toBe(-1);
    expect(top.rock).toBe(1);
  });
  it("spins toward a different player and ignores duplicate spins", () => {
    const state = roundReducer(initialRound, { type: "spin", target: 2, angle: targetAngle(2) });
    expect(state.phase).toBe("spinning");
    expect(state.rotation).toBeGreaterThan(1440);
    expect(roundReducer(state, { type: "spin", target: 1, angle: 0 })).toBe(state);
    expect(roundReducer(initialRound, { type: "spin", target: 0, angle: 0 })).toBe(initialRound);
  });
  it("moves players in, accepts a kiss, returns them and hands the turn to the selected bot", () => {
    let state = roundReducer(initialRound, { type: "spin", target: 2, angle: 40 });
    state = roundReducer(state, { type: "arrive" });
    state = roundReducer(state, { type: "choose" });
    expect(state.seconds).toBe(9);
    state = roundReducer(state, { type: "decide", accept: true });
    expect(state.kisses).toEqual([1, 0, 1]);
    expect(roundReducer(state, { type: "decide", accept: true })).toBe(state);
    state = roundReducer(state, { type: "return" });
    state = roundReducer(state, { type: "next" });
    expect(state.phase).toBe("ready");
    expect(state.actor).toBe(2);
    expect(state.target).toBeNull();
    expect(pickBotTarget(state.actor, state.round)).toBe(0);
  });
  it("refusals do not award kisses and countdown never becomes negative", () => {
    let state = { ...initialRound, phase: "choosing" as const, target: 1, seconds: 1 };
    state = roundReducer(state, { type: "tick" }) as typeof state;
    state = roundReducer(state, { type: "tick" }) as typeof state;
    expect(state.seconds).toBe(0);
    expect(roundReducer(state, { type: "decide", accept: false }).kisses).toEqual([0, 0, 0]);
  });
  it("includes both bots and spectator rounds in the turn cycle", () => {
    expect(pickBotTarget(0, 0)).toBe(2);
    expect(pickBotTarget(2, 1)).toBe(0);
    expect(pickBotTarget(0, 2)).toBe(1);
    expect(pickBotTarget(1, 3)).toBe(2);
    expect(pickBotTarget(2, 4)).toBe(0);
  });
});