# E-Commerce AI Decision Platform - Frontend Implementation Plan

This document outlines the frontend architecture, UI/UX flow, and integration points for the E-Commerce AI Decision Platform, designed to help users make smarter shopping decisions.

## Architecture Decisions
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (for rapid, flexible styling)
- **Animations:** Framer Motion (for dynamic UI elements like expanding search)
- **Charts:** Recharts (for price history trends)

## 1. Project Setup & Core
- Initialize Next.js (App Router) in the `frontend` folder.
- Configure Dark/Light mode theme transitions.
- Apply a premium, glassmorphism-inspired aesthetic with modern color palettes.

## 2. Layout & Navigation
### `components/Sidebar.tsx`
- Fixed left sidebar navigation.
- Top: Wishlist, Search History.
- Bottom: User Profile, Theme Toggle.

## 3. Login Page
### `app/login/page.tsx`
- Vibrant, animated background.
- Central glassmorphic login card.

## 4. Landing Page (Scroll-Snap Editorial)
### `app/page.tsx`
- High-end, luxury editorial design with Framer Motion animations.
- `snap-mandatory` scroll container for presentation-style slides.
- **Sections:**
  - Hero with cinematic video background.
  - Problem statement with animated count-up statistics.
  - Four feature slides showcasing core AI agents (Price, Bot Review, Budget/Gift, Return Risk).
  - Call to Action & Premium Footer.
- Global theme-aware styling.

## 5. Dashboard / Main App
### `app/dashboard/page.tsx` (Future Implementation)
- Split-screen dynamic search area.
- **Left Panel:** Product Search (URL or Name).
- **Right Panel:** Smart Advisor Search (Budget, Intent).
- **Animation:** Hovering/clicking on one side smoothly expands it, shrinking the other side. "OR" separator in the middle.

## 5. Single Product Results (Price Hunter & Risk)
### `app/product/[id]/page.tsx`
- Detailed view for a specific product.
- Price History chart.
- **AI Action Stamps:**
  - **BUY:** Green, prominent. Navigates to cheapest source.
  - **WAIT:** Yellow. Hovering reveals animated tooltip (e.g., "Drops to X₺ in Y days").
  - **ALTERNATIVE:** Blue. Clicking opens a list of better price/performance alternatives.
- **Fake Review & Risk Stamp:** A percentage-based trust score badge placed near the action stamps.

## 6. Multi-Product Results (Smart Advisor)
### `app/search/page.tsx`
- Results page for Smart Advisor searches.
- Top Filters: Price, User Rating, Fake Review Risk.
- Grid of advanced product cards featuring AI scores.

## 7. Backend Integration
- See `docs/api_contract.md` for the defined API endpoints and JSON structures.
- Frontend will initially use mock data conforming to this contract.
