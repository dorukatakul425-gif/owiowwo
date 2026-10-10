import { useEffect, useRef } from "react";
const tomatoAsset = "/game-assets/current/tomato-flight.png";
const splatAsset = "/game-assets/current/tomato-splat.png";
import { tomatoMotion, TOMATO_FLIGHT_MS } from "@/lib/tomato-motion";
import { playGiftSound } from "@/lib/gift-audio";

export type TomatoDelivery = { id: number; sender: string; recipient: string };

export function TomatoGiftFlight({ delivery, onComplete }: { delivery: TomatoDelivery; onComplete: () => void }) {
  const art = useRef<HTMLDivElement>(null);
  const complete = useRef(onComplete);
  useEffect(() => { complete.current = onComplete; }, [onComplete]);
  useEffect(() => {
    let frame = 0;
    let started: number | undefined;
    let arrived = false;
    let settled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seat = (name: string) => Array.from(document.querySelectorAll<HTMLElement>(".round-player")).find(item => item.dataset["playerName"] === name)?.querySelector("img")?.getBoundingClientRect();
    const paint = (elapsed: number) => {
      const source = seat(delivery.sender);
      const target = seat(delivery.recipient);
      const node = art.current;
      if (!source || !target || !node) { complete.current(); return false; }
      const motion = tomatoMotion(elapsed, source, target);
      node.style.width = `${motion.size}px`;
      node.style.transform = `translate3d(${motion.x}px, ${motion.y}px, 0) rotate(${motion.arrived ? 0 : motion.rotation}deg) scale(${motion.arrived ? motion.splatScale : 1})`;
      node.dataset["phase"] = motion.arrived ? "arrived" : "flying";
      if (motion.arrived && !arrived) { arrived = true; void playGiftSound("tomato", "arrive"); }
      return motion.arrived && motion.splatScale === 1;
    };
    const draw = (now: number) => {
      started ??= now;
      // After the splat settles, stop the per-frame loop; the splat only moves
      // again on layout changes, so hundreds of delivered tomatoes cost nothing.
      if (paint(reduced ? TOMATO_FLIGHT_MS + 180 : now - started)) {
        settled = true;
        window.addEventListener("resize", repaint);
        window.addEventListener("scroll", repaint, true);
        return;
      }
      frame = requestAnimationFrame(draw);
    };
    const repaint = () => { if (settled) paint(TOMATO_FLIGHT_MS + 180); };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", repaint);
      window.removeEventListener("scroll", repaint, true);
    };
  }, [delivery]);
  return <div ref={art} className="tomato-gift-flight" data-phase="flying" role="img" aria-label={`${delivery.recipient} için domates hediyesi`}>
    <img className="tomato-whole" src={tomatoAsset} alt="" draggable={false} />
    <img className="tomato-splat" src={splatAsset} alt="" draggable={false} />
  </div>;
}