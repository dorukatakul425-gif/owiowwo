const base = "/game-assets/current/bottles-hd";

export const bottles = [
  { id: "hand", name: "İskelet el", image: `${base}/hand.webp`, price: 5 },
  { id: "new-year", name: "2026 şişesi", image: `${base}/new-year.webp`, price: 5 },
  { id: "green", name: "Yeşil şişe", image: `${base}/green.webp`, price: 5 },
  { id: "brown", name: "Kahverengi şişe", image: `${base}/brown.webp`, price: 5 },
  { id: "beer", name: "Bira şişesi", image: `${base}/beer.webp`, price: 5 },
  { id: "orange", name: "Turuncu şişe", image: `${base}/orange.webp`, price: 5 },
  { id: "cola", name: "Kola şişesi", image: `${base}/cola.webp`, price: 5 },
  { id: "clear", name: "Cam şişe", image: `${base}/clear.webp`, price: 5 },
  { id: "sprite", name: "Sprite şişesi", image: `${base}/sprite.webp`, price: 5 },
  { id: "vodka", name: "Votka şişesi", image: `${base}/vodka.webp`, price: 5 },
  { id: "champagne", name: "Şampanya şişesi", image: `${base}/champagne.webp`, price: 5 },
  { id: "whiskey", name: "Viski şişesi", image: `${base}/whiskey.webp`, price: 5 },
  { id: "baby", name: "Biberon", image: `${base}/baby.webp`, price: 5 },
  { id: "vip", name: "VIP şişesi", image: `${base}/vip.webp`, price: 5 },
] as const;

export type BottleChoice = (typeof bottles)[number];
