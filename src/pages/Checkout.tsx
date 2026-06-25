
import Layout from "../components/Layout";
import { Link, useSearchParams } from "react-router-dom";
import { plans } from "../data/pricing";
import { createShareUrl, createWhatsAppText } from "../utils/share";
import { Lock, Loader2, MessageCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { saveCheckoutLead } from "../lib/supabaseClient";

export default function Checkout() {
  const [params] = useSearchParams();
  const plan = plans.find((p) => p.id === params.get("plan")) || plans[1];
  const slug = params.get("slug") || "demo-moment";
  const title = params.get("title") || "Create Your Moment";
  const category = params.get("category") || "Birthday";
  const eventDate = params.get("date") || "";
  const venue = params.get("venue") || "";
  const senderName = params.get("sender") || "";
  const receiverName = params.get("receiver") || "";
  const templateSlug = params.get("template") || "";
  const amount = Number(params.get("amount") || plan.price);
  const duration = Number(params.get("duration") || (plan.id === "wedding-90" ? 90 : plan.id === "standard-30" ? 30 : 60));

  const [customer, setCustomer] = useState({ name: senderName, email: "", phone: "", whatsapp: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  const shareText = createWhatsAppText({ slug, title, category, eventDate, venue, senderName, receiverName });
  const successUrl = `/success?slug=${slug}&title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}&date=${encodeURIComponent(eventDate)}&venue=${encodeURIComponent(venue)}&sender=${encodeURIComponent(senderName)}&receiver=${encodeURIComponent(receiverName)}&template=${encodeURIComponent(templateSlug)}&amount=${amount}&duration=${duration}`;

  function update(key: keyof typeof customer, value: string) {
    setCustomer((c) => ({ ...c, [key]: value }));
  }

  async function saveLead() {
    setLoading(true);
    setNote("");
    await saveCheckoutLead({
      template_slug: templateSlug,
      category,
      slug,
      title,
      plan_id: plan.id,
      amount,
      duration_days: duration,
      sender_name: senderName || customer.name,
      receiver_name: receiverName,
      email: customer.email,
      phone: customer.phone,
      whatsapp: customer.whatsapp,
      notes: customer.notes,
    });
    setLoading(false);
    setNote("Checkout lead saved. Razorpay button will be connected here next.");
  }

  return (
    <Layout>
      <section className="container-pad py-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_400px]">
          <div className="glass rounded-[2rem] p-5 sm:p-8">
            <p className="caps text-primary">Checkout</p>
            <h1 className="serif mt-3 text-4xl font-bold">Confirm your moment</h1>
            <p className="mt-3 text-muted">
              Razorpay will be connected here. For now this page saves the checkout lead to Supabase/local backup and prepares the trusted sharing message.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <input className="field" placeholder="Full name" value={customer.name} onChange={(e) => update("name", e.target.value)} />
              <input className="field" placeholder="Email address" type="email" value={customer.email} onChange={(e) => update("email", e.target.value)} />
              <input className="field" placeholder="Phone number" value={customer.phone} onChange={(e) => update("phone", e.target.value)} />
              <input className="field" placeholder="WhatsApp number" value={customer.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
              <textarea className="field min-h-32 sm:col-span-2" placeholder="Special instructions for this moment" value={customer.notes} onChange={(e) => update("notes", e.target.value)} />
            </div>
            <label className="mt-5 flex gap-3 rounded-2xl bg-white/70 p-4 text-sm text-muted">
              <input type="checkbox" className="mt-1" />
              <span>I confirm I own or have permission to use uploaded photos, audio, text and other content.</span>
            </label>

            <div className="mt-6 rounded-[2rem] bg-white/75 p-5 shadow-ambient">
              <div className="flex items-center gap-2 font-bold text-text">
                <MessageCircle size={18} className="text-primary" /> WhatsApp share preview
              </div>
              <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-cream/70 p-4 text-sm leading-6 text-muted">{shareText}</pre>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button onClick={saveLead} disabled={loading} className="btn-soft flex items-center justify-center gap-2 px-6 py-4 font-bold">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                Save Lead
              </button>
              <Link to={successUrl} className="btn-primary px-6 py-4 text-center">
                Simulate Payment Success
              </Link>
            </div>
            {note && <p className="mt-4 rounded-2xl bg-green-50 p-4 text-sm text-green-700">{note}</p>}
          </div>

          <aside className="glass h-max rounded-[2rem] p-6 sm:p-8">
            <h2 className="serif text-3xl font-bold">Order summary</h2>
            <div className="mt-6 space-y-4 text-sm">
              <Row label="Template" value={title} />
              <Row label="Category" value={category} />
              <Row label="Active period" value={`${duration} days`} />
              <Row label="Readable link" value={createShareUrl(slug).replace("https://createyourmoments.com", "")} />
            </div>
            <div className="mt-6 rounded-3xl bg-cream p-5">
              <p className="text-sm text-muted">Total</p>
              <p className="mt-1 text-4xl font-bold">₹{amount}</p>
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-3xl bg-white p-4 text-sm text-muted">
              <Lock size={18} className="mt-1 text-primary" />
              <span>Razorpay payment verification will be added later using backend/serverless signature verification.</span>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-outline/30 pb-3">
      <span className="text-muted">{label}</span>
      <span className="text-right font-bold">{value || "Not provided"}</span>
    </div>
  );
}
