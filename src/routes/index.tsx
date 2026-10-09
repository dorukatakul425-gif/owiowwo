import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { OpeningScreen } from "@/components/opening-screen";
import { useChatViewport } from "@/hooks/use-chat-viewport";
import { Button } from "@/components/ui/button";
import { HeartShop } from "@/components/heart-shop";
import { LeaguePopup } from "@/components/league-popup";
import { GameMenu } from "@/components/game-menu";
import { BottleChooser } from "@/components/bottle-chooser";
import { AppearancePopup, AppearanceArtwork } from "@/components/appearance-popup";
import type { AppearanceChoice } from "@/lib/appearance";
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
import type { YouTubeTrack } from "@/lib/youtube.types";
import woodAsset from "@/assets/wood.png.asset.json";
const wood = woodAsset.url;
import heartAsset from "@/assets/heart.png.asset.json";
const heart = heartAsset.url;
import trophyAsset from "@/assets/trophy.png.asset.json";
const trophy = trophyAsset.url;
import settingsAsset from "@/assets/settings.png.asset.json";
const settings = settingsAsset.url;
import exitAsset from "@/assets/exit.png.asset.json";
const exit = exitAsset.url;
import countAsset from "@/assets/count.png.asset.json";
const count = countAsset.url;
import avatarDefaultAsset from "@/assets/avatar-default.png.asset.json";
const avatarDefault = avatarDefaultAsset.url;
import avatarWomanAsset from "@/assets/avatar-woman.png.asset.json";
const avatarWoman = avatarWomanAsset.url;
import avatarQuietAsset from "@/assets/avatar-quiet.png.asset.json";
const avatarQuiet = avatarQuietAsset.url;
import natalyaAsset from "@/assets/player-natalya.webp.asset.json";
const natalya = natalyaAsset.url;
import egorAsset from "@/assets/player-egor.webp.asset.json";
const egor = egorAsset.url;
import mishaAsset from "@/assets/player-misha.webp.asset.json";
const misha = mishaAsset.url;
import anastasiaAsset from "@/assets/player-anastasia.webp.asset.json";
const anastasia = anastasiaAsset.url;
import sergeyAsset from "@/assets/player-sergey.webp.asset.json";
const sergey = sergeyAsset.url;
import ekaterinaAsset from "@/assets/player-ekaterina.webp.asset.json";
const ekaterina = ekaterinaAsset.url;
import timurAsset from "@/assets/player-timur.webp.asset.json";
const timur = timurAsset.url;
import lizaAsset from "@/assets/player-liza.webp.asset.json";
const liza = lizaAsset.url;
import lenyaAsset from "@/assets/player-lenya.webp.asset.json";
const lenya = lenyaAsset.url;
import bottleAsset from "@/assets/bottle.png.asset.json";
const bottle = bottleAsset.url;
import videoAsset from "@/assets/video.png.asset.json";
const video = videoAsset.url;
import musicAsset from "@/assets/music.png.asset.json";
const music = musicAsset.url;
import puzzleAsset from "@/assets/puzzle.png.asset.json";
const puzzle = puzzleAsset.url;
import giftAsset from "@/assets/gift.png.asset.json";
const gift = giftAsset.url;
import sendAsset from "@/assets/send.png.asset.json";
const send = sendAsset.url;

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
  { name: "user_68554, 19", image: avatarDefault },
  { name: "Наталья", image: natalya },
  { name: "Егор", image: egor },
  { name: "👑ZLyKA👑", image: avatarWoman },
  { name: "Миша", image: misha },
  { name: "Анастасия", image: anastasia },
  { name: "Сергей", image: sergey },
  { name: "Екатерина", image: ekaterina },
  { name: "Тимур", image: timur },
  { name: "Лиза", image: liza },
  { name: "Лёня", image: lenya },
  { name: "☞Quiet ☜", image: avatarQuiet },
];

type ChatMessage = { kind: "text" | "music"; name: string; color?: "blue" | "pink" | "sky"; avatar: string; text: string; translate?: boolean };
const seedMessages: ChatMessage[] = [
  { kind: "text", name: "Amelia", color: "pink", avatar: avatarWoman, text: "Miraç, eminmisin onun olduğuna" },
  { kind: "text", name: "ФУАД", color: "sky", avatar: anastasia, text: "Gülü, .", translate: true },
  { kind: "text", name: "Miraç", color: "blue", avatar: egor, text: "Amelia, yaww bu mal eskiden de hep bunu bize yaprdı" },
  { kind: "text", name: "Miraç", color: "blue", avatar: egor, text: "bunun kanını bilirim kanını" },
  { kind: "text", name: "Amelia", color: "pink", avatar: avatarWoman, text: "Miraç, ben tanımam" },
  { kind: "text", name: "Miraç", color: "blue", avatar: egor, text: "Amelia, arkdasım diyon ???" },
];

