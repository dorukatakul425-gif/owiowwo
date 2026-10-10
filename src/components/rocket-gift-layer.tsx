import { useEffect, useRef, useState } from "react";
import { RocketGiftFlight, type RocketDelivery } from "@/components/rocket-gift-flight";
import { prepareGiftAudio, playGiftSound } from "@/lib/gift-audio";

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
  const sequence = useRef(0);
  useEffect(() => {
    const send = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      const detail: unknown = event.detail;
      if (!detail || typeof detail !== "object" || !("sender" in detail) || !("recipient" in detail)
        || typeof detail.sender !== "string" || typeof detail.recipient !== "string") return;
      const { sender, recipient } = detail;
      const delivery = { id: ++sequence.current, sender, recipient };
      setDeliveries(previous => [...previous.filter(item => item.recipient !== recipient), delivery]);
    };
    window.addEventListener("gift:rocket", send);
    return () => window.removeEventListener("gift:rocket", send);
  }, []);
  return <>{deliveries.map(delivery => <RocketGiftFlight key={delivery.id} delivery={delivery}
    onComplete={() => setDeliveries(previous => previous.filter(item => item.id !== delivery.id))} />)}</>;
}