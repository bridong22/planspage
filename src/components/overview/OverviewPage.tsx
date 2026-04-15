import { useState } from "react";
import { ResponsiveGridLayout, useContainerWidth } from "react-grid-layout";
import type { LayoutItem, ResponsiveLayouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DashboardWidget } from "./DashboardWidget";

/* ── Types ──────────────────────────────────────────────────────────────────── */

type ClientStatus = "active" | "check-in" | "inactive";

type Client = {
  id: number;
  name: string;
  initials: string;
  status: ClientStatus;
  plan: string;
  lastActive: string;
  compliance: number;
};

type Activity = {
  id: number;
  type: "workout" | "checkin" | "new-client" | "alert";
  text: string;
  time: string;
};

type Session = {
  id: number;
  time: string;
  title: string;
  client: string;
  duration: string;
};

/* ── Data ───────────────────────────────────────────────────────────────────── */

const CLIENTS: Client[] = [
  { id: 1, name: "Sarah Martinez",  initials: "SM", status: "active",   plan: "Pro 5",  lastActive: "2h ago",     compliance: 92 },
  { id: 2, name: "Jake Thompson",   initials: "JT", status: "active",   plan: "Grow",   lastActive: "Yesterday",  compliance: 68 },
  { id: 3, name: "Amy Kim",         initials: "AK", status: "check-in", plan: "Pro 15", lastActive: "3 days ago", compliance: 45 },
  { id: 4, name: "Mike Robinson",   initials: "MR", status: "active",   plan: "Grow",   lastActive: "Today",      compliance: 88 },
  { id: 5, name: "Priya Sharma",    initials: "PS", status: "inactive", plan: "Pro 5",  lastActive: "1 week ago", compliance: 12 },
  { id: 6, name: "David Chen",      initials: "DC", status: "active",   plan: "Pro 5",  lastActive: "Today",      compliance: 74 },
];

const ACTIVITIES: Activity[] = [
  { id: 1, type: "workout",    text: 'Sarah M. completed "Leg Day" workout',  time: "2h ago" },
  { id: 2, type: "checkin",    text: "Jake T. logged body weight: 178 lbs",    time: "4h ago" },
  { id: 3, type: "new-client", text: "Mike R. joined as a new client",          time: "Today 9:00 AM" },
  { id: 4, type: "alert",      text: "Amy K. missed 3 consecutive workouts",   time: "Yesterday" },
  { id: 5, type: "alert",      text: "Priya S. has been inactive for 7 days",  time: "2 days ago" },
];

const UPCOMING: Session[] = [
  { id: 1, time: "10:00 AM", title: "1:1 Video Call",    client: "Sarah M.",    duration: "30 min" },
  { id: 2, time: "2:00 PM",  title: "Client Onboarding", client: "Mike R.",     duration: "60 min" },
  { id: 3, time: "4:30 PM",  title: "Group Challenge",   client: "Summer Shred", duration: "45 min" },
];

const ACTIVITY_COLORS: Record<string, string> = {
  workout:      "var(--ds-color-semantic-success)",
  checkin:      "var(--ds-color-brand-blue)",
  "new-client": "var(--ds-color-brand-yellow)",
  alert:        "var(--ds-color-semantic-danger)",
};

const STATUS_LABEL: Record<ClientStatus, string> = {
  active:     "Active",
  "check-in": "Check-in",
  inactive:   "Inactive",
};

const KPI_ITEMS = [
  { id: "kpi-1", label: "Active Clients",    value: "24",     trend: "↑ 3 this month",        up: true,  highlight: false },
  { id: "kpi-2", label: "Programs Assigned", value: "18",     trend: "↑ 2 this week",          up: true,  highlight: false },
  { id: "kpi-3", label: "Avg. Compliance",   value: "78%",    trend: "↑ 2% vs last week",      up: true,  highlight: false },
  { id: "kpi-4", label: "Monthly Revenue",   value: "$1,247", trend: "↑ $124 from last month", up: true,  highlight: true  },
] as const;

/* ── Default layouts ────────────────────────────────────────────────────────── */

function items(defs: Omit<LayoutItem, "moved" | "static">[]): LayoutItem[] {
  return defs.map((d) => ({ ...d, moved: false, static: false }));
}

