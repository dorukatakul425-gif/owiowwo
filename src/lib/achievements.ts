export type Achievement = { id: string; name: string; stars: number; index: number };
export type AchievementProgress = Record<string, number>;

const names = ["Huzur", "DJ", "Uzaylı", "Kaptan", "Gitarist", "Kahve", "Kokteyl", "Paris", "Sevgi", "Çapa", "Yıldız", "Ses", "Kutlama", "Kahve ustası", "Çiftçi", "Özgürlük", "Şampiyon", "Devrim", "Aşk meleği", "Paraşüt", "Zafer", "Müzik tutkunu", "Bir numara", "İlk on", "Altın birincilik", "Altın ilk on", "Platin birincilik", "Platin ilk on", "Kuş", "Telefon", "Neşeli", "Parlayan yıldız", "Koşucu", "Okçu", "Çiçek", "Troll", "Kurbağa prens", "Pusula", "Dans", "Plak", "Cadılar Bayramı", "Pipo", "Fotoğraf", "Hedef", "Korsan", "Elmas", "Sinema", "Yağmur", "Kupa", "Gümüş kupa", "Altın kupa", "Platin kupa", "Sihirbaz", "Dostluk", "Müzisyen", "Macera", "Kılıç", "Su", "Piyano", "Yardım", "Parti", "Dokunuş", "Napolyon", "Pandomim", "Acı biber", "İskelet", "Plak yıldızı", "Kral", "Gönül kupası", "Trompet", "Romantik", "Centilmen", "İksir", "Noel", "Havalı", "Mutluluk", "Sanat", "Zeka", "Kardan adam", "Hayır", "Beyefendi", "Güç", "Tatlı", "Ateş", "Akordeon", "Kalp birincisi", "Kalp ilk on", "Gümüş kalp", "Gümüş ilk on", "Altın kalp", "Altın ilk on", "Gezgin", "Melodi", "Yüzük", "Hayran"];
const firstStars = [3,5,5,0,0,3,3,0,0,5,5,0,0,5,0];
const noStars = new Set([15,19,20,28,29,32,33,34,35,36,38,39,43,48,58,60,61,65,68,71,72,74,75,79,93]);
const counts = names.map((_, index) => index < 15 ? firstStars[index] ?? 0 : noStars.has(index) ? 0 : 5);
let remaining = 333 - counts.reduce((sum, n) => sum + n, 0);
for (let index = counts.length - 1; index >= 15 && remaining !== 0; index--) {
  const current = counts[index] ?? 0;
  const change = remaining > 0 ? Math.min(5 - current, remaining) : -Math.min(current, -remaining);
  counts[index] = current + change;
  remaining -= change;
}
export const achievements: Achievement[] = names.map((name, index) => ({ id: `achievement-${index + 1}`, name, stars: counts[index] ?? 0, index }));
export const initialAchievementProgress: AchievementProgress = { "achievement-1": 2, "achievement-2": 1 };
export function updateAchievementProgress(progress: AchievementProgress, id: string, earned: number): AchievementProgress {
  const achievement = achievements.find((item) => item.id === id);
  if (!achievement || !Number.isFinite(earned)) return progress;
  const value = Math.max(0, Math.min(achievement.stars || 1, Math.floor(earned)));
  return { ...progress, [id]: value };
}