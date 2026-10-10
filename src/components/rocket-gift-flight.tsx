import { useEffect, useRef } from "react";
import rocketAsset from "@/assets/rocket-flight.png.asset.json";
import { rocketMotion, ROCKET_FLIGHT_MS, ROCKET_BURST_MS, ROCKET_IMPACT_MS } from "@/lib/rocket-motion";
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
    const trail = ["--rocket-lime", "--rocket-yellow", "--rocket-mint", "--rocket-pink"].map(token => styles.getPropertyValue(token).trim());
    const gold = styles.getPropertyValue("--rocket-gold").trim();
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
      node.dataset["phase"] = motion.arrived ? (motion.burstAge < ROCKET_IMPACT_MS ? "arrived" : "settled") : "flying";
      node.style.opacity = motion.arrived ? `${Math.max(0, 1 - motion.burstAge / ROCKET_IMPACT_MS)}` : "1";
      canvas.dataset["phase"] = motion.arrived ? "arrived" : "flying";
      if (motion.arrived && !arrived) { arrived = true; void playGiftSound("rocket", "arrive"); }
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth; const height = window.innerHeight;
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) { canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); }
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height);
        if (!reduced) {
          // The recording leaves a narrow, downward-falling trail, not a halo.
          if (!motion.arrived || motion.burstAge < 800) {
            for (let i = 0; i < 44; i++) {
              const age = ((elapsed / 1250 + i * 0.618) % 1) * 1250;
              const emitted = elapsed - age;
              if (emitted < 80 || emitted > ROCKET_FLIGHT_MS) continue;
              const previous = rocketMotion(emitted, source, target);
              const phase = age / 1250;
              const x = previous.x + Math.sin(i * 4.7 + age * 0.003) * target.width * 0.07;
              const y = previous.y + target.width * (0.14 + phase * 0.9);
              ctx.globalAlpha = (1 - phase) * Math.min(1, (ROCKET_FLIGHT_MS + 800 - elapsed) / 400);
              star(ctx, x, y, target.width * (0.006 + (1 - phase) * 0.055), trail[i % trail.length] ?? gold, i + age * 0.002);
            }
          }
          if (motion.arrived) {
            for (let i = 0; i < 55; i++) {
              const phase = (i * 0.618) % 1;
              const angle = i * 2.399;
              const flash = motion.burstAge < ROCKET_IMPACT_MS;
              const radius = target.width * (flash ? 0.04 + phase * 0.19 : 0.03 + phase * 0.15);
              const x = motion.x + Math.cos(angle) * radius;
              const y = motion.y + Math.sin(angle) * radius + (flash ? 0 : motion.burstAge * target.width * 0.000018);
              ctx.globalAlpha = flash ? 1 - motion.burstAge / ROCKET_IMPACT_MS : Math.min(0.8, (ROCKET_BURST_MS - motion.burstAge) / 600);
              if (flash) star(ctx, x, y, target.width * (0.014 + phase * 0.036), trail[i % trail.length] ?? gold, angle);
              else {
                ctx.fillStyle = i % 3 === 0 ? gold : trail[1] ?? gold;
                ctx.beginPath(); ctx.arc(x, y, target.width * (0.003 + phase * 0.005), 0, Math.PI * 2); ctx.fill();
              }
            }
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
