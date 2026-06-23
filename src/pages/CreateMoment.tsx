import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { displayTemplatePrice, templates } from "../data/templates";
import { buildMomentSlug, createShareUrl, slugify } from "../utils/share";
import { Eye, Image, Link as LinkIcon, MapPin, MessageSquare, Mic, Music, ShieldCheck, Upload, User } from "lucide-react";

const steps = ["Template", "Photos", "Names", "Messages", "Audio", "Preview"];

export default function CreateMoment() {
  const [params] = useSearchParams();
  const initial = useMemo(() => templates.find((t) => t.slug === params.get("template")) || templates[0], [params]);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(initial.slug);
  const [yourName, setYourName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [momentTitle, setMomentTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const template = templates.find((t) => t.slug === selected) || templates[0];

  const generatedSlug = buildMomentSlug({
    templateCategory: template.category,
    title: customSlug || momentTitle,
    yourName,
    receiverName,
  });
  const shareUrl = createShareUrl(generatedSlug);
  const checkoutPlan = template.category === "Wedding" ? "wedding-90" : "standard-60";

  return (
    <Layout>
      <section className="mesh py-12 sm:py-20">
        <div className="container-pad">
          <div className="mx-auto max-w-6xl">
            <p className="caps text-primary">Create Moment Flow</p>
            <h1 className="serif mt-3 text-4xl font-bold sm:text-6xl">Build a trusted shareable moment.</h1>
            <p className="mt-4 max-w-2xl text-muted">Create a readable link like <b>createyourmoments.com/celebrate/rahul-priya-wedding</b> so it feels safer than a random URL.</p>
            <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
              <aside className="glass h-max rounded-3xl p-4">
                {steps.map((s, i) => (
                  <button key={s} onClick={() => setStep(i)} className={`mb-2 flex w-full items-center gap-3 rounded-2xl p-4 text-left ${step === i ? "bg-primary text-white" : "hover:bg-white"}`}>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/30 text-sm">{i + 1}</span>{s}
                  </button>
                ))}
                <div className="mt-4 rounded-2xl bg-white/70 p-4 text-xs text-muted">
                  <ShieldCheck size={16} className="mb-2 text-primary" />
                  Viewers do not need login, app install or payment. This increases trust on WhatsApp.
                </div>
              </aside>
              <div className="glass min-h-[560px] rounded-3xl p-5 sm:p-10">
                <div className="mb-8 h-2 rounded-full bg-surface-high"><div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>

                {step === 0 && <Panel icon={<User />} title="Choose template and duration">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {templates.map((t) => (
                      <button key={t.id} onClick={() => setSelected(t.slug)} className={`rounded-2xl border p-4 text-left ${selected === t.slug ? "border-primary bg-cream" : "border-outline/50 bg-white/70 hover:border-primary"}`}>
                        <b>{t.title}</b><p className="text-sm text-muted">{t.category} · {displayTemplatePrice(t)} · {t.activePeriod}</p>
                      </button>
                    ))}
                  </div>
                </Panel>}

                {step === 1 && <Panel icon={<Image />} title="Upload photos">
                  <UploadBox label="Upload cover photo" /><UploadBox label="Upload memory photos" />
                  {template.category === "Wedding" && <UploadBox label="Upload bride, groom and event gallery photos" />}
                  <p className="text-sm text-muted">Production note: connect this to Supabase Storage later.</p>
                </Panel>}

                {step === 2 && <Panel icon={<User />} title="Add names, date and trusted link">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input value={yourName} onChange={(e) => setYourName(e.target.value)} className="field" placeholder={template.category === "Wedding" ? "Bride name" : "Your name"} />
                    <input value={receiverName} onChange={(e) => setReceiverName(e.target.value)} className="field" placeholder={template.category === "Wedding" ? "Groom name" : "Receiver name"} />
                    <input value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="field" placeholder="Special date" type="date" />
                    {template.category === "Wedding" && <input value={venue} onChange={(e) => setVenue(e.target.value)} className="field" placeholder="Venue name" />}
                    <input value={momentTitle} onChange={(e) => setMomentTitle(e.target.value)} className="field sm:col-span-2" placeholder={template.category === "Wedding" ? "Title e.g. Rahul & Priya Wedding" : "Title e.g. Anjali Birthday Surprise"} />
                    <div className="sm:col-span-2 rounded-3xl bg-white/70 p-5">
                      <label className="text-sm font-bold text-text">Readable share link</label>
                      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                        <span className="rounded-2xl bg-surface-high px-4 py-3 text-sm text-muted">createyourmoments.com/celebrate/</span>
                        <input value={customSlug} onChange={(e) => setCustomSlug(slugify(e.target.value))} className="field flex-1" placeholder={generatedSlug} />
                      </div>
                      <p className="mt-3 break-all text-sm text-primary"><LinkIcon size={15} className="mr-1 inline" /> {shareUrl}</p>
                      <p className="mt-2 text-xs text-muted">Readable links are easier to trust and share on WhatsApp than random codes.</p>
                    </div>
                    {template.category === "Wedding" && <input className="field sm:col-span-2" placeholder="Venue location / Google Maps link" />}
                  </div>
                </Panel>}

                {step === 3 && <Panel icon={<MessageSquare />} title="Add messages">
                  <textarea className="field min-h-36" placeholder="Write your emotional message..." />
                  <textarea className="field mt-4 min-h-28" placeholder="Final surprise message..." />
                  {template.category === "Wedding" && <textarea className="field mt-4 min-h-28" placeholder="Wedding schedule: Haldi, Mehndi, Wedding, Reception..." />}
                </Panel>}

                {step === 4 && <Panel icon={<Music />} title="Voice, music and extras">
                  <UploadBox icon={<Mic />} label="Upload voice note" />
                  {template.category === "Wedding" && <UploadBox icon={<MapPin />} label="Add location / venue details" />}
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">{["Soft Piano", "Romantic Ambient", "Birthday Joy"].map((m) => <button className="rounded-2xl bg-white p-4 text-left shadow-ambient" key={m}>♫ {m}</button>)}</div>
                </Panel>}

                {step === 5 && <Panel icon={<Eye />} title="Preview and continue">
                  <div className="rounded-3xl bg-white p-6 shadow-ambient">
                    <p className="caps text-primary">Preview Ready</p>
                    <h3 className="serif mt-3 text-3xl font-bold">{momentTitle || template.title}</h3>
                    <p className="mt-3 text-muted">Selected price: {displayTemplatePrice(template)} · Active: {template.activePeriod}</p>
                    <div className="mt-5 rounded-2xl bg-cream/70 p-4">
                      <b>Trusted link</b>
                      <p className="mt-2 break-all text-sm text-primary">{shareUrl}</p>
                    </div>
                    <p className="mt-3 text-muted">After Razorpay payment, this slug will be saved in Supabase and become the public share URL.</p>
                    <Link to={`/checkout?plan=${checkoutPlan}&slug=${generatedSlug}&title=${encodeURIComponent(momentTitle || template.title)}&category=${encodeURIComponent(template.category)}&date=${encodeURIComponent(eventDate)}&venue=${encodeURIComponent(venue)}&sender=${encodeURIComponent(yourName)}&receiver=${encodeURIComponent(receiverName)}`} className="btn-primary mt-8 inline-block px-8 py-4">Continue to Payment</Link>
                  </div>
                </Panel>}

                <div className="mt-8 flex justify-between"><button disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))} className="rounded-full border border-outline px-6 py-3 disabled:opacity-40">Back</button><button disabled={step === steps.length - 1} onClick={() => setStep(Math.min(steps.length - 1, step + 1))} className="btn-primary px-7 py-3 disabled:opacity-40">Next</button></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Panel({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return <div><div className="mb-6 flex items-center gap-3 text-primary">{icon}<h2 className="serif text-3xl font-bold text-text">{title}</h2></div><div className="space-y-4">{children}</div></div>;
}

function UploadBox({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return <div className="rounded-3xl border-2 border-dashed border-outline bg-white/60 p-8 text-center"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-primary">{icon || <Upload />}</div><b>{label}</b><p className="mt-2 text-sm text-muted">Drag and drop or click to upload</p></div>;
}
