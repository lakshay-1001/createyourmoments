import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { templates } from "../data/templates";
import {
  Upload,
  Music,
  Mic,
  Image,
  User,
  MessageSquare,
  Eye,
} from "lucide-react";
const steps = ["Occasion", "Photos", "Names", "Messages", "Audio", "Preview"];
export default function CreateMoment() {
  const [step, setStep] = useState(0);
  return (
    <Layout>
      <section className="mesh py-12 sm:py-20">
        <div className="container-pad">
          <div className="mx-auto max-w-5xl">
            <p className="caps text-primary">Create Moment Wizard</p>
            <h1 className="serif mt-3 text-4xl sm:text-6xl font-bold">
              Build a personal experience in minutes.
            </h1>
            <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
              <aside className="glass rounded-3xl p-5 h-max">
                {steps.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setStep(i)}
                    className={`mb-2 flex w-full items-center gap-3 rounded-2xl p-4 text-left ${step === i ? "bg-primary text-white" : "hover:bg-white"}`}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/30 text-sm">
                      {i + 1}
                    </span>
                    {s}
                  </button>
                ))}
              </aside>
              <div className="glass rounded-3xl p-6 sm:p-10 min-h-[560px]">
                <div className="mb-8 h-2 rounded-full bg-surface-high">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  />
                </div>
                {step === 0 && (
                  <Panel icon={<User />} title="Choose occasion">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {templates.map((t) => (
                        <button
                          key={t.id}
                          className="rounded-2xl border border-outline/50 bg-white/70 p-4 text-left hover:border-primary"
                        >
                          <b>{t.title}</b>
                          <p className="text-sm text-muted">
                            {t.category} · ₹{t.price}
                          </p>
                        </button>
                      ))}
                    </div>
                  </Panel>
                )}
                {step === 1 && (
                  <Panel icon={<Image />} title="Upload photos">
                    <UploadBox label="Upload cover photo" />
                    <UploadBox label="Upload memory photos" />
                    <p className="text-sm text-muted">
                      Production note: connect this to Supabase Storage later.
                    </p>
                  </Panel>
                )}
                {step === 2 && (
                  <Panel icon={<User />} title="Add names">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input className="field" placeholder="Your name" />
                      <input
                        className="field"
                        placeholder="Receiver / couple name"
                      />
                      <input
                        className="field sm:col-span-2"
                        placeholder="Special date"
                        type="date"
                      />
                    </div>
                  </Panel>
                )}
                {step === 3 && (
                  <Panel icon={<MessageSquare />} title="Add messages">
                    <textarea
                      className="field min-h-36"
                      placeholder="Write your emotional message..."
                    />
                    <textarea
                      className="field mt-4 min-h-28"
                      placeholder="Final surprise message..."
                    />
                  </Panel>
                )}
                {step === 4 && (
                  <Panel icon={<Music />} title="Voice and music">
                    <UploadBox icon={<Mic />} label="Upload voice note" />
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {["Soft Piano", "Romantic Ambient", "Birthday Joy"].map(
                        (m) => (
                          <button
                            className="rounded-2xl bg-white p-4 text-left shadow-ambient"
                            key={m}
                          >
                            ♫ {m}
                          </button>
                        ),
                      )}
                    </div>
                  </Panel>
                )}
                {step === 5 && (
                  <Panel icon={<Eye />} title="Preview and continue">
                    <div className="rounded-3xl bg-white p-6 shadow-ambient">
                      <p className="caps text-primary">Preview Ready</p>
                      <h3 className="serif mt-3 text-3xl font-bold">
                        Your interactive moment is almost ready.
                      </h3>
                      <p className="mt-3 text-muted">
                        Next step will be Razorpay checkout. For now this goes
                        to mock checkout.
                      </p>
                      <Link
                        to="/checkout"
                        className="btn-primary mt-8 inline-block px-8 py-4"
                      >
                        Continue to Payment
                      </Link>
                    </div>
                  </Panel>
                )}
                <div className="mt-8 flex justify-between">
                  <button
                    disabled={step === 0}
                    onClick={() => setStep(Math.max(0, step - 1))}
                    className="rounded-full border border-outline px-6 py-3 disabled:opacity-40"
                  >
                    Back
                  </button>
                  <button
                    disabled={step === steps.length - 1}
                    onClick={() =>
                      setStep(Math.min(steps.length - 1, step + 1))
                    }
                    className="btn-primary px-6 py-3 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
function Panel({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded-2xl bg-cream p-3 text-primary">{icon}</span>
        <h2 className="serif text-3xl font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}
function UploadBox({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <label className="mb-4 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-outline/60 bg-white/60 p-6 text-center hover:border-primary">
      {icon || <Upload />}
      <span className="mt-3 font-bold">{label}</span>
      <span className="text-sm text-muted">PNG, JPG, MP3 supported later</span>
      <input type="file" className="hidden" />
    </label>
  );
}
