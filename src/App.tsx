import { useState } from "react";
import { BillingToggle } from "./components/pricing/BillingToggle";
import { GrowSeatDisplay } from "./components/pricing/GrowSeatStepper";
import { ProSeatGrid } from "./components/pricing/ProSeatGrid";
import { StudioTierGrid } from "./components/pricing/StudioTierGrid";
import { PricingTierCard } from "./components/pricing/PricingTierCard";
import { OverviewPage } from "./components/overview/OverviewPage";
import { BillingPage } from "./components/billing/BillingPage";
import { UpgradeAddOnsModal } from "./components/billing/UpgradeAddOnsModal";
import { CheckoutModal } from "./components/billing/CheckoutModal";
import { ConfirmationDialog } from "./components/billing/ConfirmationDialog";
import { AddonsPage } from "./components/addons/AddonsPage";
import { ProductTour } from "./components/tour/ProductTour";
import {
  ENTERPRISE_PLAN, GROW_PLAN, PRO_PLAN, PRO_POPULAR_SEATS, PRO_POPULAR_SEATS_MONTHLY,
  PRO_SEAT_OPTIONS, STUDIO_PLAN, STUDIO_SEAT_OPTIONS,
  type BillingPeriod, type StudioTier,
} from "./data/pricingPlans";

/* ── Page + upgrade flow types ─────────────────────────────────────────────── */

type Page = "overview" | "pricing" | "billing" | "addons";

type UpgradeCtx =
  | null
  | { step: "addons";    planName: string; planPrice: number; selectedAddons: Set<string> }
  | { step: "checkout";  planName: string; planPrice: number; selectedAddons: Set<string> }
  | { step: "success";   planName: string };

/* ── Plans that skip the add-ons modal ─────────────────────────────────────── */
const SKIP_ADDONS_PLANS = new Set(["Studio Plus", "Studio Max"]);

/* ── Figma asset URLs — Sidebar icons ──────────────────────────────────────── */
const FIG_LOGO       = "https://www.figma.com/api/mcp/asset/0d60fc96-4568-4f47-bac1-3e125a4542fb";
const FIG_SEARCH     = "https://www.figma.com/api/mcp/asset/f79ec2d0-7b75-4b8c-b240-4e206044272e";
const FIG_OVERVIEW   = "https://www.figma.com/api/mcp/asset/a72f724a-690e-421a-92fc-1d2622361e29";
const FIG_MESSAGES   = "https://www.figma.com/api/mcp/asset/30d0e863-407d-4601-98b6-9fc809f92bbd";
const FIG_GROUPS     = "https://www.figma.com/api/mcp/asset/34262117-d905-4082-949c-e0de21ea9659";
const FIG_CHALLENGES = "https://www.figma.com/api/mcp/asset/e16a3c16-22ee-4d5a-8277-68b910ae6221";
const FIG_CLIENTS    = "https://www.figma.com/api/mcp/asset/ac9f5625-ef18-4ff6-b4e0-57a9b4aeb8e5";
const FIG_TEAM       = "https://www.figma.com/api/mcp/asset/926b64db-28a2-4abe-9c77-d62dfdbbcb91";
const FIG_PAYMENTS   = "https://www.figma.com/api/mcp/asset/70964696-28aa-49ec-8730-5f6fc5c34a96";
const FIG_MASTERS    = "https://www.figma.com/api/mcp/asset/648707ce-21c3-458c-b11f-825ea69bacd4";
const FIG_CHEVRON    = "https://www.figma.com/api/mcp/asset/be21a625-1b99-4d63-8e50-64db37750595";
const FIG_CALENDAR   = "https://www.figma.com/api/mcp/asset/043796c1-0021-42de-a2f9-a6cd7d4750d8";
const FIG_SETUP      = "https://www.figma.com/api/mcp/asset/20448bb7-546f-400f-b083-e95b2d8163cf";
const FIG_ADDONS_ICO = "https://www.figma.com/api/mcp/asset/8eb14e43-44c8-428a-b6d1-95979b827488";
const FIG_SETTINGS   = "https://www.figma.com/api/mcp/asset/149a113a-1572-49cc-97c6-4a6c41d2451b";

