import * as Dialog from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VipPopup } from "@/components/vip-popup";
import type { GiftRecipient } from "@/components/gift-drawer";
import kick from "@/assets/kick-save-icon.png.asset.json";
import timer from "@/assets/kick-save-timer.png.asset.json";
import vip from "@/assets/kick-save-vip.png.asset.json";
import photo from "@/assets/profile-clean-photo.png.asset.json";

export function KickSavePopup({ open, onOpenChange, recipient, onReturnFocus }: {
  open: boolean; onOpenChange: (open: boolean) => void; recipient: GiftRecipient | null; onReturnFocus: () => void;
}) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [vipOpen, setVipOpen] = useState(false);
  const helpTrigger = useRef<HTMLButtonElement>(null);
  const vipTrigger = useRef<HTMLButtonElement>(null);
  const nestedOpen = helpOpen || vipOpen;
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="heart-shop-backdrop kick-save-backdrop" />
      <Dialog.Content className="heart-shop kick-save-popup" aria-describedby="kick-save-description"
        onOpenAutoFocus={event => event.preventDefault()}
        onInteractOutside={event => { if (nestedOpen) event.preventDefault(); }}
        onEscapeKeyDown={event => { if (nestedOpen) event.preventDefault(); }}
        onCloseAutoFocus={event => { event.preventDefault(); onReturnFocus(); }}>
        <div className="kick-save-surface">
          <Dialog.Title className="kick-save-title">Qovmaq və qorumaq</Dialog.Title>
          <Button ref={helpTrigger} variant="reference" size="reference" className="kick-save-question" aria-label="Qovmaq və qorumaq haqqında" title="Qovmaq və qorumaq haqqında" onClick={() => setHelpOpen(true)}>?</Button>
          <div className="kick-save-target"><div className="kick-save-avatar"><img src={photo.url} alt="" /><img className="kick-save-avatar-icon" src={kick.url} alt="" /></div>
            <Dialog.Description id="kick-save-description"><span className="kick-save-player">{recipient?.name ?? "Oyunçu"}</span> adlı oyunçunu qovmaq istəyirsiniz? O, <b>30 saniyə</b> sonra masadan çıxacaq və <b>15 dəqiqə</b> geri qayıda bilməyəcək.</Dialog.Description>
          </div>
          <p className="kick-save-warning">DİQQƏT! Kimsə oyunçunu qoruyarsa, qovma baş tutmayacaq.</p>
          <div className="kick-save-meter" aria-hidden="true"><img src={kick.url} alt="" /><span /><Check /></div>
          <p className="kick-save-vip-note">Bu seçimdən istifadə etmək üçün “Ətraflı” seçin və <b>VIP statusunuzu</b> aktivləşdirin.</p>
          <div className="kick-save-buttons"><Dialog.Close asChild><Button variant="reference" size="reference" className="kick-save-cancel">Ləğv et</Button></Dialog.Close><Button ref={vipTrigger} variant="reference" size="reference" className="kick-save-details" onClick={() => setVipOpen(true)}>Ətraflı</Button></div>
        </div>
        <Dialog.Close asChild><Button variant="reference" size="reference" className="heart-shop-close kick-save-close" aria-label="Qovmaq və qorumaq pəncərəsini bağla"><X /></Button></Dialog.Close>
        <Dialog.Root open={helpOpen} onOpenChange={setHelpOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="heart-shop-backdrop kick-save-help-backdrop" />
            <Dialog.Content className="heart-shop kick-save-popup kick-save-help-popup" aria-describedby={undefined}
              onOpenAutoFocus={event => event.preventDefault()}
              onCloseAutoFocus={event => { event.preventDefault(); helpTrigger.current?.focus({ preventScroll: true }); }}>
              <div className="kick-save-surface kick-save-help-surface">
                <Dialog.Title className="kick-save-title">Qovmaq və qorumaq nədir?</Dialog.Title>
                <div className="kick-save-help-scroll">
                  <div className="kick-save-help-row"><img src={kick.url} alt="" /><p><b>“Qovmaq və qorumaq”</b> — oyunçunu masadan qovmağa, özünüzü və ya başqasını qovulmaqdan qorumağa imkan verən funksiyalardır. İstifadə zamanı taymer başlayır. Taymer bitənədək təkrar istifadə üçün ürəklər tələb olunur.</p></div>
                  <div className="kick-save-help-row"><img src={timer.url} alt="" /><p>Qovma <b>30 saniyə</b> sonra qüvvəyə minir və oyunçunu masadan <b>15 dəqiqəlik</b> uzaqlaşdırır.</p></div>
                  <div className="kick-save-help-row"><img src={vip.url} alt="" /><p>Hər kəs özünü qovulmaqdan qoruya bilər, lakin yalnız <b>VIP oyunçular</b> başqalarını qova və ya qovulmaqdan qoruya bilər. VIP oyunçular hər iki seçimdən iki dəfə daha tez pulsuz istifadə edə bilərlər.</p></div>
                  <Dialog.Close asChild><Button variant="reference" size="reference" className="kick-save-alright">Oldu</Button></Dialog.Close>
                </div>
              </div>
              <Dialog.Close asChild><Button variant="reference" size="reference" className="heart-shop-close kick-save-close" aria-label="Qovmaq və qorumaq izahını bağla"><X /></Button></Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <VipPopup open={vipOpen} onOpenChange={setVipOpen} layerClassName="kick-save-vip" onReturnFocus={() => vipTrigger.current?.focus({ preventScroll: true })} />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}