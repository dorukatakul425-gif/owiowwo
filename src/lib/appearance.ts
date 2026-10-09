import type { AssetPointer } from "./appearance.types";
const frame1 = "/game-assets/current/appearance-frame-01.png";
const icon1 = "/game-assets/current/appearance-icon-01.png";
const frame2 = "/game-assets/current/appearance-frame-02.png";
const icon2 = "/game-assets/current/appearance-icon-02.png";
const frame3 = "/game-assets/current/appearance-frame-03.png";
const icon3 = "/game-assets/current/appearance-icon-03.png";
const frame4 = "/game-assets/current/appearance-frame-04.png";
const icon4 = "/game-assets/current/appearance-icon-04.png";
const frame5 = "/game-assets/current/appearance-frame-05.png";
const icon5 = "/game-assets/current/appearance-icon-05.png";
const frame6 = "/game-assets/current/appearance-frame-06.png";
const icon6 = "/game-assets/current/appearance-icon-06.png";
const frame7 = "/game-assets/current/appearance-frame-07.png";
const icon7 = "/game-assets/current/appearance-icon-07.png";
const frame8 = "/game-assets/current/appearance-frame-08.png";
const icon8 = "/game-assets/current/appearance-icon-08.png";
const frame9 = "/game-assets/current/appearance-frame-09.png";
const icon9 = "/game-assets/current/appearance-icon-09.png";
const frame10 = "/game-assets/current/appearance-frame-10.png";
const icon10 = "/game-assets/current/appearance-icon-10.png";
const frame11 = "/game-assets/current/appearance-frame-11.png";
const icon11 = "/game-assets/current/appearance-icon-11.png";
const frame12 = "/game-assets/current/appearance-frame-12.png";
const icon12 = "/game-assets/current/appearance-icon-12.png";
const frame13 = "/game-assets/current/appearance-frame-13.png";
const icon13 = "/game-assets/current/appearance-icon-13.png";
const frame14 = "/game-assets/current/appearance-frame-14.png";
const icon14 = "/game-assets/current/appearance-icon-14.png";
const frame15 = "/game-assets/current/appearance-frame-15.png";
const icon15 = "/game-assets/current/appearance-icon-15.png";
const frame16 = "/game-assets/current/appearance-frame-16.png";
const icon16 = "/game-assets/current/appearance-icon-16.png";
const frame17 = "/game-assets/current/appearance-frame-17.png";
const icon17 = "/game-assets/current/appearance-icon-17.png";
const frame18 = "/game-assets/current/appearance-frame-18.png";
const icon18 = "/game-assets/current/appearance-icon-18.png";
const frame19 = "/game-assets/current/appearance-frame-19.png";
const icon19 = "/game-assets/current/appearance-icon-19.png";
const frame20 = "/game-assets/current/appearance-frame-20.png";
const icon20 = "/game-assets/current/appearance-icon-20.png";
const frame21 = "/game-assets/current/appearance-frame-21.png";
const icon21 = "/game-assets/current/appearance-icon-21.png";
const frame22 = "/game-assets/current/appearance-frame-22.png";
const icon22 = "/game-assets/current/appearance-icon-22.png";
const frame23 = "/game-assets/current/appearance-frame-23.png";
const icon23 = "/game-assets/current/appearance-icon-23.png";
const frame24 = "/game-assets/current/appearance-frame-24.png";
const icon24 = "/game-assets/current/appearance-icon-24.png";
const frame25 = "/game-assets/current/appearance-frame-25.png";
const icon25 = "/game-assets/current/appearance-icon-25.png";
const frame26 = "/game-assets/current/appearance-frame-26.png";
const icon26 = "/game-assets/current/appearance-icon-26.png";
const frame27 = "/game-assets/current/appearance-frame-27.png";
const icon27 = "/game-assets/current/appearance-icon-27.png";
const frame28 = "/game-assets/current/appearance-frame-28.png";
const icon28 = "/game-assets/current/appearance-icon-28.png";
const frame29 = "/game-assets/current/appearance-frame-29.png";
const icon29 = "/game-assets/current/appearance-icon-29.png";
const frame30 = "/game-assets/current/appearance-frame-30.png";
const icon30 = "/game-assets/current/appearance-icon-30.png";
const frame31 = "/game-assets/current/appearance-frame-31.png";
const icon31 = "/game-assets/current/appearance-icon-31.png";
const frame32 = "/game-assets/current/appearance-frame-32.png";
const icon32 = "/game-assets/current/appearance-icon-32.png";
const frame33 = "/game-assets/current/appearance-frame-33.png";
const icon33 = "/game-assets/current/appearance-icon-33.png";
const frame34 = "/game-assets/current/appearance-frame-34.png";
const icon34 = "/game-assets/current/appearance-icon-34.png";
const frame35 = "/game-assets/current/appearance-frame-35.png";
const icon35 = "/game-assets/current/appearance-icon-35.png";
const frame36 = "/game-assets/current/appearance-frame-36.png";
const icon36 = "/game-assets/current/appearance-icon-36.png";
export type AppearanceChoice = { id: number; name: string; frame: AssetPointer; icon: AssetPointer; locked: boolean; price: number };
export const appearanceChoices: AppearanceChoice[] = [
  { id: 1, name: "Sarı yarış", frame: frame1, icon: icon1, locked: true, price: 500 },
  { id: 2, name: "Mavi yarış", frame: frame2, icon: icon2, locked: false, price: 500 },
  { id: 3, name: "Pembe yılan", frame: frame3, icon: icon3, locked: true, price: 500 },
  { id: 4, name: "Bambu", frame: frame4, icon: icon4, locked: false, price: 500 },
  { id: 5, name: "Beyaz taç", frame: frame5, icon: icon5, locked: false, price: 500 },
  { id: 6, name: "Siyah taç", frame: frame6, icon: icon6, locked: false, price: 500 },
  { id: 7, name: "Kırmızı yelpaze", frame: frame7, icon: icon7, locked: false, price: 500 },
  { id: 8, name: "Mavi yıldız", frame: frame8, icon: icon8, locked: false, price: 500 },
  { id: 9, name: "Altın sikke", frame: frame9, icon: icon9, locked: false, price: 500 },
  { id: 10, name: "Nal", frame: frame10, icon: icon10, locked: false, price: 500 },
  { id: 11, name: "Kalp kilidi", frame: frame11, icon: icon11, locked: false, price: 500 },
  { id: 12, name: "Kanatlar", frame: frame12, icon: icon12, locked: false, price: 500 },
  { id: 13, name: "Rulet", frame: frame13, icon: icon13, locked: false, price: 500 },
  { id: 14, name: "İskambil", frame: frame14, icon: icon14, locked: false, price: 500 },
  { id: 15, name: "Gece yıldızı", frame: frame15, icon: icon15, locked: false, price: 500 },
  { id: 16, name: "Sarmal", frame: frame16, icon: icon16, locked: false, price: 500 },
  { id: 17, name: "Renkli yıldız", frame: frame17, icon: icon17, locked: false, price: 500 },
  { id: 18, name: "Alev zinciri", frame: frame18, icon: icon18, locked: false, price: 500 },
  { id: 19, name: "Şeker", frame: frame19, icon: icon19, locked: false, price: 500 },
  { id: 20, name: "Nane şekeri", frame: frame20, icon: icon20, locked: false, price: 500 },
  { id: 21, name: "Yaprak", frame: frame21, icon: icon21, locked: false, price: 500 },
  { id: 22, name: "Kubbe", frame: frame22, icon: icon22, locked: false, price: 500 },
  { id: 23, name: "Mor taş", frame: frame23, icon: icon23, locked: false, price: 500 },
  { id: 24, name: "Turkuaz", frame: frame24, icon: icon24, locked: false, price: 500 },
  { id: 25, name: "Renkli arma", frame: frame25, icon: icon25, locked: false, price: 500 },
  { id: 26, name: "Çiçek", frame: frame26, icon: icon26, locked: false, price: 500 },
  { id: 27, name: "Altın güneş", frame: frame27, icon: icon27, locked: false, price: 500 },
  { id: 28, name: "Kırmızı taş", frame: frame28, icon: icon28, locked: false, price: 500 },
  { id: 29, name: "Buz yıldızı", frame: frame29, icon: icon29, locked: false, price: 500 },
  { id: 30, name: "Ateş tacı", frame: frame30, icon: icon30, locked: false, price: 500 },
  { id: 31, name: "Gökyüzü", frame: frame31, icon: icon31, locked: false, price: 500 },
  { id: 32, name: "Yakut", frame: frame32, icon: icon32, locked: false, price: 500 },
  { id: 33, name: "Üçgen", frame: frame33, icon: icon33, locked: true, price: 500 },
  { id: 34, name: "Elmas", frame: frame34, icon: icon34, locked: true, price: 500 },
  { id: 35, name: "Bakır", frame: frame35, icon: icon35, locked: true, price: 500 },
  { id: 36, name: "Beşgen", frame: frame36, icon: icon36, locked: true, price: 500 },
];
