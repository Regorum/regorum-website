

## Analysis

The background zoom logic is already correct directionally: scale 4 (zoomed in) at the top → scale 1 (zoomed out) at the bottom. However, the `scrollProgress` is calculated as `scrollY / maxScroll`, where `maxScroll` is the entire page height. Since the page is long with multiple sections, the zoom change is spread across the entire scroll distance, making it very gradual and potentially imperceptible in the first viewport.

## Plan

**File: `src/routes/index.tsx`** — Change the scroll progress calculation so the zoom effect completes faster (within the first ~50% of the page scroll), making it much more noticeable:

Replace the progress calculation:
```js
const progress = Math.min(1, window.scrollY / Math.max(1, maxScroll));
```
with:
```js
const progress = Math.min(1, window.scrollY / (window.innerHeight * 2));
```

This maps the full zoom range (4→1) to roughly 2 viewport heights of scrolling, so the cloud zoom-out effect is clearly visible as the user leaves the hero section. The `scrollProgress` still goes 0→1, and scrolling back up reverses it (zoom back in).

No other files need changes — `AuroraBackground` and `ParticleCanvas` already respond correctly to `scrollProgress`.

