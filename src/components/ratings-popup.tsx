import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRef, useState } from "react";
import { Check, ChevronDown, X, Trophy, Timer, Medal, Sparkles, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatRatingPoints, getRatingPlayers, ratingPeriods, type RatingCategory, type RatingPeriod, type RatingPlayer } from "@/lib/ratings";
import kiss from "@/assets/rating-kiss-reference.png.asset.json";
import music from "@/assets/rating-music-reference.png.asset.json";
import heart from "@/assets/rating-heart-reference.png.asset.json";
import hearts from "@/assets/rating-hearts-reference.png.asset.json";
import smile from "@/assets/rating-smile-reference.png.asset.json";
import avatarDefault from "@/assets/avatar-default.png.asset.json";
import avatar1 from "@/assets/rating-player-1.jpg.asset.json";
import avatar2 from "@/assets/rating-player-2.jpg.asset.json";
import avatar3 from "@/assets/rating-player-3.jpg.asset.json";
import avatar4 from "@/assets/rating-player-4.jpg.asset.json";
import avatar5 from "@/assets/rating-player-5.jpg.asset.json";
import avatar6 from "@/assets/rating-player-6.jpg.asset.json";
import avatar7 from "@/assets/rating-player-7.jpg.asset.json";
import avatar8 from "@/assets/rating-player-8.jpg.asset.json";
import avatar9 from "@/assets/rating-player-9.jpg.asset.json";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9].map(a => a.url);
const categories: { id: RatingCategory; title: string; image: string; description: string }[] = [
  { id: "kiss", title: "Ən çox öpülənlər", image: kiss.url, description: "Aldığınız hər öpüş üçün bir xal qazanırsınız (hədiyyə kimi göndərilən öpüş də daxil olmaqla)." },
  { id: "music", title: "Ən çox musiqi paylaşanlar", image: music.url, description: "Paylaşdığınız musiqilər üzrə xallarınız bu reytinqdə göstərilir." },
  { id: "heart", title: "Ən çox ürək qazananlar", image: heart.url, description: "Qazandığınız ürəklər üzrə xallarınız bu reytinqdə göstərilir." },
  { id: "hearts", title: "Ən çox sevilənlər", image: hearts.url, description: "Bu reytinqdə ən çox sevilən oyunçular göstərilir." },
  { id: "smile", title: "Ən çox gülümsəyənlər", image: smile.url, description: "Bu reytinqdə ən çox gülümsəyən oyunçular göstərilir." },
];

function RatingRow({ player, image, self = false }: { player: RatingPlayer; image: string; self?: boolean }) {
  return <div className={`rating-row${self ? " rating-self-row" : ""}`}>
    <img className="rating-avatar" src={player.avatar} alt={self ? "Sizin şəkliniz" : player.name || `${player.position}`} draggable={false} />
    <div className="rating-row-main"><span className="rating-name"><b>{player.position}.</b> {player.name}</span><span className="rating-score"><img src={image} alt="" draggable={false} />{formatRatingPoints(player.points)}</span></div>
  </div>;
}

