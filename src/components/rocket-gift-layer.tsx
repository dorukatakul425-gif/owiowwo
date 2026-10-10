import { useEffect, useRef, useState } from "react";
import { createRocketFlight, RocketProfileStars, rocketAsset, type RocketDelivery, type RocketFlight } from "@/components/rocket-gift-flight";
import { prepareGiftAudio, playGiftSound } from "@/lib/gift-audio";

// Spam backstop: cap simultaneous flights so hundreds of taps never stutter.
const MAX_FLIGHTS = 24;

export function sendRocketGift(recipient: string) {
  const sender = document.querySelector<HTMLElement>(".round-player-self")?.dataset["playerName"]
    ?? document.querySelector<HTMLElement>(".round-player")?.dataset["playerName"];
  if (!sender) return;
  prepareGiftAudio("rocket");
  void playGiftSound("rocket", "send");
  window.dispatchEvent(new CustomEvent("gift:rocket", { detail: { sender, recipient } }));
}

export function RocketGiftLayer() {
  const [deliveries, setDeliveries] = useState<RocketDelivery[]>([]);
  const [profileGifts, setProfileGifts] = useState<string[]>([]);
  const sequence = useRef(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  const nodes = useRef(new Map<number, HTMLImageElement>());
  const flights = useRef(new Map<number, RocketFlight>());
  useEffect(() => {
    const send = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      const detail: unknown = event.detail;
      if (!detail || typeof detail !== "object" || !("sender" in detail) || !("recipient" in detail)
        || typeof detail.sender !== "string" || typeof detail.recipient !== "string") return;
      const { sender, recipient } = detail;
      const delivery = { id: ++sequence.current, sender, recipient };
      setProfileGifts(previous => previous.filter(name => name !== recipient));
      setDeliveries(previous => [...previous.slice(-(MAX_FLIGHTS - 1)), delivery]);
    };
    window.addEventListener("gift:rocket", send);
    return () => window.removeEventListener("gift:rocket", send);
  }, []);
  // One canvas and one animation loop for every flight: a single clearRect and a
  // single composited layer per frame, no matter how many rockets are flying.
  useEffect(() => {
    let frame = 0;
    const draw = (now: number) => {
      const target = canvas.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth; const height = window.innerHeight;
      if (target && (target.width !== Math.round(width * dpr) || target.height !== Math.round(height * dpr))) {
        target.width = Math.round(width * dpr); target.height = Math.round(height * dpr);
      }
      const ctx = target?.getContext("2d");
      if (target && ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
        for (const [id, flight] of flights.current) {
          if (!flight.step(now, ctx, target)) {
            flights.current.delete(id);
            nodes.current.delete(id);
            setDeliveries(previous => previous.filter(item => item.id !== id));
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <>
    {profileGifts.map(recipient => <RocketProfileStars key={recipient} recipient={recipient} />)}
    <canvas ref={canvas} className="rocket-gift-particles" aria-hidden="true" />
    {deliveries.map(delivery => {
      if (!flights.current.has(delivery.id)) {
        flights.current.set(delivery.id, createRocketFlight(delivery, nodes.current, () => {
          setProfileGifts(previous => previous.includes(delivery.recipient) ? previous : [...previous, delivery.recipient]);
        }));
      }
      return <img key={delivery.id} ref={(node) => { if (node) nodes.current.set(delivery.id, node); else nodes.current.delete(delivery.id); }}
        className="rocket-gift-flight" src={rocketAsset.url} data-phase="flying" alt={`${delivery.recipient} için havai fişek hediyesi`} draggable={false} />;
    })}
  </>;
}
