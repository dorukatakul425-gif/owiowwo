import hand from "@/assets/bottles-hd/hand.webp.asset.json";
import newYear from "@/assets/bottles-hd/new-year.webp.asset.json";
import green from "@/assets/bottles-hd/green.webp.asset.json";
import brown from "@/assets/bottles-hd/brown.webp.asset.json";
import beer from "@/assets/bottles-hd/beer.webp.asset.json";
import orange from "@/assets/bottles-hd/orange.webp.asset.json";
import cola from "@/assets/bottles-hd/cola.webp.asset.json";
import clear from "@/assets/bottles-hd/clear.webp.asset.json";
import sprite from "@/assets/bottles-hd/sprite.webp.asset.json";
import vodka from "@/assets/bottles-hd/vodka.webp.asset.json";
import champagne from "@/assets/bottles-hd/champagne.webp.asset.json";
import whiskey from "@/assets/bottles-hd/whiskey.webp.asset.json";
import baby from "@/assets/bottles-hd/baby.webp.asset.json";
import vip from "@/assets/bottles-hd/vip.webp.asset.json";

export const bottles = [
  { id: "hand", name: "İskelet el", image: hand.url, price: 5 },
  { id: "new-year", name: "2026 şişesi", image: newYear.url, price: 5 },
  { id: "green", name: "Yeşil şişe", image: green.url, price: 5 },
  { id: "brown", name: "Kahverengi şişe", image: brown.url, price: 5 },
  { id: "beer", name: "Bira şişesi", image: beer.url, price: 5 },
  { id: "orange", name: "Turuncu şişe", image: orange.url, price: 5 },
  { id: "cola", name: "Kola şişesi", image: cola.url, price: 5 },
  { id: "clear", name: "Cam şişe", image: clear.url, price: 5 },
  { id: "sprite", name: "Sprite şişesi", image: sprite.url, price: 5 },
  { id: "vodka", name: "Votka şişesi", image: vodka.url, price: 5 },
  { id: "champagne", name: "Şampanya şişesi", image: champagne.url, price: 5 },
  { id: "whiskey", name: "Viski şişesi", image: whiskey.url, price: 5 },
  { id: "baby", name: "Biberon", image: baby.url, price: 5 },
  { id: "vip", name: "VIP şişesi", image: vip.url, price: 5 },
] as const;

export type BottleChoice = (typeof bottles)[number];