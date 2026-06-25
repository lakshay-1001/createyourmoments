
import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { defaultPlanForTemplate, displayTemplatePrice, templates } from "../data/templates";
import { buildMomentSlug, createPersonalShareUrl } from "../utils/share";
import { CalendarDays, Camera, CheckCircle, HeartHandshake, Loader2, MapPin, MessageSquare, Music, ShieldCheck, Sparkles, User } from "lucide-react";
import RealTemplateExperience from "../components/RealTemplateExperience";
import { saveMomentDraft } from "../lib/supabaseClient";

const steps = ["Template", "Details", "Message", "Preview"];

export default function CreateMoment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const initial = useMemo(() => templates.find((t) => t.slug === params.get("template")) || templates[0], [params]);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(initial.slug);
  const [saving, setSaving] = useState(false);
  const [saveNote, setSaveNote] = useState("");

  const [form, setForm] = useState({
    occasion: initial.occasion || initial.category,
    senderName: "",
    receiverName: "",
    momentTitle: initial.category === "Wedding" ? "Riya & Rahul Wedding" : "",
    eventDate: "",
    venue: "",
    mapLink: "",
    message: "",
    customSlug: "",
    planId: initial.category === "Wedding" ? "wedding-90" : "standard-60",
  });

  const template = templates.find((t) => t.slug === selected) || templates[0];
  const recommendedPlan = defaultPlanForTemplate(template);
  const plan =
    form.planId === "standard-30"
      ? { id: "standard-30", amount: 79, durationDays: 30 }
      : form.planId === "wedding-90"
        ? { id: "wedding-90", amount: 449, durationDays: 90 }
        : { id: "standard-60", amount: 149, durationDays: 60 };

  const generatedSlug = buildMomentSlug({
    templateCategory: template.category,
    title: form.customSlug || form.momentTitle || template.title,
    yourName: form.senderName,
    receiverName: form.receiverName,
  });

  const shareUrl = createPersonalShareUrl({
    slug: generatedSlug,
    code: "preview",
    receiverName: form.receiverName,
  });

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function chooseTemplate(slug: string) {
    const t = templates.find((x) => x.slug === slug) || templates[0];
    setSelected(slug);
    const p = defaultPlanForTemplate(t);
    setForm((f) => ({
      ...f,
      occasion: t.occasion || t.category,
      planId: p.id,
      momentTitle: t.category === "Wedding" ? f.momentTitle || "Riya & Rahul Wedding" : f.momentTitle,
    }));
  }

  async function continueToCheckout() {
    setSaving(true);
    setSaveNote("");

    const payload = {
      template_slug: template.slug,
      template_title: template.title,
      category: template.category,
      occasion: form.occasion,
      sender_name: form.senderName,
      receiver_name: form.receiverName,
      moment_title: form.momentTitle || template.title,
      event_date: form.eventDate || null,
      venue: form.venue,
      custom_slug: form.customSlug,
      slug: generatedSlug,
      share_url: shareUrl,
      plan_id: plan.id,
      duration_days: plan.durationDays,
      amount: plan.amount,
      form_data: {
        ...form,
        mapLink: form.mapLink,
        customerMessage: form.message,
        recommendedInputs: template.inputHints || [],
      },
    };

    await saveMomentDraft(payload);

    setSaving(false);
    setSaveNote("Draft saved. Moving to checkout...");
    const qs = new URLSearchParams({
      plan: plan.id,
      slug: generatedSlug,
      title: form.momentTitle || template.title,
      category: template.category,
      date: form.eventDate,
      venue: form.venue,
      sender: form.senderName,
      receiver: form.receiverName,
      template: template.slug,
      amount: String(plan.amount),
      duration: String(plan.durationDays),
    });

    setTimeout(() => navigate(`/checkout?${qs.toString()}`), 500);
  }

  return (
    <Layout>
      <section className="mesh py-10 sm:py-16">
        <div className="container-pad">
          <div className="mx-auto max-w-6xl">
            <p className="caps text-primary">Create Moment Flow</p>
            <h1 className="serif mt-3 text-4xl font-bold leading-tight sm:text-6xl">
              Create once. Share a trusted, personal link.
            </h1>
            <p className="mt-4 max-w-2xl text-muted">
              Designed for mobile guests. We keep the flow short, guided and mostly automated so customers can buy quickly.
            </p>

            <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
              {steps.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setStep(i)}
                  className={`shrink-0 rounded-full px-5 py-3 text-sm font-bold ${step === i ? "bg-primary text-white" : "bg-white text-muted"}`}
                >
                  {i + 1}. {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-pad py-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_390px]">
          <div className="glass rounded-[2rem] p-5 sm:p-8">
            {step === 0 && (
              <div>
                <h2 className="serif text-3xl font-bold">Choose your Phase 1 template</h2>
                <p className="mt-2 text-muted">Wedding/engagement has premium pricing. All other experiences can be 30 or 60 days active.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {templates.map((t) => (
                    <button
                      key={t.slug}
                      onClick={() => chooseTemplate(t.slug)}
                      className={`rounded-[1.5rem] border p-4 text-left transition ${selected === t.slug ? "border-primary bg-cream shadow-glow" : "border-outline/40 bg-white hover:-translate-y-1 hover:shadow-ambient"}`}
                    >
                      <img src={t.image} alt={t.title} className="h-36 w-full rounded-2xl object-cover" />
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <h3 className="serif text-xl font-bold">{t.title}</h3>
                        {t.badge && <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-white">{t.badge}</span>}
                      </div>
                      <p className="mt-2 text-sm text-muted">{t.bestFor}</p>
                      <p className="mt-3 text-sm font-bold text-primary">{displayTemplatePrice(t)}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="serif text-3xl font-bold">Add the details that make it personal</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field icon={<Sparkles size={18} />} label="Occasion" value={form.occasion} onChange={(v) => update("occasion", v)} placeholder="Wedding, Engagement, Birthday..." />
                  <Field icon={<User size={18} />} label="Your / host name" value={form.senderName} onChange={(v) => update("senderName", v)} placeholder="Your name" />
                  <Field icon={<HeartHandshake size={18} />} label="Receiver / guest name optional" value={form.receiverName} onChange={(v) => update("receiverName", v)} placeholder="Anjali, Riya, Family..." />
                  <Field icon={<MessageSquare size={18} />} label="Title" value={form.momentTitle} onChange={(v) => update("momentTitle", v)} placeholder="Riya & Rahul Wedding" />
                  <Field icon={<CalendarDays size={18} />} label="Date optional" value={form.eventDate} onChange={(v) => update("eventDate", v)} type="date" placeholder="" />
                  <Field icon={<MapPin size={18} />} label="Venue optional" value={form.venue} onChange={(v) => update("venue", v)} placeholder="Royal Palace, Jaipur" />
                </div>

                {template.category === "Wedding" && (
                  <div className="mt-6 rounded-[2rem] bg-white p-5 shadow-ambient">
                    <h3 className="font-bold">Wedding / engagement detailing</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      This template is built for cases where the marriage or engagement has not happened yet. Customer can use a simple couple photo, invitation image, family photo, ring photo or decorative image instead of professional bride/groom photos.
                    </p>
                    <input className="field mt-4" placeholder="Google Maps link optional" value={form.mapLink} onChange={(e) => update("mapLink", e.target.value)} />
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="serif text-3xl font-bold">Message, media and active period</h2>
                <textarea
                  className="field mt-6 min-h-36"
                  placeholder="Write the main message. Example: Dear Anjali, your presence means the world to us..."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <UploadHint icon={<Camera />} title="Photos" text="Upload will connect to Supabase Storage next." />
                  <UploadHint icon={<Music />} title="Music" text="Use royalty-free music or user-owned audio." />
                  <UploadHint icon={<MessageCircleIcon />} title="Voice" text="Voice notes make pages feel emotional." />
                </div>

                <div className="mt-6 rounded-[2rem] bg-white p-5 shadow-ambient">
                  <p className="font-bold">Choose active period</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {template.category !== "Wedding" && (
                      <PlanButton active={form.planId === "standard-30"} title="30 Days" price="₹79" onClick={() => update("planId", "standard-30")} />
                    )}
                    {template.category !== "Wedding" && (
                      <PlanButton active={form.planId === "standard-60"} title="60 Days" price="₹149" onClick={() => update("planId", "standard-60")} />
                    )}
                    {template.category === "Wedding" && (
                      <PlanButton active={form.planId === "wedding-90"} title="90 Days Premium" price="₹449" onClick={() => update("planId", "wedding-90")} />
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="serif text-3xl font-bold">Preview before payment</h2>
                <div className="mt-5 rounded-[2rem] bg-white p-4 shadow-ambient">
                  <RealTemplateExperience slug={template.slug} mode="embedded" receiverName={form.receiverName} draft={{
                    moment_title: form.momentTitle,
                    event_date: form.eventDate,
                    venue: form.venue,
                    occasion: form.occasion,
                  }} />
                </div>

                <div className="mt-6 rounded-[2rem] bg-cream p-5 text-sm leading-7 text-muted">
                  <b className="text-text">Trusted link preview:</b>
                  <br />
                  <span className="break-all text-primary">{shareUrl}</span>
                </div>

                <button onClick={continueToCheckout} disabled={saving} className="btn-primary mt-6 flex w-full items-center justify-center gap-2 py-4">
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                  {saving ? "Saving draft..." : `Continue to Checkout • ₹${plan.amount}`}
                </button>
                {saveNote && <p className="mt-3 text-center text-sm text-green-700">{saveNote}</p>}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <button disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-muted disabled:opacity-40">Back</button>
              {step < steps.length - 1 ? (
                <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} className="btn-primary px-7 py-3 text-sm">
                  Next <CheckCircle className="ml-2 inline" size={16} />
                </button>
              ) : (
                <Link to="/templates" className="text-sm font-bold text-primary">Change template</Link>
              )}
            </div>
          </div>

          <aside className="h-max rounded-[2rem] bg-white p-5 shadow-ambient lg:sticky lg:top-24">
            <p className="caps text-primary">Selected</p>
            <img src={template.image} alt={template.title} className="mt-4 h-48 w-full rounded-[1.5rem] object-cover" />
            <h2 className="serif mt-5 text-3xl font-bold">{template.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{template.description}</p>
            <div className="mt-5 rounded-2xl bg-cream p-4">
              <p className="text-sm font-bold">Current price: ₹{plan.amount}</p>
              <p className="mt-1 text-xs text-muted">Active for {plan.durationDays} days</p>
            </div>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {template.features.slice(0, 5).map((f) => (
                <li key={f} className="flex gap-2"><CheckCircle size={16} className="mt-0.5 text-primary" /> {f}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

function Field({ icon, label, value, onChange, placeholder, type = "text" }: { icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <label>
      <span className="mb-2 flex items-center gap-2 text-sm font-bold text-muted">{icon} {label}</span>
      <input className="field" type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}

function UploadHint({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="rounded-[1.5rem] bg-white p-4 shadow-ambient"><div className="text-primary">{icon}</div><p className="mt-3 font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-muted">{text}</p></div>;
}

function PlanButton({ active, title, price, onClick }: { active: boolean; title: string; price: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-[1.5rem] border p-4 text-left ${active ? "border-primary bg-primary text-white" : "border-outline/40 bg-white text-text"}`}>
      <b>{title}</b>
      <span className="mt-1 block text-2xl font-bold">{price}</span>
    </button>
  );
}

function MessageCircleIcon() {
  return <MessageSquare />;
}
