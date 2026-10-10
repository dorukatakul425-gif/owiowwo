import { useEffect, useState } from "react";
import { LockKeyhole, Plus, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { referenceGifts } from "@/lib/reference-gifts";
import heartAsset from "@/assets/profile-heart.png.asset.json";

// Four visible rows; artwork and prices stay inside their own cells.
const giftLayoutStyles = `
.gift-drawer .gift-drawer-scroll { container-type: size; overflow-x: hidden; touch-action: pan-y; }
.gift-drawer .gift-reference-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); grid-auto-rows: calc((100cqh - 6.4cqw - 3 * min(4.7cqw, 4cqh)) / 4); padding: 2.4cqw 1.6cqw 4cqw; column-gap: 1.4cqw; row-gap: min(4.7cqw, 4cqh); }
.gift-drawer .gift-reference-item.reference-button { height: 100%; min-height: 0; min-width: 0; padding: 0; gap: 0.6cqw; align-items: center; justify-content: flex-start; }
.gift-drawer .gift-reference-art { display: block; flex: none; width: 15.4cqw; max-width: 100%; height: max(0px, min(15.4cqw, calc(100% - 5.4cqw))); object-fit: contain; }
.gift-drawer .gift-reference-price { flex: none; height: 4.8cqw; line-height: 1; }
.gift-drawer .gift-reference-item.gift-selected { transform: none; outline-offset: -2px; }
`;

export type GiftRecipient = { name: string; image: string };

export function GiftDrawer({ recipient, onClose, onProfile, onHearts, onTea, onCrown }: {
  recipient: GiftRecipient | null; onClose: () => void; onProfile: () => void; onHearts: () => void; onTea: (recipient: GiftRecipient) => void; onCrown: (recipient: GiftRecipient) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    setSelected(null);
    if (!recipient) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && !event.defaultPrevented && !document.querySelector('[role="dialog"][data-state="open"]')) onClose(); };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [recipient, onClose]);
  if (!recipient) return null;
  return <>
    <style>{giftLayoutStyles}</style>
    <header className="gift-recipient-bar">
      <Button variant="reference" size="reference" className="gift-profile-trigger" onClick={onProfile} aria-label="Kullanıcı profilini aç"><UserRound /></Button>
      <div className="gift-recipient-name"><span>hediye gönder</span><strong>{recipient.name}</strong></div>
      <Button variant="reference" size="reference" className="gift-add-hearts" onClick={onHearts} aria-label="Kalp ekle"><Plus /></Button>
    </header>
    <section className="gift-drawer" aria-label={`${recipient.name} için hediyeler`}>
      <div className="gift-drawer-scroll" key={recipient.name}>
        <div className="gift-reference-grid">
          {referenceGifts.map((gift, index) => <Button variant="reference" size="reference" className={`gift-reference-item${selected === gift.id ? " gift-selected" : ""}`} key={gift.id}
            aria-label={gift.id === "gift-039" ? "Çay hədiyyəsi göndər" : gift.id === "gift-001" ? "Tac hədiyyəsi göndər" : gift.locked ? `Kilitli hediye ${index + 1}` : `Hediye ${index + 1}`} aria-disabled={gift.locked} aria-pressed={selected === gift.id}
            onClick={() => { if (!gift.locked) { setSelected(gift.id); if (gift.id === "gift-039") onTea(recipient); if (gift.id === "gift-001") onCrown(recipient); } }}>
            <img className="gift-reference-art" src={gift.image} alt="" draggable={false} loading={index > 19 ? "lazy" : "eager"} />
            <span className="gift-reference-price">{gift.locked ? <LockKeyhole aria-hidden="true" /> : <><img src={heartAsset.url} alt="kalp" />{gift.price}</>}</span>
          </Button>)}
        </div>
      </div>
      <Button variant="reference" size="reference" className="gift-drawer-close" onClick={onClose} aria-label="Hediyeleri kapat"><X /></Button>
    </section>
  </>;
}
