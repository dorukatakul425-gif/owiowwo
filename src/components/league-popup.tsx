import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import iron from "@/assets/league-iron.png.asset.json";
import rules from "@/assets/league-rules.png.asset.json";
import promote from "@/assets/league-promote.png.asset.json";
import demote from "@/assets/league-demote.png.asset.json";
import gift from "@/assets/league-gift.png.asset.json";
import kiss from "@/assets/league-kiss.png.asset.json";
import music from "@/assets/league-music.png.asset.json";
import admire from "@/assets/league-admire.png.asset.json";

const pointItems = [
  { image: gift.url, text: "hədiyyələr" },
  { image: kiss.url, text: "alınan öpüşlər" },
  { image: music.url, text: "çalınan musiqi" },
  { image: admire.url, text: "heyranlıq" },
];

export function LeaguePopup({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [page, setPage] = useState<number | null>(null);
  const changeOpen = (value: boolean) => {
    onOpenChange(value);
    if (value) setPage(null);
  };
  const isRules = page !== null;
  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="league-backdrop" />
        <Dialog.Content className={`league-popup${isRules ? " league-rules-popup" : ""}`} aria-describedby="league-description"
          onOpenAutoFocus={(event) => { event.preventDefault(); setPage(null); }}
          onCloseAutoFocus={(event) => { event.preventDefault(); document.querySelector<HTMLButtonElement>(".trophy-control")?.focus({ preventScroll: true }); }}>
          {isRules && <div className="league-underlay" aria-hidden="true" />}
          <div className="league-surface">
            <Dialog.Title className="league-title">{isRules ? "Qaydalar" : "Dəmir liqa"}</Dialog.Title>
            {!isRules ? <>
              <Button variant="reference" size="reference" className="league-help" aria-label="Liqa qaydaları" title="Liqa qaydaları" onClick={() => setPage(0)}>?</Button>
              <img className="league-iron-art" src={iron.url} alt="Ulduzlu gümüş kupa" draggable={false} />
              <Dialog.Description id="league-description" className="league-entry-description">Yarışmaya qatılmaq üçün oyunçuya hədiyyə göndərin və ya onu 5 dəfə öpün.</Dialog.Description>
              <Dialog.Close asChild><Button variant="reference" size="reference" className="league-ok">OK</Button></Dialog.Close>
            </> : <>
              <div key={page} className={`league-page league-page-${page}`}>
                {page === 0 && <><img className="league-rule-art" src={rules.url} alt="Hədiyyələr və ürəklərlə gülümsəyən üz" /><Dialog.Description id="league-description" className="league-rule-description"><strong>Liqalar</strong> ürəklər və unikal hədiyyələr qazana biləcəyiniz gündəlik yarışlardır.</Dialog.Description></>}
                {page === 1 && <div id="league-description" className="league-points"><h3>Xal qazandıran fəaliyyətlər:</h3><ul>{pointItems.map((item) => <li key={item.text}><img src={item.image} alt="" /><span>{item.text}</span></li>)}</ul><p>Xərclənən hər ürəyə görə bir xal. Nə qədər çox hədiyyə göndərsəniz, bir o qədər çox xal qazana bilərsiniz.</p></div>}
                {page === 2 && <><img className="league-rule-art" src={promote.url} alt="Yuxarı oxlarla sevinən üz" /><Dialog.Description id="league-description" className="league-rule-description">Qaliblər gün ərzində topladıqları xallara görə müəyyən edilir. Onlar daha yüksək liqaya keçirlər.</Dialog.Description></>}
                {page === 3 && <><img className="league-rule-art" src={demote.url} alt="Aşağı oxlarla kədərli üz" /><Dialog.Description id="league-description" className="league-rule-description">Ən az xal toplayan oyunçular əvvəlki liqaya düşürlər, digərləri isə cari liqada qalırlar.</Dialog.Description></>}
              </div>
              <nav className="league-pagination" aria-label="Qayda səhifələri">
                <Button variant="reference" size="reference" className="league-arrow league-arrow-back" disabled={page === 0} aria-label="Əvvəlki səhifə" title="Əvvəlki səhifə" onClick={() => setPage(Math.max(0, page - 1))}><svg viewBox="0 0 28 30" aria-hidden="true"><path d="M5 11.5 20 3Q24 1 24 6V24Q24 29 20 27L5 18.5Q0 15 5 11.5Z" /></svg></Button>
                {[0, 1, 2, 3].map((index) => <Button key={index} variant="reference" size="reference" className={`league-dot${page === index ? " league-dot-active" : ""}`} aria-label={`Qaydalar, səhifə ${index + 1}`} aria-current={page === index ? "step" : undefined} title={`Səhifə ${index + 1}`} onClick={() => setPage(index)}><span /></Button>)}
                <Button variant="reference" size="reference" className="league-arrow league-arrow-next" disabled={page === 3} aria-label="Növbəti səhifə" title="Növbəti səhifə" onClick={() => setPage(Math.min(3, page + 1))}><svg viewBox="0 0 28 30" aria-hidden="true"><path d="M5 11.5 20 3Q24 1 24 6V24Q24 29 20 27L5 18.5Q0 15 5 11.5Z" /></svg></Button>
              </nav>
            </>}
          </div>
          <Dialog.Close asChild><Button variant="reference" size="reference" className="league-close" aria-label="Pəncərəni bağla" title="Bağla"><X strokeWidth={2.5} /></Button></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}