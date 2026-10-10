import { useEffect, useRef } from "react";
import crown from "@/assets/crown-flight.png.asset.json";
import { crownMotion, crownStars, CROWN_FLIGHT_MS, CROWN_TRAIL_MS } from "@/lib/crown-motion";
import { playGiftSound } from "@/lib/gift-audio";

export type CrownDelivery = { id: number; sender: string; recipient: string };

export function CrownGiftFlight({ delivery, onComplete }: { delivery: CrownDelivery; onComplete: () => void }) {
  const art = useRef<HTMLImageElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const complete = useRef(onComplete);
  useEffect(() => { complete.current = onComplete; }, [onComplete]);
  useEffect(() => {
    let frame = 0;
    let started: number | undefined;
    let arrived = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = new Map<number, HTMLSpanElement>();
    const seat = (name: string) => Array.from(document.querySelectorAll<HTMLElement>(".round-player")).find(item => item.dataset["playerName"] === name)?.querySelector("img")?.getBoundingClientRect();
    const draw = (now: number) => {
      started ??= now;
      const elapsed = reduced ? CROWN_FLIGHT_MS + CROWN_TRAIL_MS : now - started;
      const source = seat(delivery.sender);
      const target = seat(delivery.recipient);
      if (!source || !target || !art.current || !trail.current) { complete.current(); return; }
      const motion = crownMotion(elapsed, source, target);
      art.current.style.width = `${motion.size}px`;
      art.current.style.transform = `translate3d(${motion.x}px, ${motion.y}px, 0) rotate(${motion.rotation}deg)`;
      art.current.dataset["phase"] = motion.arrived ? "arrived" : "flying";
      if (motion.arrived && !arrived) { arrived = true; void playGiftSound("crown", "arrive"); }
      const stars = reduced ? [] : crownStars(elapsed, source, target);
      const visible = new Set(stars.map(star => star.id));
      for (const [id, node] of particles) {
        if (!visible.has(id)) { node.remove(); particles.delete(id); }
      }
      for (const star of stars) {
        let node = particles.get(star.id);
        if (!node) {
          node = document.createElement("span");
          node.className = `crown-star crown-star-${star.color}${star.pointed ? " crown-star-pointed" : ""}`;
          trail.current.append(node);
          particles.set(star.id, node);
        }
        node.style.width = `${star.size}px`;
        node.style.opacity = `${star.opacity}`;
        node.style.transform = `translate3d(${star.x - star.size / 2}px, ${star.y - star.size / 2}px, 0) rotate(${star.rotation}deg)`;
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); for (const node of particles.values()) node.remove(); };
  }, [delivery]);
  return <>
    <div ref={trail} className="crown-gift-trail" aria-hidden="true" />
    <img ref={art} className="crown-gift-flight" src={crown.url} alt={`${delivery.recipient} üçün tac hədiyyəsi`} draggable={false} />
  </>;
}