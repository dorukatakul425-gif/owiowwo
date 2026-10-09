import { useCallback, useEffect, useReducer } from "react";
import { initialRound, pickBotTarget, roundReducer, targetAngle } from "@/lib/game-round";

export function useGameRound(paused: boolean) {
  const [state, dispatch] = useReducer(roundReducer, initialRound);
  const spin = useCallback(() => {
    const target = pickBotTarget(state.actor, state.round);
    dispatch({ type: "spin", target, angle: targetAngle(target) });
  }, [state.actor, state.round]);
  const decide = useCallback((accept: boolean) => dispatch({ type: "decide", accept }), []);
  const involved = state.actor === 0 || state.target === 0;

  useEffect(() => {
    if (paused) return;
    let delay = 0;
    let advance: (() => void) | undefined;
    switch (state.phase) {
      case "ready": if (state.actor !== 0) { delay = 1600; advance = spin; } break;
      case "spinning": delay = 5000; advance = () => dispatch({ type: "arrive" }); break;
      case "arriving": delay = 700; advance = () => dispatch({ type: "choose" }); break;
      case "choosing":
        if (involved) {
          delay = 1000;
          advance = () => state.seconds <= 1 ? decide(false) : dispatch({ type: "tick" });
        } else {
          delay = 1800;
          advance = () => decide(state.round % 4 !== 3);
        }
        break;
      case "result": delay = 2000; advance = () => dispatch({ type: "return" }); break;
      case "returning": delay = 600; advance = () => dispatch({ type: "next" }); break;
    }
    if (!advance) return;
    const timer = window.setTimeout(advance, delay);
    return () => window.clearTimeout(timer);
  }, [paused, state.phase, state.actor, state.round, state.seconds, involved, spin, decide]);

  return { state, spin, decide, involved };
}