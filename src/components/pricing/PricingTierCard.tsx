import type { ReactNode } from "react";
import type { FeatureItem, Price } from "../../data/pricingPlans";

type Props = {
  name: string;
  description: string;
  /** Full seat control element (includes label + chips/box) */
  seatControl: ReactNode;
  price: Price;
  priceNote?: string;
  onSelect: () => void;
  /** CTA button label — defaults to "SELECT" */
  ctaLabel?: string;
  featureTitle: string;
  features: readonly FeatureItem[];
  /** Optional addons for Grow / Pro (plain text list) */
  optionalAddons?: readonly string[];
  /** Tooltip copy keyed by add-on label (Grow card) */
  addonTooltips?: Record<string, string>;
  /** Included addons for Studio / Enterprise (yellow panel with checkmarks) */
  includedAddons?: readonly string[];
  /** Show "SAVE $500+ annually" badge on the Studio panel */
  showSaveBadge?: boolean;
  /** Pro + Annual + 5-seats → MOST POPULAR ribbon + yellow border */
  mostPopular?: boolean;
  /** Tooltip copy keyed by included-addon label (Studio card) */
  includedAddonTooltips?: Record<string, string>;
  /** Set of included-addon labels that should render with no icon (e.g. CBA on Enterprise) */
  noIconAddons?: ReadonlySet<string>;
};

/** Plain info icon — no tooltip copy available */
function InfoIcon() {
  return (
    <span className="plan-card__info-icon" aria-hidden>
      i
    </span>
  );
}

/** Info icon with hover tooltip bubble — shown when tooltip copy is provided */
function TooltipIcon({ text }: { text: string }) {
  return (
    <span className="tooltip-wrap">
      <span className="plan-card__info-icon" aria-label={text}>i</span>
      <span className="tooltip-bubble" role="tooltip">{text}</span>
    </span>
  );
}

function formatPrice(p: Price): string {
  return p === "custom" ? "Custom" : `$${p}`;
}

export function PricingTierCard({
  name,
  description,
  seatControl,
  price,
  priceNote,
  onSelect,
  ctaLabel = "SELECT",
  featureTitle,
  features,
  optionalAddons,
  addonTooltips,
  includedAddons,
  includedAddonTooltips,
  showSaveBadge = false,
  mostPopular = false,
  noIconAddons,
}: Props) {
  const isCustom = price === "custom";

  return (
    <article className={`plan-card${mostPopular ? " plan-card--popular" : ""}`}>
      {/* MOST POPULAR ribbon — top-right corner (Pro + Annual + 5 seats) */}
      {mostPopular && (
        <div className="plan-card__popular-badge" aria-label="Most Popular">
          MOST POPULAR
        </div>
      )}

      {/* ── Info: name → desc → seat selector → price → CTA ── */}
      <div className="plan-card__info">
        <h2 className="plan-card__name">{name}</h2>
        <p className="plan-card__desc">{description}</p>

        {/* Seat control renders its own .plan-card__seat-section wrapper */}
        {seatControl}

        {/* Price — for custom plans show priceNote inline; otherwise show /mo + note */}
        <div className="plan-card__price-block">
          <div className="plan-card__price">
            <span className="plan-card__price-num">{formatPrice(price)}</span>
            {isCustom ? (
              priceNote && (
                <span className="plan-card__price-suffix plan-card__price-suffix--inline">
                  {priceNote}
                </span>
              )
            ) : (
              <span className="plan-card__price-suffix">
                <span>/ mo</span>
                {priceNote && (
                  <span className="plan-card__price-note">{priceNote}</span>
                )}
              </span>
            )}
          </div>
        </div>

        <button type="button" className="plan-card__cta" onClick={onSelect}>
          {ctaLabel}
        </button>
      </div>

      {/* ── Table: features (top, flex:1) + addons (bottom) ── */}
      <div className="plan-card__table">
        {/* Core features — flex:1 forces addons to the same bottom position across all cards */}
        <div className="plan-card__features">
          <p className="plan-card__section-title">{featureTitle}</p>
          <ul className="plan-card__feature-list">
            {features.map((f) => (
              <li key={f.label} className="plan-card__feature-item">
                <span className="plan-card__check" aria-hidden>✓</span>
                {f.label}
                {f.info && (f.tooltip ? <TooltipIcon text={f.tooltip} /> : <InfoIcon />)}
              </li>
            ))}
          </ul>
        </div>

        {/* Optional add-ons (Grow / Pro) — fixed-height section so the header
            always starts at the same Y as "ADD-ONS INCLUDED" on the Studio card */}
        {optionalAddons && optionalAddons.length > 0 && (
          <div className="plan-card__addons-section">
            <p className="plan-card__addons-title">
              Optional add-ons available for purchase
            </p>
            {optionalAddons.map((addon) => {
              const tip = addonTooltips?.[addon];
              return (
                <div key={addon} className="plan-card__addon-item">
                  {addon}
                  {tip ? <TooltipIcon text={tip} /> : <InfoIcon />}
                </div>
              );
            })}
          </div>
        )}

        {/* Included add-ons (Studio / Enterprise) — yellow panel with fixed-height
            section matching .plan-card__addons-section (168px) for cross-card alignment */}
        {includedAddons && includedAddons.length > 0 && (
          <div className="plan-card__included">
            {showSaveBadge && (
              <span className="plan-card__included-badge">
                SAVE $500+ annually
              </span>
            )}
            <div className="plan-card__included-inner">
              <p className="plan-card__included-title">ADD-ONS INCLUDED</p>
              <ul className="plan-card__feature-list">
                {includedAddons.map((addon) => {
                  const tip = includedAddonTooltips?.[addon];
                  const showIcon = !noIconAddons?.has(addon);
                  return (
                    <li key={addon} className="plan-card__feature-item">
                      <span className="plan-card__check" aria-hidden>✓</span>
                      {addon}
                      {showIcon && (tip ? <TooltipIcon text={tip} /> : <InfoIcon />)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