function Index() {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { appRef, scrollRef, inputRef } = useChatViewport();
  const [opening, setOpening] = useState(true);
  const finishOpening = useCallback(() => setOpening(false), []);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages);
  const [spinning, setSpinning] = useState(false);
  const [bottleChooserOpen, setBottleChooserOpen] = useState(false);
  const [chosenBottle, setChosenBottle] = useState<BottleChoice | null>(null);
  const closeBottles = useCallback(() => {
    setBottleChooserOpen(false);
    document.querySelector<HTMLButtonElement>(".menu-control")?.focus({ preventScroll: true });
  }, []);
  const [active, setActive] = useState<string | null>(null);
  const [heartShopOpen, setHeartShopOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [appliedAppearance, setAppliedAppearance] = useState<AppearanceChoice | null>(null);
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
    setMessages((list) => [...list, { kind: "music", name: "Sen", avatar: avatarDefault, text: track.title }]);
    setRecentTracks((tracks) => [track, ...tracks.filter((item) => item.id !== track.id)].slice(0, 30));
  };
  const submit = () => {
    if (!message.trim()) return;
    setMessages((previous) => [...previous, { kind: "text", name: "Sen", color: "blue", avatar: avatarDefault, text: message.trim() }]);
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
        <img className="wood-surface" src={wood} alt="" draggable={false} />
        <div className="table-content">
        <header className="table-toolbar">
          {icon("Hearts", heart, "heart-control")}
          <span className="heart-value">14</span>
          {icon("Trophy", trophy, "trophy-control", true)}
           <GameMenu onRatings={() => { inputRef.current?.blur(); setRatingsOpen(true); }} onBoosters={() => { inputRef.current?.blur(); setBoostersOpen(true); }} onAchievements={() => setAchievementsOpen(true)} onAppearance={() => { inputRef.current?.blur(); setAppearanceOpen(true); }} onBottle={() => { inputRef.current?.blur(); setGiftRecipient(null); setBottleChooserOpen(true); }} />
          {icon("Settings", settings, "settings-control")}
          {icon("Leave table", exit, "exit-control")}
          <span className="table-number">Table<br />1004</span>
          {icon("Players", count, "count-control")}
        </header>
        <div className="table-players" role="group" aria-label="12 players">
          {tablePlayers.map((player, index) => (
            <Button variant="reference" size="reference" className={`player player-seat-${index + 1}`} key={player.name} aria-label={`${player.name} hediyelerini aç`} onClick={() => setGiftRecipient(player)}>
              <img src={player.image} alt={player.name} draggable={false} />
              {index === 0 && appliedAppearance && <span className="player-appearance"><AppearanceArtwork choice={appliedAppearance} /></span>}
              <span>{player.name}</span>
            </Button>
          ))}
        </div>
        <Button variant="reference" size="reference" className={`bottle-control${spinning ? " is-spinning" : ""}`} aria-label="Spin bottle"
          onClick={() => setSpinning(true)} onAnimationEnd={() => setSpinning(false)}>
          <img className={chosenBottle ? "chosen-bottle-art" : undefined} src={chosenBottle?.image ?? bottle} alt="Waiting for the next turn" draggable={false} />
        </Button>
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
        {currentTrack ? <ChatMusicPlayer track={currentTrack} onStop={() => setCurrentTrack(null)} /> : <>{icon("Video", video, "video-control")}{icon("Music", music, "music-control")}</>}
      </section>
      </div>
      <form className="message-bar" onSubmit={(event) => { event.preventDefault(); submit(); }}>
        <input ref={inputRef} aria-label="Message" placeholder="Mesaj yaz" value={message} onChange={(event) => setMessage(event.target.value)} enterKeyHint="send" onKeyDown={(event) => { if (event.key === "Escape") inputRef.current?.blur(); }} />
        {icon("Puzzle", puzzle, "puzzle-control")}
        {icon("Gift", gift, "gift-control")}
        <Button variant="reference" size="reference" className="send-control" type="submit" aria-label="Send message" onPointerDown={(event) => event.preventDefault()}><img src={send} alt="" /></Button>
      </form>
      <BottleChooser open={bottleChooserOpen} onClose={closeBottles} onSelect={(choice) => { setChosenBottle(choice); setSpinning(false); closeBottles(); }} />
      <GiftDrawer recipient={giftRecipient} onClose={closeGifts} onProfile={() => setProfileOpen(true)} onHearts={() => setHeartShopOpen(true)} />
      <PlayerProfile open={profileOpen} recipient={giftRecipient} onOpenChange={setProfileOpen} onGifts={() => { if (!giftRecipient) setGiftRecipient(tablePlayers[0] ?? null); }} />
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
