import { useState } from "react";
import axios from "axios";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { isValidEmail } from "@/lib/format";
import { BRAND, WELCOME_OFFER } from "@/data/site";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/*
 * Prototype form: submissions are stored in the demo backend only.
 * Loading, success and error states are all implemented for the Shopify port.
 */
export default function NewsletterForm({ compact = false, source = "footer" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");
  const [code, setCode] = useState(WELCOME_OFFER.code);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied — apply it at checkout.");
    } catch {
      setCopied(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setState("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      const { data } = await axios.post(`${API}/newsletter`, { email: email.trim(), source });
      if (data?.welcome_code) setCode(data.welcome_code);
      setState("success");
    } catch (err) {
      setState("error");
      setMessage(
        err?.response?.data?.detail || "Something went wrong. Please try again."
      );
    }
  };

  if (state === "success") {
    return (
      <div data-testid="newsletter-success" className="flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3.5">
        <Check size={18} className="mt-0.5 shrink-0 text-success" />
        <div>
          <p className="text-sm font-semibold text-ink">You’re in — here’s your {WELCOME_OFFER.percent}% off code.</p>
          <div className="mt-2 flex items-center gap-2">
            <code data-testid="newsletter-code" className="rounded-lg border border-dashed border-saffron bg-white px-3 py-1.5 font-mono text-sm font-bold tracking-widest text-ink">{code}</code>
            <button data-testid="newsletter-copy-code" onClick={copy} className="rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-ivory hover:bg-saffron-dark">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-2 text-xs text-ink-soft">
            Apply it at checkout on your first order. (Prototype: code issued by the demo backend.)
          </p>
          <button data-testid="newsletter-reset" onClick={() => { setEmail(""); setState("idle"); }} className="mt-1 text-xs font-semibold text-saffron-dark underline underline-offset-2">
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form data-testid="newsletter-form" onSubmit={submit} noValidate className="w-full">
      <div className={`flex w-full gap-2 ${compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}>
        <input
          data-testid="newsletter-email-input"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
          placeholder="Enter your email for 10% off"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-full border border-line bg-white px-5 py-3 text-sm text-ink outline-none placeholder:text-ink-soft/70 focus:border-saffron"
        />
        <button
          data-testid="newsletter-submit"
          type="submit"
          disabled={state === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-ivory transition-all hover:bg-saffron-dark disabled:opacity-60"
        >
          {state === "loading" ? (
            <><Loader2 size={15} className="animate-spin" /> Joining…</>
          ) : (
            "Get my code"
          )}
        </button>
      </div>
      {state === "error" && (
        <p data-testid="newsletter-error" role="alert" className="mt-2 flex items-center gap-1.5 text-xs font-medium text-error">
          <AlertCircle size={13} /> {message}
        </p>
      )}
      <p className="mt-2.5 text-[11px] leading-relaxed text-ink-soft">
        One welcome code per email. By subscribing you agree to receive occasional emails from {BRAND.name} — styling ideas, gifting inspiration and early access. Unsubscribe anytime.
      </p>
    </form>
  );
}
