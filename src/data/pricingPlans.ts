export type BillingPeriod = "monthly" | "yearly";
export type Price = number | "custom";

/** Feature row — info:true shows the tooltip icon, tooltip holds the hover copy */
export type FeatureItem = {
  label: string;
  info?: boolean;
  tooltip?: string;
};

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
    {
      label: "Client meal and macro tracking",
      info: true,
      tooltip:
        "Clients track meals, calories, and macros, plus receive nutrition guidance.",
    },
    { label: "Habit streaks and badges" },
    {
      label: "Trainerize.me website profile",
      info: true,
      tooltip:
        "Your unique online profile to market your business and let potential clients know about you, your experience, services, certifications, and more.",
    },
    { label: "Basic in-app messaging features" },
  ] satisfies FeatureItem[],
  optionalAddons: [
    "Advanced Nutrition Coaching",
    "Business",
    "Video Coaching",
    "Stripe Integrated Payments",
  ],
  /** Tooltip copy for optional add-ons — keyed by add-on label */
  addonTooltips: {
    "Advanced Nutrition Coaching":
      "Deliver personalized meal plans and nutrition guidance at scale.",
    "Business":
      "Attract clients, manage bookings, and get paid all in one place.",
    "Video Coaching":
      "Coach clients live or on demand through in-app video sessions and classes.",
    "Stripe Integrated Payments":
      "Accept payments, manage subscriptions, and automate payouts directly in the app.",
  } as Record<string, string>,
};

// ── Pro ──────────────────────────────────────────────────────────────────────
export type ProSeatOption = {
  seats: number;
  monthly: number;
  yearly: number;
};

export const PRO_SEAT_OPTIONS: readonly ProSeatOption[] = [
  { seats: 5,   monthly: 25,  yearly: 23    },
  { seats: 15,  monthly: 50,  yearly: 45    },
  { seats: 30,  monthly: 79,  yearly: 71    },
  { seats: 50,  monthly: 135, yearly: 122   },
  { seats: 75,  monthly: 180, yearly: 162   },
  { seats: 100, monthly: 225, yearly: 203   },
  { seats: 200, monthly: 250, yearly: 225   },
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
  addonTooltips: {
    "Advanced Nutrition Coaching":
      "Deliver personalized meal plans and nutrition guidance at scale.",
    "Business":
      "Attract clients, manage bookings, and get paid all in one place",
    "Video Coaching":
      "Coach clients live or on demand through in-app video sessions and classes.",
    "Stripe Integrated Payments":
      "Accept payments, manage subscriptions, and automate payouts directly in the app.",
    "Custom Branded App (Pro)":
      "Make your app your own with a custom iOS icon, themed navigation, and a personalized welcome video.",
  } as Record<string, string>,
};

// ── Studio Plus ───────────────────────────────────────────────────────────────
export type StudioTier = 500 | 1000 | "1000+";

export type StudioSeatOption = {
  seats: StudioTier;
  monthly: Price;
  yearly: Price;
};

export const STUDIO_SEAT_OPTIONS: readonly StudioSeatOption[] = [
  { seats: 500,     monthly: 275,      yearly: 248      },
  { seats: 1000,    monthly: 380,      yearly: 342      },
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
    { label: "1-1 group video calls",              info: true, tooltip: "Meet with clients live through one-on-one or group video sessions" },
    { label: "Custom recipes and meals",            info: true, tooltip: "Build custom meals and recipes tailored to your clients' needs" },
    { label: "Referral links and prospect booking", info: true, tooltip: "Create, personalize and manage booking pages and empower clients to share your business with their network." },
    { label: "Access to partner add-ons" },
    { label: "Personalized onboarding support",    info: true, tooltip: "Get guided setup and training to launch your app and workflows with confidence." },
    { label: "Full API access and support",         info: true, tooltip: "Make Trainerize do more for you and your business with access to our suite of APIs and webhooks." },
  ],
  includedAddons: [
    "Advanced Nutrition Coaching",
    "Business",
    "Video Coaching",
    "Stripe Integrated Payments",
    "Custom Branded App (Studio)",
  ],
  includedAddonTooltips: {
    "Advanced Nutrition Coaching":
      "Deliver personalized meal plans and nutrition guidance at scale.",
    "Business":
      "Attract clients, manage bookings, and get paid all in one place",
    "Video Coaching":
      "Coach clients live or on demand through in-app video sessions and classes.",
    "Stripe Integrated Payments":
      "Accept payments, manage subscriptions, and automate payouts directly in the app.",
    "Custom Branded App (Studio)":
      "Your own fully branded client app for iOS and Android. Available for registered businesses (LLC, Corp.) with an Apple Developer Account.",
  } as Record<string, string>,
};

// ── Enterprise ────────────────────────────────────────────────────────────────
export const ENTERPRISE_PLAN = {
  id: "enterprise" as const,
  name: "Enterprise",
  defaultTier: "1000+" as StudioTier,
  description:
    "For studios, gyms, and fitness professionals looking for comprehensive coaching solution. Unlock premium add-ons and customizations at no extra charge.",
  featureTitle: "Includes everything in Studio, plus:",
  features: [
    { label: "Separate app store listing",               info: true, tooltip: "Your Enterprise-level custom branded app comes with individual app store listings–perfect for creating a fully branded experience for clients and members." },
    { label: "8 week valet premium onboarding",          info: true, tooltip: "A dedicated implementation specialist will guide you and your team in the initial weeks with set up and onboarding." },
    { label: "Dedicated account manager",                info: true, tooltip: "A dedicated account manager will support and guide you and your team to ensure you have everything you need to be successful with Trainerize." },
    { label: "Access to app usage analytics",            info: true, tooltip: "Dive deep into how members are engaging with your app with access to insights and analytics." },
    { label: "HQ/Franchise programming content control", info: true, tooltip: "Manage programming and content distribution across multiple connected accounts. Great for franchise and licensee businesses that want to standardize programming." },
    { label: "SSO sign-in",                              info: true, tooltip: "With single sign on, allow members to quickly and easily sign into the app using an existing member account." },
  ] satisfies FeatureItem[],
  includedAddons: [
    "Advanced Nutrition Coaching",
    "Business",
    "Video Coaching",
    "Stripe Integrated Payments",
    "Custom Branded App (Enterprise)",
  ],
  includedAddonTooltips: {
    "Advanced Nutrition Coaching":
      "Deliver personalized meal plans and nutrition guidance at scale.",
    "Business":
      "Attract clients, manage bookings, and get paid all in one place",
    "Video Coaching":
      "Coach clients live or on demand through in-app video sessions and classes.",
    "Stripe Integrated Payments":
      "Accept payments, manage subscriptions, and automate payouts directly in the app.",
  } as Record<string, string>,
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
