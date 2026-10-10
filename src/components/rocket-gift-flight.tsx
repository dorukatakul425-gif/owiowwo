import { useEffect, useRef } from "react";
import rocketAsset from "@/assets/rocket-flight.png.asset.json";
import { rocketMotion, rocketTrailParticles, rocketProfileStars, rocketArrivalPhase, ROCKET_FLIGHT_MS, ROCKET_BURST_MS, ROCKET_IMPACT_MS, ROCKET_ARRIVAL_RADIUS } from "@/lib/rocket-motion";
import { playGiftSound } from "@/lib/gift-audio";

export type RocketDelivery = { id: number; sender: string; recipient: string };

function drawProfileStars(ctx: CanvasRenderingContext2D, target: Parameters<typeof rocketProfileStars>[0], gold: string, highlight: string, alpha = 1) {
  ctx.globalAlpha = alpha;
  for (const [id, particle] of rocketProfileStars(target).entries()) {
    ctx.fillStyle = id % 9 === 0 ? highlight : gold;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const angle = particle.rotation + i * Math.PI / 5;
      const radius = particle.radius * (i % 2 ? 0.46 : 1);
      const x = particle.x + Math.cos(angle) * radius;
      const y = particle.y + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath(); ctx.fill();
  }
  ctx.globalAlpha = 1;
}

/** Static gift mark: redraw only when the recipient's layout changes. */
export function RocketProfileStars({ recipient }: { recipient: string }) {
  const particles = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const image = Array.from(document.querySelectorAll<HTMLElement>(".round-player"))
      .find(item => item.dataset["playerName"] === recipient)?.querySelector("img");
    const canvas = particles.current;
    if (!image || !canvas) return;
    const redraw = () => {
      const target = image.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = Math.max(target.width, target.height) * 0.65;
      canvas.width = Math.round(size * dpr); canvas.height = Math.round(size * dpr);
      canvas.style.width = `${size}px`; canvas.style.height = `${size}px`;
      canvas.style.transform = `translate3d(${target.left + target.width * 0.28 - size / 2}px, ${target.top + target.height * 0.14 - size / 2}px, 0)`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const styles = getComputedStyle(document.documentElement);
      drawProfileStars(ctx, { width: target.width, height: target.height, left: size / 2 - target.width * 0.28, top: size / 2 - target.height * 0.14 },
        styles.getPropertyValue("--rocket-profile-yellow").trim(), styles.getPropertyValue("--rocket-highlight").trim());
    };
    redraw();
    const observer = new ResizeObserver(redraw);
    observer.observe(image); observer.observe(document.body);
    window.addEventListener("resize", redraw); window.addEventListener("scroll", redraw, true);
    return () => { observer.disconnect(); window.removeEventListener("resize", redraw); window.removeEventListener("scroll", redraw, true); };
  }, [recipient]);
  return <canvas ref={particles} className="rocket-gift-particles" data-impact-phase="profile" data-recipient={recipient} aria-hidden="true" />;
}

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
    const highlight = styles.getPropertyValue("--rocket-highlight").trim();
    const transparent = styles.getPropertyValue("--rocket-transparent").trim();
    const seat = (name: string) => Array.from(document.querySelectorAll<HTMLElement>(".round-player")).find(item => item.dataset["playerName"] === name)?.querySelector("img")?.getBoundingClientRect();
    const star = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, rotation: number) => {
      if (radius < 0.25) return;
      const fill = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
      fill.addColorStop(0, highlight); fill.addColorStop(0.25, color); fill.addColorStop(1, color);
      ctx.fillStyle = fill;
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const angle = rotation + i * Math.PI / 5;
        const r = i % 2 ? radius * 0.46 : radius;
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth; const height = window.innerHeight;
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) { canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); }
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height);
        if (!reduced) {
          // Trail continues falling after docking; it never switches to an arrival halo.
          const falling = rocketTrailParticles(elapsed, source, target);
          canvas.dataset["trailCount"] = String(falling.length);
          for (const particle of falling) {
            ctx.globalAlpha = particle.alpha;
            star(ctx, particle.x, particle.y, particle.radius, trail[particle.color] ?? gold, particle.rotation);
          }
          if (motion.arrived) {
            const flash = motion.burstAge < ROCKET_IMPACT_MS;
            canvas.dataset["impactPhase"] = rocketArrivalPhase(motion.burstAge);
            if (flash) {
              const progress = motion.burstAge / ROCKET_IMPACT_MS;
              const glow = ctx.createRadialGradient(motion.x, motion.y, 0, motion.x, motion.y, target.width * 0.3);
              glow.addColorStop(0, trail[1] ?? gold); glow.addColorStop(1, transparent);
              ctx.globalAlpha = 0.3 * Math.sin(Math.PI * progress);
              ctx.fillStyle = glow; ctx.fillRect(motion.x - target.width * 0.3, motion.y - target.width * 0.3, target.width * 0.6, target.width * 0.6);
              // A few large overlapping five-point stars, not a ring of tiny confetti.
              for (let i = 0; i < 14; i++) {
                const seed = (i * 0.618) % 1;
                const angle = i * 2.399;
                const distance = target.width * (0.025 + seed * 0.16) * (0.7 + progress * 0.4);
                ctx.globalAlpha = Math.min(1, (1 - progress) * 3);
                star(ctx, motion.x + Math.cos(angle) * distance, motion.y + Math.sin(angle) * distance,
                  target.width * ROCKET_ARRIVAL_RADIUS * (0.6 + seed * 0.4) * (1 - progress * 0.45),
                  i % 5 < 3 ? trail[1] ?? gold : trail[i % trail.length] ?? gold, -Math.PI / 2 + angle * 0.12);
              }
            } else {
              const progress = (motion.burstAge - ROCKET_IMPACT_MS) / (ROCKET_BURST_MS - ROCKET_IMPACT_MS);
              drawProfileStars(ctx, target, styles.getPropertyValue("--rocket-profile-yellow").trim(), highlight);
              for (let i = 0; i < 24; i++) {
                const seed = (i * 0.618) % 1;
                const angle = i * 2.399;
                const distance = target.width * Math.sqrt(seed) * 0.18;
                const x = motion.x + Math.cos(angle) * distance;
                const y = motion.y + Math.sin(angle) * distance + target.width * progress * 0.09;
                ctx.globalAlpha = (1 - progress) * 0.55;
                ctx.fillStyle = i % 4 === 0 ? highlight : gold;
                ctx.beginPath(); ctx.arc(x, y, target.width * (0.005 + seed * 0.012) * (1 - progress * 0.7), 0, Math.PI * 2); ctx.fill();
              }
            }
          } else {
            canvas.dataset["impactPhase"] = "none";
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