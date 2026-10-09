import { useEffect, useState } from "react";
import loadingAsset from "@/assets/opening-loading.jpg.asset.json";
const loading = loadingAsset.url;
import logoAsset from "@/assets/opening-logo.jpg.asset.json";
const logo = logoAsset.url;

export function OpeningScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const root = document.documentElement;
    const theme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    root.dataset['gameScreen'] = 'opening';
    if (theme) theme.content = getComputedStyle(root).getPropertyValue('--opening-background').trim();
    const showLogo = window.setTimeout(() => setPhase("logo"), 400);
    const fade = window.setTimeout(() => setPhase("leaving"), 2100);
    const finish = window.setTimeout(onComplete, 2400);
    return () => {
      window.clearTimeout(showLogo);
      window.clearTimeout(fade);
      window.clearTimeout(finish);
      root.dataset['gameScreen'] = 'table';
      if (theme) theme.content = getComputedStyle(root).getPropertyValue('--table-browser-theme').trim();
    };
  }, [onComplete]);

  return (
    <div className={`opening-screen opening-${phase}`} role="status" aria-label="Spin the Bottle açılıyor">
      <img className="opening-frame opening-loading-frame" src={loading} alt="" fetchPriority="high" draggable={false} />
      <img className="opening-frame opening-logo-frame" src={logo} alt="Spin the Bottle" fetchPriority="high" draggable={false} />
    </div>
  );
}