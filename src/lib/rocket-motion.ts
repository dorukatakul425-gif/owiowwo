export const ROCKET_FLIGHT_MS = 5000;
export const ROCKET_BURST_MS = 3400;
export type RocketAvatarRect = { left: number; top: number; width: number; height: number };

/** Reference flight: from the sender's center into the recipient's lower-right interior. */
export function rocketMotion(elapsed: number, source: RocketAvatarRect, target: RocketAvatarRect) {
  const progress = Math.max(0, Math.min(1, elapsed / ROCKET_FLIGHT_MS));
  const startX = source.left + source.width * 0.45;
  const startY = source.top + source.height * 0.55;
  const endX = target.left + target.width * 0.75;
  const endY = target.top + target.height * 0.62;
  return {
    x: startX + (endX - startX) * progress,
    y: startY + (endY - startY) * progress,
    size: (source.width + (target.width - source.width) * progress) * 0.66,
    rotation: Math.atan2(endY - startY, endX - startX) * 180 / Math.PI + 45,
    progress,
    arrived: progress === 1,
    complete: elapsed >= ROCKET_FLIGHT_MS + ROCKET_BURST_MS,
    burstAge: Math.max(0, elapsed - ROCKET_FLIGHT_MS),
  };
}