const DEFAULT_LAYOUTS: ResponsiveLayouts = {
  lg: items([
    { i: "kpi-1",   x: 0, y: 0,  w: 3,  h: 3,  minW: 2, minH: 2 },
    { i: "kpi-2",   x: 3, y: 0,  w: 3,  h: 3,  minW: 2, minH: 2 },
    { i: "kpi-3",   x: 6, y: 0,  w: 3,  h: 3,  minW: 2, minH: 2 },
    { i: "kpi-4",   x: 9, y: 0,  w: 3,  h: 3,  minW: 2, minH: 2 },
    { i: "clients", x: 0, y: 3,  w: 8,  h: 12, minW: 4, minH: 5 },
    { i: "activity",x: 8, y: 3,  w: 4,  h: 7,  minW: 3, minH: 4 },
    { i: "upcoming",x: 8, y: 10, w: 4,  h: 5,  minW: 3, minH: 3 },
    { i: "nudge",   x: 0, y: 15, w: 8,  h: 2,  minW: 4, minH: 2, maxH: 2 },
  ]),
  md: items([
    { i: "kpi-1",   x: 0, y: 0,  w: 5,  h: 3,  minW: 2, minH: 2 },
    { i: "kpi-2",   x: 5, y: 0,  w: 5,  h: 3,  minW: 2, minH: 2 },
    { i: "kpi-3",   x: 0, y: 3,  w: 5,  h: 3,  minW: 2, minH: 2 },
    { i: "kpi-4",   x: 5, y: 3,  w: 5,  h: 3,  minW: 2, minH: 2 },
    { i: "clients", x: 0, y: 6,  w: 10, h: 12, minW: 4, minH: 5 },
    { i: "activity",x: 0, y: 18, w: 5,  h: 7,  minW: 3, minH: 4 },
    { i: "upcoming",x: 5, y: 18, w: 5,  h: 5,  minW: 3, minH: 3 },
    { i: "nudge",   x: 0, y: 25, w: 10, h: 2,  minW: 4, minH: 2, maxH: 2 },
  ]),
  sm: items([
    { i: "kpi-1",   x: 0, y: 0,  w: 3,  h: 3,  minW: 2, minH: 2 },
    { i: "kpi-2",   x: 3, y: 0,  w: 3,  h: 3,  minW: 2, minH: 2 },
    { i: "kpi-3",   x: 0, y: 3,  w: 3,  h: 3,  minW: 2, minH: 2 },
    { i: "kpi-4",   x: 3, y: 3,  w: 3,  h: 3,  minW: 2, minH: 2 },
    { i: "clients", x: 0, y: 6,  w: 6,  h: 12, minW: 4, minH: 5 },
    { i: "activity",x: 0, y: 18, w: 6,  h: 7,  minW: 3, minH: 4 },
    { i: "upcoming",x: 0, y: 25, w: 6,  h: 5,  minW: 3, minH: 3 },
    { i: "nudge",   x: 0, y: 30, w: 6,  h: 2,  minW: 4, minH: 2, maxH: 2 },
  ]),
};

/* ── Sub-components ─────────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: ClientStatus }) {
  return (
    <span className={`ov-status ov-status--${status}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

function ComplianceBar({ pct }: { pct: number }) {
  const color =
    pct >= 70 ? "var(--ds-color-semantic-success)"
    : pct >= 40 ? "var(--ds-color-semantic-warning)"
    : "var(--ds-color-semantic-danger)";
  return (
    <div className="ov-compliance">
      <div className="ov-compliance__track">
        <div className="ov-compliance__fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="ov-compliance__pct">{pct}%</span>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────────────── */

