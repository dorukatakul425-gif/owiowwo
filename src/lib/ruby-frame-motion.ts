// Reference: light descends inside stationary feathers; jewels never move.
export const RUBY_FRAME_CYCLE_MS = 6400;
export const RUBY_FRAME_ACTIVE_MS = 1600;
export const RUBY_FRAME_DELAY_MS = 800;
export function rubyFramePhase(elapsed: number) {
  if (elapsed < RUBY_FRAME_DELAY_MS) return "rest";
  return (elapsed - RUBY_FRAME_DELAY_MS) % RUBY_FRAME_CYCLE_MS < RUBY_FRAME_ACTIVE_MS ? "illuminating" : "rest";
}
export const rubyLightKeyframes: { transform: string; opacity: number; offset: number }[] = [
  { transform: "translateY(0px)", opacity: 0, offset: 0 },
  { transform: "translateY(48px)", opacity: 0.65, offset: 0.015625 },
  { transform: "translateY(800px)", opacity: 0.65, offset: 0.234375 },
  { transform: "translateY(868px)", opacity: 0, offset: 0.25 },
  { transform: "translateY(868px)", opacity: 0, offset: 1 },
];