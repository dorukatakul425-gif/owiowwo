import { useEffect, useRef } from "react";
import fullGlass from "@/assets/tea-glass-full.png.asset.json";
import emptyGlass from "@/assets/tea-glass-empty.png.asset.json";

export type TeaDelivery = { id: number; recipient: string; sender: string };
export const TEA_FLIGHT_MS = 3100;

/** Read live avatar rectangles each frame so resize and moving seats stay aligned. */
export function TeaGiftFlight({ delivery, onComplete }: { delivery: TeaDelivery; onComplete: () => void }) {
  const glass = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLImageElement>(null);
  const complete = useRef(onComplete);
  useEffect(() => { complete.current = onComplete; }, [onComplete]);
  useEffect(() => {
    let frame = 0;
    let started: number | undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const findSeat = (name: string) => Array.from(document.querySelectorAll<HTMLElement>(".round-player")).find(seat => seat.dataset["playerName"] === name);
    const draw = (now: number) => {
      if (started === undefined) started = now;
      const elapsed = now - started;
      const progress = reduced ? 1 : Math.min(1, elapsed / TEA_FLIGHT_MS);
      const source = findSeat(delivery.sender)?.getBoundingClientRect();
      const target = findSeat(delivery.recipient)?.getBoundingClientRect();
      const table = document.querySelector(".table-content")?.getBoundingClientRect();
      if (!source || !target || !table || !glass.current || !fill.current) { complete.current(); return; }
      const size = table.width * 0.105;
      const startX = source.left + source.width / 2;
      const startY = source.top + source.width * 0.12;
      const endX = target.right - target.width * 0.08;
      const endY = target.bottom - target.width * 0.08;
      glass.current.style.width = `${size}px`;
      glass.current.style.transform = `translate3d(${startX + (endX - startX) * progress - size / 2}px, ${startY + (endY - startY) * progress - size / 2}px, 0)`;
      // The saucer, spoon and garnish never dissolve: only the liquid rises.
      const surface = 88 - progress * 61;
      fill.current.style.clipPath = progress === 1 ? "none" : `polygon(30% ${surface}%, 78% ${surface}%, 78% 89%, 30% 89%)`;
      glass.current.dataset["fill"] = progress.toFixed(3);
      glass.current.dataset["phase"] = progress < 1 ? "flying" : "arrived";
      if (elapsed >= (reduced ? 900 : TEA_FLIGHT_MS + 1800)) { complete.current(); return; }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [delivery]);
  return <div ref={glass} className="tea-gift-flight" role="img" aria-label={`${delivery.recipient} üçün çay hədiyyəsi`}>
    <img src={emptyGlass.url} alt="" draggable={false} />
    <img ref={fill} className="tea-gift-liquid" src={fullGlass.url} alt="" draggable={false} />
  </div>;
}