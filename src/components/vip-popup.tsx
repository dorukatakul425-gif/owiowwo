import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import { Crown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import gifts from "@/assets/vip-benefit-1.png.asset.json";
import chat from "@/assets/vip-benefit-2.png.asset.json";
import bottle from "@/assets/vip-benefit-3.png.asset.json";
import profile from "@/assets/vip-benefit-4.png.asset.json";
import gestures from "@/assets/vip-benefit-5.png.asset.json";
import save from "@/assets/vip-benefit-6.png.asset.json";
import crown from "@/assets/vip-crown.png.asset.json";
import coin from "@/assets/dat-coin.png";

const benefits = [
  { title: "VIP hədiyyələr", image: gifts.url },
  { title: "Çatda smayllar və rənglər", image: chat.url },
  { title: "Xüsusi şüşə", image: bottle.url },
  { title: "Profildə fərqlənmə", image: profile.url },
  { title: "VIP jestlər və jetonlar", image: gestures.url },
  { title: "Qovmaq və qorumaq", image: save.url },
];

export function VipPopup({ open, onOpenChange, layerClassName = "", onReturnFocus }: { open: boolean; onOpenChange: (open: boolean) => void; layerClassName?: string; onReturnFocus?: () => void }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const swipe = useRef<{ id: number; x: number; lastX: number } | null>(null);
  useEffect(() => { if (open) { setSlide(0); setPaused(false); } }, [open]);
  const advance = (dx: number) => {
    if (Math.abs(dx) >= 24) setSlide(value => (value + (dx < 0 ? 1 : benefits.length - 1)) % benefits.length);
    swipe.current = null;
    setDragging(false);
  };
  useEffect(() => {
    if (!open || paused || dragging || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setSlide(value => (value + 1) % benefits.length), 3500);
    return () => window.clearInterval(timer);
  }, [open, paused, dragging, slide]);
  const current = benefits[slide] ?? benefits[0];
  if (!current) return null;
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={`heart-shop-backdrop vip-backdrop ${layerClassName}`} />
      <Dialog.Content className={`heart-shop vip-popup ${layerClassName}`} aria-describedby="vip-description" onOpenAutoFocus={event => event.preventDefault()} onCloseAutoFocus={event => { event.preventDefault(); if (onReturnFocus) onReturnFocus(); else document.querySelector<HTMLButtonElement>(".vip-price")?.focus({ preventScroll: true }); }}>
        <div className="vip-surface">
          <div className="vip-crown-pattern" aria-hidden="true">{Array.from({ length: 15 }, (_, i) => <Crown key={i} />)}</div>
          <Dialog.Title className="vip-title">VIP statusu</Dialog.Title>
          <Dialog.Description id="vip-description" className="vip-description">VIP oyunçular unikal profil və xüsusi hədiyyə dəsti ilə digərlərindən fərqlənirlər.</Dialog.Description>
          <div className="vip-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
            onPointerDown={event => {
              if (!event.isPrimary || event.button !== 0 || (event.target instanceof Element && event.target.closest("button"))) return;
              swipe.current = { id: event.pointerId, x: event.clientX, lastX: event.clientX };
              setDragging(true);
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={event => {
              const start = swipe.current;
              if (start && start.id === event.pointerId) start.lastX = event.clientX;
            }}
            onPointerUp={event => {
              const start = swipe.current;
              if (!start || start.id !== event.pointerId) return;
              if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
              advance(event.clientX - start.x);
            }}
            onPointerCancel={event => {
              const start = swipe.current;
              if (!start || start.id !== event.pointerId) return;
              if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
              advance(start.lastX - start.x);
            }}
            onLostPointerCapture={event => {
              const start = swipe.current;
              if (start && start.id === event.pointerId) advance(start.lastX - start.x);
            }}
            onKeyDown={event => { if (event.key === "ArrowRight") setSlide(value => (value + 1) % benefits.length); if (event.key === "ArrowLeft") setSlide(value => (value + benefits.length - 1) % benefits.length); }}>
            <div key={slide} className="vip-benefit" aria-live="polite"><img src={current.image} alt="" draggable={false} /><h3>{current.title}</h3></div>
            <div className="vip-dots" aria-label="VIP üstünlükləri">{benefits.map((benefit, index) => <Button key={benefit.title} variant="reference" size="reference" className="vip-dot" aria-label={benefit.title} title={benefit.title} aria-pressed={index === slide} onClick={() => setSlide(index)}><span /></Button>)}</div>
          </div>
          <div className="vip-plans">{[{ days: 7, price: 200 }, { days: 30, price: 650 }].map(plan => <div className="vip-plan" key={plan.days}><img className="vip-plan-crown" src={crown.url} alt="" /><span>VIP {plan.days} gün</span>{plan.days === 7 && <span className="vip-popular">Populyar</span>}<Button variant="reference" size="reference" className="vip-plan-price" aria-label={`VIP ${plan.days} gün, ${plan.price} DAT`} disabled title="VIP alışı hələ aktiv deyil">{plan.price}<img src={coin} alt="DAT" /></Button></div>)}</div>
        </div>
        <Dialog.Close asChild><Button variant="reference" size="reference" className="heart-shop-close vip-close" aria-label="VIP pəncərəsini bağla"><X strokeWidth={3} /></Button></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}