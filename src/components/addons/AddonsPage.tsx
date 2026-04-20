import { useState } from "react";
import { FreeTrialModal } from "./FreeTrialModal";

/* ══ Icons ══════════════════════════════════════════════════════════════════ */

function IconBusiness() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="#151112" strokeWidth="1.5"/>
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#151112" strokeWidth="1.5"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke="#151112" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="1.5" fill="#151112"/>
    </svg>
  );
}
function IconVideoCoaching() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 10l4.553-2.526A1 1 0 0121 8.382v7.236a1 1 0 01-1.447.894L15 14" stroke="#151112" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="3" y="7" width="13" height="10" rx="2" stroke="#151112" strokeWidth="1.5"/>
    </svg>
  );
}
function IconStripe() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="#151112" strokeWidth="1.5"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="#151112" strokeWidth="2"/>
      <rect x="6" y="13" width="5" height="3" rx="0.5" fill="#151112"/>
    </svg>
  );
}
function IconNutrition() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C8.5 2 5 5 5 9c0 3 1.5 5.5 4 7v4h6v-4c2.5-1.5 4-4 4-7 0-4-3.5-7-7-7z" stroke="#151112" strokeWidth="1.5"/>
      <line x1="12" y1="14" x2="12" y2="20" stroke="#151112" strokeWidth="1.5"/>
    </svg>
  );
}
function IconBrandedApp() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="2" width="10" height="20" rx="2" stroke="#151112" strokeWidth="1.5"/>
      <circle cx="12" cy="18" r="1" fill="#151112"/>
      <line x1="9" y1="6" x2="15" y2="6" stroke="#151112" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function IconBoltFilled() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M10 2L4 10h5l-1 6 7-8h-5l1-6z" fill="#70D27C"/>
    </svg>
  );
}
function IconBoltOutline() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M10 2L4 10h5l-1 6 7-8h-5l1-6z" stroke="#AAAEB3" strokeWidth="1.4" fill="none"/>
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M1.5 6.5l3 3 6-7" stroke="#4094F7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconCheckSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M1.5 6.5l3 3 6-7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ══ Sub-components ══════════════════════════════════════════════════════════ */

function AddonIcon({ children }: { children: React.ReactNode }) {
  return <div className="ap-icon-tile">{children}</div>;
}

function VideoFrame() {
  return (
    <div className="ap-video-frame">
      <div className="ap-play-btn" aria-hidden="true">
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <path d="M1 1l12 7-12 7V1z" fill="white" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "connected" | "not-live" }) {
  return (
    <div className="ap-status">
      {status === "connected" ? <IconBoltFilled /> : <IconBoltOutline />}
      <span className="ap-status__label">{status === "connected" ? "Connected" : "Not live"}</span>
    </div>
  );
}

type PricingRow = { plan: string; price: string; strikePrice?: string; detail?: string };

