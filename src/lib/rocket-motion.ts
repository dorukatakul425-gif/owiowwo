export const ROCKET_FLIGHT_MS = 5000;
export const ROCKET_BURST_MS = 2600;
export const ROCKET_IMPACT_MS = 600;
export const ROCKET_TURN_DEGREES = 300;
export type RocketAvatarRect = { left: number; top: number; width: number; height: number };

/** Reference flight: from the sender's center into the recipient's lower-right interior. */
export function rocketMotion(elapsed: number, source: RocketAvatarRect, target: RocketAvatarRect) {
  const progress = Math.max(0, Math.min(1, elapsed / ROCKET_FLIGHT_MS));
  const travel = Math.sin(progress * Math.PI / 2);
  const startX = source.left + source.width * 0.45;
  const startY = source.top + source.height * 0.55;
  const endX = target.left + target.width * 0.82;
  const endY = target.top + target.height * 0.64;
  return {
    x: startX + (endX - startX) * travel,
    y: startY + (endY - startY) * travel,
    size: (source.width + (target.width - source.width) * travel) * 0.48,
    rotation: progress * ROCKET_TURN_DEGREES,
    progress,
    arrived: progress === 1,
    complete: elapsed >= ROCKET_FLIGHT_MS + ROCKET_BURST_MS,
    burstAge: Math.max(0, elapsed - ROCKET_FLIGHT_MS),
  };
}