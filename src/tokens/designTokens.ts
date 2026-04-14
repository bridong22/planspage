/**
 * Growth Design System — programmatic tokens.
 * Source of truth for values is `src/index.css` (:root --ds-*).
 * Keep these in sync when colors or layout constants change.
 */
export const colors = {
  brand: {
    yellow: "#ffca10",
    yellowLight: "#ffdc60",
    yellowPanel: "#fff4cf",
    blue: "#4094f7",
    blueLight: "#9bcffd",
    blueHover: "#5da7ff",
  },
  semantic: {
    success: "#45c987",
    successDark: "#3aa771",
    successSoft: "#daf4e7",
    danger: "#ff5c6e",
    warning: "#ffa450",
  },
  neutral: {
    900: "#241f20",
    800: "#151112",
    600: "#6d6a6a",
    400: "#b6b4b5",
    300: "#a3a3a3",
    border: "#e7e7e7",
    surfaceMuted: "#f8f8f8",
    surfaceCanvas: "#ffffff",
  },
} as const;

export const spacingPx = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
} as const;

export const layout = {
  contentMaxWidthPx: 1280,
  modalMaxSmPx: 650,
  modalMaxMdPx: 740,
  modalMaxLgPx: 922,
  modalOnboardingWidthPx: 1280,
} as const;
