import { useEffect, useRef } from "react";
import rocketAsset from "@/assets/rocket-reference.png.asset.json";
import { rocketMotion, ROCKET_FLIGHT_MS } from "@/lib/rocket-motion";
import { playGiftSound } from "@/lib/gift-audio";

export type RocketDelivery = { id: number; sender: string; recipient: string };

export function RocketGiftFlight({ delivery, onComplete }: { delivery: RocketDelivery; onComplete: () => void }) {
  const art = useRef<HTMLImageElement>(null);
  const particles = useRef<HTMLCanvasElement>(null);
  const complete = useRef(onComplete);
  useEffect(() => { complete.current = onComplete; }, [onComplete]);
  useEffect(() => {
    let frame = 0;
    let started: number | undefined;
    let arrived = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const styles = getComputedStyle(document.documentElement);
    const trail = ["--rocket-lime", "--rocket-yellow", "--rocket-mint"].map(token => styles.getPropertyValue(token).trim());
    const burst = ["--rocket-pink", "--rocket-purple", "--rocket-yellow", "--rocket-mint"].map(token => styles.getPropertyValue(token).trim());
    const seat = (name: string) => Array.from(document.querySelectorAll<HTMLElement>(".round-player")).find(item => item.dataset["playerName"] === name)?.querySelector("img")?.getBoundingClientRect();
    const star = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, rotation: number) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const angle = rotation + i * Math.PI / 5;
        const r = i % 2 ? radius * 0.42 : radius;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.fill();
    };
    const draw = (now: number) => {
      started ??= now;
      const source = seat(delivery.sender);
      const target = seat(delivery.recipient);
      const node = art.current;
      const canvas = particles.current;
      if (!source || !target || !node || !canvas) { complete.current(); return; }
      const elapsed = now - started + (reduced ? ROCKET_FLIGHT_MS : 0);
      const motion = rocketMotion(elapsed, source, target);
      if (motion.complete) { complete.current(); return; }
      node.style.width = `${motion.size}px`;
      node.style.transform = `translate3d(${motion.x}px, ${motion.y}px, 0) translate(-50%, -50%) rotate(${motion.rotation}deg)`;
      node.dataset["phase"] = motion.arrived ? "arrived" : "flying";
      canvas.dataset["phase"] = motion.arrived ? "arrived" : "flying";
      if (motion.arrived && !arrived) { arrived = true; void playGiftSound("rocket", "arrive"); }
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth; const height = window.innerHeight;
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) { canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); }
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height);
        if (!reduced) {
          const count = motion.arrived ? 38 : 22;
          for (let i = 0; i < count; i++) {
            const phase = ((elapsed / (motion.arrived ? 630 : 410)) + i * 0.618) % 1;
            const angle = i * 2.399 + (motion.arrived ? motion.burstAge * 0.0006 : 0);
            const radius = target.width * (motion.arrived ? 0.17 + phase * 0.14 : 0.2 * phase);
            const x = motion.x + Math.cos(angle) * radius + (motion.arrived ? 0 : (source.left > target.left ? -1 : 1) * phase * motion.size * 0.5);
            const y = motion.y + Math.sin(angle) * radius;
            ctx.globalAlpha = motion.arrived ? Math.min(1, (3400 - motion.burstAge) / 300) : 1 - phase * 0.45;
            const palette = motion.arrived ? burst : trail;
            star(ctx, x, y, target.width * (0.018 + (1 - phase) * 0.018), palette[i % palette.length] ?? trail[0] ?? "", angle);
          }
          ctx.globalAlpha = 1;
        }
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [delivery]);
  return <>
    <img ref={art} className="rocket-gift-flight" src={rocketAsset.url} data-phase="flying" alt={`${delivery.recipient} için havai fişek hediyesi`} draggable={false} />
    <canvas ref={particles} className="rocket-gift-particles" aria-hidden="true" />
  </>;
}
