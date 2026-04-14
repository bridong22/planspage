import type { BillingPeriod } from "../../data/pricingPlans";

type Props = {
  billing: BillingPeriod;
  onChange: (b: BillingPeriod) => void;
};

export function BillingToggle({ billing, onChange }: Props) {
  return (
    <div className="billing" role="group" aria-label="Billing period">
      <button
        type="button"
        className={`billing__opt${billing === "monthly" ? " billing__opt--active" : ""}`}
        onClick={() => onChange("monthly")}
        aria-pressed={billing === "monthly"}
      >
        <span className="billing__radio" aria-hidden>
          <span className="billing__radio-dot" />
        </span>
        Monthly
      </button>

      <button
        type="button"
        className={`billing__opt${billing === "yearly" ? " billing__opt--active" : ""}`}
        onClick={() => onChange("yearly")}
        aria-pressed={billing === "yearly"}
      >
        <span className="billing__radio" aria-hidden>
          <span className="billing__radio-dot" />
        </span>
        Annually
        <span className="billing__save">Save 10%</span>
      </button>
    </div>
  );
}
