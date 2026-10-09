import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactPopup({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="heart-shop-backdrop contact-backdrop" />
        <Dialog.Content className="heart-shop contact-popup" aria-describedby={undefined}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            document.querySelector<HTMLButtonElement>(".settings-control")?.focus({ preventScroll: true });
          }}>
          <div className="contact-surface">
            <Dialog.Title className="contact-title">Bizimlə əlaqə</Dialog.Title>
            <Button asChild variant="reference" size="reference" className="contact-email">
              <a href="mailto:dorukatakul425@gmail.com"><span className="contact-envelope" aria-hidden="true">📩</span><span>E-poçt göndər</span></a>
            </Button>
          </div>
          <Dialog.Close asChild><Button variant="reference" size="reference" className="settings-close" aria-label="Əlaqə pəncərəsini bağla" title="Bağla"><X strokeWidth={2.5} /></Button></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}