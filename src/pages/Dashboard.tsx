import Layout from "../components/Layout";
import { Clock, Copy, Edit3, Eye, Link as LinkIcon, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { copyText, createShareUrl, createWhatsAppText, openWhatsApp } from "../utils/share";
import { useState } from "react";

const moments = [
  { name: "Birthday Treasure Box", plan: "60 Day Moment", views: "124", shares: "31", status: "Active · 58 days left", slug: "anjali-birthday-surprise", category: "Birthday" },
  { name: "Rahul & Priya Wedding", plan: "Wedding Card", views: "856", shares: "103", status: "Active · 87 days left", slug: "rahul-priya-wedding", category: "Wedding", venue: "The Royal Palace, Jaipur", eventDate: "18 Feb 2027" },
  { name: "Love Story Journey", plan: "30 Day Moment", views: "0", shares: "0", status: "Draft", slug: "our-love-story", category: "Love Story" },
];

export default function Dashboard() {
  const [copied, setCopied] = useState("");

  async function copyMomentLink(slug: string) {
    await copyText(createShareUrl(slug));
    setCopied(slug);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <Layout>
      <section className="container-pad py-12 sm:py-20">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="caps text-primary">Dashboard</p>
            <h1 className="serif mt-3 text-4xl font-bold sm:text-6xl">Your created moments</h1>
            <p className="mt-4 max-w-2xl text-muted">Share readable links and WhatsApp-ready messages. This UI is ready for Supabase data later.</p>
          </div>
          <Link to="/create" className="btn-primary px-7 py-4 text-center">Create New</Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            [Eye, "980", "Views"],
            [Share2, "134", "Shares"],
            [Clock, "90", "Max active days"],
            [Edit3, "1", "Drafts"],
          ].map(([Icon, n, l]) => {
            const I = Icon as typeof Eye;
            return (
              <div className="glass rounded-3xl p-6" key={String(l)}>
                <I className="text-primary" />
                <p className="serif mt-4 text-4xl font-bold">{n as string}</p>
                <p className="text-muted">{l as string}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] glass">
          <div className="hidden grid-cols-6 bg-surface-high p-4 text-sm font-bold md:grid">
            <span className="col-span-2">Name</span><span>Plan</span><span>Views</span><span>Shares</span><span>Status</span>
          </div>
          {moments.map((m) => {
            const shareText = createWhatsAppText({ slug: m.slug, title: m.name, category: m.category, eventDate: m.eventDate, venue: m.venue });
            return (
              <div className="grid gap-3 border-t border-outline/30 p-4 text-sm md:grid-cols-6" key={m.name}>
                <span className="font-bold md:col-span-2">{m.name}</span>
                <span className="text-muted">{m.plan}</span>
                <span>{m.views}</span>
                <span>{m.shares}</span>
                <span className="text-primary">{m.status}</span>
                <div className="md:col-span-6">
                  <p className="mb-3 break-all rounded-2xl bg-white/70 p-3 text-xs text-primary"><LinkIcon size={13} className="mr-1 inline" /> {createShareUrl(m.slug)}</p>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-full border border-outline px-4 py-2 text-xs font-bold">Edit</button>
                    <button className="rounded-full border border-outline px-4 py-2 text-xs font-bold">Extend</button>
                    <button onClick={() => copyMomentLink(m.slug)} className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white"><Copy size={13} className="mr-1 inline" /> {copied === m.slug ? "Copied" : "Copy Link"}</button>
                    <button onClick={() => openWhatsApp(shareText)} className="rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white"><MessageCircle size={13} className="mr-1 inline" /> WhatsApp</button>
                    <Link to={`/celebrate/${m.slug}`} className="rounded-full bg-surface-high px-4 py-2 text-xs font-bold">View</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
