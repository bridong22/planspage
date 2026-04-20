type Props = {
  planName: string;
  onClose: () => void;
};

export function ConfirmationDialog({ planName, onClose }: Props) {
  return (
    <div
      className="modal-overlay"
      role="dialog" aria-modal="true" aria-label="Upgrade successful"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="confirm-dialog">
        <button type="button" className="modal-x-btn modal-x-btn--confirm"
          onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="confirm-dialog__body">
          <span className="confirm-check" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#45C987" />
              <path d="M13.5 24.5l8 8 13-14"
                stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>

          <h2 className="confirm-dialog__title">Changes successfully applied</h2>
          <p className="confirm-dialog__sub">
            You are now on the {planName} plan.{" "}
            Your plan has been changed.
          </p>
        </div>
      </div>
    </div>
  );
}
