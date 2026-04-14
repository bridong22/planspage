# Growth Design System

This project implements the **Growth DS v1.0** tokens from the Figma library *Growth Design System Library*. Values are defined in CSS as `--ds-*` custom properties in [`src/index.css`](src/index.css). Legacy pricing styles use `--tz-*` aliases that map to the same tokens.

Optional programmatic access: [`src/tokens/designTokens.ts`](src/tokens/designTokens.ts) (keep in sync with CSS when editing hex values).

---

## 1. Using tokens in CSS

Prefer **`var(--ds-…)`** for new styles. Existing BEM classes (`pcard`, `billing`, etc.) continue to use **`var(--tz-…)`**, which resolves to the design system.

| Need | Variable |
|------|----------|
| Page background | `var(--ds-color-surface-muted)` |
| Card / surface | `var(--ds-color-surface-canvas)` |
| Primary text | `var(--ds-color-text-primary)` |
| Secondary text | `var(--ds-color-text-muted)` |
| Default border | `var(--ds-color-border)` |
| Primary button / links | `var(--ds-color-action-primary)` |
| Focus / selection ring | `var(--ds-color-focus-ring)` |
| Success (checks, positive) | `var(--ds-color-semantic-success)` |
| Entry / signup CTA (yellow) | `var(--ds-color-entry-cta)` |
| Danger / destructive | `var(--ds-color-semantic-danger)` |
| Warning | `var(--ds-color-semantic-warning)` |

---

## 2. Color tokens

### Brand

| Token | Hex | Usage |
|-------|-----|--------|
| `--ds-color-brand-yellow` | `#ffca10` | Signup / entry CTAs (not general in-app primary) |
| `--ds-color-brand-yellow-light` | `#ffdc60` | Highlights, gradients, ribbons |
| `--ds-color-brand-yellow-panel` | `#fff4cf` | Highlight panels (e.g. add-ons included) |
| `--ds-color-brand-blue` | `#4094f7` | Primary actions, links, focus accents |
| `--ds-color-brand-blue-light` | `#9bcffd` | Focus rings, soft selection borders |
| `--ds-color-brand-blue-hover` | `#5da7ff` | Hover for blue actions |

### Semantic

| Token | Hex |
|-------|-----|
| `--ds-color-semantic-success` | `#45c987` |
| `--ds-color-semantic-success-dark` | `#3aa771` |
| `--ds-color-semantic-success-soft` | `#daf4e7` |
| `--ds-color-semantic-danger` | `#ff5c6e` |
| `--ds-color-semantic-warning` | `#ffa450` |

### Neutrals

| Token | Hex |
|-------|-----|
| `--ds-color-neutral-900` | `#241f20` |
| `--ds-color-neutral-800` | `#151112` |
| `--ds-color-neutral-600` | `#6d6a6a` |
| `--ds-color-neutral-400` | `#b6b4b5` |
| `--ds-color-neutral-300` | `#a3a3a3` |
| `--ds-color-border` | `#e7e7e7` |
| `--ds-color-surface-muted` | `#f8f8f8` |
| `--ds-color-surface-canvas` | `#ffffff` |

---

## 3. Spacing scale

8px-based scale (also 4px steps). All in `rem` (16px root).

| Token | Rem | Px |
|-------|-----|-----|
| `--ds-space-1` | 0.25 | 4 |
| `--ds-space-2` | 0.5 | 8 |
| `--ds-space-3` | 0.75 | 12 |
| `--ds-space-4` | 1 | 16 |
| `--ds-space-5` | 1.25 | 20 |
| `--ds-space-6` | 1.5 | 24 |
| `--ds-space-8` | 2 | 32 |
| `--ds-space-10` | 2.5 | 40 |
| `--ds-space-12` | 3 | 48 |
| `--ds-space-14` | 3.5 | 56 |
| `--ds-space-16` | 4 | 64 |

**Patterns:** 4px icon–label gaps, 8px tight stacks, 16px card padding, 24px section gaps, 32px modal padding, 48–64px page margins.

---

## 4. Typography

**Font stack:** Mulish (see `--ds-font-family` on `body`).

