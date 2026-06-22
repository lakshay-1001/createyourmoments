import Layout from "../components/Layout";
import TemplateCard from "../components/TemplateCard";
import ExperiencePreview from "../components/ExperiencePreview";
import { templates } from "../data/templates";
import { plans } from "../data/pricing";
import { Link } from "react-router-dom";
import {
  Gift,
  Palette,
  Share2,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
export default function Home() {
  return (
    <Layout>
      <section className="mesh overflow-hidden">
        <div className="container-pad py-20 sm:py-28 text-center">
          <p className="caps text-primary">Celebrate every chapter</p>
          <h1 className="serif mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Turn Moments
            <br />
            <span className="italic">Into Memories</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted">
            Create premium interactive birthday, wedding, anniversary and love
            story pages. Personalize details, preview instantly and share a
            magical link.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/create" className="btn-primary px-8 py-4">
              Start Designing
            </Link>
            <Link to="/m/demo" className="btn-soft px-8 py-4">
              View Live Demo
            </Link>
          </div>
          <div className="mt-14">
            <ExperiencePreview />
          </div>
        </div>
      </section>
      <section className="bg-surface-low py-20">
        <div className="container-pad">
          <div className="text-center">
            <h2 className="section-title">The Creation Journey</h2>
            <p className="mt-3 text-muted">
              Simple, sophisticated and seamless.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              [
                Gift,
                "Choose Concept",
                "Select an interactive experience template.",
              ],
              [
                Palette,
                "Curate Details",
                "Add names, photos, messages, voice notes and music.",
              ],
              [
                Share2,
                "Invite & Celebrate",
                "Share the generated link on WhatsApp, Instagram or anywhere.",
              ],
            ].map(([Icon, title, desc]) => (
              <div className="text-center" key={String(title)}>
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cream text-primary shadow-inner">
                  <Icon size={28} />
                </div>
                <h3 className="serif text-2xl font-bold">{title as string}</h3>
                <p className="mt-3 text-sm text-muted">{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container-pad">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="section-title">Signature Templates</h2>
              <p className="mt-3 max-w-xl text-muted">
                Launch with fewer but unforgettable experiences. Each template
                follows 30% reading, 30% interaction, 20% animation, 20%
                surprise.
              </p>
            </div>
            <Link
              to="/templates"
              className="rounded-full border border-outline px-6 py-3 text-center font-semibold hover:bg-surface-low"
            >
              Explore All Designs
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {templates.slice(0, 3).map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-cream/40 py-16">
        <div className="container-pad grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            ["10+", "Launch Templates"],
            ["60 Days", "Default Hosting"],
            ["₹149", "Starting Price"],
            ["Mobile First", "Responsive UX"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="serif text-4xl font-bold text-primary">{n}</div>
              <p className="caps mt-2 text-muted">{l}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-20">
        <div className="container-pad">
          <h2 className="section-title text-center">Craft Your Legacy</h2>
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`glass rounded-3xl p-8 text-center ${p.popular ? "scale-[1.03] shadow-glow ring-2 ring-primary/30" : ""}`}
              >
                <p className="font-bold">{p.name}</p>
                <div className="mt-2 serif text-4xl font-bold">
                  {p.price}
                  <span className="font-sans text-sm font-normal text-muted">
                    {" "}
                    {p.note}
                  </span>
                </div>
                <ul className="mt-7 space-y-3 text-left text-sm text-muted">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <CheckCircle size={18} className="text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/checkout"
                  className="mt-8 block rounded-full border border-primary px-6 py-3 font-bold text-primary hover:bg-cream"
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface-low py-20">
        <div className="container-pad">
          <h2 className="section-title text-center">Frequently Asked</h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {[
              "How long does my Moment page stay online?",
              "Can I upload my own photos and voice notes?",
              "Is Razorpay payment supported?",
            ].map((q) => (
              <details key={q} className="glass rounded-2xl p-5">
                <summary className="cursor-pointer font-semibold">{q}</summary>
                <p className="mt-3 text-muted">
                  Yes. This will be connected properly in production. For MVP,
                  the page flow is ready and payment integration can be added
                  next.
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
