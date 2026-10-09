import * as Dialog from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import kiss from "@/assets/booster-passionate-kiss-reference.png.asset.json";
import slap from "@/assets/booster-slap-reference.png.asset.json";
import doublePoints from "@/assets/booster-double-points-reference.png.asset.json";
import increasedLimit from "@/assets/booster-increased-limit-reference.png.asset.json";
import bonus from "@/assets/booster-bonus-reference.png.asset.json";
import statStar from "@/assets/booster-stat-star-v2.png.asset.json";

const choiceBoosters = [
  { id: "kiss", image: kiss.url, title: "Ehtiraslı öpüş", description: "Masanın ortasında ehtiraslı öpüş və 1 liqa xalı (limit daxilində)." },
  { id: "slap", image: slap.url, title: "Üzə şillə", description: "Masanın ortasında şillə və 1 liqa xalı (limit daxilində)." },
];
const leagueBoosters = [
  { id: "double", image: doublePoints.url, title: "Liqa xallarını ikiqat artırma", description: "Aldığınız hər öpüş üçün ikiqat xal (hədiyyə kimi aldığınız öpüşlər istisna olmaqla). Müddət: 5 dəqiqə." },
  { id: "limit", image: increasedLimit.url, title: "Liqa limitini artırma", description: "Cari yarışda alınan öpüşlərin xal limiti 10 xal artır." },
  { id: "bonus", image: bonus.url, title: "Əlavə liqa xalları", description: "Heç bir limitdən asılı olmayaraq dərhal 5 əlavə xal qazanın." },
];

function SectionTitle({ children }: { children: string }) {
  return <h2 className="boosters-section-title">{children}</h2>;
}

type Booster = (typeof choiceBoosters)[number];
const leagueStatistics: Record<string, { label: string; value: number }> = {
  double: { label: "Limitə çatana qədər:", value: 487 },
  limit: { label: "Alınan öpüşlərin limiti:", value: 500 },
  bonus: { label: "Toplanan xallar:", value: 20 },
};

function Inventory({ items, onSelect }: { items: Booster[]; onSelect: (item: Booster, trigger: HTMLButtonElement) => void }) {
  return <>{items.map((item) => <Button key={item.id} variant="reference" size="reference" className="booster-inventory-item" aria-label={`${item.title}: 0`} title={item.title} onClick={(event) => onSelect(item, event.currentTarget)}>
    <img className="booster-art" src={item.image} alt={item.title} draggable={false} />
    <span className="booster-count">0</span>
  </Button>)}</>;
}

function Descriptions({ items, league = false }: { items: typeof choiceBoosters; league?: boolean }) {
  return <>{items.map((item) => <div key={item.id} className={`booster-description${league ? " booster-description-league" : ""}`}>
    <img className="booster-art" src={item.image} alt="" draggable={false} />
    <div><h3>{item.title}</h3><p>{item.description}</p></div>
  </div>)}</>;
}

