# POZAN editorial evolution — 2026-09-17

## Baseline

- Next.js App Router / React, with a secondary Vinext Cloudflare build. No framework migration.
- Existing routes: home, admin and project-image API. Vercel uses a Cloudflare environment shim and authored fallback data. Admin remains on the existing hosted backend.
- Ten authored projects, each with image, live URL, brief, role, process and result, were embedded in app/page.tsx.
- Existing GSAP intro, scroll-linked sections, Three.js world, custom cursor, CV portal and language switcher.
- Process described categories of work rather than a method. Skills emphasized a technical matrix. Project case studies used fixed details elements within transformed ancestors.
- Language switching replaces DOM text while SplitText owns heading markup; this requires an explicit revert/rebuild lifecycle.
- Assets: ten project screenshots and anime-studio.png. No verified portrait or separate branding/visual experiment assets.

## Implementation boundaries

- Preserve project text, links, admin behavior, intro and the timing/trigger parameters of retained animation sequences.
- Move authored project data into data/projects.ts. Four featured entries retain project scroll choreography; six archive entries use a compact grid.
- New Visual Lab items explicitly reference existing screenshots and link back to their source projects.
- Native modal dialogs avoid transformed stacking contexts, provide focus containment and Escape, and restore trigger focus. Body scroll is locked while open.
- Existing fonts retained. Tokens and editorial presentation live in styles/tokens.css and styles/editorial.css; shared components power the public /design-system reference.
- Remove unverified experience duration rather than assert it. Skills are areas of practice, not proficiency scores.
- No client names, outcomes, awards or metrics added.

## Asset gaps

Owner portrait; original branding studies; original visual experiments; process sketches and prototype captures. Supply only work that can be attributed accurately. Existing project screenshots remain transparently labeled in Visual Lab.
