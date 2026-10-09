import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import sound from "@/assets/settings-sound.png.asset.json";
import music from "@/assets/settings-music.png.asset.json";
import invite from "@/assets/settings-invite.png.asset.json";
import friends from "@/assets/settings-friends.png.asset.json";
import contact from "@/assets/settings-contact.png.asset.json";

export function SettingsPopup({ open, onOpenChange, onFriends, onContact }: { open: boolean; onOpenChange: (open: boolean) => void; onFriends: () => void; onContact: () => void }) {
  const [volume, setVolume] = useState(100);
  const [musicEnabled, setMusicEnabled] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="settings-backdrop" />
        <Dialog.Content className="settings-popup" aria-describedby={undefined}
          onCloseAutoFocus={(event) => { event.preventDefault(); if (!document.querySelector('.friends-popup[data-state="open"], .contact-popup[data-state="open"]')) document.querySelector<HTMLButtonElement>(".settings-control")?.focus({ preventScroll: true }); }}>
          <div className="settings-surface">
            <Dialog.Title className="settings-title">Ayarlar</Dialog.Title>
            <div className="settings-rows">
              <div className="settings-row"><img src={sound.url} alt="" /><label htmlFor="settings-volume">Səslər</label><input id="settings-volume" className="settings-volume" aria-label="Səs səviyyəsi" type="range" min={0} max={100} value={volume} onChange={(event) => setVolume(Number(event.target.value))} /></div>
              <div className="settings-row"><img src={music.url} alt="" /><label htmlFor="settings-music">Musiqi</label><Switch.Root id="settings-music" className="settings-switch" checked={musicEnabled} onCheckedChange={setMusicEnabled} aria-label="Musiqi"><Switch.Thumb className="settings-switch-thumb" /></Switch.Root></div>
              <Button variant="reference" size="reference" className="settings-row settings-link"><img src={invite.url} alt="" /><span>Dostları dəvət et</span></Button>
              <Button variant="reference" size="reference" className="settings-row settings-link" onClick={onFriends}><img src={friends.url} alt="" /><span>Dostlarım</span></Button>
              <Button variant="reference" size="reference" className="settings-row settings-link" onClick={onContact}><img src={contact.url} alt="" /><span>Bizimlə əlaqə</span></Button>
            </div>
            <div className="settings-footer"><span aria-hidden="true">▱</span>68554530<br />local</div>
          </div>
          <Dialog.Close asChild><Button variant="reference" size="reference" className="settings-close" aria-label="Ayarları bağla" title="Bağla"><X strokeWidth={2.5} /></Button></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}