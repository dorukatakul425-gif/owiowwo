import * as Dialog from "@radix-ui/react-dialog";
import { Check, LockKeyhole, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { appearanceChoices, type AppearanceChoice } from "@/lib/appearance";
const beer = "/game-assets/current/appearance-profile-beer.png";
const wood = "/game-assets/current/wood.png";
const heart = "/game-assets/current/offer-heart.png";
export function AppearanceArtwork({ choice }: { choice: AppearanceChoice }) {
  return <span className="appearance-artwork"><img className="appearance-frame" src={choice.frame.url} alt="" draggable={false} /><img className="appearance-center-icon" src={choice.icon.url} alt="" draggable={false} /></span>;
}

export function AppearancePopup({ open, onOpenChange, applied, onApply }: { open: boolean; onOpenChange: (open: boolean) => void; applied: AppearanceChoice | null; onApply: (choice: AppearanceChoice | null) => void }) {
  const [selected, setSelected] = useState<AppearanceChoice | null>(applied);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (open) { setSelected(applied); scrollRef.current?.scrollTo(0, 0); } }, [open, applied]);
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="heart-shop-backdrop appearance-backdrop" />
      <Dialog.Content className="heart-shop appearance-popup" aria-describedby="appearance-description" onOpenAutoFocus={(event) => { event.preventDefault(); scrollRef.current?.focus(); }} onCloseAutoFocus={(event) => { event.preventDefault(); document.querySelector<HTMLButtonElement>(".menu-control")?.focus({ preventScroll: true }); }}>
        <div className="appearance-surface">
          <header className="appearance-header">
            <Dialog.Title className="appearance-title">{selected ? selected.name : "Stil uygulaması yok"}</Dialog.Title>
            <div className="appearance-preview">
              <div className="appearance-profile"><img className="appearance-profile-wood" src={wood} alt="" /><img className="appearance-profile-avatar" src={beer} alt="Profil resmi" />{selected && <AppearanceArtwork choice={selected} />}<span>Subhan, 26</span></div>
              <div className="appearance-summary"><p id="appearance-description">{selected ? "Profil resmini ve kullanıcı adını seçilen stille gösterin" : "Profil resmini ve kullanıcı adını stil uygulamadan bırakın"}</p><Button variant="reference" size="reference" className="appearance-apply" disabled={selected?.id === applied?.id} onClick={() => { onApply(selected); onOpenChange(false); }}>Uygula</Button></div>
            </div>
          </header>
          <div ref={scrollRef} className="appearance-scroll" tabIndex={0} aria-label="Görünüş seçenekleri">
            <div className="appearance-grid">
              <Button variant="reference" size="reference" className="appearance-choice appearance-none" aria-label="Stil uygulaması yok" aria-pressed={selected === null} onClick={() => setSelected(null)}><span className="appearance-empty-frame"><X /></span><span className="appearance-price"><Check className="appearance-check" /></span></Button>
              {appearanceChoices.map((choice) => <Button variant="reference" size="reference" key={choice.id} className="appearance-choice" aria-label={`${choice.name}, ${choice.locked ? "kilitli" : "500 kalp"}`} aria-disabled={choice.locked} aria-pressed={selected?.id === choice.id} onClick={() => { if (!choice.locked) setSelected(choice); }}><AppearanceArtwork choice={choice} /><span className="appearance-price">{choice.locked ? <LockKeyhole className="appearance-lock" /> : <><img src={heart} alt="Kalp" /><span>{choice.price}</span></>}</span></Button>)}
            </div>
          </div>
        </div>
        <Dialog.Close asChild><Button variant="reference" size="reference" className="appearance-close" aria-label="Görünüşü kapat"><X strokeWidth={2.5} /></Button></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}