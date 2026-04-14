type Props = {
  seats: number;
};

/** Grow plan — fixed 2-seat count, non-interactive chip. */
export function GrowSeatDisplay({ seats }: Props) {
  return (
    <div className="plan-card__seat-section plan-card__seat-section--start">
      <p className="plan-card__seat-label">Number of client seats included:</p>
      <span className="grow-seat-box" aria-label={`${seats} seats`}>
        {seats}
      </span>
    </div>
  );
}
