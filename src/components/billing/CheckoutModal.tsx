import { useState } from "react";

type PaymentState = "form" | "saved";

type FormValues = {
  firstName: string; lastName: string; cardNumber: string;
  expMonth: string; expYear: string; cvv: string;
  address1: string; address2: string; country: string;
  state: string; city: string; zip: string; phone: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const REQUIRED: (keyof FormValues)[] = [
  "firstName", "lastName", "cardNumber", "expMonth", "expYear",
  "cvv", "address1", "country", "city", "zip",
];

const REQUIRED_LABELS: Record<keyof FormValues, string> = {
  firstName: "First name", lastName: "Last name", cardNumber: "Card number",
  expMonth: "Expiration month", expYear: "Expiration year", cvv: "CVV",
  address1: "Billing address", address2: "", country: "Country",
  state: "", city: "City", zip: "ZIP / Postal code", phone: "",
};

const ADDON_NAMES: Record<string, string> = {
  business: "Business", nutrition: "Advanced Nutrition Coaching",
  stripe: "Stripe Integrated Payments", video: "Video Coaching",
  "branded-app": "Custom Branded Mobile App", "studio-plus": "Studio Plus Bundle",
};

const ADDON_PRICES: Record<string, number> = {
  business: 25, nutrition: 45, stripe: 10, video: 25, "branded-app": 169, "studio-plus": 250,
};

const TRIAL_ADDON_IDS = new Set(["business", "nutrition"]);

function validateForm(form: FormValues): FormErrors {
  const errors: FormErrors = {};
  REQUIRED.forEach((key) => {
    if (!form[key]?.trim()) errors[key] = `${REQUIRED_LABELS[key]} is required`;
  });
  return errors;
}

function maskCard(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
}

function nextBillingDate(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

function Field({ label, required, placeholder, value, error, onChange, maxLength }: {
  label: string; required?: boolean; placeholder: string; value: string;
  error?: string; onChange: (v: string) => void; maxLength?: number;
}) {
  return (
    <div className={`ck-field ${error ? "ck-field--error" : ""}`}>
      <label className="ck-field__label">{label}{required && <span className="ck-field__req">*</span>}</label>
      <input type="text" className="ck-field__input" placeholder={placeholder}
        value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} autoComplete="off" />
      {error && <span className="ck-field__error">{error}</span>}
    </div>
  );
}

function PaymentForm({ form, errors, set }: {
  form: FormValues; errors: FormErrors; set: (k: keyof FormValues) => (v: string) => void;
}) {
  return (
    <div className="ck-form">
      <div className="ck-row">
        <Field label="First name" required placeholder="First Name" value={form.firstName} error={errors.firstName} onChange={set("firstName")} />
        <Field label="Last Name" required placeholder="Last Name" value={form.lastName} error={errors.lastName} onChange={set("lastName")} />
      </div>
      <div className="ck-row">
        <Field label="Credit Card Number" required placeholder="Card number" value={form.cardNumber} error={errors.cardNumber}
          onChange={(v) => set("cardNumber")(maskCard(v))} maxLength={19} />
        <div className="ck-row ck-row--inner">
          <div className={`ck-field ck-field--exp ${(errors.expMonth || errors.expYear) ? "ck-field--error" : ""}`}>
            <label className="ck-field__label">Expiration Date<span className="ck-field__req">*</span></label>
            <div className="ck-exp-group">
              <input type="text" className={`ck-field__input ck-field__input--mm ${errors.expMonth ? "ck-field__input--err" : ""}`}
                placeholder="MM" maxLength={2} value={form.expMonth} onChange={(e) => set("expMonth")(e.target.value)} />
              <span className="ck-exp-sep">/</span>
              <input type="text" className={`ck-field__input ck-field__input--yy ${errors.expYear ? "ck-field__input--err" : ""}`}
                placeholder="YY" maxLength={2} value={form.expYear} onChange={(e) => set("expYear")(e.target.value)} />
            </div>
            {(errors.expMonth || errors.expYear) && <span className="ck-field__error">{errors.expMonth || errors.expYear}</span>}
          </div>
          <Field label="CVV" required placeholder="CVV" value={form.cvv} error={errors.cvv} onChange={set("cvv")} maxLength={4} />
        </div>
      </div>
      <div className="ck-row">
        <Field label="Billing Address 1" required placeholder="Address 1" value={form.address1} error={errors.address1} onChange={set("address1")} />
        <Field label="Billing Address 2" placeholder="Address 2" value={form.address2} onChange={set("address2")} />
      </div>
      <div className="ck-row">
        <div className={`ck-field ${errors.country ? "ck-field--error" : ""}`}>
          <label className="ck-field__label">Country<span className="ck-field__req">*</span></label>
          <div className="ck-select-wrap">
            <select className="ck-field__input ck-field__select" value={form.country} onChange={(e) => set("country")(e.target.value)}>
              <option value="">Select</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
            <span className="ck-select-arrow" aria-hidden="true">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
          {errors.country && <span className="ck-field__error">{errors.country}</span>}
        </div>
        <div className="ck-row ck-row--inner">
          <Field label="State / Province" placeholder="State" value={form.state} onChange={set("state")} />
          <Field label="City" required placeholder="City" value={form.city} error={errors.city} onChange={set("city")} />
        </div>
      </div>
      <div className="ck-row">
        <Field label="ZIP / Postal Code" required placeholder="ZIP / Postal Code" value={form.zip} error={errors.zip} onChange={set("zip")} />
        <Field label="Phone Number" placeholder="888 888 8888" value={form.phone} onChange={set("phone")} />
      </div>
    </div>
  );
}

function SavedCardWidget({ form, onChangeCc }: { form: FormValues; onChangeCc: () => void }) {
  const last4 = form.cardNumber.replace(/\D/g, "").slice(-4) || "····";
  const name = [form.firstName, form.lastName].filter(Boolean).join(" ") || "Cardholder";
  const expiry = `${form.expMonth.padStart(2, "0")}/${form.expYear}`;
  return (
    <div className="ck-saved-card-wrap">
      <div className="ck-saved-card">
        <div className="ck-saved-card__section">
          <p className="ck-saved-card__micro-label">Card Number</p>
          <div className="ck-saved-card__number-row">
            <span className="ck-visa-badge">VISA</span>
            <span className="ck-saved-card__masked">
              <span className="ck-saved-card__dots">**** **** ****</span>
              <strong className="ck-saved-card__last4">{last4}</strong>
            </span>
          </div>
        </div>
        <div className="ck-saved-card__footer-row">
          <div>
            <p className="ck-saved-card__micro-label">Name</p>
            <p className="ck-saved-card__value">{name}</p>
          </div>
          <div>
            <p className="ck-saved-card__micro-label">Expiration</p>
            <p className="ck-saved-card__value">{expiry}</p>
          </div>
        </div>
      </div>
      <button type="button" className="btn-secondary btn-secondary--sm" onClick={onChangeCc}>CHANGE</button>
    </div>
  );
}

const US_STATE_TAX: Record<string, number> = {
  CA: 0.0925, NY: 0.08, TX: 0.0625, WA: 0.065, FL: 0.06, IL: 0.0625, PA: 0.06, OH: 0.0575,
};
const COUNTRY_TAX: Record<string, number> = { US: 0.05, CA: 0.05, GB: 0.20, AU: 0.10 };

function estimateTax(subtotal: number, country: string, state: string): number {
  if (country === "US" && state && US_STATE_TAX[state.toUpperCase()])
    return subtotal * US_STATE_TAX[state.toUpperCase()];
  return subtotal * (COUNTRY_TAX[country] ?? 0);
}
function taxLabel(country: string, state: string): string {
  if (country === "US") return state ? `Sales tax (${state.toUpperCase()})` : "Sales tax";
  if (country === "CA") return "GST / HST";
  if (country === "GB") return "VAT (20%)";
  if (country === "AU") return "GST (10%)";
  return "Tax";
}

function OrderSummary({ planName, planPrice, selectedAddons, discountExpanded, discountCode,
  onExpandDiscount, onDiscountChange, payState, country, state: stateField }: {
  planName: string; planPrice: number; selectedAddons: Set<string>;
  discountExpanded: boolean; discountCode: string;
  onExpandDiscount: () => void; onDiscountChange: (v: string) => void;
  payState: PaymentState; country: string; state: string;
}) {
  const renewDate = nextBillingDate();
  const addonTotal = Array.from(selectedAddons).reduce((sum, id) => sum + (ADDON_PRICES[id] ?? 0), 0);
  const subtotal = planPrice + addonTotal;
  const taxAmount = payState === "saved" ? estimateTax(subtotal, country, stateField) : 0;
  const total = subtotal + taxAmount;

  return (
    <div className="ck-summary">
      <div className="ck-section-title">
        <span className="ck-section-title__text">New plan summary</span>
        <div className="ck-section-title__line" />
      </div>

      <div className="ck-line-item">
        <div className="ck-line-item__top">
          <span className="ck-line-item__name">{planName} base subscription</span>
          <span className="ck-line-item__price">${planPrice.toFixed(2)} / mo</span>
        </div>
        <p className="ck-line-item__desc">New subscription that renews monthly on the {renewDate}.</p>
        <div className="ck-line-item__divider" />
      </div>

      {Array.from(selectedAddons).map((id) => (
        <div key={id} className="ck-line-item">
          <div className="ck-line-item__top">
            <span className="ck-line-item__name">{ADDON_NAMES[id] ?? id}</span>
            <span className="ck-line-item__price">${ADDON_PRICES[id] ?? 0}.00 / mo</span>
          </div>
          {TRIAL_ADDON_IDS.has(id) && (
            <p className="ck-line-item__trial">✓ Included in your trial — now converting to paid</p>
          )}
          <p className="ck-line-item__desc">Change will apply immediately. Pro-rated and billed today. Renews monthly.</p>
          <div className="ck-line-item__divider" />
        </div>
      ))}

      {!discountExpanded ? (
        <button type="button" className="ck-discount-link" onClick={onExpandDiscount}>Enter discount code</button>
      ) : (
        <div className="ck-discount-row">
          <input type="text" className="ck-field__input ck-discount-input"
            placeholder="Discount code" value={discountCode} onChange={(e) => onDiscountChange(e.target.value)} />
          <button type="button" className="btn-secondary btn-secondary--sm">Apply</button>
        </div>
      )}

      <div className="ck-totals">
        <div className="ck-totals__row">
          <span className="ck-totals__label">Subtotal</span>
          <span className="ck-totals__value">${subtotal.toFixed(2)} / mo</span>
        </div>
        {payState === "form" ? (
          <div className="ck-tax-pending">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="7" cy="7" r="6.5" stroke="#4094F7" strokeWidth="1"/>
              <line x1="7" y1="6" x2="7" y2="10" stroke="#4094F7" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="7" cy="4" r="0.75" fill="#4094F7"/>
            </svg>
            <p className="ck-tax-pending__text">Taxes are calculated based on your billing address. Save your payment information to see the final total.</p>
          </div>
        ) : (
          <>
            <div className="ck-totals__row ck-totals__row--tax">
              <span className="ck-totals__label">{taxLabel(country, stateField)}</span>
              <span className="ck-totals__value">${taxAmount.toFixed(2)} / mo</span>
            </div>
            <div className="ck-totals__divider" />
            <div className="ck-totals__row ck-totals__row--total">
              <span className="ck-totals__label--total">Total</span>
              <span className="ck-totals__value--total">${total.toFixed(2)} / mo</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const PLANS_WITHOUT_ADDONS = ["Studio Plus", "Studio Max"];

type Props = {
  planName: string; planPrice: number; selectedAddons: Set<string>;
  onBack: () => void; onConfirm: () => void; onClose: () => void;
};

export function CheckoutModal({ planName, planPrice, selectedAddons, onBack, onConfirm, onClose }: Props) {
  const showBackButton = !PLANS_WITHOUT_ADDONS.includes(planName);
  const [payState, setPayState] = useState<PaymentState>("form");
  const [discountExpanded, setDiscountExpanded] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [form, setForm] = useState<FormValues>({
    firstName: "", lastName: "", cardNumber: "", expMonth: "", expYear: "",
    cvv: "", address1: "", address2: "", country: "", state: "", city: "", zip: "", phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function set(key: keyof FormValues) {
    return (value: string) => {
      setForm((f) => ({ ...f, [key]: value }));
      if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    };
  }

  function handleConfirm() {
    if (payState === "form") {
      const errs = validateForm(form);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        document.querySelector(".checkout-col--left")?.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setErrors({});
      setPayState("saved");
    } else {
      onConfirm();
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Checkout"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="checkout-modal">
        <button type="button" className="modal-x-btn modal-x-btn--checkout" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="checkout-modal__body">
          <div className="checkout-col checkout-col--left">
            <div className="ck-section-title">
              <span className="ck-section-title__text">Payment Method</span>
              <div className="ck-section-title__line" />
            </div>
            {payState === "form" ? (
              <>
                <PaymentForm form={form} errors={errors} set={set} />
                {Object.keys(errors).length > 0 && (
                  <p className="ck-form-error-summary">Please complete all required fields marked above.</p>
                )}
              </>
            ) : (
              <SavedCardWidget form={form} onChangeCc={() => { setPayState("form"); setErrors({}); }} />
            )}
          </div>

          <div className="checkout-col checkout-col--right">
            <OrderSummary
              planName={planName} planPrice={planPrice} selectedAddons={selectedAddons}
              discountExpanded={discountExpanded} discountCode={discountCode}
              onExpandDiscount={() => setDiscountExpanded(true)} onDiscountChange={setDiscountCode}
              payState={payState} country={form.country} state={form.state}
            />
            <div className="ck-actions">
              <button type="button" className="btn-primary" onClick={handleConfirm}>CONFIRM CHANGES</button>
              {showBackButton && (
                <button type="button" className="btn-secondary" onClick={onBack}>RETURN TO PICK ADD-ONS</button>
              )}
            </div>
            <p className="ck-legal">
              Any changes to your base plan or add-ons will apply immediately and you will be billed
              today. Prices will be pro-rated and renewed monthly on your next billing cycle. The
              total amount on your invoice is in US dollars and includes the subscription fees and
              any sales taxes applicable for your country or location. You may change or cancel your
              subscription at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
