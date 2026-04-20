import { useState } from "react";

/* ── Constants ───────────────────────────────────────────────────────────── */

const TRIAL_ADDON_IDS = new Set(["business", "nutrition"]);

/* ── Data ────────────────────────────────────────────────────────────────── */

type IncludeItem = { label: string; note?: string; exclusive?: string };

type Addon = {
  id: string;
  name: string;
  badge?: "NEW";
  price: number;
  priceUnit?: string;
  description: string;
  isTrial?: true;
  trialUsage?: string;
  lossAversion?: string;
  includes?: { title: string; cols: [IncludeItem[], IncludeItem[]]; legal: string };
};

const ADDONS: Addon[] = [
  {
    id: "business",
    name: "Business",
    badge: "NEW",
    price: 25,
    isTrial: true,
    trialUsage: "You've created 3 programs and connected Stripe payments during your trial",
    lossAversion: "Removing this will disable payments, bookings, and client referrals you've set up",
    description:
      "Everything you need to grow your business in one powerful add-on. Access payments, on-demand video and video calling, prospect booking, client referrals and more.",
    includes: {
      title: "What's included:",
      cols: [
        [
          { label: "Video Coaching Add-on", note: "Now included, previously $10/month" },
          { label: "Stripe Integrated Payments", note: "Now included, previously $10/month" },
        ],
        [
          { label: "Prospect Booking", exclusive: "Business Exclusive" },
          { label: "Client Referrals", exclusive: "Business Exclusive" },
          { label: "Announcements", exclusive: "Business Exclusive" },
        ],
      ],
      legal:
        "*Existing Video Coaching or Stripe add-on subscriptions will be prorated and rolled into the business kit subscription. No double charges.",
    },
  },
  {
    id: "nutrition",
    name: "Advanced Nutrition Coaching",
    price: 45,
    isTrial: true,
    trialUsage: "You've created 2 AI-generated meal plans assigned to clients",
    lossAversion: "Removing this will remove access to meal plans and client nutrition tracking data",
    description:
      "Generate and deliver custom meal plans, contribute meals and recipes to your business's meal library, and give clients access to the best meals to cook and track in-app.",
  },
  {
    id: "stripe",
    name: "Stripe Integrated Payments",
    price: 10,
    description:
      "Create, market and sell products online. Automate your sales funnel and program delivery and pay out your earnings through Stripe.",
  },
  {
    id: "video",
    name: "Video Coaching",
    price: 25,
    description:
      "Get a monthly bundle of video calling and video streaming hours to let you run virtual coaching calls or PT sessions, and host on-demand workouts (Includes 50h video calling + 100h video streaming).",
  },
  {
    id: "branded-app",
    name: "Custom Branded Mobile App",
    price: 169,
    description:
      "Take your client experience to the next level by applying your branding to the app. You can personalize the app icon and the top navigation bar of your mobile app.",
  },
];

const TRIAL_ADDONS = ADDONS.filter((a) => a.isTrial);
const OTHER_ADDONS = ADDONS.filter((a) => !a.isTrial);

const BUNDLE_LEFT = [
  "500 coaching clients",
  "Branded mobile app (Studio) with\nseparate app store listing and more customizations",
  "Video Coaching (Studio)\n500h video calling + 5000h video streaming",
  "Advanced Nutrition Coaching",
];
const BUNDLE_RIGHT = [
  "Stripe Integrated Payments",
  "MINDBODY integration",
  "4 week basic 1-on-1 onboarding",
  "API Access",
  "Prospect Booking",
  "Client Referrals",
];