export function BoostersPopup({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [selected, setSelected] = useState<Booster | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const detailTrigger = useRef<HTMLButtonElement>(null);
  const selectBooster = (item: Booster, trigger: HTMLButtonElement) => {
    detailTrigger.current = trigger;
    setSelected(item);
    setDetailOpen(true);
  };
  const statistic = selected ? leagueStatistics[selected.id] : undefined;
  const helpButton = useRef<HTMLButtonElement>(null);
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="heart-shop-backdrop boosters-backdrop" />
      <Dialog.Content className="heart-shop boosters-popup" aria-describedby={undefined}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onInteractOutside={(event) => { if (helpOpen || detailOpen) event.preventDefault(); }}
        onEscapeKeyDown={(event) => { if (helpOpen || detailOpen) event.preventDefault(); }}
        onCloseAutoFocus={(event) => { event.preventDefault(); document.querySelector<HTMLButtonElement>(".menu-control")?.focus({ preventScroll: true }); }}>
        <div className="boosters-surface">
          <Dialog.Title className="boosters-title">Gücləndiricilər</Dialog.Title>
          <Button ref={helpButton} variant="reference" size="reference" className="boosters-help" aria-label="Gücləndiricilər haqqında" title="Gücləndiricilər haqqında" onClick={() => setHelpOpen(true)}>?</Button>
          <p className="boosters-intro">Bütün mövcud gücləndiricilər və onların sayı sizin ixtiyarınızdadır</p>
          <SectionTitle>Seçim gücləndiriciləri</SectionTitle>
          <div className="boosters-grid"><Inventory items={choiceBoosters} onSelect={selectBooster} /></div>
          <SectionTitle>Liqa gücləndiriciləri</SectionTitle>
          <div className="boosters-grid boosters-grid-league"><Inventory items={leagueBoosters} onSelect={selectBooster} /></div>
        </div>
        <Dialog.Close asChild><Button variant="reference" size="reference" className="settings-close" aria-label="Gücləndiriciləri bağla" title="Bağla"><X strokeWidth={2.5} /></Button></Dialog.Close>
        <Dialog.Root open={helpOpen} onOpenChange={setHelpOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="heart-shop-backdrop boosters-help-backdrop" />
            <Dialog.Content className="heart-shop boosters-popup boosters-help-popup" aria-describedby={undefined}
              onOpenAutoFocus={(event) => event.preventDefault()}
              onCloseAutoFocus={(event) => { event.preventDefault(); helpButton.current?.focus({ preventScroll: true }); }}>
              <div className="boosters-help-surface">
                <Dialog.Title className="boosters-title">Gücləndiricilər nədir?</Dialog.Title>
                <div className="boosters-help-scroll" tabIndex={0}>
                  <p className="boosters-intro">Mövsüm keçidində gücləndiricilər toplayın və onların təsirlərindən faydalanmaq üçün liqalarda qalib gəlin</p>
                  <SectionTitle>Seçim gücləndiriciləri</SectionTitle>
                  <p className="booster-section-description">Emosiyalarınızı daha canlı ifadə etmək üçün “İmtina et” və ya “Öp” seçdikdən dərhal sonra oyun masasında istifadə olunur:</p>
                  <Descriptions items={choiceBoosters} />
                  <SectionTitle>Liqa gücləndiriciləri</SectionTitle>
                  <p className="booster-section-description">Daha çox xal qazanmaq və daha yüksək pilləyə çatmaq üçün liqa iştirakçılarının sıralamasında aktivləşdirilir:</p>
                  <Descriptions items={leagueBoosters} league />
                </div>
              </div>
              <Dialog.Close asChild><Button variant="reference" size="reference" className="settings-close" aria-label="Gücləndirici açıqlamasını bağla" title="Bağla"><X strokeWidth={2.5} /></Button></Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root open={detailOpen} onOpenChange={setDetailOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="heart-shop-backdrop boosters-help-backdrop" />
            <Dialog.Content className="heart-shop boosters-popup booster-detail-popup" aria-describedby="booster-detail-description"
              onOpenAutoFocus={(event) => event.preventDefault()}
              onCloseAutoFocus={(event) => { event.preventDefault(); detailTrigger.current?.focus({ preventScroll: true }); }}>
              {selected && <div className={`booster-detail-surface${statistic ? " booster-detail-league" : ""}`}>
                <Dialog.Title className="boosters-title">{selected.title}</Dialog.Title>
                <div className="booster-detail-art">
                  <img className="booster-art" src={selected.image} alt={selected.title} draggable={false} />
                  <span className="booster-count">0</span>
                </div>
                <Dialog.Description id="booster-detail-description" className="booster-detail-description">{selected.description}</Dialog.Description>
                {statistic ? <>
                  <div className="booster-detail-stat"><span>{statistic.label}</span><img src={statStar.url} alt="" /><span>{statistic.value}</span></div>
                  <Button variant="reference" size="reference" className="booster-activate" disabled>Aktivləşdir</Button>
                </> : <p className="booster-detail-note">Seçim zamanı aktivləşdirin: öp və ya imtina et</p>}
              </div>}
              <Dialog.Close asChild><Button variant="reference" size="reference" className="settings-close" aria-label="Gücləndirici təfərrüatını bağla" title="Bağla"><X strokeWidth={2.5} /></Button></Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}