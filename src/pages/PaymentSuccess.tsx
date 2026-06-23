import Layout from "../components/Layout";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Copy, ExternalLink, MessageCircle, ShieldCheck } from "lucide-react";
import { copyText, createShareUrl, createWhatsAppText, openWhatsApp } from "../utils/share";
import { useMemo, useState } from "react";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const slug = params.get("slug") || "demo-moment";
  const title = params.get("title") || "Your Moment";
  const category = params.get("category") || "Birthday";
  const eventDate = params.get("date") || "";
  const venue = params.get("venue") || "";
  const senderName = params.get("sender") || "";
  const receiverName = params.get("receiver") || "";
  const shareUrl = createShareUrl(slug);
  const shareText = useMemo(() => createWhatsAppText({ slug, title, category, eventDate, venue, senderName, receiverName }), [slug, title, category, eventDate, venue, senderName, receiverName]);

  async function handleCopyLink() {
    await copyText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function handleCopyMessage() {
    await copyText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Layout>
      <section className="mesh py-16 text-center sm:py-24">
        <div className="container-pad">
          <CheckCircle size={72} className="mx-auto text-primary" />
          <h1 className="serif mt-6 text-4xl font-bold sm:text-6xl">Your Moment is ready to share.</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">Use a readable link and trusted WhatsApp message so guests feel safe opening it.</p>

          <div className="mx-auto mt-8 max-w-2xl rounded-[2rem] bg-white p-5 text-left shadow-ambient">
            <p className="text-xs font-bold uppercase tracking-widest text-muted">Trusted public URL</p>
            <div className="mt-3 flex flex-col gap-3 rounded-2xl bg-cream/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="break-all text-sm font-semibold text-primary">{shareUrl}</p>
              <button onClick={handleCopyLink} className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white"><Copy size={14} className="mr-1 inline" /> Copy</button>
            </div>
            <div className="mt-6 flex items-center gap-2 font-bold text-text"><MessageCircle size={18} className="text-primary" /> WhatsApp share message</div>
            <pre className="mt-3 whitespace-pre-wrap rounded-2xl bg-surface-high p-4 text-sm leading-6 text-muted">{shareText}</pre>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button onClick={() => openWhatsApp(shareText)} className="btn-primary flex items-center justify-center gap-2 px-6 py-3"><MessageCircle size={18} /> Share on WhatsApp</button>
              <button onClick={handleCopyMessage} className="btn-soft flex items-center justify-center gap-2 px-6 py-3"><Copy size={18} /> Copy Message</button>
            </div>
            {copied && <p className="mt-3 text-center text-sm font-bold text-primary">Copied successfully.</p>}
            <p className="mt-5 flex gap-2 text-xs text-muted"><ShieldCheck size={16} className="shrink-0 text-primary" /> Tip: First send the message, not only the link. A known name + readable URL gets more opens.</p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to={`/celebrate/${slug}`} className="btn-primary px-8 py-4">
              <ExternalLink size={18} className="mr-2 inline" /> Open Moment
            </Link>
            <Link to="/dashboard" className="btn-soft px-8 py-4">
              Go Dashboard
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