function BlueCheck() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M1.5 6.5l3 3 6-7" stroke="#4094F7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckboxBox({ checked }: { checked: boolean }) {
  return (
    <span className="am-checkbox" aria-hidden="true">
      {checked && (
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M1 4.5l3.2 3.2 5.8-7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

function TrialMeta({ addon, checked }: { addon: Addon; checked: boolean }) {
  return (
    <div className="am-trial-meta">
      <div className="am-trial-meta__header">
        <span className="am-trial-badge">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
            <circle cx="4.5" cy="4.5" r="4" stroke="#1565C0" strokeWidth="1"/>
            <path d="M2.5 4.5l1.5 1.5 2.5-3" stroke="#1565C0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Included in your trial
        </span>
        <span className="am-trial-meta__using">You've been using this during your trial</span>
      </div>
      {addon.trialUsage && (
        <div className="am-trial-usage">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <rect x="1" y="7" width="2" height="4" rx="1" fill="#4094F7"/>
            <rect x="5" y="4" width="2" height="7" rx="1" fill="#4094F7"/>
            <rect x="9" y="1" width="2" height="10" rx="1" fill="#4094F7"/>
          </svg>
          <span>{addon.trialUsage}</span>
        </div>
      )}
      {!checked && addon.lossAversion && (
        <div className="am-trial-warning" role="alert">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M6.5 1.5L11.5 10H1.5L6.5 1.5Z" stroke="#C25200" strokeWidth="1.3" strokeLinejoin="round"/>
            <line x1="6.5" y1="5" x2="6.5" y2="8" stroke="#C25200" strokeWidth="1.3" strokeLinecap="round"/>
            <circle cx="6.5" cy="9.5" r="0.6" fill="#C25200"/>
          </svg>
          <span>{addon.lossAversion}</span>
        </div>
      )}
    </div>
  );
}

function AddonRow({ addon, checked, onToggle, isLast }: { addon: Addon; checked: boolean; onToggle: () => void; isLast: boolean }) {
  return (
    <>
      <label
        className={`am-row ${addon.isTrial ? "am-row--trial" : ""} ${addon.isTrial && !checked ? "am-row--trial-unchecked" : ""}`}
        htmlFor={`ao-${addon.id}`}
      >
        <input id={`ao-${addon.id}`} type="checkbox" className="sr-only" checked={checked} onChange={onToggle} />
        <div className="am-row__top">
          <div className="am-row__left">
            <span className="am-row__cb-wrap"><CheckboxBox checked={checked} /></span>
            <div className="am-row__name-group">
              <span className="am-row__name">{addon.name}</span>
              {addon.badge && <span className="am-badge">{addon.badge}</span>}
            </div>
          </div>
          <div className="am-row__price">
            <span className="am-price__amount">${addon.price}</span>
            <span className="am-price__unit"><>&thinsp;/ month</></span>
          </div>
        </div>
        {addon.isTrial && <TrialMeta addon={addon} checked={checked} />}
        <p className="am-row__desc">{addon.description}</p>
        {addon.includes && (
          <div className="am-includes">
            <p className="am-includes__title">{addon.includes.title}</p>
            <div className="am-includes__cols">
              <div className="am-includes__col">
                {addon.includes.cols[0].map((item) => (
                  <div key={item.label} className="am-inc-item">
                    <BlueCheck />
                    <div className="am-inc-item__text">
                      <span className="am-inc-item__label">{item.label}</span>
                      {item.note && <span className="am-inc-item__note">{item.note}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="am-includes__col">
                {addon.includes.cols[1].map((item) => (
                  <div key={item.label} className="am-inc-item">
                    <BlueCheck />
                    <div className="am-inc-item__text">
                      <span className="am-inc-item__label">{item.label}</span>
                      {item.exclusive && <span className="am-inc-item__exclusive">{item.exclusive}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="am-includes__legal">{addon.includes.legal}</p>
          </div>
        )}
      </label>
      {!isLast && <div className="am-row-divider" />}
    </>
  );
}

function BundleCard({ selected, onToggle }: { selected: boolean; onToggle: () => void }) {
  return (
    <label className="am-bundle" htmlFor="ao-bundle">
      <input id="ao-bundle" type="checkbox" className="sr-only" checked={selected} onChange={onToggle} />
      <span className="am-bundle__ribbon" aria-hidden="true">BEST VALUE</span>
      <div className="am-row__top">
        <div className="am-row__left">
          <span className="am-row__cb-wrap"><CheckboxBox checked={selected} /></span>
          <span className="am-bundle__name">STUDIO PLUS</span>
        </div>
        <div className="am-row__price">
          <span className="am-price__amount">$250</span>
          <span className="am-price__unit am-price__unit--stack">
            <span>/ month</span><span>per location</span>
          </span>
        </div>
      </div>
      <p className="am-row__desc am-row__desc--bundle">All in one bundle for any business. One simple pricing. Everything included.</p>
      <div className="am-bundle__features">
        <div className="am-bundle__col">
          {BUNDLE_LEFT.map((f) => (
            <div key={f} className="am-inc-item">
              <BlueCheck />
              <span className="am-inc-item__label" style={{ whiteSpace: "pre-line" }}>{f}</span>
            </div>
          ))}
        </div>
        <div className="am-bundle__col">
          {BUNDLE_RIGHT.map((f) => (
            <div key={f} className="am-inc-item">
              <BlueCheck />
              <span className="am-inc-item__label">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </label>
  );
}

function Separator() {
  return (
    <div className="am-separator">
      <span className="am-separator__line" />
      <span className="am-separator__text">or get the best of everything in one flat price</span>
      <span className="am-separator__line" />
    </div>
  );
}

type Props = { planName: string; onClose: () => void; onProceed: (selectedAddons: Set<string>) => void };

export function UpgradeAddOnsModal({ planName, onClose, onProceed }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set(TRIAL_ADDON_IDS));
  const [bundleSelected, setBundleSelected] = useState(false);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Add-ons selection"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="am-modal">
        <button type="button" className="am-modal__close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="am-modal__title-block">
          <h2 className="am-modal__title">Level up your {planName} plan</h2>
          <p className="am-modal__subtitle">Choose add-ons to include with your subscription</p>
        </div>

        {/* Trial add-ons */}
        <div className="am-modal__section">
          <div className="am-section-header am-section-header--trial">
            <div className="am-section-header__text">
              <p className="am-section-header__title">Continue using your trial features</p>
              <p className="am-section-header__desc">You've been using these add-ons during your trial. Keep them to avoid losing access and progress.</p>
            </div>
          </div>
          <div className="am-list-card am-list-card--trial">
            {TRIAL_ADDONS.map((addon, idx) => (
              <AddonRow key={addon.id} addon={addon} checked={selected.has(addon.id)}
                onToggle={() => toggle(addon.id)} isLast={idx === TRIAL_ADDONS.length - 1} />
            ))}
          </div>
        </div>

        {/* Other add-ons */}
        <div className="am-modal__section am-modal__section--more">
          <p className="am-more-label">Add more to your plan</p>
          <div className="am-list-card">
            {OTHER_ADDONS.map((addon, idx) => (
              <AddonRow key={addon.id} addon={addon} checked={selected.has(addon.id)}
                onToggle={() => toggle(addon.id)} isLast={idx === OTHER_ADDONS.length - 1} />
            ))}
          </div>
        </div>

        <Separator />

        <div className="am-modal__section">
          <div className="am-bundle-wrap">
            <BundleCard selected={bundleSelected} onToggle={() => setBundleSelected((v) => !v)} />
          </div>
        </div>

        <div className="am-modal__footer">
          <button type="button" className="am-proceed-btn"
            onClick={() => onProceed(bundleSelected ? new Set(["studio-plus"]) : new Set(selected))}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
