import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { achievements, type AchievementProgress } from "@/lib/achievements";
import original from "@/assets/achievements-original.jpg.asset.json";
import colored from "@/assets/achievements-colored.jpg.asset.json";

export function AchievementsPopup({ open, onOpenChange, progress }: { open: boolean; onOpenChange: (open: boolean) => void; progress: AchievementProgress }) {
  const [order, setOrder] = useState<"completed" | "locked">("completed");
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (open) { setOrder("completed"); if (scrollRef.current) scrollRef.current.scrollTop = 0; } }, [open]);
  const total = achievements.reduce((sum, item) => sum + Math.min(item.stars, progress[item.id] ?? 0), 0);
  const sorted = [...achievements].sort((a, b) => {
    const earnedA = (progress[a.id] ?? 0) > 0;
    const earnedB = (progress[b.id] ?? 0) > 0;
    return earnedA === earnedB ? a.index - b.index : order === "completed" ? Number(earnedB) - Number(earnedA) : Number(earnedA) - Number(earnedB);
  });
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="heart-shop-backdrop achievements-backdrop" />
      <Dialog.Content className="heart-shop achievements-popup" aria-describedby={undefined} onOpenAutoFocus={(event) => event.preventDefault()} onCloseAutoFocus={(event) => { event.preventDefault(); document.querySelector<HTMLButtonElement>(".menu-control")?.focus({ preventScroll: true }); }}>
        <div className="achievements-surface">
          <header className="achievements-header">
            <Dialog.Title className="achievements-title">Başarılarım <span className="achievements-counter"><Star aria-hidden="true" />{total}/333</span></Dialog.Title>
            <div className="achievements-sort"><span>Önce göster:</span><div className="achievements-segments" role="group" aria-label="Başarı sıralaması">
              <Button variant="reference" size="reference" className="achievements-segment" aria-pressed={order === "completed"} onClick={() => { setOrder("completed"); scrollRef.current?.scrollTo({ top: 0 }); }}>tamamlandı</Button>
              <Button variant="reference" size="reference" className="achievements-segment" aria-pressed={order === "locked"} onClick={() => { setOrder("locked"); scrollRef.current?.scrollTo({ top: 0 }); }}>kilitli</Button>
            </div></div>
          </header>
          <div ref={scrollRef} className="achievements-scroll" aria-label="Başarı rozetleri" tabIndex={0}>
            <div className="achievements-grid">
              {sorted.map((item) => {
                const earned = progress[item.id] ?? 0;
                const unlocked = earned > 0;
                const restored = unlocked && item.index > 1;
                return <div className={`achievement-medal${unlocked ? " achievement-unlocked" : " achievement-locked"}`} key={item.id} data-achievement-id={item.id} aria-label={`${item.name}, ${unlocked ? "kilidi açık" : "kilitli"}${item.stars ? `, ${earned}/${item.stars} yıldız` : ""}`} title={item.name}>
                  <div className={`achievement-stars achievement-stars-${item.stars}`} aria-hidden="true">{Array.from({ length: item.stars }, (_, index) => <Star key={index} className={index < earned ? "achievement-star-earned" : ""} />)}</div>
                   <div className="achievement-art"><img className={`achievement-sheet achievement-position-${item.index}`} src={restored ? colored.url : original.url} alt="" draggable={false} /></div>
                </div>;
              })}
            </div>
          </div>
        </div>
        <Dialog.Close asChild><Button variant="reference" size="reference" className="achievements-close" aria-label="Başarıları kapat"><X strokeWidth={2.5} /></Button></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}