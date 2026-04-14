import { STUDIO_SEAT_OPTIONS, type StudioTier } from "../../data/pricingPlans";

type Props = {
  value: StudioTier;
  onChange: (t: StudioTier) => void;
};

export function StudioTierGrid({ value, onChange }: Props) {
  return (
    <div className="plan-card__seat-section plan-card__seat-section--center" role="group" aria-label="Select client seats">
      <p className="plan-card__seat-label">Select number of client seats:</p>
      <div className="seat-chips-row">
        {STUDIO_SEAT_OPTIONS.map(({ seats }) => (
          <button
            key={String(seats)}
            type="button"
            className={`seat-chip${value === seats ? " seat-chip--active" : ""}`}
            onClick={() => onChange(seats)}
            aria-pressed={value === seats}
          >
            {String(seats)}
          </button>
        ))}
      </div>
    </div>
  );
}
