function IconActiveCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill="#45C987"/>
      <path d="M4 8.5l2.8 2.8 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 6h7M6.5 3.5L9 6l-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

type PreviewCard = { gradient: string; icon: string; title: string; sub: string; price: string };
function RightPanelCard({ card }: { card: PreviewCard }) {
  return (
    <div className="ft-pcard">
      <div className="ft-pcard__thumb" style={{ background: card.gradient }}>
        <span className="ft-pcard__emoji" aria-hidden="true">{card.icon}</span>
      </div>
      <div className="ft-pcard__body">
        <p className="ft-pcard__title">{card.title}</p>
        <p className="ft-pcard__sub">{card.sub}</p>
        <p className="ft-pcard__price">{card.price}</p>
      </div>
      <button className="ft-pcard__buy" tabIndex={-1} aria-hidden="true">Buy now</button>
    </div>
  );
}

type Step = { title: string; description: string; actionLabel: string };
function StepItem({ step, index }: { step: Step; index: number }) {
  return (
    <div className="ft-step">
      <div className="ft-step__num" aria-hidden="true">{index + 1}</div>
      <div className="ft-step__content">
        <p className="ft-step__title">{step.title}</p>
        <p className="ft-step__desc">{step.description}</p>
        <button type="button" className="ft-step__link" onClick={() => {}}>
          {step.actionLabel} <IconArrow />
        </button>
      </div>
    </div>
  );
}

type AddonContent = { name: string; heading: string; body: string; steps: Step[]; cards: PreviewCard[] };

const CONTENT: Record<"business" | "nutrition", AddonContent> = {
  business: {
    name: "Business Kit",
    heading: "Business Kit is now live on your account.",
    body: "Your 30-day free trial has started — no charges until it ends. Here's how to hit the ground running:",
    steps: [
      { title: "Set up Stripe payments", description: "Connect your bank account so clients can purchase your packages and sessions directly.", actionLabel: "Connect Stripe" },
      { title: "Create a coaching package", description: "Bundle your services into a product clients can discover, purchase, and start on demand.", actionLabel: "Create Package" },
      { title: "Share your booking link", description: "Send clients a direct link to book sessions or buy from your store — no back-and-forth.", actionLabel: "Get Booking Link" },
    ],
    cards: [
      { gradient: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", icon: "🔥", title: "12-Week Transformation", sub: "Full-body strength & conditioning", price: "$199" },
      { gradient: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)", icon: "⚡", title: "Monthly Coaching", sub: "Personalized 1-on-1 coaching plan", price: "$80 / mo" },
      { gradient: "linear-gradient(135deg, #78350f 0%, #d97706 100%)", icon: "🎯", title: "1-on-1 Video Sessions", sub: "Private video training calls", price: "$75" },
    ],
  },
  nutrition: {
    name: "Advanced Nutrition",
    heading: "Advanced Nutrition is now live on your account.",
    body: "Your 30-day free trial has started — no charges until it ends. Here's how to get your first client on a plan today:",
    steps: [
      { title: "Create a client meal plan", description: "Generate a personalized plan based on a client's calorie goals, macro targets, and dietary preferences.", actionLabel: "Open Nutrition" },
      { title: "Set nutrition goals per client", description: "Configure daily calorie targets, macro ratios, and meal frequency for each client individually.", actionLabel: "Set Client Goals" },
      { title: "Build your recipe library", description: "Add your own custom recipes so clients can log, track, and cook meals you recommend.", actionLabel: "Add Recipes" },
    ],
    cards: [
      { gradient: "linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)", icon: "🥗", title: "Weight Loss Plan", sub: "High-protein, calorie deficit", price: "$45 / mo" },
      { gradient: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)", icon: "💪", title: "Lean Muscle Builder", sub: "Macro-optimized bulking plan", price: "$45 / mo" },
      { gradient: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)", icon: "🫒", title: "Mediterranean Diet", sub: "Heart-healthy balanced eating", price: "$45 / mo" },
    ],
  },
};

type Props = { addonId: "business" | "nutrition"; onClose: () => void };

export function FreeTrialModal({ addonId, onClose }: Props) {
  const c = CONTENT[addonId];
  return (
    <div className="ft-overlay" role="dialog" aria-modal="true" aria-label={`${c.name} trial activated`}>
      <div className="ft-modal">
        <button type="button" className="ft-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="#797C80" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="ft-left">
          <div className="ft-active-badge">
            <IconActiveCheck />
            <span>ACTIVE · 30-DAY FREE TRIAL</span>
          </div>
          <h2 className="ft-left__heading">{c.heading}</h2>
          <p className="ft-left__body">{c.body}</p>
          <div className="ft-steps">
            {c.steps.map((step, i) => <StepItem key={step.title} step={step} index={i} />)}
          </div>
          <div className="ft-actions">
            <button className="ft-btn ft-btn--primary" onClick={onClose}>GOT IT, START EXPLORING</button>
            <p className="ft-left__note">No credit card required. Cancel anytime before your trial ends.</p>
          </div>
        </div>

        <div className="ft-right">
          <div className="ft-right__overlay" aria-hidden="true" />
          <div className="ft-right__label" aria-hidden="true"><span>NOW UNLOCKED</span></div>
          <div className="ft-right__cards">
            {c.cards.map((card) => <RightPanelCard key={card.title} card={card} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
