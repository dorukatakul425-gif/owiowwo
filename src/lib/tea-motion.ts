// Measured from the 60 fps reference: departure 2.20s, docking 7.20s.
export const TEA_FLIGHT_MS = 5000;
export const TEA_FILL_MS = 1400;
type AvatarRect = { left: number; top: number; width: number; height: number };

export function teaMotion(elapsed: number, source: AvatarRect, target: AvatarRect, tableWidth: number) {
  const progress = Math.max(0, Math.min(1, elapsed / TEA_FLIGHT_MS));
  const size = tableWidth * 0.105;
  const startX = source.left + source.width * 0.95;
  const startY = source.top + source.height * 0.05;
  const endX = target.left + target.width;
  const endY = target.top + target.height * 0.88;
  return {
    x: startX + (endX - startX) * progress - size / 2,
    y: startY + (endY - startY) * progress - size / 2,
    size,
    progress,
    fill: Math.max(0, Math.min(1, elapsed / TEA_FILL_MS)),
    arrived: progress === 1,
  };
}