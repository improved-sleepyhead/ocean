# Project Review: Ocean Notion Clone

Date: 2026-06-09
Branch: fix/blocknote-cold-render
Scope: frontend review, BlockNote cold render optimization, DevTools MCP smoke testing.

## Summary

The slow first note open is consistent with a cold BlockNote/editor bundle: the first document page has to load and initialize the editor libraries, while later notes reuse the browser cache. I kept the fix local and avoided a larger refactor.

Changes made:

- Preload the editor chunk after authenticated app layout mounts, so /documents can warm BlockNote before the first note click.
- Preload the editor chunk immediately on direct /documents/[documentId] and /preview/[documentId] route entry, overlapping editor download with the Convex document query.
- Move dynamic import of the editor out of the render path and add a stable loading fallback.
- Key the editor by documentId to avoid reusing the previous editor instance while switching notes.
- Replace the 500 ms polling autosave loop with BlockNoteView.onChange, which BlockNote documents as the content-change callback: https://www.blocknotejs.org/docs/getting-started/editor-setup
- Stop the initial editor mount from immediately writing unchanged content back to Convex.
- Lazy-load the PDF export button only when the document menu opens, and remove a dead static export import from the navbar.
- Remove the preview page unused update mutation; preview remains read-only.

Production build route table stayed the same for document routes (/documents/[documentId]: 233 kB First Load JS before and after). The intended win is earlier async editor loading and less editor CPU/network work during initialization, not shrinking the BlockNote library itself.

## DevTools MCP Results

Tested with Chrome DevTools MCP against http://localhost:3000.

Checked:

- / loads and renders the marketing page.
- /documents without an authenticated Clerk session redirects back to /, as expected.
- The Clerk sign-in modal opens from the Russian login button.
- Network and console were inspected after reloads.

Limitations:

- I could not fully open an authenticated note editor in MCP because no test Clerk account/session was available in the browser context.
- Because of that, the editor-specific validation is based on code review, production build, route chunk inspection, and the official BlockNote onChange API rather than interactive editing in a real note.

Observed in DevTools:

- Repeated 404: /ocean_project/public/assets/Montserrat-VariableFont_wght.ttf. The CSS points at a filesystem-like public path instead of a Next public URL such as /assets/Montserrat-VariableFont_wght.ttf.
- Next image warning: logo_light.svg has one dimension altered without preserving the other dimension.
- Next LCP warning: above-the-fold logo is detected as LCP and should use priority if it remains above the fold.
- Clerk loads several remote browser chunks on public/auth pages; expected for the current provider setup.

## Review Findings

### High

1. Dependency security debt: npm install reports 64 vulnerabilities, including 5 critical and 17 high. This should be handled as a separate dependency/security pass, not mixed into the render fix.

2. Production build depends on an env workaround. Plain npm run build fails with No address provided to ConvexReactClient because the app reads NEXT_PUBLIC_CONVEX_URL, while the local .env only exposes CONVEX_DEPLOYMENT for that purpose. Build passes when NEXT_PUBLIC_CONVEX_URL is supplied from the local env workaround.

3. convex/documents.ts starts recursive archive/restore operations without awaiting them. archive and restore can return before child documents are patched, creating inconsistent UI state and possible race conditions.

### Medium

4. convex/documents.ts:getById throws when a document is missing, while the UI checks document === null. That not-found branch is likely unreachable for missing documents; users may see an error boundary instead.

5. npm run lint is currently red from existing unrelated issues: unused imports/vars in settings modal, navigation, user item, toolbar, logo, marketing page; any usage and a11y issues in the local PDF exporter; empty interface lint issues in UI primitives.

6. The custom PDF exporter tree is large and lint-heavy. It should stay out of the initial note render path. The current change lazy-loads the export button from the menu, but the exporter code itself still needs cleanup if PDF export is kept.

7. Global font-face path in app/globals.css is wrong and causes repeated 404s. This adds noisy failed requests on every page.

### Low

8. Logo image warnings on the marketing page can affect LCP reporting and console cleanliness.

9. next.config.mjs disables ESLint during build, which hides lint regressions from production builds.

10. README.md is still the default create-next-app text and does not document required local env names, Clerk/Convex setup, or the build workaround.

## Verification

Passed:

- ./node_modules/.bin/tsc --noEmit
- NEXT_PUBLIC_CONVEX_URL env workaround + npm run build
- DevTools MCP smoke check for /, /documents unauth redirect, Clerk sign-in modal, network/console inspection

Failed / blocked:

- npm run lint fails on existing unrelated lint debt listed above.
- Plain npm run build fails without NEXT_PUBLIC_CONVEX_URL.
- Authenticated editor interaction was not tested because no test Clerk session/account was available.

## Files Changed

- components/editor.tsx
- app/(main)/layout.tsx
- app/(main)/(routes)/documents/[documentId]/page.tsx
- app/(public)/(routes)/preview/[documentId]/page.tsx
- app/(main)/_components/menu.tsx
- app/(main)/_components/navbar.tsx
- app/(main)/_components/export.tsx
- docs/review.md
