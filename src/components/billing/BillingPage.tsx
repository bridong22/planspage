/* ── Settings secondary sidebar items ──────────────────────────────────────── */

const BASIC_ITEMS = ["About", "Locations", "Branding And Logo", "Billing"];
const ADVANCED_ITEMS = [
  "Auto Messages and Events",
  "Event Types",
  "Consultation Form",
  "Permissions",
  "Auto Client Tags",
  "Custom Client Tags",
  "Client Referrals",
];

function SettingsSubnav() {
  return (
    <aside className="billing-subnav">
      <div className="billing-subnav__group-title">Basic Business</div>
      <ul className="billing-subnav__list">
        {BASIC_ITEMS.map((item) => {
          const active = item === "Billing";
          return (
            <li key={item} className={`billing-subnav__item ${active ? "billing-subnav__item--active" : ""}`}>
              {active && <span className="billing-subnav__indicator" aria-hidden="true" />}
              <span className="billing-subnav__label">{item}</span>
            </li>
          );
        })}
      </ul>

      <div className="billing-subnav__group-title">Advanced Business</div>
      <ul className="billing-subnav__list">
        {ADVANCED_ITEMS.map((item) => (
          <li key={item} className="billing-subnav__item">
            <span className="billing-subnav__label">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ── Puzzle icon ─────────────────────────────────────────────────────────── */

function PuzzleIcon() {
  return (
    <svg width="68" height="68" viewBox="0 0 52 52" fill="none" aria-hidden="true">
      <path
        d="M31 11a4 4 0 0 0-8 0v1H11v12h1a4 4 0 0 1 0 8h-1v12h12v-1a4 4 0 0 1 8 0v1h12V33h-1a4 4 0 0 1 0-8h1V13H31v-2Z"
        stroke="#D5D5D5"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Main page ───────────────────────────────────────────────────────────── */

type Props = {
  onUpgrade: () => void;
  onBrowseAddons: () => void;
};

export function BillingPage({ onUpgrade, onBrowseAddons }: Props) {
  return (
    <div className="billing-layout">
      <SettingsSubnav />

      <div className="billing-content">
        <h1 className="billing-content__h1">Billing</h1>

        {/* ── Base Subscription ── */}
        <div className="billing-content__section">
          <div className="billing-content__header-row">
            <h2 className="billing-content__h2">Base subcription</h2>
            <button type="button" className="billing-upgrade-btn" onClick={onUpgrade}>
              UPGRADE NOW
            </button>
          </div>
          <div className="billing-content__divider" />

          <div className="billing-plan-box">
            <div className="billing-plan-box__top">
              <p className="billing-plan-box__name">Free Trial</p>
            </div>
            <div className="billing-content__divider" />

            <div className="billing-plan-box__stats">
              <div className="billing-stat">
                <div className="billing-stat__row">
                  <span className="billing-stat__label">Coaching clients</span>
                  <span className="billing-stat__val">
                    <span>0/</span>
                    <span className="billing-stat__inf-lg">∞</span>
                  </span>
                </div>
                <span className="billing-stat__big">∞</span>
              </div>

              <div className="billing-stat">
                <div className="billing-stat__row">
                  <span className="billing-stat__label">Basic Clients</span>
                  <span className="billing-stat__val">0/200</span>
                </div>
                <div className="billing-progress">
                  <div className="billing-progress__fill" style={{ width: "0%" }}>
                    <span className="billing-progress__pct">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="billing-content__divider" />
        </div>

        {/* ── Add-on Subscriptions ── */}
        <div className="billing-content__section billing-content__section--addons">
          <div className="billing-content__header-row">
            <h2 className="billing-content__h2">Add-on subscriptions</h2>
            <button type="button" className="billing-browse-link" onClick={onBrowseAddons}>
              Browse all add-ons
            </button>
          </div>
          <div className="billing-content__divider" />

          <div className="billing-empty">
            <PuzzleIcon />
            <p className="billing-empty__title">You aren't subscribed to any add-on</p>
            <p className="billing-empty__desc">
              Purchase powerful add-ons to access additional features that will help you grow your
              coaching business. Add-ons are available at an additional cost and can be purchased
              anytime.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
