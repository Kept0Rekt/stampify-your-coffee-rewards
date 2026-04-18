
The user reports the first onboarding slide still starts mid-animation when first opened. Looking at `DigitalCardsAnimation.tsx`, the issue is that the initial state of the paper cards uses `opacity: 1, scale: 1` and the wallet card starts at `opacity: 0, scale: 0.3`, but during the slide-in transition (`slideVariants` translates the whole panel from x: 100% → 0 over ~450ms), the user already sees the cards in their "ready to scatter" position. So by the time the 500ms timer kicks in and `phase` flips to `scatter`, the user has missed the initial reveal — and because the paper cards' "scatter" animation here is actually the merge/disappear (they animate from scattered → center+fade), the user only ever sees them disappearing.

Wait — re-reading: the paper cards' `initial` state IS the scattered position (initialX/Y/rotate). They only animate when `phase === "merge"`. So actually the "scatter" phase does nothing visible — paper cards just sit there scattered. Then on "merge", they fly to center and fade out while wallet card scales in.

The real bug: during the 450ms slide-in, the cards are visible scattered. That's fine. But the wallet card has `initial={{ scale: 0.3, opacity: 0 }}` and only animates on merge — so the user sees scattered paper cards during slide-in (good), then they should merge into wallet. That should work.

The user says "starts halfway through." This likely means: the AnimatePresence `mode="wait"` + slide transition takes time, AND the component mounts immediately, so the `requestAnimationFrame` + 500ms timer fires while the slide is still translating in. The paper cards animate their `initial` props, but framer-motion may be applying the scattered transform AFTER an initial mount paint at default (0,0). Also, on first mount of the entire OnboardingFlow, there's no enter animation for index 0 (since `initial={false}` on AnimatePresence) — so timing differs from later visits.

Fix approach: 
1. Replace timer-based phase progression with a proper sequenced animation that starts only after the component is fully mounted AND visible. Use a single `useEffect` with an `isReady` flag set via `requestAnimationFrame` (double rAF for paint guarantee), then increase initial delay to ~700ms to fully clear slide-in.
2. Add an explicit `initial="idle"` reveal for the paper cards (start at center scale 0, then animate OUT to scattered positions during the "scatter" phase) so the user actually SEES the scatter happen from the beginning. Then merge → wallet card.
3. Ensure the wallet card stays hidden (opacity 0, scale 0) during idle and scatter phases.

This way, regardless of when the user opens it, the sequence is always: blank → cards fly out to scatter → cards merge to center → wallet card appears.

## Plan

**File:** `src/components/onboarding/animations/DigitalCardsAnimation.tsx`

1. **Add a true "reveal" phase** so the animation has a visible start:
   - Paper cards `initial`: `{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0 }` (hidden at center).
   - On `phase === "scatter"`: animate to scattered positions with `opacity: 1, scale: 1`.
   - On `phase === "merge"`: animate back to center, fade out.
   - Wallet card stays at `opacity: 0, scale: 0.3` until `phase === "merge"`.

2. **Robust mount gating** so it always starts from frame 0:
   - Use double `requestAnimationFrame` (ensures one full paint) before scheduling timers.
   - Increase initial delay to ~600–700ms to clear the slide-in transition (~450ms spring).
   - Sequence: idle (0ms) → scatter (600ms) → merge (1500ms) → complete (2700ms).

3. **Reset on unmount/remount**: Component already remounts per slide change via `key={currentIndex}`, so `phase` state resets correctly. Just ensure no stale timers (cleanup already in place).

No other files need changes. No backend changes.