function PricingTable({ rows }: { rows: PricingRow[] }) {
  return (
    <div className="ap-pricing-table">
      {rows.map((row, i) => (
        <div key={row.plan} className="ap-pricing-row">
          {i > 0 && <div className="ap-pricing-row__divider" />}
          <div className="ap-pricing-row__content">
            <span className="ap-pricing-row__plan">{row.plan}</span>
            <span className="ap-pricing-row__price">
              {row.strikePrice && <span className="ap-pricing-row__strike">{row.strikePrice}</span>}
              {row.price}
            </span>
            {row.detail && <span className="ap-pricing-row__detail">{row.detail}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

type FeatureItem = { label: string; note?: string; exclusive?: string };

function FeatureList({ left, right, finePrint }: { left: FeatureItem[]; right: FeatureItem[]; finePrint?: string }) {
  return (
    <div className="ap-feature-list">
      <div className="ap-feature-list__cols">
        <div className="ap-feature-list__col">
          {left.map((item) => (
            <div key={item.label} className="ap-feature-item">
              <IconCheck />
              <div className="ap-feature-item__text">
                <span className="ap-feature-item__label">{item.label}</span>
                {item.note && <span className="ap-feature-item__note">{item.note}</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="ap-feature-list__col">
          {right.map((item) => (
            <div key={item.label} className="ap-feature-item">
              <IconCheck />
              <div className="ap-feature-item__text">
                <span className="ap-feature-item__label">{item.label}</span>
                {item.exclusive && <span className="ap-feature-item__exclusive">{item.exclusive}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {finePrint && <p className="ap-feature-list__fine-print">{finePrint}</p>}
    </div>
  );
}

/* ══ IDs eligible for free trial ════════════════════════════════════════════ */
const FREE_TRIAL_ADDON_IDS = new Set(["business", "nutrition"]);

type AddonCardDef = {
  id: string; icon: React.ReactNode; name: string; description: string;
  status: "connected" | "not-live"; isNew?: boolean;
  pricing?: PricingRow[]; featureLeft?: FeatureItem[]; featureRight?: FeatureItem[];
  finePrint?: string; showDiscover?: boolean; onBuy?: () => void; onTryFree?: () => void;
};

function AddonCard({ card, trialActive }: { card: AddonCardDef; trialActive: boolean }) {
  const isTrialEligible = FREE_TRIAL_ADDON_IDS.has(card.id);

  function renderActions() {
    if (card.status === "connected") return <button type="button" className="ap-btn ap-btn--outline">Manage</button>;
    if (isTrialEligible && trialActive) {
      return (
        <button type="button" className="ap-btn ap-btn--active" disabled>
          <IconCheckSmall /> Active
        </button>
      );
    }
    if (isTrialEligible) {
      return <button type="button" className="ap-btn ap-btn--try" onClick={card.onTryFree}>Try for Free</button>;
    }
    return (
      <>
        {card.showDiscover && <button type="button" className="ap-btn ap-btn--outline">Discover</button>}
        <button type="button" className="ap-btn ap-btn--buy" onClick={card.onBuy}>Buy</button>
      </>
    );
  }

  return (
    <div className={`ap-card${card.isNew ? " ap-card--new" : ""}`}>
      {card.isNew && <span className="ap-card__ribbon" aria-label="New">NEW</span>}
      <AddonIcon>{card.icon}</AddonIcon>
      <div className="ap-card__text">
        <h3 className="ap-card__name">{card.name}</h3>
        <p className="ap-card__desc">{card.description}</p>
        {card.featureLeft && card.featureRight && (
          <FeatureList left={card.featureLeft} right={card.featureRight} finePrint={card.finePrint} />
        )}
        {card.pricing && <PricingTable rows={card.pricing} />}
      </div>
      <div className="ap-card__right">
        <div className="ap-video-col">
          <VideoFrame />
          <div className="ap-card__actions">{renderActions()}</div>
        </div>
        <StatusBadge status={card.status} />
      </div>
    </div>
  );
}

/* ══ Secondary nav ═══════════════════════════════════════════════════════════ */

const ADDONS_NAV = ["Trainerize Add-ons", "Integrations", "Custom Branded App", "Zapier App Automation", "Education Partners", "Hire an Expert"];

function AddonsSubnav() {
  return (
    <aside className="ap-subnav">
      <div className="ap-subnav__section-title">Add-ons</div>
      <ul className="ap-subnav__list">
        {ADDONS_NAV.map((item) => {
          const active = item === "Trainerize Add-ons";
          return (
            <li key={item} className={`ap-subnav__item${active ? " ap-subnav__item--active" : ""}`}>
              {active && <span className="ap-subnav__indicator" aria-hidden="true" />}
              <span className="ap-subnav__label">{item}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

/* ══ Page ════════════════════════════════════════════════════════════════════ */

type Props = { onBuyAddon?: (name: string) => void };

export function AddonsPage({ onBuyAddon }: Props) {
  const [trialActive, setTrialActive] = useState<Set<string>>(new Set());
  const [trialModal, setTrialModal] = useState<"business" | "nutrition" | null>(null);

  function startTrial(id: "business" | "nutrition") {
    setTrialActive((prev) => new Set([...prev, id]));
    setTrialModal(id);
  }

  const CARDS: AddonCardDef[] = [
    {
      id: "business", icon: <IconBusiness />, name: "Business",
      description: "Everything you need to grow in one powerful add-on. Get access to payments, video calling, on demand video, client referral system and more.",
      status: "not-live", isNew: true,
      featureLeft: [
        { label: "*Video Coaching Add-on", note: "Purchase separately for $10/month" },
        { label: "*Stripe Integrated Payments", note: "Purchase separately for $10/month" },
      ],
      featureRight: [
        { label: "Shareable booking links", exclusive: "Business Kit Exclusive" },
        { label: "Client Referrals", exclusive: "Business Kit Exclusive" },
        { label: "Announcements", exclusive: "Business Kit Exclusive" },
        { label: "Trial Products", exclusive: "Business Kit Exclusive" },
      ],
      finePrint: "*Existing Video Coaching or Stripe add-on subscriptions will be prorated and rolled into the business kit subscription. No double charges.",
      onBuy: () => onBuyAddon?.("Business"),
      onTryFree: () => startTrial("business"),
    },
    {
      id: "video", icon: <IconVideoCoaching />, name: "Video Coaching",
      description: "Use live video calling to run virtual 1-on-1 PT or small group training sessions, consultations, and check-ins seamlessly in-app. Upload pre-recorded on-demand video workouts and classes for clients to stream anywhere, anytime.",
      status: "connected",
      pricing: [
        { plan: "Pro", price: "$10 / month", detail: "50h video calling & 100h video streaming" },
        { plan: "Studio", price: "Included", detail: "500h video calling & 5000h video streaming" },
        { plan: "Enterprise", price: "Custom", detail: "Custom" },
      ],
    },
    {
      id: "stripe", icon: <IconStripe />, name: "Stripe Integrated Payments",
      description: "Accept live payments with Stripe to sell your services online, seamlessly automate program delivery and sell and track sessions all in Trainerize.",
      status: "not-live", showDiscover: true,
      pricing: [
        { plan: "Pro", price: "$10 / month" },
        { plan: "Studio", price: "Included" },
        { plan: "Enterprise", price: "Custom" },
      ],
      onBuy: () => onBuyAddon?.("Stripe Integrated Payments"),
    },
    {
      id: "nutrition", icon: <IconNutrition />, name: "Advanced Nutrition Coaching",
      description: "Easily deliver and generate meal plans for your clients based on their caloric goals, macro split, schedule, and dietary preferences. Plus, add your own recipes so your clients get the best meals to cook and track in-app.",
      status: "not-live",
      pricing: [
        { plan: "Grow - Pro 15", price: "$20 / month", strikePrice: "$45" },
        { plan: "Pro 30 - Pro 200", price: "$45 / month" },
        { plan: "Studio", price: "Included" },
        { plan: "Enterprise", price: "Custom" },
      ],
      onBuy: () => onBuyAddon?.("Advanced Nutrition Coaching"),
      onTryFree: () => startTrial("nutrition"),
    },
    {
      id: "branded-app", icon: <IconBrandedApp />, name: "Custom Branded Mobile App",
      description: "Take your client experience to the next level by customizing the look and feel of your app to truly reflect your branding.",
      status: "connected",
      pricing: [
        { plan: "Pro", price: "$169 / one-time", detail: "Basic branding, shared app store listing" },
        { plan: "Studio", price: "Included", detail: "Enhanced branding with separate app store listing" },
        { plan: "Enterprise", price: "Included", detail: "Full range of customizations unlocked" },
      ],
    },
  ];

  return (
    <div className="ap-layout">
      <AddonsSubnav />
      <div className="ap-content">
        <div className="ap-header">
          <h1 className="ap-header__title">Supercharge Trainerize with these powerful add-ons</h1>
          <p className="ap-header__subtitle">Create immersive digital fitness experiences to really engage and connect with your clients.</p>
        </div>
        <div className="ap-card-list">
          {CARDS.map((card) => (
            <AddonCard key={card.id} card={card} trialActive={trialActive.has(card.id)} />
          ))}
        </div>
      </div>

      {trialModal && (
        <FreeTrialModal addonId={trialModal} onClose={() => setTrialModal(null)} />
      )}
    </div>
  );
}