export function OverviewPage({ onUpgrade }: { onUpgrade: () => void }) {
  const [layouts, setLayouts] = useState<ResponsiveLayouts>(DEFAULT_LAYOUTS);
  const { width, mounted, containerRef } = useContainerWidth();

  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <div className="ov-page">
      {/* ── Fixed greeting header ── */}
      <div className="ov-header">
        <div className="ov-greeting">
          <h1 className="ov-greeting__title">Good morning, Trainer O.!</h1>
          <p className="ov-greeting__date">{dateStr}</p>
        </div>
        <div className="ov-header__actions">
          <button type="button" className="ov-btn ov-btn--primary">+ Add Client</button>
          <button type="button" className="ov-btn ov-btn--ghost">Create Program</button>
          <button type="button" className="ov-btn ov-btn--ghost">Send Message</button>
          <button
            type="button"
            className="ov-btn ov-btn--ghost ov-btn--icon"
            title="Reset layout"
            onClick={() => setLayouts(DEFAULT_LAYOUTS)}
          >
            ↺
          </button>
        </div>
      </div>

      {/* ── Resizable / draggable widget grid ── */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className="ov-dashboard" ref={containerRef as any}>
        {mounted && (
        <ResponsiveGridLayout
          className="ov-rgl"
          width={width}
          layouts={layouts}
          onLayoutChange={(_cur, all) => setLayouts(all ?? {})}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={40}
          margin={[12, 12]}
          containerPadding={[0, 0]}
          dragConfig={{ handle: ".dw__drag-handle" }}
        >
          {/* ── KPI cards ── */}
          {KPI_ITEMS.map((k) => (
            <div key={k.id}>
              <div className={`dw dw--kpi${k.highlight ? " dw--kpi-highlight" : ""}`}>
                <div className="dw__drag-handle">
                  <svg className="dw__grip-icon" width="12" height="16" viewBox="0 0 12 16" fill="currentColor" aria-hidden>
                    <circle cx="3"  cy="2"  r="1.4" /><circle cx="9"  cy="2"  r="1.4" />
                    <circle cx="3"  cy="8"  r="1.4" /><circle cx="9"  cy="8"  r="1.4" />
                    <circle cx="3"  cy="14" r="1.4" /><circle cx="9"  cy="14" r="1.4" />
                  </svg>
                  <span className="dw__title">{k.label}</span>
                </div>
                <div className="dw__kpi-body">
                  <span className="ov-kpi__value">{k.value}</span>
                  <span className={`ov-kpi__trend ov-kpi__trend--${k.up ? "up" : "down"}`}>
                    {k.trend}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* ── Client overview ── */}
          <div key="clients">
            <DashboardWidget
              title="Client Overview"
              noPadding
              action={
                <button type="button" className="ov-section__link">
                  View all →
                </button>
              }
            >
              <div className="ov-table">
                <div className="ov-table__row ov-table__row--head">
                  <span className="ov-col--name">Client</span>
                  <span className="ov-col--status">Status</span>
                  <span className="ov-col--plan">Plan</span>
                  <span className="ov-col--time">Last Active</span>
                  <span className="ov-col--bar">Compliance</span>
                  <span className="ov-col--action" />
                </div>
                {CLIENTS.map((c) => (
                  <div
                    key={c.id}
                    className={`ov-table__row${c.status === "inactive" ? " ov-table__row--inactive" : ""}`}
                  >
                    <div className="ov-col--name">
                      <span className={`ov-avatar ov-avatar--${c.status}`}>{c.initials}</span>
                      <span className="ov-client-name">{c.name}</span>
                    </div>
                    <div className="ov-col--status"><StatusBadge status={c.status} /></div>
                    <div className="ov-col--plan"><span className="ov-plan-tag">{c.plan}</span></div>
                    <div className="ov-col--time"><span className="ov-muted">{c.lastActive}</span></div>
                    <div className="ov-col--bar"><ComplianceBar pct={c.compliance} /></div>
                    <div className="ov-col--action">
                      <button type="button" className="ov-row-action">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardWidget>
          </div>

          {/* ── Recent activity ── */}
          <div key="activity">
            <DashboardWidget
              title="Recent Activity"
              action={
                <button type="button" className="ov-section__link">See all</button>
              }
            >
              <ul className="ov-feed">
                {ACTIVITIES.map((a) => (
                  <li key={a.id} className="ov-feed__item">
                    <span className="ov-feed__dot" style={{ background: ACTIVITY_COLORS[a.type] }} />
                    <div className="ov-feed__body">
                      <span className="ov-feed__text">{a.text}</span>
                      <span className="ov-feed__time">{a.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </DashboardWidget>
          </div>

          {/* ── Upcoming today ── */}
          <div key="upcoming">
            <DashboardWidget title="Upcoming Today">
              <ul className="ov-upcoming">
                {UPCOMING.map((s) => (
                  <li key={s.id} className="ov-session">
                    <span className="ov-session__time">{s.time}</span>
                    <div className="ov-session__info">
                      <span className="ov-session__title">{s.title}</span>
                      <span className="ov-session__meta">{s.client} · {s.duration}</span>
                    </div>
                    <button type="button" className="ov-row-action ov-row-action--ghost">Join</button>
                  </li>
                ))}
              </ul>
            </DashboardWidget>
          </div>

          {/* ── Upgrade nudge ── */}
          <div key="nudge">
            <div className="dw dw--nudge">
              <div className="dw__drag-handle">
                <svg className="dw__grip-icon" width="12" height="16" viewBox="0 0 12 16" fill="currentColor" aria-hidden>
                  <circle cx="3"  cy="2"  r="1.4" /><circle cx="9"  cy="2"  r="1.4" />
                  <circle cx="3"  cy="8"  r="1.4" /><circle cx="9"  cy="8"  r="1.4" />
                  <circle cx="3"  cy="14" r="1.4" /><circle cx="9"  cy="14" r="1.4" />
                </svg>
                <span className="dw__title">Plan Usage</span>
              </div>
              <div className="dw__nudge-body">
                <span className="ov-nudge__icon">⚡</span>
                <p className="ov-nudge__text">
                  <strong>24 / 24 client seats used.</strong>{" "}
                  Upgrade your plan to add more clients and unlock advanced features.
                </p>
                <button type="button" className="ov-btn ov-btn--upgrade" onClick={onUpgrade}>
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </ResponsiveGridLayout>
        )}
      </div>
    </div>
  );
}
