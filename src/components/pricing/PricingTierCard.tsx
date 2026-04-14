import type { ReactNode } from "react";
import type { Price } from "../../data/pricingPlans";

type FeatureItem = { label: string; info?: boolean };

type Props = {
  name: string;
  description: string;
  /** Full seat control element (includes label + chips/box) */
  seatControl: ReactNode;
  price: Price;
  priceNote?: string;
  onSelect: () => void;
  featureTitle: string;
  features: readonly FeatureItem[];
  /** Optional addons for Grow / Pro (plain text list) */
  optionalAddons?: readonly string[];
  /** Included addons for Studio (yellow panel with checkmarks) */
  includedAddons?: readonly string[];
  /** Show "SAVE $500+ annually" badge on the Studio panel */
  showSaveBadge?: boolean;
  /** Pro + Annual + 5-seats → MOST POPULAR ribbon + yellow border */
  mostPopular?: boolean;
};

function InfoIcon() {
  return (
    <span className="plan-card__info-icon" aria-hidden title="More info">
      i
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
  featureTitle,
  features,
  optionalAddons,
  includedAddons,
  showSaveBadge = false,
  mostPopular = false,
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

        {/* Price — note stacks inside suffix column to avoid adding height */}
        <div className="plan-card__price-block">
          <div className="plan-card__price">
            <span className="plan-card__price-num">{formatPrice(price)}</span>
            {!isCustom && (
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
          SELECT
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
                {f.info && <InfoIcon />}
              </li>
            ))}
          </ul>
        </div>

        {/* Optional add-ons (Grow / Pro) */}
        {optionalAddons && optionalAddons.length > 0 && (
          <div>
            <p className="plan-card__addons-title">
              Optional add-ons available for purchase
            </p>
            {optionalAddons.map((addon) => (
              <div key={addon} className="plan-card__addon-item">
                {addon}
                <InfoIcon />
              </div>
            ))}
          </div>
        )}

        {/* Included add-ons (Studio) — yellow panel */}
        {includedAddons && includedAddons.length > 0 && (
          <div className="plan-card__included">
            {/* Save badge floats above the panel at top-right, matching Figma */}
            {showSaveBadge && (
              <span className="plan-card__included-badge">
                SAVE $500+ annually
              </span>
            )}
            <div className="plan-card__included-inner">
              <p className="plan-card__included-title">Add-ons included</p>
              <ul className="plan-card__feature-list">
                {includedAddons.map((addon) => (
                  <li key={addon} className="plan-card__feature-item">
                    <span className="plan-card__check" aria-hidden>✓</span>
                    {addon}
                    <InfoIcon />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
