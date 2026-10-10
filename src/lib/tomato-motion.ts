export const TOMATO_FLIGHT_MS = 5000;
export const TOMATO_SPLAT_MS = 180;
export type TomatoAvatarRect = { left: number; top: number; width: number; height: number };

/** Five-second reference flight; the broken tomato sits inside the avatar, not on its border. */
export function tomatoMotion(elapsed: number, source: TomatoAvatarRect, target: TomatoAvatarRect) {
  const progress = Math.max(0, Math.min(1, elapsed / TOMATO_FLIGHT_MS));
  const impact = Math.max(0, Math.min(1, (elapsed - TOMATO_FLIGHT_MS) / TOMATO_SPLAT_MS));
  const size = (source.width + (target.width - source.width) * progress) * 0.38;
  const endX = target.left + target.width * 0.3;
  const endY = target.top + target.height * 0.4;
  const startX = source.left + source.width * 0.65;
  const startY = source.top + source.height * 0.8;
  return {
    x: startX + (endX - startX) * progress - size / 2,
    y: startY + (endY - startY) * progress - size / 2,
    size,
    progress,
    arrived: progress === 1,
    // The leaves turn with the tomato, then the crumpled skin opens on impact.
    rotation: -80 * progress,
    splatScale: 1 + Math.sin(impact * Math.PI) * 0.22,
  };
}