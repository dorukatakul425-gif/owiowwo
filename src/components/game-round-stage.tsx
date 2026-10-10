import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { useGameRound } from "@/hooks/use-game-round";
import { roundSeats, turnIndicatorGeometry } from "@/lib/game-round";
import type { AppearanceChoice } from "@/lib/appearance";
import { bottles, type BottleChoice } from "@/lib/bottles";
import { RubyFrame } from "@/components/ruby-frame";

const defaultBottle = bottles.find((choice) => choice.id === "cola");

type Player = { name: string; image: string };
type Props = { players: Player[]; appearance: AppearanceChoice | null; bottle: BottleChoice | null; paused: boolean; onPlayer: (player: Player) => void; onKisses: (count: number) => void };
type GameStyle = CSSProperties & { "--seat-x"?: string; "--seat-y"?: string; "--bottle-angle"?: string; "--rock-direction"?: number; "--turn-x"?: string; "--turn-y"?: string };

function KissArrows() {
  return <svg className="round-kiss-arrows" viewBox="0 0 260 260" aria-hidden="true">
    <g className="kiss-arrow-outline" strokeLinecap="round" strokeLinejoin="round">
      <path d="M38 45 Q128 -25 224 45 L223 23 M224 45 L201 44" />
      <path d="M224 214 Q132 282 38 214 L38 237 M38 214 L61 216" />
    </g>
    <g className="kiss-arrow-fill" strokeLinecap="round" strokeLinejoin="round">
      <path d="M38 45 Q128 -25 224 45 L223 23 M224 45 L201 44" />
      <path d="M224 214 Q132 282 38 214 L38 237 M38 214 L61 216" />
    </g>
    {[12, 248].map(y => <g key={y} transform={`translate(130 ${y})`}>
      <circle className="kiss-arrow-medallion" r="22" />
      <path className="kiss-lips" d="M-15 0 Q-8 -13 0 -7 Q8 -13 15 0 Q0 21 -15 0Z" />
      <path className="kiss-lips-line" d="M-11 0 Q0 7 11 0" />
    </g>)}
  </svg>;
}

export function GameRoundStage({ players, appearance, bottle, paused, onPlayer, onKisses }: Props) {
  const { state, spin, decide, involved } = useGameRound(paused);
  const centered = ["arriving", "choosing", "result"].includes(state.phase);
  const hiddenBottle = centered;
  const choice = state.phase === "choosing";
  const result = state.phase === "result";
  const turn = turnIndicatorGeometry(state.actor);
  const handleDecision = (accept: boolean) => {
    decide(accept);
    if (accept) onKisses(1);
  };
  return <div className={`game-round-stage round-${state.phase}`} data-phase={state.phase} data-actor={state.actor} data-target={state.target ?? "none"} data-paused={paused}>
    <div className="table-players" role="group" aria-label="Siz və 2 bot oyunçu">
      {players.slice(0, 3).map((player, index) => {
        const seat = roundSeats[index];
        if (!seat) return null;
        const participant = index === state.actor || index === state.target;
        const left = involved ? index === 0 : index === state.actor;
        const position: GameStyle = { "--seat-x": `${centered && participant ? left ? 28.5 : 53.1 : seat.x}%`, "--seat-y": `${centered && participant ? 46 : seat.y}%`, "--rock-direction": turn.rock };
        return <Button key={player.name} data-player-name={player.name} variant="reference" size="reference" className={`player round-player${participant ? " round-participant" : ""}${index === state.actor ? " round-actor" : ""}${centered && participant ? " round-centered" : ""}${centered && participant && left ? " round-left" : ""}`} style={position} aria-label={`${player.name} hədiyyələrini aç`} onClick={() => onPlayer(player)} disabled={centered && participant}>
          <img src={player.image} alt={player.name} draggable={false} />
          {index === 0 && appearance && (appearance.id === 32
            ? <span className="player-appearance player-appearance-ruby" aria-hidden="true"><RubyFrame /></span>
            : <span className="player-appearance" aria-hidden="true" style={{ borderImageSource: `url("${appearance.frame.url.replace("appearance-frame-", "table-frame-")}")` }} />)}
          {(state.kisses[index] ?? 0) > 0 && <span className="round-kiss-count" aria-label={`${state.kisses[index]} öpüş`}>{state.kisses[index]}</span>}
          <span className="round-player-name">{player.name}</span>
          {index > 0 && <span className="round-bot-label">BOT</span>}
        </Button>;
      })}
    </div>
    <Button variant="reference" size="reference" className={`bottle-control round-bottle${hiddenBottle ? " round-bottle-hidden" : ""}`} style={{ "--bottle-angle": `${state.rotation}deg` } as GameStyle} aria-label="Şüşəni çevir" disabled={paused || state.phase !== "ready" || state.actor !== 0} onClick={spin}>
      <img className="round-bottle-art" src={bottle?.image ?? defaultBottle?.image} alt="Şüşə" draggable={false} decoding="async" />
    </Button>
    {state.phase === "ready" && state.actor === 0 && <Button variant="reference" size="reference" className="round-spin-prompt" onClick={spin} disabled={paused} aria-label="Şüşəni çevirməyə başla">
      <svg viewBox="0 0 140 60" aria-hidden="true"><path d="M132 49 Q73 -7 9 27 M9 27 L24 7 M9 27 L32 38" /></svg>
      <span>Şüşəni<br />çevir!</span>
    </Button>}
    {state.phase === "ready" && <>
      <svg className="round-turn-indicator" viewBox="0 0 768 863" aria-label={state.actor === 0 ? "Sizin növbəniz" : "Botun növbəsi"} role="img">
        <g transform={`translate(${turn.tip.x * 7.68} ${turn.tip.y * 8.63}) rotate(${turn.angle})`}><path d="M-32 0 Q-15 -5 0 0 M-13 -10 L0 0 L-13 10" /></g>
      </svg>
      {state.actor !== 0 && <span className="round-turn-label" style={{ "--turn-x": `${turn.label.x}%`, "--turn-y": `${turn.label.y}%` } as GameStyle}>Şüşəni<br />çevirir</span>}
    </>}
    {(choice || state.phase === "arriving") && <div className="round-heading" role="status">{involved ? <>Sənin<br />seçimin</> : <>Öpüşəcəklər,<br />ya yox?</>}</div>}
    {choice && <span className="round-countdown" role="timer" aria-label="Qalan saniyə">{state.seconds}</span>}
    {choice && involved && <>
      <div className="round-choice-actions">
        <Button variant="reference" size="reference" className="round-refuse" onClick={() => handleDecision(false)} disabled={paused}>İmtina et</Button>
        <Button variant="reference" size="reference" className="round-kiss" onClick={() => handleDecision(true)} disabled={paused}>Öp</Button>
      </div>
    </>}
    {result && state.accepted && <KissArrows />}
    {result && !state.accepted && <div className="round-refused" role="status"><span aria-hidden="true">×</span>İmtina edildi</div>}
    <span className="sr-only" aria-live="polite">{result && state.accepted ? "Hər iki oyunçu öpüşdü" : state.phase === "ready" && state.actor === 0 ? "Şüşəni çevirmək növbəsi sizdədir" : ""}</span>
  </div>;
}