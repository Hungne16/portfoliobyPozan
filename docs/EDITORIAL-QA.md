# Editorial release validation

## Build and code
- `npm run build:vercel`: production compilation and TypeScript passed.
- `npm run build`: Vinext/Cloudflare build passed. Existing compatibility warning for Next webpack configuration and a large chunk warning remain.
- Targeted Oxlint on all changed TS/TSX files: passed.
- Full repository lint: 20 existing diagnostics in untouched `components/ui`, `hooks/use-mobile.ts`, and `app/admin/page.tsx`. Not represented as a clean full-repository lint run.
- Original project fields compared with the previous Git revision: all ten names, subtitles, categories, briefs, roles, processes, outcomes, years, images and URLs preserved.
- All ten live project URLs returned HTTP 200 using Windows curl with certificate validation. Python's certificate store failed for Framer; the OS-backed check succeeded without bypassing verification.

## Browser checks
Executed using Playwright CLI against the local Next production build, with earlier layout checks in development.
- Homepage widths: 375, 390, 430, 768, 1024, 1280, 1440, 1920. No horizontal document overflow after fixes. Ten projects present at each size.
- Design system: nine sections; no horizontal overflow at 375, 768 and 1440.
- All ten case studies opened, each retained four content blocks, and closed with Escape. Focus returns to the opening button. Background body overflow is hidden while modal is open.
- Reverse navigation exposed a stacked-card hit-target bug. Sticky positioning is now confined to the featured image, so later projects cannot cover earlier project buttons or hash targets.
- EN/VIE headings update after SplitText animation and retain the selected language after resizing across the desktop breakpoint.
- Mobile chapter menu opens, navigates to capabilities, closes and updates the URL hash.
- About, Visual Lab, Capabilities and Contact navigation indicators match the visible chapter.
- Reduced motion: intro released, no Three.js canvas created, CV visible, capability tags fully visible.
- All local hash targets resolve. No broken loaded images observed.
- Production browser pass: no application console errors. Resizing can produce an image preload warning; development hot reload warnings are not production errors.
- Visual checkpoints reviewed: hero desktop/mobile, featured work, mobile case study, capabilities, Visual Lab, contact and design system. Local screenshots are under ignored `output/playwright/`.

## Performance boundaries
- Featured scroll scenes reduced from ten to four; remaining work uses a compact archive.
- Kept the existing timing values for retained intro/scroll animations. Removed obsolete skill-matrix animation targets alongside the removed matrix UI.
- Existing Three.js dynamic import and device pixel-ratio cap retained. Reduced motion skips initialization; background rendering skips hidden documents.
- Reused existing images, lazy loading and image sizing. No new image, animation or UI library dependency added to the project.
- No claim of a measured 60fps score or Lighthouse score: these were not benchmarked.

## Remaining owner assets
Portrait, independently authored branding/visual studies, process sketches and prototype captures would make Visual Lab richer. Current entries are explicitly labeled details from existing projects, not invented commissions.
