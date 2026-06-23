import Layout from "../components/Layout";
import TemplateCard from "../components/TemplateCard";
import ExperiencePreview from "../components/ExperiencePreview";
import { templates } from "../data/templates";
import { plans } from "../data/pricing";
import { Link } from "react-router-dom";
import { Gift, Palette, Share2, CheckCircle, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <section className="mesh overflow-hidden">
        <div className="container-pad py-16 text-center sm:py-28">
          <p className="caps text-primary">Interactive digital celebrations</p>
          <h1 className="serif mt-5 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Turn Memories
            <br />
            <span className="italic">Into Experiences</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted sm:text-lg">
            Create premium interactive birthday, wedding, anniversary, love story and family pages. Personalize, preview, pay and share a magical link instantly.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/create" className="btn-primary px-8 py-4">Create Your Moment</Link>
            <Link to="/m/birthday-treasure-box" className="btn-soft px-8 py-4">View Live Demo</Link>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
            {["Tap to open", "Reveal memories", "Share instantly"].map((item) => (
              <div key={item} className="glass rounded-2xl p-4 text-sm font-semibold text-muted"><Sparkles size={16} className="mr-2 inline text-primary" />{item}</div>
            ))}
          </div>
          <div className="mt-14"><ExperiencePreview /></div>
        </div>
      </section>

      <section className="bg-surface-low py-20">
        <div className="container-pad">
          <div className="text-center">
            <h2 className="section-title">Why just send a card?</h2>
            <p className="mt-3 text-muted">Create a memory instead — something people click, unlock, hear, feel and share.</p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              [Gift, "Choose Concept", "Select a birthday, love story, family or premium wedding experience."],
              [Palette, "Curate Details", "Add names, photos, messages, voice notes, music and location details."],
              [Share2, "Invite & Celebrate", "Share the generated link on WhatsApp, Instagram, Facebook or anywhere."],
            ].map(([Icon, title, desc]) => {
              const I = Icon as typeof Gift;
              return (
                <div className="text-center" key={String(title)}>
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cream text-primary shadow-inner"><I size={28} /></div>
                  <h3 className="serif text-2xl font-bold">{title as string}</h3>
                  <p className="mt-3 text-sm text-muted">{desc as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-pad">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="caps text-primary">Launch collection</p>
              <h2 className="section-title mt-3">Signature Templates</h2>
              <p className="mt-3 max-w-xl text-muted">Each template follows our product rule: 30% reading, 30% interaction, 20% animation and 20% surprise.</p>
            </div>
            <Link to="/templates" className="rounded-full border border-outline px-6 py-3 text-center font-semibold hover:bg-surface-low">Explore All Designs</Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">{templates.slice(0, 3).map((t) => <TemplateCard key={t.id} template={t} />)}</div>
        </div>
      </section>

      <section className="bg-cream/40 py-16">
        <div className="container-pad grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[["₹79", "Starting Price"], ["₹149", "60 Day Plan"], ["₹449", "Wedding Card"], ["Mobile First", "Responsive UX"]].map(([n, l]) => (
            <div key={l}><div className="serif text-4xl font-bold text-primary">{n}</div><p className="caps mt-2 text-muted">{l}</p></div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-pad">
          <div className="text-center">
            <p className="caps text-primary">No subscriptions</p>
            <h2 className="section-title mt-3">Simple pay-per-template pricing</h2>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {plans.map((p) => (
              <div key={p.id} className={`glass rounded-3xl p-8 text-center ${p.popular || p.premium ? "shadow-glow ring-2 ring-primary/25" : ""}`}>
                <p className="font-bold">{p.name}</p>
                <div className="serif mt-2 text-4xl font-bold">{p.displayPrice}</div>
                <p className="mt-1 text-sm text-primary">{p.validity}</p>
                <ul className="mt-7 space-y-3 text-left text-sm text-muted">
                  {p.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex gap-2"><CheckCircle size={17} className="mt-0.5 shrink-0 text-primary" /> {f}</li>
                  ))}
                </ul>
                <Link to={`/checkout?plan=${p.id}`} className="btn-primary mt-8 block py-3">Select</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad py-20">
        <div className="grid gap-8 rounded-[2rem] bg-text p-8 text-white sm:p-12 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="caps text-cream">Ready for first customers</p>
            <h2 className="serif mt-3 text-4xl font-bold sm:text-5xl">Build less. Launch faster. Improve from real orders.</h2>
            <p className="mt-4 max-w-2xl text-white/70">The website is structured for the business flow: template selection, customization, checkout, dashboard, legal pages and mobile-first sharing.</p>
          </div>
          <div className="grid gap-3 text-sm text-white/80">
            <div><ShieldCheck className="mr-2 inline text-cream" size={18} /> Terms, privacy and copyright pages included</div>
            <div><MessageCircle className="mr-2 inline text-cream" size={18} /> Contact and support ready</div>
            <Link to="/create" className="btn-primary mt-4 bg-white px-8 py-4 text-center text-primary">Create First Moment</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
