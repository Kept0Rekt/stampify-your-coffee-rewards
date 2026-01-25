

# Stampify Enhancement Plan - Universal Digital Loyalty Wallet

## Overview

This plan transforms Stampify into a full-featured barbershop/salon loyalty app with Apple Wallet-style stacked cards, enhanced stamp visualization, premium features, and database integration.

---

## Phase 1: Database Schema & Core Infrastructure

### 1.1 Database Tables
Create the following tables with Row Level Security:

- **profiles** - Extended user data with plan status
- **businesses** - Barbershop/salon data (name, address, logo, brand color, reward info)
- **loyalty_cards** - User-business relationships with stamp counts
- **stamps** - Historical stamp entries with timestamps
- **rewards** - Completed cards with redemption codes

### 1.2 Plan System Updates
- Update plan mechanics: Free = 10 stamps, Premium = 7 stamps
- Add premium benefits tracking (Double Tuesday, Birthday 3x multiplier)
- Update `usePlan` hook to reflect new stamp requirements

---

## Phase 2: Wallet Page - Apple Wallet-Style Stacked Cards

### 2.1 Stacked Card Layout
Create a new `StackedCard` component with:

```text
+------------------------------------------+
|  Top Card (z-index: 3, 100% scale)       |
|  [Logo] Business Name        [Premium]   |
|  ●●●●●●●○○○  7/10 stamps                |
|  Last visit: 2 days ago    📍 0.3 mi     |
+------------------------------------------+
     +------------------------------------+    <- 96% scale, 56px offset
     |  Card 2 (25% visible)             |
     +------------------------------------+
          +-------------------------------+    <- 92% scale, 100px offset
          |  Card 3 (20% visible)        |
          +-------------------------------+
               [ +2 more cards ]
```

### 2.2 Card Interactions
- Pull-down gesture to fan out cards (Framer Motion spring animation)
- Tap to navigate to CardDetail (slide-up transition)
- Swipe left for delete/archive actions
- Long press for quick actions menu (call, directions, share)

### 2.3 Individual Card Design
- Business logo (48px circular avatar)
- Stamp progress: ●●●●●●●○○○ visual circles
- Progress text: "7 of 10 stamps"
- Last visit date
- Distance badge
- Premium indicator for premium users
- White background with 10% brand color gradient overlay

---

## Phase 3: Stamp Progress Visualization

### 3.1 Circle Grid Component
```text
Free Plan:     ●●●●●●●○○○  (10 circles)
Premium Plan:  ●●●●●○○     (7 circles)
```

### 3.2 Progress Bar Alternative
Add user setting to toggle between circle grid and progress bar display modes.

### 3.3 Stamp Earning Animation
- Circle fills with spring animation when stamp earned
- Confetti burst when reward unlocked (canvas-confetti library)
- Haptic-style scale feedback

---

## Phase 4: Card Detail Page Enhancements

### 4.1 Business Info Header
- Large business logo with brand color accent
- Business name and address
- Quick action buttons: Call, Directions

### 4.2 Progress Section
- Visual stamp grid (4-column layout)
- Progress bar below grid
- "X more stamps for: [Reward Name] ($value)" messaging

### 4.3 Premium Upsell Banner
For free users: "Go Premium - Get rewards 30% faster (7 stamps instead of 10)"

### 4.4 Stamp History Section
Chronological list of stamp entries with dates/times

### 4.5 Reward Unlocked State
- Celebration UI with confetti
- QR code for staff scanning
- "Show this code to staff to redeem"
- 30-day expiration notice
- "Redeem Now" button

---

## Phase 5: Dashboard (Home) Improvements

### 5.1 Hero Card - Closest to Reward
Prominent card showing the loyalty card nearest to unlocking a reward:
- Business logo and name
- Visual stamp progress
- "Just X more visits for [reward]"
- "View Card" button

### 5.2 Quick Actions Grid
- Scan (QR/NFC button)
- Wallet (view all cards)
- Go Premium (for free users only)

