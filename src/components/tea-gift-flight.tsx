import { useEffect, useRef } from "react";
import fullGlass from "@/assets/tea-glass-full.png.asset.json";
import emptyGlass from "@/assets/tea-glass-empty.png.asset.json";
import { teaMotion, TEA_FLIGHT_MS, TEA_FILL_MS } from "@/lib/tea-motion";
import { playTeaSound } from "@/lib/tea-audio";

export type TeaDelivery = { id: number; recipient: string; sender: string };
export { TEA_FLIGHT_MS } from "@/lib/tea-motion";

/** Read live avatar rectangles each frame so resize and moving seats stay aligned. */
export function TeaGiftFlight({ delivery, onComplete }: { delivery: TeaDelivery; onComplete: () => void }) {
  const glass = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLImageElement>(null);
  const complete = useRef(onComplete);
  useEffect(() => { complete.current = onComplete; }, [onComplete]);
  useEffect(() => {
    let frame = 0;
    let started: number | undefined;
    let arrivalPlayed = false;
    let settled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const findSeat = (name: string) => Array.from(document.querySelectorAll<HTMLElement>(".round-player")).find(seat => seat.dataset["playerName"] === name);
    const paint = (elapsed: number) => {
      const source = findSeat(delivery.sender)?.querySelector("img")?.getBoundingClientRect();
      const target = findSeat(delivery.recipient)?.querySelector("img")?.getBoundingClientRect();
      const table = document.querySelector(".table-content")?.getBoundingClientRect();
      if (!source || !target || !table || !glass.current || !fill.current) { complete.current(); return false; }
      const motion = teaMotion(reduced ? TEA_FLIGHT_MS : elapsed, source, target, table.width);
      glass.current.style.width = `${motion.size}px`;
      glass.current.style.transform = `translate3d(${motion.x}px, ${motion.y}px, 0)`;
      // The saucer, spoon and garnish never dissolve: only the liquid rises.
      const surface = 88 - motion.fill * 61;
      fill.current.style.clipPath = motion.fill === 1 ? "none" : `polygon(30% ${surface}%, 78% ${surface}%, 78% 89%, 30% 89%)`;
      glass.current.dataset["fill"] = motion.fill.toFixed(3);
      glass.current.dataset["phase"] = motion.arrived ? "arrived" : "flying";
      if (motion.arrived && !arrivalPlayed) {
        arrivalPlayed = true;
        void playTeaSound("arrive");
      }
      return motion.arrived && motion.fill === 1;
    };
    const draw = (now: number) => {
      if (started === undefined) started = now;
      // Once the glass is docked and full, stop the per-frame loop: the gift only
      // moves again when the layout itself changes (resize/scroll), so hundreds of
      // delivered teas cost nothing per frame.
      if (paint(now - started)) {
        settled = true;
        window.addEventListener("resize", repaint);
        window.addEventListener("scroll", repaint, true);
        return;
      }
      frame = requestAnimationFrame(draw);
    };
    const repaint = () => { if (settled) paint(TEA_FLIGHT_MS + TEA_FILL_MS); };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", repaint);
      window.removeEventListener("scroll", repaint, true);
    };
  }, [delivery]);
  return <div ref={glass} className="tea-gift-flight" role="img" aria-label={`${delivery.recipient} üçün çay hədiyyəsi`}>
    <img src={emptyGlass.url} alt="" draggable={false} />
    <img ref={fill} className="tea-gift-liquid" src={fullGlass.url} alt="" draggable={false} />
  </div>;
}