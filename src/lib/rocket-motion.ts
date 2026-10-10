export const ROCKET_FLIGHT_MS = 5000;
export const ROCKET_BURST_MS = 2600;
export const ROCKET_IMPACT_MS = 600;
export const ROCKET_TURN_DEGREES = 300;
export const ROCKET_TRAIL_MS = 1200;
export const ROCKET_STAR_INTERVAL_MS = 24;
export const ROCKET_TRAIL_RADIUS = 0.115;
export const ROCKET_ARRIVAL_RADIUS = 0.15;
export type RocketAvatarRect = { left: number; top: number; width: number; height: number };

/** Arrival settles into a gift mark on the photo, not an expanding circular halo. */
export function rocketArrivalPhase(age: number) {
  if (age < ROCKET_IMPACT_MS) return "stars";
  if (age < ROCKET_BURST_MS) return "gold";
  return "profile";
}

export function rocketProfileStars(target: RocketAvatarRect) {
  // Measured mixed-size constellation, relative to the photo's top-left corner.
  const marks = [
    [0.27,-0.035,0.019],[0.32,-0.025,0.017],[0.20,0.005,0.021],[0.37,0.018,0.025],
    [0.13,0.030,0.024],[0.25,0.027,0.016],[0.30,0.040,0.030],[0.43,0.046,0.043],
    [0.17,0.065,0.030],[0.22,0.080,0.022],[0.36,0.080,0.022],[0.11,0.105,0.026],
    [0.28,0.110,0.047],[0.40,0.112,0.034],[0.47,0.111,0.018],[0.19,0.128,0.020],
    [0.08,0.145,0.019],[0.14,0.150,0.026],[0.34,0.158,0.061],[0.45,0.158,0.021],
    [0.23,0.169,0.022],[0.10,0.195,0.025],[0.17,0.195,0.028],[0.26,0.216,0.043],
    [0.43,0.212,0.028],[0.36,0.236,0.025],[0.15,0.240,0.018],[0.20,0.254,0.024],
    [0.31,0.278,0.020],[0.11,0.270,0.017],[0.23,0.299,0.024],[0.37,0.299,0.040],
    [0.29,0.324,0.018],[0.18,0.315,0.019],[0.40,0.261,0.017],[0.48,0.183,0.017],
    [0.33,0.003,0.014],[0.09,0.075,0.014],[0.21,0.039,0.012],[0.46,0.075,0.013],
  ];
  return marks.map(([x = 0, y = 0, radius = 0], id) => {
    return {
      x: target.left + target.width * x,
      y: target.top + target.height * y,
      radius: target.width * radius,
      rotation: -Math.PI / 2 + Math.sin(id * 1.7) * 0.4,
    };
  });
}

/** Fixed emission times keep the same falling stars at 30, 60 and 120 Hz. */
export function rocketTrailParticles(elapsed: number, source: RocketAvatarRect, target: RocketAvatarRect) {
  const first = Math.max(0, Math.ceil((elapsed - ROCKET_TRAIL_MS) / ROCKET_STAR_INTERVAL_MS));
  const last = Math.floor(Math.min(elapsed, ROCKET_FLIGHT_MS) / ROCKET_STAR_INTERVAL_MS);
  const particles = [];
  for (let id = first; id <= last; id++) {
    const emitted = id * ROCKET_STAR_INTERVAL_MS;
    const age = elapsed - emitted;
    const phase = age / ROCKET_TRAIL_MS;
    const seed = ((id * 0.61803398875) % 1);
    const origin = rocketMotion(emitted, source, target);
    particles.push({
      id,
      x: origin.x + Math.sin(id * 2.399) * target.width * (0.04 + phase * 0.075),
      y: origin.y + target.width * (0.12 + phase * 1.05),
      radius: target.width * ROCKET_TRAIL_RADIUS * (0.55 + seed * 0.45) * (1 - phase) ** 1.5,
      alpha: Math.min(1, (1 - phase) * 2.4),
      rotation: -Math.PI / 2 + Math.sin(id * 1.7) * 0.3 + age * 0.0004,
      color: id % 10 < 5 ? 0 : id % 10 < 7 ? 1 : id % 10 < 9 ? 2 : 3,
    });
  }
  return particles;
}

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