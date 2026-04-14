import { useState } from "react";
import { BillingToggle } from "./components/pricing/BillingToggle";
import { GrowSeatDisplay } from "./components/pricing/GrowSeatStepper";
import { ProSeatGrid } from "./components/pricing/ProSeatGrid";
import { StudioTierGrid } from "./components/pricing/StudioTierGrid";
import { PricingTierCard } from "./components/pricing/PricingTierCard";
import {
  ENTERPRISE_PLAN,
  GROW_PLAN,
  PRO_PLAN,
  PRO_POPULAR_SEATS,
  PRO_POPULAR_SEATS_MONTHLY,
  PRO_SEAT_OPTIONS,
  STUDIO_PLAN,
  STUDIO_SEAT_OPTIONS,
  type BillingPeriod,
  type StudioTier,
} from "./data/pricingPlans";

/* ── SVG icons ─────────────────────────────────────────────────────────────── */

function IconHome() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <polyline points="9 21 9 12 15 12 15 21" />
    </svg>
  );
}
function IconMessages() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}
function IconGroups() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      <path d="M16 3.13a4 4 0 010 7.75" />
      <path d="M21 20v-2a4 4 0 00-3-3.85" />
    </svg>
  );
}
function IconChallenges() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </svg>
  );
}
function IconClients() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M4 20v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
    </svg>
  );
}
function IconTeam() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <circle cx="5" cy="10" r="3" />
      <circle cx="19" cy="10" r="3" />
      <path d="M5 20v-2a3 3 0 013-3h8a3 3 0 013 3v2" />
    </svg>
  );
}
function IconPayments() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}
function IconLibrary() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}
function IconScheduling() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconSetup() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}
function IconAddons() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function IconChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function IconBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

/* ── Sidebar ────────────────────────────────────────────────────────────────── */

const MAIN_NAV = [
  { label: "Overview",    Icon: IconHome },
  { label: "Messages",    Icon: IconMessages },
  { label: "Groups",      Icon: IconGroups },
  { label: "Challenges",  Icon: IconChallenges },
  { label: "Clients",     Icon: IconClients },
  { label: "Team",        Icon: IconTeam },
  { label: "Payments",    Icon: IconPayments },
  { label: "Master Lib.", Icon: IconLibrary,    chevron: true },
  { label: "Scheduling",  Icon: IconScheduling, chevron: true },
];

const OTHER_NAV = [
  { label: "Setup Guide", Icon: IconSetup },
  { label: "Add-ons",     Icon: IconAddons },
  { label: "Settings",    Icon: IconSetup },
];

