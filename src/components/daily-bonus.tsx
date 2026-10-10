import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import claimSound from "@/assets/daily-bonus-claim.m4a.asset.json";

export const dailyBonusDay = 3;
const days = [1, 2, 3, 4, 5];

function HeartBadge({ value }: { value: number }) {
  return (
    <span className="daily-heart" aria-label={`${value} ürək`}>
      <svg viewBox="0 0 32 28" aria-hidden="true"><path d="M16 27 3.6 15.2C-.6 11 .2 4.4 5.4 1.7 9.1-.2 13 1 16 4.3 19-1 22.9-.2 26.6 1.7c5.2 2.7 6 9.3 1.8 13.5Z" /></svg>
      <b>{value}</b>
    </span>
  );
}

export function playBonusSound() {
  if (typeof window === "undefined") return;
  const sound = new Audio(claimSound.url);
  sound.volume = 1;
  void sound.play().catch(() => undefined);
}

export function DailyBonus({ open, onClaim }: { open: boolean; onClaim: (origin: DOMRect | null, amount: number) => void }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => { if (!next) onClaim(null, dailyBonusDay); }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="daily-bonus-backdrop" />
        <DialogPrimitive.Content className="daily-bonus" aria-describedby="daily-bonus-text">
          <div className="daily-bonus-head">
            <DialogPrimitive.Title className="daily-bonus-title">Gündəlik bonus</DialogPrimitive.Title>
            <p id="daily-bonus-text">Bu gün üçün ürək bonusu qazan!<br />Hər gün daha çox bonus<br />qazanmaq üçün hər gün gəl!</p>
          </div>
          <ol className="daily-days">
            {days.map((day) => {
              const state = day < dailyBonusDay ? "done" : day === dailyBonusDay ? "today" : "later";
              return (
                <li className={`daily-day daily-${state}`} key={day}>
                  <span className="daily-check">{state === "done" && <Check strokeWidth={3} />}</span>
                  <span className="daily-label">Gün {day}</span>
                  <HeartBadge value={day} />
                </li>
              );
            })}
          </ol>
          <Button variant="reference" size="reference" className="daily-claim" onClick={(event) => { playBonusSound(); onClaim(event.currentTarget.getBoundingClientRect(), dailyBonusDay); }}>Al</Button>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
