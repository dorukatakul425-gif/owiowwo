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

- Preserve the imported game's TanStack bootstrap and frontend modules so the preview remains compatible with the target repository.
- Keep rocket flight timing and avatar-relative docking in src/lib/rocket-motion.ts so the animation and regression tests share the same measurements.
- Render the rocket's falling star trail separately from its brief arrival flash and settling gold specks so the recorded effect phases remain independently measurable.
- Emit rocket trail particles at fixed timestamps using the shared motion module so frame rate does not change their density or lifetime.
- Use the shared tap-resumed browser AudioContext for recorded gift audio so mobile arrival sounds remain unlocked.
- Keep the rocket overlay mounted alongside the gift drawer so closing the drawer does not interrupt deliveries.
- Retain one static rocket star mark per recipient after delivery; redraw on layout changes rather than running a permanent animation loop.
- Keep bottle image selection in the shared bottle catalog and use it for both the chooser and table, including the default, so sharper artwork cannot be bypassed by an old table asset.
- Render the ruby frame through shared nine-slice artwork to adjust border thickness without resizing its container; animate a clipped downward light sweep using the shared timing module, never the feathers or jewels themselves.
