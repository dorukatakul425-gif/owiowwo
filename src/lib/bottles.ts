import green from "@/assets/bottle-green.png.asset.json";
import brown from "@/assets/bottle-brown.png.asset.json";
import orange from "@/assets/bottle-orange.png.asset.json";
import cola from "@/assets/bottle-cola.png.asset.json";
import clear from "@/assets/bottle-clear.png.asset.json";
import sprite from "@/assets/bottle-sprite.png.asset.json";
import champagne from "@/assets/bottle-champagne.png.asset.json";
import whiskey from "@/assets/bottle-whiskey.png.asset.json";
import baby from "@/assets/bottle-baby.png.asset.json";

export const bottles = [
  { id: "green", name: "Yeşil şişe", image: green.url, price: 5 },
  { id: "brown", name: "Kahverengi şişe", image: brown.url, price: 5 },
  { id: "orange", name: "Turuncu şişe", image: orange.url, price: 5 },
  { id: "cola", name: "Kola şişesi", image: cola.url, price: 5 },
  { id: "clear", name: "Cam şişe", image: clear.url, price: 5 },
  { id: "sprite", name: "Sprite şişesi", image: sprite.url, price: 5 },
  { id: "champagne", name: "Şampanya şişesi", image: champagne.url, price: 5 },
  { id: "whiskey", name: "Viski şişesi", image: whiskey.url, price: 5 },
  { id: "baby", name: "Biberon", image: baby.url, price: 5 },
] as const;

export type BottleChoice = (typeof bottles)[number];