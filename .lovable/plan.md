
The user wants to redesign all loyalty cards across the app (Wallet, Onboarding `DigitalCardsAnimation`, and any other surfaces) using a credit-card-inspired layout. Key requirements distilled from the prompt + reference:

- **Color**: Light brown / caramel tones matching the Stampify logo (NOT the dark aurora theme, NOT theme switcher).
- **Layout**: Credit-card shape with:
  - **Top-right**: Stampify logo (replacing MasterCard logo).
  - **Top-left**: Cafe logo + cafe name beside it.
  - **Bottom**: Stamp progress (replacing card number/holder name).
- **Scope**: Apply to `LoyaltyCard.tsx` (Wallet + Home), and the wallet card visual inside `DigitalCardsAnimation.tsx` (onboarding).
- **Exclude**: Theme switcher, color picker, dark aurora gradient — user explicitly said "don't include the ability to change colours."

Let me check the current LoyaltyCard and Wallet/Index to understand all surfaces.

I already have `LoyaltyCard.tsx` (full content above) and `DigitalCardsAnimation.tsx` (full content above). The wallet card in `DigitalCardsAnimation` already uses the caramel gradient + Stampify logo + stamp grid — so it's already close to the desired design. The main work is redesigning `LoyaltyCard.tsx` to match this credit-card aesthetic, and ensuring the onboarding's wallet card visual aligns with the new style.

I should also check `Index.tsx` to see if it renders loyalty cards independently.

Need to verify: does `src/pages/Index.tsx` render loyalty cards? Let me note this as a quick check during implementation — but based on file list, the home/dashboard likely uses `LoyaltyCard` too. Either way, updating `LoyaltyCard.tsx` covers both surfaces.

The user also pasted an `AuroraCard` template, but explicitly said NOT to include theme switching and to use light brown. So the aurora card is just inspiration for the credit-card layout — I will NOT install it as-is. I'll borrow only the credit-card structural idea (rounded rectangle, top-row branding, bottom-row details) and apply our caramel palette.

## Plan

### 1. Redesign `src/components/ui/LoyaltyCard.tsx` as a credit-card

Replace the current beige stamp-grid layout with a credit-card-style design:

- **Card shape**: Rounded 2xl rectangle with credit-card aspect ratio (roughly 1.586:1, or comfortable mobile equivalent).
- **Background**: Light brown caramel gradient matching the Stampify logo (use the same gradient already in `DigitalCardsAnimation`: `linear-gradient(135deg, hsl(38 52% 54%) 0%, hsl(32 48% 46%) 50%, hsl(26 44% 38%) 100%)`).
- **Subtle border highlight + shine** like the onboarding wallet card.
- **Top row**:
  - Left: Cafe logo (circular, ~36px) + cafe name in white semibold.
  - Right: Stampify logo (`stampify-logo.png`) at ~26px height with subtle drop shadow.
- **Middle/bottom**: Stamp progress as a horizontal row of small white circles (filled vs outlined), matching the onboarding wallet card style (5 columns × 2 rows for 10, single row for 7).
- **Bottom-right**: Small counter "X / Y" in white.
- **Status pill**: When reward ready, replace the chevron with a small "Claim" pill in white-on-caramel (or keep the existing primary-colored pill but restyled to fit the dark caramel background).
- **Expandable map section**: Keep the existing `LocationMap` expansion behavior; transition border to match the new card color.
- Keep the `motion.button` toggle, chevron, and `framer-motion` layout transitions.

### 2. Update `src/components/onboarding/animations/DigitalCardsAnimation.tsx`

The wallet card visual is already very close to the target design (caramel gradient, Stampify top-right, stamp grid). Two small adjustments to match the new `LoyaltyCard`:
- Add a **cafe logo + cafe name on the top-left** of the wallet card (use a Coffee lucide icon in a small white circle + a sample cafe name like "Brew & Bean") so the onboarding visual matches what users will see on the Wallet/Home screens.
- Move the Stampify logo to the top-right (it already is), and the counter "1 / 10" can stay below or beside the stamps.

### 3. No changes to data, plan logic, or `LocationMap`

- `stampsRequired` (10 free / 7 premium) unchanged.
- `Wallet.tsx` and `Index.tsx` continue to pass the same props to `LoyaltyCard`.
- `LocationMap` expansion stays intact.

### 4. Skip the AuroraCard install

We are NOT adding `aurora-card.tsx` as a new file. The user explicitly excluded the theme switcher and dark aurora colors. We use the credit-card *layout idea* only, applied with our existing caramel palette.

### Files to edit
- `src/components/ui/LoyaltyCard.tsx` — full redesign to credit-card style.
- `src/components/onboarding/animations/DigitalCardsAnimation.tsx` — add cafe logo + name to top-left of the wallet card so onboarding matches the new card design.

### Visual reference (ASCII)
```text
┌──────────────────────────────────────────┐
│ ◉ Brew & Bean              [Stampify]    │
│                                          │
│                                          │
│   ● ● ○ ○ ○                              │
│   ○ ○ ○ ○ ○                    3 / 10    │
└──────────────────────────────────────────┘
```
Caramel gradient background, white text, white stamp circles (filled = collected).
