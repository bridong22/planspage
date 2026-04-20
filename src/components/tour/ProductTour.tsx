/* ── Product Tour ─────────────────────────────────────────────────────────────
   8-step tooltip tour. Growth-heuristic copy. Auto-starts on every page load.
   ─────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";

function IconX({ color = "#AAAEB3" }: { color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 1l10 10M11 1L1 11" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function Avatar() {
  return (
    <div className="pt-avatar" aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#C47C5A"/>
        <path d="M8 14c0-4.4 3.6-8 8-8s8 3.6 8 8v1c0 1.1-.4 2-1.3 2.7C21.3 21 16 24 16 24s-5.3-3-6.7-6.3C8.4 17 8 16.1 8 15v-1z" fill="#6B3A2A"/>
        <ellipse cx="16" cy="14.5" rx="5.5" ry="6" fill="#E8A87C"/>
        <path d="M6 32c0-5.5 4.5-8 10-8s10 2.5 10 8" fill="#4094F7"/>
      </svg>
    </div>
  );
}

function HeroIllustration() {
  return (
    <svg width="160" height="96" viewBox="0 0 160 96" aria-hidden="true">
      <defs>
        <radialGradient id="pt-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#FFCE00" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#FFCE00" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="80" cy="52" rx="60" ry="44" fill="url(#pt-glow)"/>
      <path d="M56 28 L104 28 L98 56 Q80 68 62 56Z" fill="#FFCE00"/>
      <path d="M56 33 Q38 33 38 50 Q38 61 56 57" stroke="#FFCE00" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M104 33 Q122 33 122 50 Q122 61 104 57" stroke="#FFCE00" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <rect x="73" y="56" width="14" height="16" rx="2" fill="#FFCE00"/>
      <rect x="62" y="70" width="36" height="7" rx="3.5" fill="#FFCE00"/>
      <path d="M80 37 L82.5 44 L90 44 L84 48 L86 55 L80 51 L74 55 L76 48 L70 44 L77.5 44Z" fill="white" opacity="0.92"/>
      <circle cx="32" cy="34" r="3" fill="#FFCE00" opacity="0.7"/>
      <circle cx="128" cy="30" r="2.5" fill="#FFCE00" opacity="0.6"/>
      <circle cx="25" cy="62" r="2" fill="#FFCE00" opacity="0.45"/>
      <circle cx="135" cy="68" r="3" fill="#FFCE00" opacity="0.65"/>
      <circle cx="42" cy="80" r="1.5" fill="#FFCE00" opacity="0.4"/>
      <circle cx="118" cy="78" r="2" fill="#FFCE00" opacity="0.5"/>
      <path d="M38 20 L39.5 24.5 L44 26 L39.5 27.5 L38 32 L36.5 27.5 L32 26 L36.5 24.5Z" fill="#FFCE00"/>
      <path d="M122 18 L123.2 22 L127 23 L123.2 24 L122 28 L120.8 24 L117 23 L120.8 22Z" fill="#FFCE00" opacity="0.8"/>
    </svg>
  );
}

function AddonChip({ emoji, name, tagline }: { emoji: string; name: string; tagline: string }) {
  return (
    <div className="pt-addon-chip">
      <span className="pt-addon-chip__emoji" aria-hidden="true">{emoji}</span>
      <div className="pt-addon-chip__text">
        <p className="pt-addon-chip__name">{name}</p>
        <p className="pt-addon-chip__tag">{tagline}</p>
      </div>
      <span className="pt-addon-chip__free">FREE</span>
    </div>
  );
}

function StepBadge({ label }: { label: string }) {
  return <div className="pt-step-badge">{label}</div>;
}

type StepDef = {
  target: string | null;
  placement: "center" | "right" | "bottom" | "bottom-left";
  badge?: string;
  content: React.ReactNode;
  btnLabel: string;
};

const STEPS: StepDef[] = [
  { target: null, placement: "center", content: null, btnLabel: "Show Me Around!" },
  {
    target: '[data-tour="add-btn"]', placement: "bottom",
    content: (
      <>
        <p className="pt-body">Your shortcut to <strong>getting clients set up fast</strong>.</p>
        <ul className="pt-list">
          <li>👤 Add clients individually or in bulk</li>
          <li>👥 Invite team coaches to your account</li>
          <li>📅 Schedule appointments instantly</li>
        </ul>
        <p className="pt-tip">💡 Add your first client before you log out today.</p>
      </>
    ),
    btnLabel: "Next",
  },
  {
    target: '[data-tour="master-lib"]', placement: "right",
    content: (
      <>
        <p className="pt-body"><strong>Build your content once</strong> — deliver it to every client.</p>
        <ul className="pt-list">
          <li>🏋️ Custom workouts &amp; exercises</li>
          <li>📋 Signature training programs</li>
          <li>🥗 Meal plans <em>(unlocked with your Nutrition trial!)</em></li>
          <li>✅ Daily habit stacks</li>
        </ul>
        <p className="pt-body">Assign any piece of content to a client in two taps.</p>
      </>
    ),
    btnLabel: "Next",
  },
  {
    target: '[data-tour="messages"]', placement: "right",
    content: (
      <>
        <p className="pt-body"><strong>Retention lives in the conversation.</strong></p>
        <p className="pt-body">Your Messages inbox is where you motivate, check in, and build the trainer-client relationship that turns short-term sign-ups into long-term clients.</p>
      </>
    ),
    btnLabel: "Next",
  },
  {
    target: '[data-tour="scheduling"]', placement: "right",
    content: (
      <>
        <p className="pt-body"><strong>Let clients come to you — automatically.</strong></p>
        <p className="pt-body">Set your availability once and let clients book 1-on-1 sessions, group classes, and check-ins directly in-app. Confirmations and reminders are sent for you.</p>
      </>
    ),
    btnLabel: "Next",
  },
  {
    target: '[data-tour="payments"]', placement: "right",
    badge: "✨ Business Kit — Trial Active",
    content: (
      <>
        <p className="pt-body"><strong>Your Business Kit trial is ready to use.</strong></p>
        <p className="pt-body">Sell training programs, collect payments through Stripe, and share a booking link so clients can purchase directly. This is how coaches scale beyond trading hours for dollars.</p>
        <p className="pt-tip">Head to Payments to connect Stripe and create your first product.</p>
      </>
    ),
    btnLabel: "Next",
  },
  {
    target: '[data-tour="help-btn"]', placement: "bottom-left",
    content: (
      <>
        <p className="pt-body"><strong>We&apos;ve got you every step of the way.</strong></p>
        <p className="pt-body">Click the ? anytime to access help docs, live chat support, weekly coaching webinars, and your Getting Started Checklist.</p>
      </>
    ),
    btnLabel: "Next",
  },
  {
    target: '[data-tour="help-btn"]', placement: "bottom-left",
    content: (
      <>
        <p className="pt-body" style={{ fontWeight: 700, color: "#241F20" }}>You&apos;re set up for an incredible 30 days. 🎉</p>
        <p className="pt-body">Inside the ? menu, find your <strong>Getting Started Checklist</strong> — a step-by-step guide to maximize your trial and hit the ground running.</p>
      </>
    ),
    btnLabel: "Done",
  },
];

function TourCard({ step, total, badge, content, btnLabel, onNext, onClose }: {
  step: number; total: number; badge?: string; content: React.ReactNode;
  btnLabel: string; onNext: () => void; onClose: () => void;
}) {
  return (
    <div className="pt-card">
      <div className="pt-card__header">
        <div className="pt-card__header-left">
          <Avatar />
          <span className="pt-card__author">Sabrina from ABC Tra...</span>
        </div>
        <button type="button" className="pt-card__close" onClick={onClose} aria-label="Close tour"><IconX /></button>
      </div>
      <div className="pt-card__body">
        {badge && <StepBadge label={badge} />}
        {content}
      </div>
      <div className="pt-card__footer">
        <span className="pt-card__counter">{step} of {total}</span>
        <button type="button" className="pt-card__btn" onClick={onNext}>{btnLabel}</button>
      </div>
    </div>
  );
}

function WelcomeCard({ onNext, onClose, step, total }: { onNext: () => void; onClose: () => void; step: number; total: number }) {
  return (
    <div className="pt-welcome-card">
      <div className="pt-hero">
        <button type="button" className="pt-hero__close" onClick={onClose} aria-label="Close tour">
          <IconX color="rgba(255,255,255,0.6)" />
        </button>
        <HeroIllustration />
        <p className="pt-hero__eyebrow">30-DAY FREE TRIAL</p>
        <h2 className="pt-hero__title">Premium add-ons — unlocked.</h2>
      </div>
      <div className="pt-welcome-body">
        <p className="pt-welcome-intro">
          You have <strong>full access to two premium add-ons</strong> during your trial — no commitment needed. Explore them freely, then choose to keep what grows your business.
        </p>
        <div className="pt-addon-chips">
          <AddonChip emoji="💼" name="Business Kit" tagline="Sell programs & collect payments" />
          <AddonChip emoji="🥗" name="Advanced Nutrition" tagline="AI-powered meal planning for clients" />
        </div>
        <p className="pt-welcome-note">
          You&apos;ll select and pay for the add-ons you want to keep at checkout — no charges until your trial ends.
        </p>
      </div>
      <div className="pt-card__footer">
        <span className="pt-card__counter">{step} of {total}</span>
        <button type="button" className="pt-card__btn" onClick={onNext}>Show Me Around!</button>
      </div>
    </div>
  );
}

type SpotRect = { top: number; left: number; width: number; height: number };
type TipPos = { top: number; left: number };
const TOOLTIP_W = 288, SPOT_PAD = 6, GAP = 14;

export function ProductTour() {
  const [stepIdx, setStepIdx] = useState(0);
  const [active, setActive] = useState(true);
  const [spotRect, setSpotRect] = useState<SpotRect | null>(null);
  const [tipPos, setTipPos] = useState<TipPos | null>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const currentDef = STEPS[stepIdx];
  const isCenter = currentDef.placement === "center";

  const recalc = useCallback(() => {
    if (!active || !currentDef.target) { setSpotRect(null); setTipPos(null); return; }
    const el = document.querySelector(currentDef.target) as HTMLElement | null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    const tipH = tipRef.current?.offsetHeight ?? 180;
    setSpotRect({ top: r.top - SPOT_PAD, left: r.left - SPOT_PAD, width: r.width + SPOT_PAD * 2, height: r.height + SPOT_PAD * 2 });
    let top = 0, left = 0;
    if (currentDef.placement === "right") {
      left = r.right + GAP;
      top = Math.max(12, Math.min(r.top + r.height / 2 - tipH / 2, vh - tipH - 12));
      if (left + TOOLTIP_W > vw - 12) left = r.left - TOOLTIP_W - GAP;
    } else if (currentDef.placement === "bottom") {
      top = r.bottom + GAP; left = Math.max(12, Math.min(r.left + r.width / 2 - TOOLTIP_W / 2, vw - TOOLTIP_W - 12));
    } else if (currentDef.placement === "bottom-left") {
      top = r.bottom + GAP; left = Math.max(12, r.right - TOOLTIP_W);
    }
    setTipPos({ top, left });
  }, [active, currentDef, stepIdx]); // eslint-disable-line

  useLayoutEffect(() => {
    if (!active) return;
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [active, recalc]);

  useEffect(() => {
    if (!active || isCenter) return;
    const id = requestAnimationFrame(recalc);
    return () => cancelAnimationFrame(id);
  }, [active, stepIdx, isCenter, recalc]);

  if (!active) return null;
  const stepNum = stepIdx + 1, total = STEPS.length;
  function next() { if (stepIdx < STEPS.length - 1) setStepIdx((s) => s + 1); else setActive(false); }
  function close() { setActive(false); }
  function arrowClass() {
    if (currentDef.placement === "right") return "pt-tooltip--arrow-left";
    if (currentDef.placement === "bottom") return "pt-tooltip--arrow-top-center";
    if (currentDef.placement === "bottom-left") return "pt-tooltip--arrow-top-right";
    return "";
  }

  return (
    <>
      <div className="pt-catch" />
      {spotRect && <div className="pt-spotlight" style={{ top: spotRect.top, left: spotRect.left, width: spotRect.width, height: spotRect.height }} />}
      {isCenter && (
        <div className="pt-center-wrap">
          <WelcomeCard onNext={next} onClose={close} step={stepNum} total={total} />
        </div>
      )}
      {!isCenter && tipPos && (
        <div ref={tipRef} className={`pt-tooltip ${arrowClass()}`} style={{ top: tipPos.top, left: tipPos.left, width: TOOLTIP_W }}>
          <TourCard step={stepNum} total={total} badge={currentDef.badge} content={currentDef.content} btnLabel={currentDef.btnLabel} onNext={next} onClose={close} />
        </div>
      )}
    </>
  );
}
