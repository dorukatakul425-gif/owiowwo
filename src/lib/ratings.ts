export const MAX_RATING_PLAYERS = 50;
export const INITIAL_VISIBLE_PLAYERS = 9;
export const ratingPeriods = [
  { id: "all", label: "Bütün dövrlər" },
  { id: "month", label: "Bu ay" },
  { id: "week", label: "Bu həftə" },
  { id: "today", label: "Bu gün" },
] as const;
export type RatingPeriod = (typeof ratingPeriods)[number]["id"];
export type RatingCategory = "kiss" | "music" | "heart" | "hearts" | "smile";
export type RatingPlayer = { id: string; name: string; avatar: string; points: number; position: number };

// Reference demonstration data; no live account rankings are available.
const names = ["Koççarı⚓🌹", "🎮€€€♧♬👾", "🔥ΘΣ Ғβϱʂ🔥", "", "Safiya", "ᛒᗩᗰᖇᗩᕼ", "ÇAPKıΛ", "Kanuni", "Timka"];
const scores = [2132938, 2012044, 1928612, 1849194, 1642644, 1386981, 1230984, 1212629, 1145222];
export function getRatingPlayers(avatars: string[], period: RatingPeriod, category: RatingCategory): RatingPlayer[] {
  const periodFactor = { all: 1, month: .12, week: .03, today: .004 }[period];
  const categoryFactor = { kiss: 1, music: .4, heart: .7, hearts: .3, smile: .6 }[category];
  return Array.from({ length: MAX_RATING_PLAYERS }, (_, index) => ({
    id: `rating-${index + 1}`, name: names[index] ?? `user_${68554531 + index}`,
    avatar: avatars[index % Math.max(1, avatars.length)] ?? "",
    points: Math.floor((scores[index] ?? Math.max(124, 1145222 - (index - 8) * 26300)) * periodFactor * categoryFactor),
    position: index + 1,
  }));
}
export function formatRatingPoints(points: number) { return String(points).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }