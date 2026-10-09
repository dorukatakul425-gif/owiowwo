import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import menu from "@/assets/menu.png.asset.json";
import achievements from "@/assets/menu-achievements.png.asset.json";
import ratings from "@/assets/menu-ratings.png.asset.json";
import bottle from "@/assets/menu-bottle.png.asset.json";
import styling from "@/assets/menu-styling.png.asset.json";
import boosters from "@/assets/menu-boosters.png.asset.json";

const items = [
  { label: "Nailiyyətlər", icon: achievements },
  { label: "Reytinqlər", icon: ratings },
  { label: "Şüşə", icon: bottle },
  { label: "Görünüş", icon: styling },
  { label: "Gücləndiricilər", icon: boosters },
];

export function GameMenu({ onAchievements, onBottle, onAppearance, onBoosters, onRatings }: { onAchievements: () => void; onBottle: () => void; onAppearance: () => void; onBoosters: () => void; onRatings: () => void }) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <Button variant="reference" size="reference" className="menu-control" aria-label="Menyu" title="Menyu">
          <img src={menu.url} alt="" draggable={false} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="game-menu" aria-label="Oyun menyusu" align="center" side="bottom" sideOffset={12} collisionPadding={8}>
          {items.map((item) => (
            <DropdownMenu.Item className="game-menu-item" key={item.label} onSelect={() => { if (item.label === "Reytinqlər") onRatings(); if (item.label === "Nailiyyətlər") onAchievements(); if (item.label === "Şüşə") onBottle(); if (item.label === "Görünüş") onAppearance(); if (item.label === "Gücləndiricilər") onBoosters(); }}>
              <img src={item.icon.url} alt="" draggable={false} />
              <span>{item.label}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}