import Layout from "../components/Layout";
import { plans } from "../data/pricing";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
export default function Pricing() {
  return (
    <Layout>
      <section className="mesh py-20 text-center">
        <div className="container-pad">
          <p className="caps text-primary">Pricing</p>
          <h1 className="serif mx-auto mt-4 max-w-3xl text-5xl sm:text-6xl font-bold">
            Simple one-time pricing for every celebration.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted">
            Start low, validate customers, then expand with premium wedding and
            custom experiences.
          </p>
        </div>
      </section>
      <section className="container-pad py-16 grid gap-8 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`glass rounded-3xl p-8 ${p.popular ? "shadow-glow ring-2 ring-primary/30" : ""}`}
          >
            <p className="font-bold text-lg">{p.name}</p>
            <h2 className="serif mt-2 text-5xl font-bold">{p.price}</h2>
            <p className="text-muted">{p.note}</p>
            <ul className="mt-8 space-y-4 text-sm text-muted">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <CheckCircle size={18} className="text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/checkout"
              className="btn-primary mt-8 block py-4 text-center"
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </section>
    </Layout>
  );
}
