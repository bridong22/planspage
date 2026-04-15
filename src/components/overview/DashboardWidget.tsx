import type { ReactNode } from "react";

/** Dot-grid drag-handle icon */
function GripIcon() {
  return (
    <svg
      className="dw__grip-icon"
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="3"  cy="2"  r="1.4" />
      <circle cx="9"  cy="2"  r="1.4" />
      <circle cx="3"  cy="8"  r="1.4" />
      <circle cx="9"  cy="8"  r="1.4" />
      <circle cx="3"  cy="14" r="1.4" />
      <circle cx="9"  cy="14" r="1.4" />
    </svg>
  );
}

type Props = {
  /** Widget title shown in the header bar */
  title: string;
  /** Optional element rendered at the right of the header (links, badges, etc.) */
  action?: ReactNode;
  children: ReactNode;
  /** Extra modifier class on the root element */
  className?: string;
  /** Remove body padding — useful for tables/lists that manage their own spacing */
  noPadding?: boolean;
};

/**
 * Universal dashboard widget wrapper.
 * The header carries the `.dw__drag-handle` selector used by react-grid-layout
 * so only the title-bar initiates a drag; child interactive elements work normally.
 */
export function DashboardWidget({
  title,
  action,
  children,
  className,
  noPadding = false,
}: Props) {
  return (
    <div className={`dw${className ? ` ${className}` : ""}`}>
      <div className="dw__drag-handle">
        <GripIcon />
        <h2 className="dw__title">{title}</h2>
        {action && <div className="dw__action">{action}</div>}
      </div>
      <div className={`dw__body${noPadding ? " dw__body--no-pad" : ""}`}>
        {children}
      </div>
    </div>
  );
}
