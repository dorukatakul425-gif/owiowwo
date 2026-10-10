export const CROWN_FLIGHT_MS = 5000;
export const CROWN_TRAIL_MS = 1100;
export const CROWN_SEATED_ROTATION = -40;
export type CrownAvatarRect = { left: number; top: number; width: number; height: number };

/** Tilt follows elapsed time, not the fast initial positional easing. */
export function crownRotation(progress: number) {
  const tilt = Math.max(0, Math.min(1, progress));
  if (tilt === 0) return 0;
  return CROWN_SEATED_ROTATION * tilt * tilt * (3 - 2 * tilt);
}

/** Reference-derived crown: decelerating flight, then pinned to the upper-left corner. */
export function crownMotion(elapsed: number, source: CrownAvatarRect, target: CrownAvatarRect) {
  const progress = Math.max(0, Math.min(1, elapsed / CROWN_FLIGHT_MS));
  const eased = 1 - (1 - progress) ** 2;
  const size = source.width * 0.5 + (target.width - source.width) * 0.5 * eased;
  const centerX = source.left + source.width / 2 + (target.left - source.left - source.width / 2) * eased;
  const centerY = source.top + source.height / 2 + (target.top - source.top - source.height / 2) * eased;
  return { x: centerX - size / 2, y: centerY - size / 2, centerX, centerY, size, progress, rotation: crownRotation(progress), arrived: progress === 1 };
}

/** Stable particles rather than random positions that change on every render. */
export function crownStars(elapsed: number, source: CrownAvatarRect, target: CrownAvatarRect) {
  const stars = [];
  const first = Math.max(0, Math.ceil((elapsed - CROWN_TRAIL_MS) / 32));
  const last = Math.min(Math.floor(elapsed / 32), Math.floor((CROWN_FLIGHT_MS - 1) / 32));
  for (let id = first; id <= last; id += 1) {
    const age = (elapsed - id * 32) / CROWN_TRAIL_MS;
    if (age < 0 || age >= 1) continue;
    const origin = crownMotion(id * 32, source, target);
    const wave = Math.sin(id * 2.399);
    const size = origin.size * (id % 4 === 0 ? 0.48 : 0.25) * (1 - age);
    stars.push({ id, x: origin.centerX + wave * origin.size * 0.15 - age * origin.size * 0.16,
      y: origin.centerY + origin.size * 0.42 + age * origin.size * 0.5,
      size, opacity: 1 - age ** 2, rotation: id * 47 + age * 90, color: id % 4, pointed: id % 3 === 0 });
  }
  return stars;
}