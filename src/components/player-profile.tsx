import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { ChevronDown, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GiftRecipient } from "./gift-drawer";
import photo from "@/assets/profile-clean-photo.png.asset.json";
import admirer from "@/assets/profile-admirer.png.asset.json";
import kiss from "@/assets/profile-kiss.png.asset.json";
import note from "@/assets/profile-note.png.asset.json";
import heart from "@/assets/profile-heart.png.asset.json";
import hearts from "@/assets/profile-hearts.png.asset.json";
import smile from "@/assets/profile-smile.png.asset.json";
import action0 from "@/assets/profile-action-0.png.asset.json";
import action1 from "@/assets/profile-action-1.png.asset.json";
import action2 from "@/assets/profile-action-2.png.asset.json";
import action3 from "@/assets/profile-action-3.png.asset.json";
import action4 from "@/assets/profile-action-4.png.asset.json";

export function PlayerProfile({ open, recipient, onOpenChange, onGifts }: {
  open: boolean; recipient: GiftRecipient | null; onOpenChange: (open: boolean) => void; onGifts: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  useEffect(() => { if (open) { setExpanded(false); setLiked(false); } }, [open, recipient]);
  const actions = [action0, action1, action2, action3, action4];
  const labels = ["Oyuncu bilgileri", "Sosyal profil", "Hediyeler", "Rozetler", "Mesaj"];
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal><Dialog.Overlay className="player-profile-backdrop" />
      <Dialog.Content className={`player-profile${expanded ? " profile-expanded" : ""}`} aria-describedby={undefined} onOpenAutoFocus={(event) => event.preventDefault()}>
        <div className="player-profile-surface">
          <div className="player-profile-photo"><img src={photo.url} alt="Videodaki örnek profil fotoğrafı" />
            <div className="player-profile-photo-caption"><span aria-hidden="true">♑</span><Dialog.Title>{recipient?.name ?? "Doğan, 34"}</Dialog.Title><Info aria-label="Profil bilgileri" /></div>
          </div>
          <div className="player-profile-details">
            <div className="profile-stat profile-stat-kiss"><img src={kiss.url} alt="Öpücük" /><strong>56 624</strong></div>
            <div className="profile-stat profile-stat-music"><img src={note.url} alt="Müzik" /><strong>774</strong></div>
            <div className="profile-extra-stats" aria-hidden={!expanded}><div>
              <div className="profile-stat profile-stat-heart"><img src={heart.url} alt="Kalp" /><strong>30</strong></div>
              <div className="profile-stat profile-stat-heart"><img src={hearts.url} alt="Çift kalp" /><strong>8</strong></div>
            </div></div>
            <div className="profile-stat profile-stat-smile"><img src={smile.url} alt="Gülümseme" /><strong>191</strong></div>
            <div className="profile-expand-divider"><Button variant="reference" size="reference" aria-label="Profil istatistiklerini aç veya kapat" aria-expanded={expanded} className="profile-expand-arrow" onClick={() => setExpanded(!expanded)}><ChevronDown /></Button></div>
            <div className="profile-admirer"><img className="profile-admirer-photo" src={admirer.url} alt="Наташка" /><div><p>Beğenen <strong>Наташка</strong></p><div className="profile-admirer-count"><img src={heart.url} alt="kalp" /><b>{liked ? 32 : 31}</b></div><Button variant="reference" size="reference" className="profile-like-button" aria-pressed={liked} onClick={() => setLiked(!liked)}>{liked ? "Beğenildi" : "Beğen"}</Button></div></div>
            <div className="profile-action-row">{actions.map((asset, index) => <Button key={labels[index]} variant="reference" size="reference" className="profile-action-button" aria-label={labels[index]} onClick={() => { if (index === 2) { onOpenChange(false); onGifts(); } }}><img src={asset.url} alt="" /></Button>)}</div>
          </div>
        </div>
        <Dialog.Close asChild><Button variant="reference" size="reference" className="player-profile-close" aria-label="Profili kapat"><X /></Button></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}