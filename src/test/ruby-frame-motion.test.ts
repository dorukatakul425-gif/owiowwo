import { describe, expect, it } from "vitest";
import { rubyFramePhase, rubyLightKeyframes, RUBY_FRAME_CYCLE_MS, RUBY_FRAME_ACTIVE_MS } from "@/lib/ruby-frame-motion";
describe("Reference frame pauses", () => {
  it("keeps a 4.8 second rest between 1.6 second light sweeps", () => {
    expect(RUBY_FRAME_CYCLE_MS - RUBY_FRAME_ACTIVE_MS).toBe(4800);
    expect(rubyFramePhase(1200)).toBe("illuminating");
    expect(rubyFramePhase(3000)).toBe("rest");
    expect(rubyFramePhase(7600)).toBe("illuminating");
  });
  it("moves light downward, then hides it throughout the pause", () => {
    expect(rubyLightKeyframes[0]?.transform).toBe("translateY(0px)");
    expect(rubyLightKeyframes[2]?.transform).toBe("translateY(800px)");
    expect(rubyLightKeyframes[3]?.opacity).toBe(0);
    expect(rubyLightKeyframes[4]?.opacity).toBe(0);
  });
});