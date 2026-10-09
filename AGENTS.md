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

- Preserve the host TanStack runtime and keep the uploaded game's presentation in focused components on the index route, so importing a game does not replace deployment configuration.
- Use project-scoped Lovable Asset pointers for all imported game media, because archived pointers belong to a different project.
- Keep the friends view in a controlled Radix dialog with the shared heart-shop animation and session-only visibility selection, because this request changes presentation rather than account permissions.
- Implement contact as a controlled Radix dialog with shared heart-shop motion and a native mailto link, because composing in the user's mail app needs no email service or server integration.
- Keep booster inventory, help and selected-item details in nested controlled Radix dialogs with independent dismissal and shared heart-shop motion, because closing a top popup must preserve the underlying inventory.
- Keep ratings in a controlled Radix dialog with nested independent help and a Radix period menu, with browser-safe demonstration data separated from presentation, because this is a reference UI request rather than a live ranking service.
