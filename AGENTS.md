<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep reference tea timing and avatar-relative geometry in `src/lib/tea-motion.ts` so playback and regression tests share one model.
- Play recorded gift samples through a browser-only, tap-resumed Web Audio context so delayed arrival audio works on mobile without synthesized replacements.
- Keep crown flight geometry and deterministic particle timing in `src/lib/crown-motion.ts` so playback and regression tests share one reference model.
- Share recorded tea and crown playback in `src/lib/gift-audio.ts` through one browser-only AudioContext so mobile tap unlocking applies to both gift types.
- Keep tomato flight timing and avatar-relative docking in `src/lib/tomato-motion.ts` so playback and regression tests share one model.
