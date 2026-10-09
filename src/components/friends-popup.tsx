import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type FriendsVisibility = "everyone" | "only-me";

export function FriendsPopup({ open, onOpenChange, visibility, onVisibilityChange }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visibility: FriendsVisibility;
  onVisibilityChange: (value: FriendsVisibility) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="heart-shop-backdrop friends-backdrop" />
        <Dialog.Content className="heart-shop friends-popup" aria-describedby={undefined}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            document.querySelector<HTMLButtonElement>(".settings-control")?.focus({ preventScroll: true });
          }}>
          <div className="friends-surface">
            <Dialog.Title className="friends-title">Dostlar siyahısı</Dialog.Title>
            <div className="friends-privacy">
              <p id="friends-visibility-label">Dostluğumu kimlər görsün?</p>
              <RadioGroup.Root className="friends-options" value={visibility} aria-labelledby="friends-visibility-label"
                onValueChange={(value) => { if (value === "everyone" || value === "only-me") onVisibilityChange(value); }}>
                <label className="friends-option" htmlFor="friends-everyone">
                  <RadioGroup.Item id="friends-everyone" className="friends-radio" value="everyone"><RadioGroup.Indicator className="friends-radio-dot" /></RadioGroup.Item>
                  <span>Hər kəs</span>
                </label>
                <label className="friends-option" htmlFor="friends-only-me">
                  <RadioGroup.Item id="friends-only-me" className="friends-radio" value="only-me"><RadioGroup.Indicator className="friends-radio-dot" /></RadioGroup.Item>
                  <span>Yalnız mən</span>
                </label>
              </RadioGroup.Root>
            </div>
            <p className="friends-empty">Hələ dost yoxdur.</p>
          </div>
          <Dialog.Close asChild><Button variant="reference" size="reference" className="friends-close" aria-label="Dostlar siyahısını bağla" title="Bağla"><X strokeWidth={2.5} /></Button></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}