### 5.3 Recently Visited List
- Compact card rows
- Mini stamp circle indicators
- Last visit timestamp
- Tap to navigate to detail

---

## Phase 6: Premium Paywall Page

### 6.1 New Route: /premium
Create dedicated premium upgrade page with:

### 6.2 Visual Comparison
```text
FREE                    PREMIUM
○○○○○○○○○○             ○○○○○○○
10 stamps              7 stamps (30% faster)
```

### 6.3 Benefits List
- 7 stamps instead of 10 (30% faster rewards)
- Double stamps on Tuesdays
- 3x stamps in birthday month
- Stamps never expire (vs 90-day expiry)
- Priority customer support

### 6.4 Pricing Section
- $4.99/month
- "Start 14-Day Free Trial" CTA
- "Restore Purchases" link

---

## Phase 7: Profile Page Enhancements

### 7.1 Current Plan Card
Display active plan with:
- Premium badge or Free indicator
- "7 stamps to unlock rewards" or "10 stamps to unlock rewards"
- Upgrade/Manage Subscription button

### 7.2 Stats Section
- Total loyalty cards
- Rewards earned
- Total stamps collected
- Member since date

---

## Phase 8: Scan Screen

### 8.1 New Route: /scan
Camera viewfinder with:
- QR code scanning overlay
- Guide frame with corner markers
- Flash toggle button

### 8.2 Manual Entry Option
Fallback for entering codes manually

### 8.3 How It Works Section
- "Tap phone on NFC terminal"
- "Stamp added automatically"
- "Earn rewards!"

---

## Technical Details

### Files to Create
1. `src/pages/Premium.tsx` - Premium paywall page
2. `src/pages/Scan.tsx` - QR/NFC scan screen
3. `src/components/wallet/StackedCard.tsx` - Apple Wallet-style card
4. `src/components/wallet/StampGrid.tsx` - Circle grid visualization
5. `src/components/wallet/StampProgressBar.tsx` - Alternative progress bar
6. `src/components/card/BusinessHeader.tsx` - Business info header
7. `src/components/card/StampHistory.tsx` - Stamp history list
8. `src/components/card/RewardUnlocked.tsx` - Reward celebration UI
9. `src/components/card/PremiumUpsell.tsx` - Upgrade banner
10. `src/components/dashboard/HeroCard.tsx` - Closest to reward card
11. `src/components/dashboard/RecentVisits.tsx` - Recent visits list

### Files to Modify
1. `src/pages/Wallet.tsx` - Replace with stacked cards
2. `src/pages/CardDetail.tsx` - Add all new sections
3. `src/pages/Dashboard.tsx` - Add hero card and recent visits
4. `src/pages/Profile.tsx` - Add plan card and stats
5. `src/components/PlanSelectionModal.tsx` - Update benefits text
6. `src/hooks/usePlan.tsx` - Update stamp requirements (10/7)
7. `src/App.tsx` - Add /premium and /scan routes
8. `src/index.css` - Add stacked card and reward styles

### Database Migration
```sql
-- Tables: profiles, businesses, loyalty_cards, stamps, rewards
-- RLS policies for user data isolation
-- Indexes for query performance
```

### Dependencies to Add
- `canvas-confetti` - For reward celebration effects

---

## Animation Specifications

### Stacked Cards
- 3D perspective depth with CSS transform
- Spring animation for pull-to-expand
- translateY offsets: 0px, 56px, 100px
- Scale factors: 1.0, 0.96, 0.92
- Shadow depth increases with stack position

### Stamp Earning
- Circle fill: 0.4s spring with overshoot
- Confetti: 100 particles, 70 spread, y-origin 0.6

### Page Transitions
- CardDetail: slide-up from bottom
- Premium: fade + scale enter

---

## Testing Checklist
- Wallet cards stack correctly with 3D perspective
- Stamp progress updates in real-time
- Plan comparison shows 10 vs 7 stamps correctly
- Premium badge appears when user upgrades
- Animations maintain 60fps
- Touch targets are minimum 44px
- Dark mode styling is consistent
- Database queries are efficient
- RLS policies protect user data

