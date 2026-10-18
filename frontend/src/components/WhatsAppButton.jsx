import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP, DELIVERY_PROMISE } from "@/data/site";

/* Floating help button — opens WhatsApp when a number is configured, otherwise the contact page. */
export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const href = WHATSAPP.number
    ? `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.message)}`
    : null;

  return (
    <div className={`fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 transition-all duration-500 sm:right-6 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
      {open && (
        <div data-testid="help-popover" className="w-[280px] rounded-2xl border border-line bg-white p-4 shadow-lift">
          <p className="font-serif text-lg font-semibold text-ink">Questions? We’re here.</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            Real people, 10am–7pm IST. Typical reply under 10 minutes on WhatsApp.
          </p>
          <ul className="mt-3 space-y-1 text-[11px] text-ink-soft">
            <li>· {DELIVERY_PROMISE.dispatch}</li>
            <li>· {DELIVERY_PROMISE.returns}</li>
          </ul>
          {href ? (
            <a data-testid="help-whatsapp-link" href={href} target="_blank" rel="noreferrer" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-sm font-bold text-white hover:brightness-95">
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          ) : (
            <Link data-testid="help-contact-link" to="/pages/contact" onClick={() => setOpen(false)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-sm font-bold text-ivory hover:bg-saffron-dark">
              <MessageCircle size={16} /> Message us
            </Link>
          )}
        </div>
      )}
      <button
        data-testid="help-fab"
        aria-label={open ? "Close help" : "Chat with us"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group flex h-13 items-center gap-2 rounded-full bg-ink px-4 py-3 text-ivory shadow-lift transition-transform hover:scale-[1.03] active:scale-95"
      >
        {open ? <X size={18} /> : <MessageCircle size={18} className="text-gold" />}
        <span className="text-xs font-bold tracking-wide">{open ? "Close" : "Chat with us"}</span>
      </button>
    </div>
  );
}
