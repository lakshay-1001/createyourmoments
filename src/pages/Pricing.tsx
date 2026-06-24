import Layout from "../components/Layout";
import { plans } from "../data/pricing";
import { CheckCircle, Clock, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <Layout>
      <section className="mesh py-16 text-center sm:py-24">
        <div className="container-pad">
          <p className="caps text-primary">One-time template pricing</p>
          <h1 className="serif mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">
            No subscription. Pay once, share your moment for the active period.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted">
            Keep pricing simple for launch: standard templates at ₹79 or ₹149,
            and a premium wedding card at ₹449.
          </p>
        </div>
      </section>

      <section className="container-pad py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.id}
              className={`relative glass rounded-[2rem] p-7 sm:p-8 ${p.popular || p.premium ? "shadow-glow ring-2 ring-primary/25" : ""}`}
            >
              {p.popular && <Badge>Most Practical</Badge>}
              {p.premium && <Badge>Wedding Special</Badge>}
              <p className="text-lg font-bold">{p.name}</p>
              <h2 className="serif mt-3 text-5xl font-bold">
                {p.displayPrice}
              </h2>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary">
                <Clock size={16} /> {p.validity}
              </p>
              <p className="mt-5 min-h-16 text-sm leading-relaxed text-muted">
                {p.description}
              </p>
              <div className="mt-5 rounded-2xl bg-cream/60 p-4 text-sm text-muted">
                <b className="text-text">Best for:</b> {p.audience}
              </div>
              <ul className="mt-7 space-y-3 text-sm text-muted">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <CheckCircle
                      size={18}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {/* <Link to={`/checkout?plan=${p.id}`} className="btn-primary mt-8 block py-4 text-center">
                {p.cta}
              </Link> */}
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-5 rounded-[2rem] bg-surface-high p-6 sm:grid-cols-3 sm:p-8">
          {[
            "Unlimited views during active period",
            "Share on WhatsApp, Instagram and Facebook",
            "Copyright report and takedown policy included",
          ].map((item) => (
            <div key={item} className="flex gap-3 text-sm text-muted">
              <ShieldCheck className="shrink-0 text-primary" size={20} /> {item}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
      {children}
    </span>
  );
}
