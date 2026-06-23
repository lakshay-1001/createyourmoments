import Layout from "../components/Layout";
import { Link, useSearchParams } from "react-router-dom";
import { plans } from "../data/pricing";
import { createShareUrl, createWhatsAppText } from "../utils/share";
import { Lock, MessageCircle, ShieldCheck } from "lucide-react";

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
  const shareText = createWhatsAppText({ slug, title, category, eventDate, venue, senderName, receiverName });

  const successUrl = `/success?slug=${slug}&title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}&date=${encodeURIComponent(eventDate)}&venue=${encodeURIComponent(venue)}&sender=${encodeURIComponent(senderName)}&receiver=${encodeURIComponent(receiverName)}`;

  return (
    <Layout>
      <section className="container-pad py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_400px]">
          <div className="glass rounded-[2rem] p-6 sm:p-8">
            <p className="caps text-primary">Checkout UI</p>
            <h1 className="serif mt-3 text-4xl font-bold">Confirm your moment</h1>
            <p className="mt-3 text-muted">Razorpay will be integrated here later. The trusted share message and readable URL are already prepared.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <input className="field" placeholder="Full name" defaultValue={senderName} />
              <input className="field" placeholder="Email address" />
              <input className="field" placeholder="Phone number" />
              <input className="field" placeholder="WhatsApp number" />
              <textarea className="field min-h-32 sm:col-span-2" placeholder="Special instructions for this moment" />
            </div>
            <label className="mt-5 flex gap-3 rounded-2xl bg-white/70 p-4 text-sm text-muted">
              <input type="checkbox" className="mt-1" />
              <span>I confirm I own or have permission to use uploaded photos, audio, text and other content.</span>
            </label>

            <div className="mt-6 rounded-[2rem] bg-white/75 p-5 shadow-ambient">
              <div className="flex items-center gap-2 font-bold text-text"><MessageCircle size={18} className="text-primary" /> WhatsApp share preview</div>
              <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-cream/70 p-4 text-sm leading-6 text-muted">{shareText}</pre>
            </div>
          </div>

          <aside className="glass h-max rounded-[2rem] p-6 sm:p-8">
            <h2 className="serif text-3xl font-bold">Order Summary</h2>
            <div className="mt-6 rounded-2xl bg-cream/60 p-5">
              <p className="font-bold">{plan.name}</p>
              <p className="mt-1 text-sm text-muted">{plan.validity}</p>
            </div>
            <div className="mt-5 rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted">Public link after payment</p>
              <p className="mt-2 break-all text-sm font-semibold text-primary">{createShareUrl(slug)}</p>
            </div>
            <div className="mt-6 space-y-3 text-muted">
              <div className="flex justify-between"><span>Template access</span><b>{plan.displayPrice}</b></div>
              <div className="flex justify-between"><span>Hosting during active period</span><b>Included</b></div>
              <div className="flex justify-between"><span>Payment gateway</span><b>Razorpay later</b></div>
              <div className="flex justify-between border-t border-outline/40 pt-4 text-text"><span>Total</span><b className="text-2xl">{plan.displayPrice}</b></div>
            </div>
            <Link to={successUrl} className="btn-primary mt-8 flex items-center justify-center gap-2 py-4 text-center">
              <Lock size={18} /> Pay with Razorpay Later
            </Link>
            <p className="mt-4 flex gap-2 text-xs text-muted"><ShieldCheck size={16} className="shrink-0 text-primary" /> Secure checkout placeholder. Live payment will be enabled after Razorpay setup.</p>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