/* ── Figma asset URLs — TopBar icons ───────────────────────────────────────── */
const FIG_AI_ICON    = "https://www.figma.com/api/mcp/asset/287963bc-30cf-424b-aadf-a9bf809fe476";
const FIG_ADD_ICON   = "https://www.figma.com/api/mcp/asset/08229dea-1e9c-4981-86d7-7cdf79fb5d21";
const FIG_BELL       = "https://www.figma.com/api/mcp/asset/538b9297-5b3e-45b0-a3bf-4584c234f9ea";
const FIG_HELP       = "https://www.figma.com/api/mcp/asset/ea0a40d4-cea8-484a-8fa6-086e04666e07";
const FIG_AVATAR     = "https://www.figma.com/api/mcp/asset/bb9a0a1f-5d84-488a-abdb-1827442a1bcb";
const FIG_DOWNARROW  = "https://www.figma.com/api/mcp/asset/0fbaaf80-c050-4ddb-ba11-61809b4d520f";

/* ── Reusable mini arrow icon ──────────────────────────────────────────────── */
function IconArrowLeft() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
}

/* ── Sidebar ────────────────────────────────────────────────────────────────── */

type NavItem = {
  label: string; icon: string; chevron?: boolean;
  tourAttr?: string; page?: Page;
};

const MAIN_NAV: NavItem[] = [
  { label: "Overview",    icon: FIG_OVERVIEW,   page: "overview" },
  { label: "Messages",    icon: FIG_MESSAGES,   tourAttr: "messages" },
  { label: "Groups",      icon: FIG_GROUPS },
  { label: "Challenges",  icon: FIG_CHALLENGES },
  { label: "Clients",     icon: FIG_CLIENTS },
  { label: "Team",        icon: FIG_TEAM },
  { label: "Payments",    icon: FIG_PAYMENTS,   tourAttr: "payments" },
  { label: "Master Lib.", icon: FIG_MASTERS,    chevron: true, tourAttr: "master-lib" },
  { label: "Scheduling",  icon: FIG_CALENDAR,   chevron: true, tourAttr: "scheduling" },
];

const OTHER_NAV: NavItem[] = [
  { label: "Setup Guide", icon: FIG_SETUP,      tourAttr: "setup-guide" },
  { label: "Add-ons",     icon: FIG_ADDONS_ICO, page: "addons" },
  { label: "Settings",    icon: FIG_SETTINGS,   page: "billing" },
];