| Role | CSS variables | Notes |
|------|----------------|--------|
| H1 | `--ds-text-h1-size` / `--ds-text-h1-line` | 40px / 48px — page titles |
| H2 | `--ds-text-h2-size` / `--ds-text-h2-line` | 32px / 40px |
| H3 | `--ds-text-h3-size` / `--ds-text-h3-line` | 24px / 32px |
| H4 | `--ds-text-h4-size` / `--ds-text-h4-line` | 20px / 28px |
| Body | `--ds-text-body-size` / `--ds-text-body-line` | 16px / 24px — default on `body` |
| Small | `--ds-text-small-size` / `--ds-text-small-line` | 14px / 20px |
| Tiny | `--ds-text-tiny-size` / `--ds-text-tiny-line` | 12px / 16px |
| Label caps | `--ds-text-label-caps-*` | 12px, wide tracking — form labels |

---

## 5. Radius and elevation

### Border radius

| Token | Value | Typical use |
|-------|--------|-------------|
| `--ds-radius-sm` | 4px | Buttons, small controls |
| `--ds-radius-md` | 6px | Chips, inputs |
| `--ds-radius-lg` | 8px | Cards, seat steppers |
| `--ds-radius-xl` | 12px | Modals, panels |
| `--ds-radius-card` | 10px | Pricing cards (current product default) |
| `--ds-radius-full` | 999px | Pills, billing toggle |

### Shadows

| Token | Use |
|-------|-----|
| `--ds-shadow-sm` | Inputs, tags |
| `--ds-shadow-md` | Dropdowns |
| `--ds-shadow-lg` | Modals |
| `--ds-shadow-card` | Default card elevation (pricing) |

---

## 6. Layout constants

| Token | Value |
|-------|--------|
| `--ds-content-max-width` | 80rem (1280px) |
| `--ds-modal-max-sm` | 650px |
| `--ds-modal-max-md` | 740px |
| `--ds-modal-max-lg` | 922px |
| `--ds-modal-onboarding-width` | 1280px |

Grid guidance from DS: 12 columns desktop / 4 mobile; gutter 24px desktop, 16px mobile.

---

## 7. Legacy aliases (`--tz-*`)

Existing components reference these; they point at `--ds-*` and should not diverge.

| Legacy | Resolves to |
|--------|-------------|
| `--tz-black` | `--ds-color-text-primary` |
| `--tz-muted` | `--ds-color-text-muted` |
| `--tz-border` | `--ds-color-border` |
| `--tz-bg` | `--ds-color-surface-muted` |
| `--tz-white` | `--ds-color-surface-canvas` |
| `--tz-blue` | `--ds-color-action-primary` |
| `--tz-blue-ring` | `--ds-color-focus-ring` |
| `--tz-green` | `--ds-color-semantic-success` |
| `--tz-green-soft` | `--ds-color-semantic-success-soft` |
| `--tz-yellow` | `--ds-color-brand-yellow-light` |
| `--tz-yellow-strong` | `--ds-color-brand-yellow` |
| `--tz-yellow-panel` | `--ds-color-brand-yellow-panel` |
| `--radius-card` | `--ds-radius-card` |
| `--shadow-card` | `--ds-shadow-card` |

---

## 8. Component and UX rules (from DS)

- **One primary CTA** per modal or surface; pair with tertiary dismiss where needed.
- **Brand yellow** for signup / entry; **blue** for in-app primary actions.
- **Billing toggle** above plan cards; show **Save 10%** (or product copy) on annual.
- **Featured plan:** blue border / emphasis; avoid two competing primaries side by side.
- **Forms:** required `*`; errors below field; disabled ≈ reduced interaction + muted styles.
- **Modals:** visible close control; don’t stack modals; avoid re-showing dismissed modals in the same session without cause.

---

## 9. Figma reference

File: [Growth Design System Library](https://www.figma.com/design/ouYJq4yCtLq7xtNIVjR49q/Growth-Design-System-Library) — Foundations, Buttons, Modals, Form inputs, Pricing, Onboarding, Acquisition, Lifecycle.

---

## 10. Changelog (repo)

- **Design tokens** added under `:root` as `--ds-*` with `--tz-*` aliases.
- **Body** typography tied to `--ds-font-family`, body size, and line-height tokens.
- **Pricing UI** hardcoded grays/radius partially migrated to tokens (`--ds-radius-*`, `--ds-color-neutral-800`, etc.).
- **`src/tokens/designTokens.ts`** added for TS constants (colors, spacing px map, layout widths).
