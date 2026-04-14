import { PRO_SEAT_OPTIONS } from "../../data/pricingPlans";

type Props = {
  value: number;
  onChange: (seats: number) => void;
};

const ROW1 = [5, 15, 30, 50];
const ROW2 = [75, 100, 200];

export function ProSeatGrid({ value, onChange }: Props) {
  function chip(seats: number) {
    return (
      <button
        key={seats}
        type="button"
        className={`seat-chip${value === seats ? " seat-chip--active" : ""}`}
        onClick={() => onChange(seats)}
        aria-pressed={value === seats}
      >
        {seats}
      </button>
    );
  }

  return (
    <div className="plan-card__seat-section plan-card__seat-section--center" role="group" aria-label="Select client seats">
      <p className="plan-card__seat-label">Select number of client seats:</p>
      <div className="seat-chips-row">
        {ROW1.map((n) => PRO_SEAT_OPTIONS.find((o) => o.seats === n) && chip(n))}
      </div>
      <div className="seat-chips-row">
        {ROW2.map((n) => PRO_SEAT_OPTIONS.find((o) => o.seats === n) && chip(n))}
      </div>
    </div>
  );
}
