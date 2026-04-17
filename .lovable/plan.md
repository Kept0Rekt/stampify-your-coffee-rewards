
Looking at the current `OnboardingFlow.tsx`, the screens array order is:
1. Digital Loyalty Cards
2. Tap to Earn Stamps (NFCTapAnimation)
3. Join New Cafés (QRScanAnimation)
4. Earn Rewards Faster
5. Privacy & Permissions

User wants to swap #2 and #3, then fix the NFC tap animation.

For the NFC animation fix, based on prior conversation the user previously asked to smooth phone motion, straighten upright at contact, and clearly show stamp addition. I should re-examine `NFCTapAnimation.tsx` to verify timing/upright behavior is solid and propose targeted refinements.

## Plan

**1. Reorder onboarding screens in `src/components/onboarding/OnboardingFlow.tsx`**
- Swap positions of the NFCTap (Tap to Earn Stamps) and QRScan (Join New Cafés) entries in the `screens` array.
- New order:
  1. Digital Loyalty Cards
  2. Join New Cafés (QR)
  3. Tap to Earn Stamps (NFC)
  4. Earn Rewards Faster
  5. Privacy & Permissions
- No other logic changes needed — pagination, dots, and transitions are index-driven.

**2. Polish `src/components/onboarding/animations/NFCTapAnimation.tsx`**
- Smooth phone trajectory: use a single eased motion path (approach → contact) with consistent spring config, removing any abrupt rotation jumps.
- Ensure the phone is fully upright (rotate: 0) at the moment of contact and stays upright through the stamp reveal.
- Improve stamp-add clarity:
  - On contact, briefly pulse/scale the loyalty card.
  - Animate the new stamp filling in with a clear scale + glow + check icon.
  - Add a subtle "+1 Stamp" label that fades in/out near the card.
- Tighten phase timings so the sequence reads: approach → upright contact → ripple → stamp pop → success → reset.
- Keep all existing visual elements (terminal, ripples, success indicator), just refine timing and easing.

**3. Verify**
- Confirm the swap visually in the carousel (dots still work, swipe direction unchanged).
- Confirm the NFC animation loops cleanly with the phone upright at contact and a clearly visible stamp addition.

No new files, no dependency changes, no backend changes.