export function RatingsPopup({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [category, setCategory] = useState<RatingCategory>("kiss");
  const [period, setPeriod] = useState<RatingPeriod>("all");
  const [helpOpen, setHelpOpen] = useState(false);
  const [periodOpen, setPeriodOpen] = useState(false);
  const helpRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const current = categories.find(item => item.id === category) ?? categories[0];
  if (!current) return null;
  const players = getRatingPlayers(avatars, period, category);
  const resetScroll = () => { if (listRef.current) listRef.current.scrollTop = 0; };
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="heart-shop-backdrop ratings-backdrop" />
      <Dialog.Content className="heart-shop ratings-popup" aria-describedby={undefined}
        onOpenAutoFocus={event => event.preventDefault()}
        onInteractOutside={event => { if (helpOpen || periodOpen) event.preventDefault(); }}
        onEscapeKeyDown={event => { if (helpOpen || periodOpen) event.preventDefault(); }}
        onCloseAutoFocus={event => { event.preventDefault(); document.querySelector<HTMLButtonElement>(".menu-control")?.focus({ preventScroll: true }); }}>
        <div className="ratings-surface">
          <header className="ratings-header">
            <div className="ratings-tabs" role="tablist" aria-label="Reytinq növü">
              <Button ref={helpRef} variant="reference" size="reference" className="ratings-question" aria-label="Reytinq haqqında" title="Reytinq haqqında" onClick={() => setHelpOpen(true)}>?</Button>
              {categories.map(item => <Button key={item.id} variant="reference" size="reference" role="tab" aria-selected={item.id === category} aria-label={item.title} title={item.title} className={`rating-tab${item.id === category ? " selected" : ""}`} onClick={() => { setCategory(item.id); resetScroll(); }}><img src={item.image} alt="" /></Button>)}
            </div>
            <div className="ratings-heading-row">
              <Dialog.Title className="ratings-title">{current.title}</Dialog.Title>
              <DropdownMenu.Root modal={false} open={periodOpen} onOpenChange={setPeriodOpen}>
                <DropdownMenu.Trigger asChild><Button variant="reference" size="reference" className="ratings-period" aria-label="Reytinq dövrü" onPointerDown={event => event.preventDefault()} onClick={() => setPeriodOpen(previous => !previous)}>{ratingPeriods.find(p => p.id === period)?.label}<ChevronDown /></Button></DropdownMenu.Trigger>
                <DropdownMenu.Content className="ratings-period-menu" align="end" sideOffset={4} collisionPadding={20} onCloseAutoFocus={event => event.preventDefault()}>
                  <DropdownMenu.RadioGroup value={period} onValueChange={value => { const chosen = ratingPeriods.find(p => p.id === value); if (chosen) { setPeriod(chosen.id); resetScroll(); } }}>
                    {ratingPeriods.map(item => <DropdownMenu.RadioItem key={item.id} value={item.id} className="ratings-period-option">{item.label}<DropdownMenu.ItemIndicator><Check /></DropdownMenu.ItemIndicator></DropdownMenu.RadioItem>)}
                  </DropdownMenu.RadioGroup>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </header>
          <div className="ratings-list" ref={listRef} tabIndex={0} aria-label="Oyunçuların sıralaması">
            <div className="ratings-pattern" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => { const Icon = [Trophy, Timer, Medal, Sparkles, Music][i % 5] ?? Trophy; return <Icon key={i} />; })}</div>
            <ol>{players.map(player => <li key={player.id}><RatingRow player={player} image={current.image} /></li>)}</ol>
          </div>
          <footer className="ratings-self" aria-label="Sizin reytinqiniz"><RatingRow self player={{ id: "self", name: "user_68554530", avatar: avatarDefault.url, position: 1038, points: 123 }} image={current.image} /></footer>
        </div>
        <Dialog.Close asChild><Button variant="reference" size="reference" className="friends-close ratings-close" aria-label="Reytinqləri bağla" title="Bağla"><X /></Button></Dialog.Close>
        <Dialog.Root open={helpOpen} onOpenChange={setHelpOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="heart-shop-backdrop ratings-help-backdrop" />
            <Dialog.Content className="heart-shop ratings-help-popup" aria-describedby="ratings-help-description" onOpenAutoFocus={event => event.preventDefault()} onCloseAutoFocus={event => { event.preventDefault(); helpRef.current?.focus({ preventScroll: true }); }}>
              <div className="ratings-help-surface">
                <Dialog.Title className="ratings-help-title">{current.title} reytinqi</Dialog.Title>
                <Dialog.Description id="ratings-help-description">{current.description}</Dialog.Description>
                <p>Xallarınız nə qədər çox olsa, mövqeyiniz bir o qədər yüksək olar. İlk on oyunçunun profilləri TOP nişanları ilə işarələnir.</p>
                <Dialog.Close asChild><Button variant="reference" size="reference" className="ratings-alright">Aydındır</Button></Dialog.Close>
              </div>
              <Dialog.Close asChild><Button variant="reference" size="reference" className="friends-close" aria-label="Reytinq açıqlamasını bağla" title="Bağla"><X /></Button></Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}