function Sidebar({ activePage, onNavigate }: { activePage: Page; onNavigate: (p: Page) => void }) {
  return (
    <nav className="sidebar" aria-label="Main navigation">
      {/* Logo */}
      <div className="sidebar__header">
        <img src={FIG_LOGO} alt="" className="sidebar__logo-img" aria-hidden="true" />
        <span className="sidebar__brand">TRAINERIZE</span>
      </div>

      {/* Search */}
      <div className="sidebar__search-wrap">
        <div className="sidebar__search">
          <img src={FIG_SEARCH} alt="" className="sidebar__search-icon" />
          <span className="sidebar__search-text">Find a client</span>
        </div>
      </div>

      {/* Main menu */}
      <p className="sidebar__section-label">MAIN MENU</p>
      <ul className="sidebar__nav">
        {MAIN_NAV.map(({ label, icon, chevron, tourAttr, page }) => {
          const isActive = page ? activePage === page : false;
          const extra: Record<string, string> = {};
          if (tourAttr) extra["data-tour"] = tourAttr;
          return (
            <li key={label}>
              <div
                className={`sidebar__nav-item${isActive ? " sidebar__nav-item--active" : ""}`}
                onClick={() => page && onNavigate(page)}
                style={page ? { cursor: "pointer" } : undefined}
                role={page ? "button" : undefined}
                {...extra}
              >
                <img src={icon} alt="" className="sidebar__nav-icon-img" />
                <span className="sidebar__nav-label">{label}</span>
                {chevron && (
                  <img src={FIG_CHEVRON} alt="" className="sidebar__nav-chevron-img" />
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Other */}
      <p className="sidebar__section-label">OTHER</p>
      <ul className="sidebar__nav">
        {OTHER_NAV.map(({ label, icon, tourAttr, page }) => {
          const isActive = page ? activePage === page : false;
          const extra: Record<string, string> = {};
          if (tourAttr) extra["data-tour"] = tourAttr;
          return (
            <li key={label}>
              <div
                className={`sidebar__nav-item${isActive ? " sidebar__nav-item--active" : ""}`}
                onClick={() => page && onNavigate(page)}
                style={page ? { cursor: "pointer" } : undefined}
                role={page ? "button" : undefined}
                {...extra}
              >
                <img src={icon} alt="" className="sidebar__nav-icon-img" />
                <span className="sidebar__nav-label">{label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ── Top Bar ─────────────────────────────────────────────────────────────────── */

function TopBar({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <header className="topbar">
      {/* Left: trial progress + upgrade button */}
      <div className="topbar__left">
        <div className="topbar__trial">
          <p className="topbar__trial-text">17 days left in your 30 day Trial.</p>
          <div className="topbar__trial-bar-wrap">
            <div className="topbar__trial-bar">
              {/* 17/23 days ≈ 74% */}
              <div className="topbar__trial-fill" style={{ width: "74%" }} />
            </div>
          </div>
        </div>
        <button type="button" className="topbar__upgrade-btn" onClick={onUpgrade}>
          UPGRADE PLAN
        </button>
      </div>

      {/* Right: AI builder, add, bell, help, user */}
      <div className="topbar__right">
        <button type="button" className="topbar__ai-btn" aria-label="AI Builder" data-tour="add-btn">
          <img src={FIG_AI_ICON} alt="" className="topbar__ai-icon" />
          AI BUILDER
        </button>

        <button type="button" className="topbar__add-btn" aria-label="Add">
          <img src={FIG_ADD_ICON} alt="" className="topbar__icon-img" />
        </button>

        <button type="button" className="topbar__icon-wrap" aria-label="Notifications">
          <img src={FIG_BELL} alt="" className="topbar__icon-img" />
        </button>

        <button type="button" className="topbar__icon-wrap" aria-label="Help" data-tour="help-btn">
          <img src={FIG_HELP} alt="" className="topbar__icon-img" />
        </button>

        <button type="button" className="topbar__user" aria-label="User menu">
          <img src={FIG_AVATAR} alt="Profile" className="topbar__avatar-img" />
          <span className="topbar__username">Trainer O.</span>
          <img src={FIG_DOWNARROW} alt="" className="topbar__downarrow" />
        </button>
      </div>
    </header>
  );
}

/* ── Pricing Page ─────────────────────────────────────────────────────────────── */

function PricingPage({ onBack, onPlanSelect }: {
  onBack: () => void;
  onPlanSelect: (planName: string, planPrice: number) => void;
}) {
  const [billing, setBilling] = useState<BillingPeriod>("yearly");
  const [proSeats, setProSeats] = useState(5);
  const [tier3Seat, setTier3Seat] = useState<StudioTier>(500);

  const isEnterprise = tier3Seat === "1000+";
  const tier3Row = STUDIO_SEAT_OPTIONS.find((o) => o.seats === tier3Seat)!;
  const tier3Price = billing === "monthly" ? tier3Row.monthly : tier3Row.yearly;
  const tier3Name = tier3Seat === 500 ? "Studio Plus" : tier3Seat === 1000 ? "Studio Max" : "Enterprise";
  const tier3Desc = isEnterprise ? ENTERPRISE_PLAN.description : STUDIO_PLAN.description;
  const tier3FeatureTitle = isEnterprise ? ENTERPRISE_PLAN.featureTitle : STUDIO_PLAN.featureTitle;
  const tier3Features = isEnterprise ? ENTERPRISE_PLAN.features : STUDIO_PLAN.features;
  const tier3Addons = isEnterprise ? ENTERPRISE_PLAN.includedAddons : STUDIO_PLAN.includedAddons;

  const growPrice = billing === "monthly" ? GROW_PLAN.monthly : GROW_PLAN.yearly;
  const proRow = PRO_SEAT_OPTIONS.find((o) => o.seats === proSeats)!;
  const proPrice = billing === "monthly" ? proRow.monthly : proRow.yearly;

  return (
    <div className="content-scroll">
      <div className="pg-section">
        <button type="button" className="pg-back" onClick={onBack}>
          <IconArrowLeft /> Back
        </button>
        <div className="pg-hero">
          <h1 className="pg-hero__title">Plans designed for every business size and type.</h1>
          <p className="pg-hero__sub">Select a plan best suited for you business</p>
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>
      </div>

      <div className="plan-grid">
        <PricingTierCard
          name="Grow" description={GROW_PLAN.description}
          seatControl={<GrowSeatDisplay seats={GROW_PLAN.seats} />}
          price={growPrice} onSelect={() => onPlanSelect("Grow", growPrice)}
          featureTitle={GROW_PLAN.featureTitle} features={GROW_PLAN.features}
          optionalAddons={GROW_PLAN.optionalAddons} addonTooltips={GROW_PLAN.addonTooltips}
        />
        <PricingTierCard
          name={`Pro ${proSeats}`} description={PRO_PLAN.description}
          seatControl={<ProSeatGrid value={proSeats} onChange={setProSeats} />}
          price={proPrice} onSelect={() => onPlanSelect(`Pro ${proSeats}`, proPrice)}
          featureTitle={PRO_PLAN.featureTitle} features={PRO_PLAN.features}
          optionalAddons={PRO_PLAN.optionalAddons} addonTooltips={PRO_PLAN.addonTooltips}
          mostPopular={proSeats === PRO_POPULAR_SEATS || proSeats === PRO_POPULAR_SEATS_MONTHLY}
        />
        <PricingTierCard
          name={tier3Name} description={tier3Desc}
          seatControl={<StudioTierGrid value={tier3Seat} onChange={setTier3Seat} />}
          price={isEnterprise ? "custom" : tier3Price}
          priceNote={isEnterprise ? "(5+ Locations)" : "per location (1–4 locations)"}
          onSelect={() => !isEnterprise && onPlanSelect(tier3Name, tier3Price)}
          ctaLabel={isEnterprise ? "CONTACT US" : "SELECT"}
          featureTitle={tier3FeatureTitle} features={tier3Features}
          includedAddons={tier3Addons}
          includedAddonTooltips={isEnterprise ? ENTERPRISE_PLAN.includedAddonTooltips : STUDIO_PLAN.includedAddonTooltips}
          showSaveBadge
          noIconAddons={isEnterprise ? new Set(["Custom Branded App (Enterprise)"]) : undefined}
        />
      </div>

      <div className="pg-footer">
        <a className="pg-footer__link" href="#compare">Compare all plans and features</a>
        <p className="pg-footer__legal">
          Trainerize monthly and annual subscription fees will be billed in US dollars and are
          subject to government tax and other prevailing charges. Your subscription is set to
          auto-renew monthly or annually, depending on the type of plan you have selected.
        </p>
      </div>
    </div>
  );
}

/* ── App Root ─────────────────────────────────────────────────────────────────── */

export default function App() {
  const [activePage, setActivePage] = useState<Page>("overview");
  const [upgradeCtx, setUpgradeCtx] = useState<UpgradeCtx>(null);

  function startUpgrade(planName: string, planPrice: number) {
    if (SKIP_ADDONS_PLANS.has(planName)) {
      setUpgradeCtx({ step: "checkout", planName, planPrice, selectedAddons: new Set() });
    } else {
      setUpgradeCtx({ step: "addons", planName, planPrice, selectedAddons: new Set() });
    }
  }

  function goToCheckout(selectedAddons: Set<string>) {
    if (!upgradeCtx || upgradeCtx.step !== "addons") return;
    setUpgradeCtx({ step: "checkout", planName: upgradeCtx.planName, planPrice: upgradeCtx.planPrice, selectedAddons });
  }

  function goBackToAddons() {
    if (!upgradeCtx || upgradeCtx.step !== "checkout") return;
    if (SKIP_ADDONS_PLANS.has(upgradeCtx.planName)) return;
    setUpgradeCtx({ step: "addons", planName: upgradeCtx.planName, planPrice: upgradeCtx.planPrice, selectedAddons: upgradeCtx.selectedAddons });
  }

  function confirmUpgrade() {
    if (!upgradeCtx || upgradeCtx.step !== "checkout") return;
    setUpgradeCtx({ step: "success", planName: upgradeCtx.planName });
  }

  function closeFlow() {
    setUpgradeCtx(null);
    setActivePage("billing");
  }

  return (
    <div className="app">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="main-column">
        <TopBar onUpgrade={() => setActivePage("pricing")} />

        {activePage === "overview" && (
          <OverviewPage onUpgrade={() => setActivePage("pricing")} />
        )}
        {activePage === "billing" && (
          <BillingPage onUpgrade={() => setActivePage("pricing")} onBrowseAddons={() => setActivePage("addons")} />
        )}
        {activePage === "pricing" && (
          <PricingPage onBack={() => setActivePage("billing")} onPlanSelect={startUpgrade} />
        )}
        {activePage === "addons" && (
          <AddonsPage onBuyAddon={(name) => startUpgrade(name, 0)} />
        )}
      </div>

      {/* ── Upgrade flow modals ── */}
      {upgradeCtx?.step === "addons" && (
        <UpgradeAddOnsModal planName={upgradeCtx.planName} onClose={() => setUpgradeCtx(null)} onProceed={goToCheckout} />
      )}
      {upgradeCtx?.step === "checkout" && (
        <CheckoutModal
          planName={upgradeCtx.planName} planPrice={upgradeCtx.planPrice}
          selectedAddons={upgradeCtx.selectedAddons}
          onBack={goBackToAddons} onConfirm={confirmUpgrade} onClose={() => setUpgradeCtx(null)}
        />
      )}
      {upgradeCtx?.step === "success" && (
        <ConfirmationDialog planName={upgradeCtx.planName} onClose={closeFlow} />
      )}

      {/* Product tour — always rendered, auto-starts */}
      <ProductTour />
    </div>
  );
}
