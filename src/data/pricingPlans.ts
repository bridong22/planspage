export type BillingPeriod = "monthly" | "yearly";
export type Price = number | "custom";

// ── Grow ─────────────────────────────────────────────────────────────────────
export const GROW_PLAN = {
  id: "grow" as const,
  name: "Grow",
  seats: 2,
  monthly: 10,
  yearly: 9,
  description:
    "For new coaches starting to grow a client base. Build and assign workouts, support your clients, and lay the foundation for your business.",
  featureTitle: "Included in Grow Plan:",
  features: [
    { label: "Custom client programs" },
    { label: "Client meal and macro tracking",      info: true },
    { label: "Habit streaks and badges" },
    { label: "Trainerize.me website profile",       info: true },
    { label: "Basic in-app messaging features" },
  ],
  optionalAddons: [
    "Advanced Nutrition Coaching",
    "Business",
    "Video Coaching",
    "Stripe Integrated Payments",
    "Custom Branded App (Grow)",
  ],
};

// ── Pro ──────────────────────────────────────────────────────────────────────
export type ProSeatOption = {
  seats: number;
  monthly: number;
  yearly: number;
};

export const PRO_SEAT_OPTIONS: readonly ProSeatOption[] = [
  { seats: 5,   monthly: 22,  yearly: 19.8  },
  { seats: 15,  monthly: 45,  yearly: 40.5  },
  { seats: 30,  monthly: 70,  yearly: 63    },
  { seats: 50,  monthly: 120, yearly: 108   },
  { seats: 75,  monthly: 165, yearly: 148.5 },
  { seats: 100, monthly: 200, yearly: 180   },
  { seats: 200, monthly: 225, yearly: 202.5 },
];

/** Seat count that shows "MOST POPULAR" ribbon per billing period. */
export const PRO_POPULAR_SEATS = 5;   // annual
export const PRO_POPULAR_SEATS_MONTHLY = 15; // monthly

export const PRO_PLAN = {
  id: "pro" as const,
  defaultSeats: 5,
  description:
    "For independent trainers and coaches getting started with existing clientele. Deliver programs, manage clients, and promote your brand.",
  featureTitle: "Includes everything in Grow, plus:",
  features: [
    { label: "Custom exercise videos" },
    { label: "Custom welcome emails" },
    { label: "Custom consultation forms" },
    { label: "Advanced in-app messaging features" },
    { label: "Leaderboard and threshold challenges" },
  ],
  optionalAddons: [
    "Advanced Nutrition Coaching",
    "Business",
    "Video Coaching",
    "Stripe Integrated Payments",
    "Custom Branded App (Pro)",
  ],
};

// ── Studio Plus ───────────────────────────────────────────────────────────────
export type StudioTier = 500 | 1000 | "1000+";

export type StudioSeatOption = {
  seats: StudioTier;
  monthly: Price;
  yearly: Price;
};

export const STUDIO_SEAT_OPTIONS: readonly StudioSeatOption[] = [
  { seats: 500,     monthly: 250,      yearly: 225      },
  { seats: 1000,    monthly: 350,      yearly: 315      },
  { seats: "1000+", monthly: "custom", yearly: "custom" },
];

export const STUDIO_PLAN = {
  id: "studio" as const,
  name: "Studio Plus",
  defaultTier: 500 as StudioTier,
  description:
    "For growing and established coaches. Simplify scheduling, communication, and client management to deliver high-quality programs as your business grows.",
  featureTitle: "Includes everything in Pro, plus:",
  features: [
    { label: "1-1 group video calls",              info: true },
    { label: "Custom recipes and meals" },
    { label: "Referral links and prospect booking", info: true },
    { label: "Access to partner add-ons",           info: true },
    { label: "Personalized onboarding support",     info: true },
    { label: "Full API access and support",         info: true },
  ],
  includedAddons: [
    "Advanced Nutrition Coaching",
    "Business",
    "Video Coaching",
    "Stripe Integrated Payments",
    "Custom Branded App (Studio)",
  ],
};

// ── helpers ───────────────────────────────────────────────────────────────────
export function formatPrice(p: Price): string {
  return p === "custom" ? "Custom" : `$${p}`;
}

export function proPrice(seats: number, billing: BillingPeriod): number {
  const row = PRO_SEAT_OPTIONS.find((o) => o.seats === seats);
  if (!row) return 0;
  return billing === "monthly" ? row.monthly : row.yearly;
}

export function studioPrice(tier: StudioTier, billing: BillingPeriod): Price {
  const row = STUDIO_SEAT_OPTIONS.find((o) => o.seats === tier);
  if (!row) return "custom";
  return billing === "monthly" ? row.monthly : row.yearly;
}
