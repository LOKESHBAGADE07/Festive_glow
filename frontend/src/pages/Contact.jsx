import { useState } from "react";
import axios from "axios";
import { Check, Loader2, AlertCircle, Mail } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import { isValidEmail } from "@/lib/format";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (state === "error") setState("idle");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !isValidEmail(form.email) || !form.message.trim()) {
      setState("error");
      setMessage("Please fill in your name, a valid email and a message.");
      return;
    }
    setState("loading");
    try {
      await axios.post(`${API}/contact`, form);
      setState("success");
    } catch (err) {
      setState("error");
      setMessage(err?.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Seo title="Contact Us — Noor & Vaani" description="Questions about orders, products or gifting? Write to us." />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Breadcrumbs trail={[{ label: "Contact" }]} />
        <div className="mt-8">
          <Reveal>
            <p className="nv-eyebrow mb-2.5 text-saffron-dark">Contact</p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">We’d love to hear from you</h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
              Product questions, gifting help or order support — send a note and the team will reply once support hours are configured at launch.
            </p>
          </Reveal>

          {state === "success" ? (
            <div data-testid="contact-success" className="mt-10 flex items-start gap-3 rounded-2xl border border-success/30 bg-success/10 p-6">
              <Check size={20} className="mt-0.5 shrink-0 text-success" />
              <div>
                <p className="font-serif text-xl font-semibold text-ink">Message received</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Your message was stored in the demo backend. In the live store this connects to the shop’s real support inbox.
                </p>
                <button
                  data-testid="contact-reset"
                  onClick={() => { setForm({ name: "", email: "", subject: "", message: "" }); setState("idle"); }}
                  className="mt-3 text-sm font-bold text-saffron-dark underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form data-testid="contact-form" onSubmit={submit} noValidate className="mt-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="nv-eyebrow mb-2 block text-ink">Your name</label>
                  <input data-testid="contact-name-input" id="contact-name" value={form.name} onChange={set("name")} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-saffron" placeholder="Full name" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="nv-eyebrow mb-2 block text-ink">Email</label>
                  <input data-testid="contact-email-input" id="contact-email" type="email" value={form.email} onChange={set("email")} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-saffron" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="nv-eyebrow mb-2 block text-ink">Subject <span className="font-normal normal-case text-ink-soft">(optional)</span></label>
                <input data-testid="contact-subject-input" id="contact-subject" value={form.subject} onChange={set("subject")} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-saffron" placeholder="Order question, gifting help…" />
              </div>
              <div>
                <label htmlFor="contact-message" className="nv-eyebrow mb-2 block text-ink">Message</label>
                <textarea data-testid="contact-message-input" id="contact-message" rows={5} value={form.message} onChange={set("message")} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-saffron" placeholder="How can we help?" />
              </div>
              {state === "error" && (
                <p data-testid="contact-error" role="alert" className="flex items-center gap-1.5 text-xs font-semibold text-error">
                  <AlertCircle size={13} /> {message}
                </p>
              )}
              <button
                data-testid="contact-submit"
                type="submit"
                disabled={state === "loading"}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-bold text-ivory transition-colors hover:bg-saffron-dark disabled:opacity-60"
              >
                {state === "loading" ? (
                  <><Loader2 size={15} className="animate-spin" /> Sending…</>
                ) : (
                  <><Mail size={15} /> Send message</>
                )}
              </button>
              <p className="text-[11px] text-ink-soft">Prototype note: messages are stored in the demo backend only. No support phone number or address is published until the business confirms one.</p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
