import type { AssetPointer } from "./appearance.types";
import frame1 from "@/assets/appearance-frame-01.png.asset.json";
import icon1 from "@/assets/appearance-icon-01.png.asset.json";
import frame2 from "@/assets/appearance-frame-02.png.asset.json";
import icon2 from "@/assets/appearance-icon-02.png.asset.json";
import frame3 from "@/assets/appearance-frame-03.png.asset.json";
import icon3 from "@/assets/appearance-icon-03.png.asset.json";
import frame4 from "@/assets/appearance-frame-04.png.asset.json";
import icon4 from "@/assets/appearance-icon-04.png.asset.json";
import frame5 from "@/assets/appearance-frame-05.png.asset.json";
import icon5 from "@/assets/appearance-icon-05.png.asset.json";
import frame6 from "@/assets/appearance-frame-06.png.asset.json";
import icon6 from "@/assets/appearance-icon-06.png.asset.json";
import frame7 from "@/assets/appearance-frame-07.png.asset.json";
import icon7 from "@/assets/appearance-icon-07.png.asset.json";
import frame8 from "@/assets/appearance-frame-08.png.asset.json";
import icon8 from "@/assets/appearance-icon-08.png.asset.json";
import frame9 from "@/assets/appearance-frame-09.png.asset.json";
import icon9 from "@/assets/appearance-icon-09.png.asset.json";
import frame10 from "@/assets/appearance-frame-10.png.asset.json";
import icon10 from "@/assets/appearance-icon-10.png.asset.json";
import frame11 from "@/assets/appearance-frame-11.png.asset.json";
import icon11 from "@/assets/appearance-icon-11.png.asset.json";
import frame12 from "@/assets/appearance-frame-12.png.asset.json";
import icon12 from "@/assets/appearance-icon-12.png.asset.json";
import frame13 from "@/assets/appearance-frame-13.png.asset.json";
import icon13 from "@/assets/appearance-icon-13.png.asset.json";
import frame14 from "@/assets/appearance-frame-14.png.asset.json";
import icon14 from "@/assets/appearance-icon-14.png.asset.json";
import frame15 from "@/assets/appearance-frame-15.png.asset.json";
import icon15 from "@/assets/appearance-icon-15.png.asset.json";
import frame16 from "@/assets/appearance-frame-16.png.asset.json";
import icon16 from "@/assets/appearance-icon-16.png.asset.json";
import frame17 from "@/assets/appearance-frame-17.png.asset.json";
import icon17 from "@/assets/appearance-icon-17.png.asset.json";
import frame18 from "@/assets/appearance-frame-18.png.asset.json";
import icon18 from "@/assets/appearance-icon-18.png.asset.json";
import frame19 from "@/assets/appearance-frame-19.png.asset.json";
import icon19 from "@/assets/appearance-icon-19.png.asset.json";
import frame20 from "@/assets/appearance-frame-20.png.asset.json";
import icon20 from "@/assets/appearance-icon-20.png.asset.json";
import frame21 from "@/assets/appearance-frame-21.png.asset.json";
import icon21 from "@/assets/appearance-icon-21.png.asset.json";
import frame22 from "@/assets/appearance-frame-22.png.asset.json";
import icon22 from "@/assets/appearance-icon-22.png.asset.json";
import frame23 from "@/assets/appearance-frame-23.png.asset.json";
import icon23 from "@/assets/appearance-icon-23.png.asset.json";
import frame24 from "@/assets/appearance-frame-24.png.asset.json";
import icon24 from "@/assets/appearance-icon-24.png.asset.json";
import frame25 from "@/assets/appearance-frame-25.png.asset.json";
import icon25 from "@/assets/appearance-icon-25.png.asset.json";
import frame26 from "@/assets/appearance-frame-26.png.asset.json";
import icon26 from "@/assets/appearance-icon-26.png.asset.json";
import frame27 from "@/assets/appearance-frame-27.png.asset.json";
import icon27 from "@/assets/appearance-icon-27.png.asset.json";
import frame28 from "@/assets/appearance-frame-28.png.asset.json";
import icon28 from "@/assets/appearance-icon-28.png.asset.json";
import frame29 from "@/assets/appearance-frame-29.png.asset.json";
import icon29 from "@/assets/appearance-icon-29.png.asset.json";
import frame30 from "@/assets/appearance-frame-30.png.asset.json";
import icon30 from "@/assets/appearance-icon-30.png.asset.json";
import frame31 from "@/assets/appearance-frame-31.png.asset.json";
import icon31 from "@/assets/appearance-icon-31.png.asset.json";
import frame32 from "@/assets/appearance-frame-32.png.asset.json";
import icon32 from "@/assets/appearance-icon-32.png.asset.json";
import frame33 from "@/assets/appearance-frame-33.png.asset.json";
import icon33 from "@/assets/appearance-icon-33.png.asset.json";
import frame34 from "@/assets/appearance-frame-34.png.asset.json";
import icon34 from "@/assets/appearance-icon-34.png.asset.json";
import frame35 from "@/assets/appearance-frame-35.png.asset.json";
import icon35 from "@/assets/appearance-icon-35.png.asset.json";
import frame36 from "@/assets/appearance-frame-36.png.asset.json";
import icon36 from "@/assets/appearance-icon-36.png.asset.json";

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
