import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { displayTemplatePrice, templates } from "../data/templates";
import {
  CheckCircle,
  Copy,
  ExternalLink,
  Monitor,
  MessageCircle,
  Smartphone,
  Tablet,
  Wand2,
} from "lucide-react";
import RealTemplateExperience from "../components/RealTemplateExperience";
import { copyText, createPersonalShareUrl, createWhatsAppText, openWhatsApp, slugify } from "../utils/share";

export default function TemplatePreview() {
  const { slug } = useParams();
  const template = useMemo(() => templates.find((t) => t.slug === slug) || templates[0], [slug]);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("mobile");
  const [receiverName, setReceiverName] = useState("Riya Sharma");
  const [copied, setCopied] = useState(false);

  const width = { desktop: "max-w-5xl", tablet: "max-w-2xl", mobile: "max-w-[390px]" }[device];
  const momentSlug =
    template.category === "Wedding"
      ? "riya-weds-rahul"
      : template.category === "Birthday"
        ? "anaya-birthday-surprise"
        : slugify(template.title);
  const demoCode = "cym-" + template.id + "-demo";
  const personalUrl = createPersonalShareUrl({ slug: momentSlug, code: demoCode, receiverName });
  const shareText = createWhatsAppText({
    slug: momentSlug,
    code: demoCode,
    title: template.category === "Wedding" ? "Riya & Rahul Wedding Invitation" : template.title,
    category: template.category,
    receiverName,
    eventDate: template.category === "Wedding" ? "18 Feb 2027" : "",
    venue: template.category === "Wedding" ? "Royal Palace, Jaipur" : "",
  });

  async function handleCopy() {
    await copyText(personalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Layout>
      <section className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-[1fr_440px]">
        <div className="flex items-start justify-center bg-surface-low p-3 pt-5 sm:p-8 lg:p-12">
          <div className={`${width} w-full overflow-hidden ${device === "mobile" ? "rounded-[2.25rem] border-[10px] border-[#1c1b1b] shadow-glow" : "rounded-2xl border border-white/60 shadow-glow"} bg-white transition-all duration-500`}>
            <div className={`${device === "mobile" ? "h-9 bg-[#1c1b1b] text-white" : "h-12 bg-surface-mid"} flex items-center justify-between px-3 sm:px-4`}>
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-200" />
                <span className="h-3 w-3 rounded-full bg-yellow-200" />
                <span className="h-3 w-3 rounded-full bg-gray-300" />
              </div>
              <span className="max-w-[68%] truncate rounded-full bg-white px-4 py-1 text-[10px] text-muted sm:text-xs">
                {personalUrl.replace(window.location.origin, "createyourmoments.com")}
              </span>
              <span className="w-8" />
            </div>
            <div className={`${device === "mobile" ? "max-h-[76vh]" : "max-h-[75vh]"} overflow-y-auto bg-white`}>
              <RealTemplateExperience slug={template.slug} mode="embedded" receiverName={receiverName} momentCode={demoCode} />
            </div>
          </div>
        </div>

        <aside className="border-t border-outline/30 bg-surface-low p-5 sm:p-10 lg:border-l lg:border-t-0">
          <div className="mb-5 flex w-full justify-center rounded-full bg-surface-high p-1 sm:w-max sm:justify-start">
            {[[Monitor, "desktop"], [Tablet, "tablet"], [Smartphone, "mobile"]].map(([Icon, d]) => {
              const I = Icon as typeof Monitor;
              return (
                <button
                  key={d as string}
                  onClick={() => setDevice(d as "desktop" | "tablet" | "mobile")}
                  className={`flex-1 rounded-full p-3 sm:flex-none ${device === d ? "bg-primary text-white" : "text-muted"}`}
                >
                  <I size={18} />
                </button>
              );
            })}
          </div>
          <p className="mb-5 rounded-2xl bg-white p-3 text-sm text-muted shadow-ambient lg:hidden">Mobile preview is selected by default because most customers open moments from WhatsApp and Instagram.</p>

          <p className="caps text-tertiary">Template 00{templates.indexOf(template) + 1}</p>
          <h1 className="serif mt-3 text-3xl font-bold sm:text-4xl">{template.title}</h1>
          <p className="mt-4 text-muted">{template.description}</p>

          <div className="mt-5 rounded-2xl bg-cream/70 p-4">
            <p className="text-sm text-muted">Price</p>
            <p className="serif text-3xl font-bold text-primary">{displayTemplatePrice(template)}</p>
            <p className="text-sm text-muted">Active period: {template.activePeriod}</p>
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-white p-5 shadow-ambient">
            <h3 className="font-bold">Personalized guest preview</h3>
            <p className="mt-1 text-sm text-muted">This builds trust. The receiver sees their own name inside the invitation when the buyer shares a personal URL.</p>
            <input
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              className="field mt-4"
              placeholder="Receiver name e.g. Riya Sharma"
            />
            <p className="mt-3 break-all rounded-2xl bg-surface-mid p-3 text-xs font-semibold text-primary">{personalUrl}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={handleCopy} className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white">
                <Copy size={13} className="mr-1 inline" /> {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={() => openWhatsApp(shareText)} className="rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white">
                <MessageCircle size={13} className="mr-1 inline" /> WhatsApp
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="caps mb-4">Included Features</h3>
            <ul className="space-y-4">
              {template.features.map((f) => (
                <li className="flex gap-3" key={f}>
                  <CheckCircle className="shrink-0 text-primary" size={20} />
                  <span className="text-muted">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="caps mb-4">Why buyers feel value</h3>
            <div className="grid gap-3 text-sm text-muted">
              <div><Wand2 size={16} className="mr-2 inline text-primary" />Personal receiver name in URL</div>
              <div><Wand2 size={16} className="mr-2 inline text-primary" />Real interactive taps and reveals</div>
              <div><Wand2 size={16} className="mr-2 inline text-primary" />No login or app install for viewers</div>
              <div><Wand2 size={16} className="mr-2 inline text-primary" />WhatsApp-ready trusted message</div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="caps mb-4">Color Palette</h3>
            <div className="flex gap-3">{template.palette.map((c) => <span key={c} style={{ background: c }} className="h-10 w-10 rounded-full border border-outline/40" />)}</div>
          </div>

          <Link to={`/invite/${demoCode}/${momentSlug}?to=${encodeURIComponent(receiverName)}`} className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl border border-primary py-4 font-bold text-primary">
            <ExternalLink size={18} /> Open Personal Demo
          </Link>
          <Link to={`/create?template=${template.slug}`} className="btn-primary mt-4 block w-full py-4 text-center">Use This Template →</Link>
        </aside>
      </section>
    </Layout>
  );
}
