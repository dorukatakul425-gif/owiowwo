import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { OpeningScreen } from "@/components/opening-screen";
import { useChatViewport } from "@/hooks/use-chat-viewport";
import { Button } from "@/components/ui/button";
import { HeartShop } from "@/components/heart-shop";
import { LeaguePopup } from "@/components/league-popup";
import { GameMenu } from "@/components/game-menu";
import { BottleChooser } from "@/components/bottle-chooser";
import { AppearancePopup } from "@/components/appearance-popup";
import { appearanceChoices, type AppearanceChoice } from "@/lib/appearance";
import type { BottleChoice } from "@/lib/bottles";
import { AchievementsPopup } from "@/components/achievements-popup";
import { initialAchievementProgress, updateAchievementProgress } from "@/lib/achievements";
import { SettingsPopup } from "@/components/settings-popup";
import { FriendsPopup, type FriendsVisibility } from "@/components/friends-popup";
import { ContactPopup } from "@/components/contact-popup";
import { BoostersPopup } from "@/components/boosters-popup";
import { RatingsPopup } from "@/components/ratings-popup";
import { VideoMusicPopup } from "@/components/video-music-popup";
import { ChatMusicPlayer } from "@/components/chat-music-player";
import { GiftDrawer, type GiftRecipient } from "@/components/gift-drawer";
import { PlayerProfile } from "@/components/player-profile";
import { DailyBonus } from "@/components/daily-bonus";
import { GameRoundStage } from "@/components/game-round-stage";
import { TeaGiftFlight, type TeaDelivery } from "@/components/tea-gift-flight";
import { prepareTeaAudio, playTeaSound } from "@/lib/tea-audio";
import { CrownGiftFlight, type CrownDelivery } from "@/components/crown-gift-flight";
import { TomatoGiftFlight, type TomatoDelivery } from "@/components/tomato-gift-flight";
import { prepareGiftAudio, playGiftSound } from "@/lib/gift-audio";
import type { YouTubeTrack } from "@/lib/youtube.types";
const woodAsset = "/game-assets/current/wood-sharp.jpg";
const heartAsset = "/game-assets/current/heart.png";
const trophyAsset = "/game-assets/current/trophy.png";
const settingsAsset = "/game-assets/current/settings.png";
const exitAsset = "/game-assets/current/exit.png";
const countAsset = "/game-assets/current/count.png";
const avatarDefaultAsset = "/game-assets/current/avatar-default.png";
const wolfAvatar = "/game-assets/current/wolf-avatar.png";
const avatarWomanAsset = "/game-assets/current/avatar-woman.png";
const avatarQuietAsset = "/game-assets/current/avatar-quiet.png";
const natalyaAsset = "/game-assets/current/player-natalya.webp";
const egorAsset = "/game-assets/current/player-egor.webp";
const mishaAsset = "/game-assets/current/player-misha.webp";
const anastasiaAsset = "/game-assets/current/player-anastasia.webp";
const sergeyAsset = "/game-assets/current/player-sergey.webp";
const ekaterinaAsset = "/game-assets/current/player-ekaterina.webp";
const timurAsset = "/game-assets/current/player-timur.webp";
const lizaAsset = "/game-assets/current/player-liza.webp";
const lenyaAsset = "/game-assets/current/player-lenya.webp";
const bottleAsset = "/game-assets/current/bottle.png";
const videoAsset = "/game-assets/current/video.png";
const musicAsset = "/game-assets/current/music.png";
const puzzleAsset = "/game-assets/current/puzzle.png";
const giftAsset = "/game-assets/current/gift.png";
const sendAsset = "/game-assets/current/send.png";
export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({ meta: [
    { title: "Spin Bottle — Table 1004" },
    { name: "description", content: "Spin Bottle wooden game table and chat." },
    { property: "og:title", content: "Spin Bottle — Table 1004" },
    { property: "og:description", content: "Spin Bottle wooden game table and chat." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});

const tablePlayers = [
  { name: "user_68554, 19", image: wolfAvatar },
  { name: "Наталья", image: natalyaAsset },
  { name: "Егор", image: egorAsset },
  { name: "👑ZLyKA👑", image: avatarWomanAsset },
  { name: "Миша", image: mishaAsset },
  { name: "Анастасия", image: anastasiaAsset },
  { name: "Сергей", image: sergeyAsset },
  { name: "Екатерина", image: ekaterinaAsset },
  { name: "Тимур", image: timurAsset },
  { name: "Лиза", image: lizaAsset },
  { name: "Лёня", image: lenyaAsset },
  { name: "☞Quiet ☜", image: avatarQuietAsset },
];

type ChatMessage = { kind: "text" | "music"; name: string; color?: "blue" | "pink" | "sky"; avatar: string; text: string; translate?: boolean };
const seedMessages: ChatMessage[] = [
  { kind: "text", name: "Amelia", color: "pink", avatar: avatarWomanAsset, text: "Miraç, eminmisin onun olduğuna" },
  { kind: "text", name: "ФУАД", color: "sky", avatar: anastasiaAsset, text: "Gülü, .", translate: true },
  { kind: "text", name: "Miraç", color: "blue", avatar: egorAsset, text: "Amelia, yaww bu mal eskiden de hep bunu bize yaprdı" },
  { kind: "text", name: "Miraç", color: "blue", avatar: egorAsset, text: "bunun kanını bilirim kanını" },
  { kind: "text", name: "Amelia", color: "pink", avatar: avatarWomanAsset, text: "Miraç, ben tanımam" },
  { kind: "text", name: "Miraç", color: "blue", avatar: egorAsset, text: "Amelia, arkdasım diyon ???" },
];

function Index() {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { appRef, scrollRef, inputRef } = useChatViewport();
  const [opening, setOpening] = useState(true);
  const [dailyOpen, setDailyOpen] = useState(false);
  const [bonusHearts, setBonusHearts] = useState(0);
  const [flight, setFlight] = useState<{ id: number; x: number; y: number; dx: number; dy: number; amount: number } | null>(null);
  const [heartBump, setHeartBump] = useState(0);
  const finishOpening = useCallback(() => { setOpening(false); setDailyOpen(true); }, []);
  const claimBonus = (claimOrigin: DOMRect | null, amount: number) => {
    setDailyOpen(false);
    let origin = claimOrigin;
    const target = document.querySelector(".heart-control")?.getBoundingClientRect();
    const bottleRect = document.querySelector(".round-bottle")?.getBoundingClientRect();
    if (bottleRect && bottleRect.width) origin = new DOMRect(bottleRect.left + bottleRect.width * 0.3, bottleRect.top + bottleRect.height * 0.05, 0, 0);
    if (!claimOrigin || !origin || !target) { setBonusHearts((value) => value + amount); return; }
    const x = origin.left + origin.width / 2; const y = origin.top + origin.height / 2;
    setFlight({ id: Date.now(), x, y, dx: target.left + target.width / 2 - x, dy: target.top + target.height / 2 - y, amount });
  };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages);
  const [kissHearts, setKissHearts] = useState(0);
  const [bottleChooserOpen, setBottleChooserOpen] = useState(false);
  const [chosenBottle, setChosenBottle] = useState<BottleChoice | null>(null);
  const closeBottles = useCallback(() => {
    setBottleChooserOpen(false);
    document.querySelector<HTMLButtonElement>(".menu-control")?.focus({ preventScroll: true });
  }, []);
  const [active, setActive] = useState<string | null>(null);
  const [heartShopOpen, setHeartShopOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [appliedAppearance, setAppliedAppearance] = useState<AppearanceChoice | null>(() => appearanceChoices.find((choice) => choice.id === 31) ?? null);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [achievementProgress, setAchievementProgress] = useState(initialAchievementProgress);
  useEffect(() => {
    const update = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      const detail: unknown = event.detail;
      if (!detail || typeof detail !== "object" || !("id" in detail) || !("earned" in detail) || typeof detail.id !== "string" || typeof detail.earned !== "number") return;
      const { id, earned } = detail;
      setAchievementProgress((previous) => updateAchievementProgress(previous, id, earned));
    };
    window.addEventListener("game:achievement-progress", update);
    return () => window.removeEventListener("game:achievement-progress", update);
  }, []);
  const [leagueOpen, setLeagueOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [boostersOpen, setBoostersOpen] = useState(false);
  const [ratingsOpen, setRatingsOpen] = useState(false);
  const [friendsVisibility, setFriendsVisibility] = useState<FriendsVisibility>("everyone");
  const [videoMusicOpen, setVideoMusicOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<YouTubeTrack | null>(null);
  const [recentTracks, setRecentTracks] = useState<YouTubeTrack[]>([]);
  const [giftRecipient, setGiftRecipient] = useState<GiftRecipient | null>(null);
  const [teaDeliveries, setTeaDeliveries] = useState<TeaDelivery[]>([]);
  const [crownDeliveries, setCrownDeliveries] = useState<CrownDelivery[]>([]);
  const [tomatoDeliveries, setTomatoDeliveries] = useState<TomatoDelivery[]>([]);
  const crownSequence = useRef(0);
  const sendCrown = (recipient: GiftRecipient) => {
    const sender = tablePlayers[0];
    if (!sender) return;
    prepareGiftAudio("crown");
    void playGiftSound("crown", "send");
    crownSequence.current += 1;
    setCrownDeliveries(previous => [...previous.filter(item => item.recipient !== recipient.name), { id: crownSequence.current, recipient: recipient.name, sender: sender.name }]);
  };
  const tomatoSequence = useRef(0);
  const sendTomato = (recipient: GiftRecipient) => {
    const sender = tablePlayers[0];
    if (!sender) return;
    prepareGiftAudio("tomato");
    void playGiftSound("tomato", "send");
    tomatoSequence.current += 1;
    setTomatoDeliveries(previous => [...previous.filter(item => item.recipient !== recipient.name), { id: tomatoSequence.current, sender: sender.name, recipient: recipient.name }]);
  };
  const teaSequence = useRef(0);
  const sendTea = (recipient: GiftRecipient) => {
    const sender = tablePlayers[0];
    if (!sender) return;
    prepareTeaAudio();
    void playTeaSound("send");
    teaSequence.current += 1;
    setTeaDeliveries(previous => [...previous.filter(item => item.recipient !== recipient.name), { id: teaSequence.current, recipient: recipient.name, sender: sender.name }]);
  };
  const [profileOpen, setProfileOpen] = useState(false);
  const closeGifts = useCallback(() => setGiftRecipient(null), []);
  useEffect(() => { const el = chatEndRef.current?.parentElement; if (el) el.scrollTop = el.scrollHeight; }, [messages.length]);
  useEffect(() => {
    if (!currentTrack) return;
    const scroll = scrollRef.current;
    if (scroll) scroll.scrollTop = scroll.scrollHeight;
  }, [currentTrack?.id, scrollRef]);
  const playTrack = (track: YouTubeTrack) => {
    setCurrentTrack(track);
    setMessages((list) => [...list, { kind: "music", name: "Sen", avatar: avatarDefaultAsset, text: track.title }]);
    setRecentTracks((tracks) => [track, ...tracks.filter((item) => item.id !== track.id)].slice(0, 30));
  };
  const submit = () => {
    if (!message.trim()) return;
    setMessages((previous) => [...previous, { kind: "text", name: "Sen", color: "blue", avatar: avatarDefaultAsset, text: message.trim() }]);
    setMessage("");
  };
  const icon = (name: string, image: string, className: string, badge?: boolean) => (
    <Button variant="reference" size="reference" className={className} aria-label={name} title={name}
      aria-pressed={name === "Hearts" ? heartShopOpen : name === "Trophy" ? leagueOpen : name === "Settings" ? settingsOpen : name === "Video" ? videoMusicOpen : active === name} onClick={() => name === "Hearts" ? setHeartShopOpen(true) : name === "Trophy" ? setLeagueOpen(true) : name === "Settings" ? setSettingsOpen(true) : name === "Video" ? setVideoMusicOpen(true) : name === "Gift" ? setGiftRecipient(tablePlayers[0] ?? null) : setActive(active === name ? null : name)}>
      <img src={image} alt="" draggable={false} />
      {badge && <span className="trophy-badge" aria-hidden="true">!</span>}
    </Button>
  );
  return (
    <>
    {opening && <OpeningScreen onComplete={finishOpening} />}
    <main ref={appRef} className={`bottle-app${giftRecipient ? " gifts-visible" : ""}${bottleChooserOpen ? " bottles-visible" : ""}`} inert={opening} aria-hidden={opening ? true : undefined}>
      <div ref={scrollRef} className="game-chat-scroll" onPointerDown={(event) => {
        if (event.target instanceof Element && !event.target.closest("button")) inputRef.current?.blur();
      }}>
      <section className="wood-table" aria-label="Table 1004">
        <img className="wood-surface" src={woodAsset} alt="" draggable={false} />
        <div className="table-content">
        <header className="table-toolbar">
          {icon("Hearts", heartAsset, `heart-control${heartBump ? " heart-control-hit" : ""}`)}
          <span key={heartBump} className={`heart-value${heartBump ? " heart-value-bump" : ""}`}>{14 + kissHearts + bonusHearts}</span>
          {icon("Trophy", trophyAsset, "trophy-control", true)}
           <GameMenu onRatings={() => { inputRef.current?.blur(); setRatingsOpen(true); }} onBoosters={() => { inputRef.current?.blur(); setBoostersOpen(true); }} onAchievements={() => setAchievementsOpen(true)} onAppearance={() => { inputRef.current?.blur(); setAppearanceOpen(true); }} onBottle={() => { inputRef.current?.blur(); setGiftRecipient(null); setBottleChooserOpen(true); }} />
          {icon("Settings", settingsAsset, "settings-control")}
          {icon("Leave table", exitAsset, "exit-control")}
          <span className="table-number">Table<br />1004</span>
          {icon("Players", countAsset, "count-control")}
        </header>
        <GameRoundStage players={tablePlayers} appearance={appliedAppearance} bottle={chosenBottle}
          paused={opening || dailyOpen || heartShopOpen || leagueOpen || settingsOpen || friendsOpen || contactOpen || boostersOpen || ratingsOpen || videoMusicOpen || profileOpen || appearanceOpen || achievementsOpen || bottleChooserOpen || Boolean(giftRecipient)}
          onPlayer={setGiftRecipient} onKisses={(count) => setKissHearts((previous) => previous + count)} />
        </div>
      </section>
      <section className={`chat-area${currentTrack ? ' has-music' : ''}`} aria-label="Chat">
        <div className="chat-messages" aria-live="polite">{messages.map((item, index) => (
          <div className="chat-row" key={index}>
            <img className="chat-row-avatar" src={item.avatar} alt="" draggable={false} />
            {item.kind === "music" ? (
              <Button variant="reference" size="reference" type="button" className="chat-row-music" onClick={() => setVideoMusicOpen(true)} title={item.text}><span aria-hidden="true">♫</span><span className="chat-row-music-title">{item.text}</span></Button>
            ) : (
              <p className="chat-bubble"><b className={`chat-name chat-name-${item.color}`}>{item.name}</b>: {item.text}{item.translate && <span className="chat-translate">Tercümeyi göster</span>}</p>
            )}
          </div>
        ))}<div ref={chatEndRef} /></div>
        {currentTrack ? <ChatMusicPlayer track={currentTrack} onStop={() => setCurrentTrack(null)} /> : <>{icon("Video", videoAsset, "video-control")}{icon("Music", musicAsset, "music-control")}</>}
      </section>
      </div>
      <form className="message-bar" onSubmit={(event) => { event.preventDefault(); submit(); }}>
        <input ref={inputRef} aria-label="Message" placeholder="Mesaj yaz" value={message} onChange={(event) => setMessage(event.target.value)} enterKeyHint="send" onKeyDown={(event) => { if (event.key === "Escape") inputRef.current?.blur(); }} />
        {icon("Puzzle", puzzleAsset, "puzzle-control")}
        {icon("Gift", giftAsset, "gift-control")}
        <Button variant="reference" size="reference" className="send-control" type="submit" aria-label="Send message" onPointerDown={(event) => event.preventDefault()}><img src={sendAsset} alt="" /></Button>
      </form>
      <BottleChooser open={bottleChooserOpen} onClose={closeBottles} onSelect={(choice) => { setChosenBottle(choice); closeBottles(); }} />
      <GiftDrawer recipient={giftRecipient} onClose={closeGifts} onProfile={() => setProfileOpen(true)} onHearts={() => setHeartShopOpen(true)} onTea={sendTea} onCrown={sendCrown} onTomato={sendTomato} />
      {teaDeliveries.map(delivery => <TeaGiftFlight key={delivery.id} delivery={delivery} onComplete={() => setTeaDeliveries(previous => previous.filter(item => item.id !== delivery.id))} />)}
      {crownDeliveries.map(delivery => <CrownGiftFlight key={delivery.id} delivery={delivery} onComplete={() => setCrownDeliveries(previous => previous.filter(item => item.id !== delivery.id))} />)}
      {tomatoDeliveries.map(delivery => <TomatoGiftFlight key={delivery.id} delivery={delivery} onComplete={() => setTomatoDeliveries(previous => previous.filter(item => item.id !== delivery.id))} />)}
      <PlayerProfile open={profileOpen} recipient={giftRecipient} onOpenChange={setProfileOpen} onGifts={() => { if (!giftRecipient) setGiftRecipient(tablePlayers[0] ?? null); }} />
      <DailyBonus open={dailyOpen} onClaim={claimBonus} />
      {flight && <img key={flight.id} className="bonus-flying-heart" src={heartAsset} alt="" aria-hidden="true"
        style={{ left: flight.x, top: flight.y, "--fly-x": `${flight.dx}px`, "--fly-y": `${flight.dy}px` } as React.CSSProperties}
        onAnimationEnd={() => { setBonusHearts((value) => value + flight.amount); setHeartBump((value) => value + 1); setFlight(null); }} />}
      <HeartShop open={heartShopOpen} onOpenChange={setHeartShopOpen} />
      <AppearancePopup open={appearanceOpen} onOpenChange={setAppearanceOpen} applied={appliedAppearance} onApply={setAppliedAppearance} />
      <AchievementsPopup open={achievementsOpen} onOpenChange={setAchievementsOpen} progress={achievementProgress} />
      <LeaguePopup open={leagueOpen} onOpenChange={setLeagueOpen} />
        <SettingsPopup open={settingsOpen} onOpenChange={setSettingsOpen} onFriends={() => { setSettingsOpen(false); setFriendsOpen(true); }} onContact={() => { setSettingsOpen(false); setContactOpen(true); }} />
       <FriendsPopup open={friendsOpen} onOpenChange={setFriendsOpen} visibility={friendsVisibility} onVisibilityChange={setFriendsVisibility} />
        <ContactPopup open={contactOpen} onOpenChange={setContactOpen} />
       <BoostersPopup open={boostersOpen} onOpenChange={setBoostersOpen} />
        <RatingsPopup open={ratingsOpen} onOpenChange={setRatingsOpen} />
      <VideoMusicPopup open={videoMusicOpen} onOpenChange={setVideoMusicOpen} onPlay={playTrack} recentTracks={recentTracks} />
    </main>
    </>
  );
}
