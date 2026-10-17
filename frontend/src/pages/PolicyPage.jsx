import { useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import NotFound from "@/pages/NotFound";
import { POLICIES } from "@/data/policies";

export default function PolicyPage() {
  const { slug } = useParams();
  const policy = POLICIES[slug];

  if (!policy) return <NotFound />;

  return (
    <>
      <Seo title={`${policy.title} — Noor & Vaani`} description={policy.intro.slice(0, 155)} />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Breadcrumbs trail={[{ label: policy.title }]} />
        <div className="mt-8">
          <p className="nv-eyebrow mb-2.5 text-saffron-dark">Policy</p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{policy.title}</h1>
          <p data-testid="policy-draft-banner" className="mt-5 inline-flex rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-saffron-dark">
            Draft content — replace with the finalized policy before launch
          </p>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">{policy.intro}</p>
          <div className="mt-8 space-y-8">
            {policy.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.05}>
                <section data-testid={`policy-section-${i}`}>
                  <h2 className="font-serif text-xl font-semibold text-ink">{s.heading}</h2>
                  {s.body.map((p, j) => (
                    <p key={j} className="mt-3 text-sm leading-relaxed text-ink-soft">{p}</p>
                  ))}
                </section>
              </Reveal>
            ))}
          </div>
          <p className="mt-12 rounded-xl bg-ivory border border-line p-4 text-[11px] leading-relaxed text-ink-soft">
            No company address, phone number, tax registration or payment-provider relationship is claimed in this prototype. Business details will be published once confirmed.
          </p>
        </div>
      </div>
    </>
  );
}
