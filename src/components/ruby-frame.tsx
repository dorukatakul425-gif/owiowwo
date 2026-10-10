import { useEffect, useId, useRef } from "react";
import frame from "@/assets/ruby-frame-sharp.png";
import { RUBY_FRAME_CYCLE_MS, RUBY_FRAME_DELAY_MS, rubyLightKeyframes } from "@/lib/ruby-frame-motion";

// Nine-slice keeps the original outer bounds while opening the avatar area.
const slices = [
  { source: 0, size: 150, target: 0, output: 82 },
  { source: 150, size: 468, target: 82, output: 604 },
  { source: 618, size: 150, target: 686, output: 82 },
];
const strips = [
  [102, 8, 224, 72], [442, 8, 224, 72],
  [102, 688, 224, 72], [442, 688, 224, 72],
  [8, 102, 72, 224], [8, 442, 72, 224],
  [688, 102, 72, 224], [688, 442, 72, 224],
];

export function RubyFrame({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const root = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animations: Animation[] = [];
    const update = () => {
      animations.forEach((animation) => animation.cancel());
      animations = [];
      if (media.matches || !root.current) return;
      root.current.querySelectorAll(".ruby-light-sweep").forEach((element) => {
        animations.push(element.animate(rubyLightKeyframes, {
          duration: RUBY_FRAME_CYCLE_MS, delay: RUBY_FRAME_DELAY_MS,
          iterations: Infinity, easing: "linear",
        }));
      });
    };
    update(); media.addEventListener("change", update);
    return () => { animations.forEach((animation) => animation.cancel()); media.removeEventListener("change", update); };
  }, []);
  return <svg ref={root} className={`ruby-frame ${className}`} viewBox="0 0 768 768" aria-hidden="true">
    <defs>
      <filter id={`${id}-clean`} colorInterpolationFilters="sRGB"><feComponentTransfer><feFuncA type="linear" slope="1.12" intercept="-0.12" /></feComponentTransfer></filter>
      <g id={`${id}-art`} filter={`url(#${id}-clean)`}>
        {slices.flatMap((vertical, row) => slices.map((horizontal, col) => {
          if (row === 1 && col === 1) return null;
          const clip = `${id}-slice-${row}-${col}`;
          return <g key={clip}><clipPath id={clip}><rect x={horizontal.target} y={vertical.target} width={horizontal.output} height={vertical.output} /></clipPath><g clipPath={`url(#${clip})`}><g transform={`translate(${horizontal.target} ${vertical.target}) scale(${horizontal.output / horizontal.size} ${vertical.output / vertical.size}) translate(${-horizontal.source} ${-vertical.source})`}><image href={frame} width="768" height="768" /></g></g></g>;
        }))}
      </g>
      <clipPath id={`${id}-feathers`}>{strips.map(([x, y, width, height], i) => <rect key={i} x={x} y={y} width={width} height={height} />)}</clipPath>
      <linearGradient id={`${id}-soft`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="white" stopOpacity="0" /><stop offset="0.5" stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" /></linearGradient>
      <mask id={`${id}-sweep`} maskUnits="userSpaceOnUse" x="0" y="0" width="768" height="768"><rect className="ruby-light-sweep" x="0" y="-100" width="768" height="100" fill={`url(#${id}-soft)`} /></mask>
      <filter id={`${id}-light`} colorInterpolationFilters="sRGB"><feComponentTransfer><feFuncR type="linear" slope="1.7" /><feFuncG type="linear" slope="1.7" /><feFuncB type="linear" slope="1.8" /></feComponentTransfer></filter>
    </defs>
    <use href={`#${id}-art`} />
    <g clipPath={`url(#${id}-feathers)`}><g mask={`url(#${id}-sweep)`}><use href={`#${id}-art`} filter={`url(#${id}-light)`} /></g></g>
  </svg>;
}