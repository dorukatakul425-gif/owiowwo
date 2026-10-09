export type RoundPhase = "ready" | "spinning" | "arriving" | "choosing" | "result" | "returning";
export type RoundState = {
  phase: RoundPhase;
  actor: number;
  target: number | null;
  rotation: number;
  round: number;
  seconds: number;
  accepted: boolean | null;
  kisses: number[];
};
export type RoundAction =
  | { type: "spin"; target: number; angle: number }
  | { type: "arrive" }
  | { type: "choose" }
  | { type: "tick" }
  | { type: "decide"; accept: boolean }
  | { type: "return" }
  | { type: "next" };

export const initialRound: RoundState = {
  phase: "ready", actor: 0, target: null, rotation: 0, round: 0,
  seconds: 10, accepted: null, kisses: [0, 0, 0],
};

// One local player and two bots recreate the three-seat reference table.
export const roundSeats = [
  { x: 52.4, y: 82.0 },
  { x: 52.4, y: 12.5 },
  { x: 74.3, y: 19.0 },
];

// Geometry uses the reference table's 768 × 863 coordinate space.
export function turnIndicatorGeometry(actor: number) {
  const seat = roundSeats[actor] ?? { x: 52.4, y: 82 };
  const center = { x: 50, y: 54 };
  const dx = seat.x + 8.595 - center.x;
  const dy = (seat.y + 7.65 - center.y) * 863 / 768;
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  const tip = { x: center.x + ux * (length - 12), y: center.y + uy * (length - 12) * 768 / 863 };
  const tail = { x: tip.x - ux * 4, y: tip.y - uy * 4 * 768 / 863 };
  return {
    tip, tail,
    label: { x: tail.x - ux * 4.5, y: tail.y - uy * 4.5 * 768 / 863 },
    angle: Math.atan2(dy, dx) * 180 / Math.PI,
    rock: dy < 0 ? 1 : -1,
  };
}

export function targetAngle(index: number): number {
  const seat = roundSeats[index];
  if (!seat) return 0;
  return Math.atan2(seat.x + 8.6 - 50, -(seat.y + 7.65 - 54) * 863 / 768) * 180 / Math.PI;
}

export function pickBotTarget(actor: number, round: number): number {
  if (actor === 0) return round % 4 === 0 ? 2 : 1;
  // Include a spectator bot-to-bot round, then hand the turn back to the user.
  return actor === 1 ? 2 : 0;
}

export function roundReducer(state: RoundState, action: RoundAction): RoundState {
  switch (action.type) {
    case "spin": {
      if (state.phase !== "ready" || action.target === state.actor || action.target < 0 || action.target >= state.kisses.length) return state;
      const current = ((state.rotation % 360) + 360) % 360;
      const delta = ((action.angle - current) % 360 + 360) % 360;
      return { ...state, phase: "spinning", target: action.target, rotation: state.rotation + 1440 + delta, accepted: null, seconds: 10 };
    }
    case "arrive": return state.phase === "spinning" ? { ...state, phase: "arriving" } : state;
    case "choose": return state.phase === "arriving" ? { ...state, phase: "choosing", seconds: 9 } : state;
    case "tick": return state.phase === "choosing" ? { ...state, seconds: Math.max(0, state.seconds - 1) } : state;
    case "decide": {
      if (state.phase !== "choosing") return state;
      const accepted = action.accept;
      return { ...state, phase: "result", accepted, kisses: state.kisses.map((count, index) => accepted && (index === state.actor || index === state.target) ? count + 1 : count) };
    }
    case "return": return state.phase === "result" ? { ...state, phase: "returning" } : state;
    case "next": return state.phase === "returning" ? { ...state, phase: "ready", actor: state.target ?? 0, target: null, round: state.round + 1, accepted: null } : state;
  }
}