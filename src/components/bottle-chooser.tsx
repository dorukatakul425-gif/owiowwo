import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bottles, type BottleChoice } from "@/lib/bottles";
import heart from "@/assets/offer-heart.png.asset.json";

export function BottleChooser({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (choice: BottleChoice) => void }) {
  const sheetRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    sheetRef.current?.focus({ preventScroll: true });
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open, onClose]);
  if (!open) return null;
  return <section ref={sheetRef} className="bottle-chooser" role="region" aria-labelledby="bottle-chooser-title" tabIndex={-1}>
    <div className="bottle-chooser-scroll">
      <h2 id="bottle-chooser-title" className="bottle-chooser-title">Şişeyi değiştir</h2>
      <div className="bottle-chooser-grid">
        {bottles.map((choice) => <Button key={choice.id} variant="reference" size="reference" className="bottle-choice" aria-label={`${choice.name}, ${choice.price} kalp`} onClick={() => onSelect(choice)}>
          <span className="bottle-choice-art"><img src={choice.image} alt="" draggable={false} decoding="async" /></span>
          <span className="bottle-choice-price"><img src={heart.url} alt="Kalp" draggable={false} />{choice.price}</span>
        </Button>)}
      </div>
    </div>
    <Button variant="reference" size="reference" className="bottle-chooser-close" aria-label="Şişe penceresini kapat" title="Kapat" onClick={onClose}><X /></Button>
  </section>;
}