function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Main navigation">
      <div className="sidebar__logo">
        <span className="sidebar__logo-mark">T</span>
        <span className="sidebar__brand">Trainerize</span>
      </div>

      <div className="sidebar__search">
        <span className="sidebar__search-icon"><IconSearch /></span>
        <span className="sidebar__search-text">Find a client</span>
      </div>

      <p className="sidebar__section-label">Main Menu</p>
      <ul className="sidebar__nav">
        {MAIN_NAV.map(({ label, Icon, chevron }) => (
          <li key={label} className="sidebar__nav-item">
            <span className="sidebar__nav-icon"><Icon /></span>
            <span className="sidebar__nav-label">{label}</span>
            {chevron && <span className="sidebar__nav-chevron"><IconChevronRight /></span>}
          </li>
        ))}
      </ul>

      <p className="sidebar__section-label">Other</p>
      <ul className="sidebar__nav">
        {OTHER_NAV.map(({ label, Icon }) => (
          <li key={label} className="sidebar__nav-item">
            <span className="sidebar__nav-icon"><Icon /></span>
            <span className="sidebar__nav-label">{label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── Top Bar ─────────────────────────────────────────────────────────────────── */

function TopBar() {
  return (
    <header className="topbar">
      <button type="button" className="topbar__bell" aria-label="Notifications">
        <IconBell />
      </button>
      <button type="button" className="topbar__user" aria-label="User menu">
        <span className="topbar__avatar">TO</span>
        <span className="topbar__username">Trainer O.</span>
        <span className="topbar__chevron"><IconChevronDown /></span>
      </button>
    </header>
  );
}

/* ── Pricing Page ─────────────────────────────────────────────────────────────── */

function PricingPage() {
  const [billing, setBilling] = useState<BillingPeriod>("yearly");
  const [proSeats, setProSeats] = useState(5);
  const [tier3Seat, setTier3Seat] = useState<StudioTier>(500);

  function handleBillingChange(b: BillingPeriod) {
    setBilling(b);
  }

  // ── Third-card (Studio Plus / Studio Max / Enterprise) — derives from seat selection ──
  const isEnterprise = tier3Seat === "1000+";
  const tier3Row = STUDIO_SEAT_OPTIONS.find((o) => o.seats === tier3Seat)!;
  const tier3Price = billing === "monthly" ? tier3Row.monthly : tier3Row.yearly;
  const tier3Name =
    tier3Seat === 500 ? "Studio Plus" : tier3Seat === 1000 ? "Studio Max" : "Enterprise";
  const tier3Desc = isEnterprise ? ENTERPRISE_PLAN.description : STUDIO_PLAN.description;
  const tier3FeatureTitle = isEnterprise ? ENTERPRISE_PLAN.featureTitle : STUDIO_PLAN.featureTitle;
  const tier3Features = isEnterprise ? ENTERPRISE_PLAN.features : STUDIO_PLAN.features;
  const tier3Addons = isEnterprise ? ENTERPRISE_PLAN.includedAddons : STUDIO_PLAN.includedAddons;

  // Resolve current prices
  const growPrice = billing === "monthly" ? GROW_PLAN.monthly : GROW_PLAN.yearly;

  const proRow = PRO_SEAT_OPTIONS.find((o) => o.seats === proSeats)!;
  const proPrice = billing === "monthly" ? proRow.monthly : proRow.yearly;


  return (
    <div className="content-scroll">
      {/* Back + Hero — contained in a centered max-width section */}
      <div className="pg-section">
        <button type="button" className="pg-back" onClick={() => {}}>
          <IconArrowLeft /> Back
        </button>
        <div className="pg-hero">
          <h1 className="pg-hero__title">
            Plans designed for every business size and type.
          </h1>
          <p className="pg-hero__sub">Select a plan best suited for you business</p>
          <BillingToggle billing={billing} onChange={handleBillingChange} />
        </div>
      </div>

      {/* Cards */}
      <div className="plan-grid">
        {/* Grow */}
        <PricingTierCard
          name="Grow"
          description={GROW_PLAN.description}
          seatControl={<GrowSeatDisplay seats={GROW_PLAN.seats} />}
          price={growPrice}
          onSelect={() => {}}
          featureTitle={GROW_PLAN.featureTitle}
          features={GROW_PLAN.features}
          optionalAddons={GROW_PLAN.optionalAddons}
          addonTooltips={GROW_PLAN.addonTooltips}
        />

        {/* Pro */}
        <PricingTierCard
          name={`Pro ${proSeats}`}
          description={PRO_PLAN.description}
          seatControl={
            <ProSeatGrid value={proSeats} onChange={setProSeats} />
          }
          price={proPrice}
          onSelect={() => {}}
          featureTitle={PRO_PLAN.featureTitle}
          features={PRO_PLAN.features}
          optionalAddons={PRO_PLAN.optionalAddons}
          addonTooltips={PRO_PLAN.addonTooltips}
          mostPopular={proSeats === PRO_POPULAR_SEATS || proSeats === PRO_POPULAR_SEATS_MONTHLY}
        />

        {/* Studio Plus / Studio Max / Enterprise — morphs based on seat selection */}
        <PricingTierCard
          name={tier3Name}
          description={tier3Desc}
          seatControl={
            <StudioTierGrid value={tier3Seat} onChange={setTier3Seat} />
          }
          price={isEnterprise ? "custom" : tier3Price}
          priceNote={isEnterprise ? "(5+ Locations)" : "per location (1–4 locations)"}
          onSelect={() => {}}
          ctaLabel={isEnterprise ? "CONTACT US" : "SELECT"}
          featureTitle={tier3FeatureTitle}
          features={tier3Features}
          includedAddons={tier3Addons}
          includedAddonTooltips={isEnterprise ? ENTERPRISE_PLAN.includedAddonTooltips : STUDIO_PLAN.includedAddonTooltips}
          showSaveBadge
          noIconAddons={isEnterprise ? new Set(["Custom Branded App (Enterprise)"]) : undefined}
        />
      </div>

      {/* Footer */}
      <div className="pg-footer">
        <a className="pg-footer__link" href="#compare">
          Compare all plans and features
        </a>
        <p className="pg-footer__legal">
          Trainerize monthly and annual subscription fees will be billed in US
          dollars and are subject to government tax and other prevailing charges.
          Your subscription is set to auto-renew monthly or annually, depending
          on the type of plan you have selected.
        </p>
      </div>
    </div>
  );
}

/* ── App Root ─────────────────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-column">
        <TopBar />
        <PricingPage />
      </div>
    </div>
  );
}
