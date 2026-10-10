import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { VipPopup } from "@/components/vip-popup";
import { Button } from "@/components/ui/button";
import vipAsset from "@/assets/vip-art.png.asset.json";
const vip = vipAsset.url;
import chestAsset from "@/assets/chest-art.png.asset.json";
const chest = chestAsset.url;
import potAsset from "@/assets/pot-art.png.asset.json";
const pot = potAsset.url;
import sackAsset from "@/assets/sack-art.png.asset.json";
const sack = sackAsset.url;
import boxAsset from "@/assets/box-art.png.asset.json";
const box = boxAsset.url;
import heartsAsset from "@/assets/hearts-art.png.asset.json";
const hearts = heartsAsset.url;
import rabbit from "@/assets/rabbit-dat.png";
import heartAsset from "@/assets/offer-heart.png.asset.json";
const heart = heartAsset.url;
import coin from "@/assets/dat-coin.png";

const offers = [
  { amount: "VIP", bonus: "STATUS", art: vip, price: "Ətraflı", vip: true },
  { amount: "12500", bonus: "25% BONUS", art: chest, price: "10000", badge: "Ən sərfəli təklif" },
  { amount: "6000", bonus: "20% BONUS", art: pot, price: "5000" },
  { amount: "2200", bonus: "10% BONUS", art: sack, price: "2000", badge: "Ən yaxşı seçim" },
  { amount: "500", art: box, price: "500" },
  { amount: "10", art: hearts, price: "10" },
  { amount: "20", art: rabbit, price: "Göndər", coin: true, gift: true },
  { amount: "20", art: rabbit, price: "Göndər", gift: true },
];

export function HeartShop({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [vipOpen, setVipOpen] = useState(false);
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="heart-shop-backdrop" />
        <DialogPrimitive.Content className="heart-shop" aria-describedby={undefined} onInteractOutside={event => { if (vipOpen) event.preventDefault(); }} onEscapeKeyDown={event => { if (vipOpen) event.preventDefault(); }} onCloseAutoFocus={(event) => {
          event.preventDefault();
          document.querySelector<HTMLButtonElement>(".heart-control")?.focus();
        }}>
          <div className="heart-shop-surface">
            <svg className="heart-shop-pattern" viewBox="0 0 586 176" fill="none" aria-hidden="true">
              <defs><path id="shop-outline-heart" d="M25 43C19 38 0 26 0 13C0 1 16-4 25 8C34-4 50 1 50 13C50 26 31 38 25 43Z" /></defs>
              <g className="heart-shop-pattern-lines" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <use href="#shop-outline-heart" transform="translate(66 -13) rotate(-18 25 22)" />
                <use href="#shop-outline-heart" transform="translate(159 31) rotate(15 25 22)" />
                <use href="#shop-outline-heart" transform="translate(275 -12) rotate(-18 25 22)" />
                <use href="#shop-outline-heart" transform="translate(379 35) rotate(-15 25 22)" />
                <use href="#shop-outline-heart" transform="translate(499 -15) rotate(-18 25 22)" />
                <use href="#shop-outline-heart" transform="translate(30 81) rotate(15 25 22)" />
                <use href="#shop-outline-heart" transform="translate(238 91) rotate(-18 25 22)" />
                <use href="#shop-outline-heart" transform="translate(439 78) rotate(15 25 22)" />
                <circle cx="28" cy="21" r="2" /><circle cx="121" cy="62" r="5.5" />
                <circle cx="222" cy="26" r="2" /><circle cx="330" cy="70" r="5.5" />
                <circle cx="458" cy="24" r="2" /><circle cx="550" cy="61" r="5.5" />
              </g>
            </svg>
            <DialogPrimitive.Title className="heart-shop-title">Buy hearts</DialogPrimitive.Title>
            <div className="heart-offers">
              {offers.map((offer, index) => (
                <article className={`heart-offer${offer.vip ? " vip-offer" : ""}`} key={index}>
                  {offer.badge && <span className={`offer-badge${index === 3 ? " pick-badge" : ""}`}>{offer.badge}</span>}
                  <div className="offer-heading">
                    <div className="offer-amount">
                      {!offer.vip && <img src={offer.coin ? coin : heart} alt={offer.coin ? "DAT" : "Hearts"} />}
                      <span>{offer.amount}</span>
                    </div>
                    {offer.bonus && <div className="offer-bonus">{offer.bonus}</div>}
                  </div>
                  <img className="offer-art" src={offer.art} alt="" draggable={false} />
                  <Button variant="reference" size="reference" onClick={() => { if (offer.vip) setVipOpen(true); }} className={`offer-price${offer.vip ? " vip-price" : ""}`} aria-label={offer.vip ? "VIP Ətraflı" : `${offer.amount} ${offer.coin ? "DAT" : "hearts"}, ${offer.price}${offer.gift ? "" : " DAT"}`}>
                    {offer.price}
                    {!offer.vip && !offer.gift && <img src={coin} alt="DAT" width={512} height={512} loading="lazy" />}
                  </Button>
                </article>
              ))}
            </div>
          </div>
          <DialogPrimitive.Close asChild>
            <Button variant="reference" size="reference" className="heart-shop-close" aria-label="Close Buy hearts"><X strokeWidth={3} /></Button>
          </DialogPrimitive.Close>
          <VipPopup open={vipOpen} onOpenChange={setVipOpen} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}