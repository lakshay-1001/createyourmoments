import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { displayTemplatePrice, templates } from "../data/templates";
import { CheckCircle, ExternalLink, Monitor, Smartphone, Tablet, Wand2 } from "lucide-react";
import RealTemplateExperience from "../components/RealTemplateExperience";

export default function TemplatePreview() {
  const { slug } = useParams();
  const template = useMemo(() => templates.find((t) => t.slug === slug) || templates[0], [slug]);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const width = { desktop: "max-w-5xl", tablet: "max-w-2xl", mobile: "max-w-sm" }[device];

  return (
    <Layout>
      <section className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-[1fr_430px]">
        <div className="flex items-center justify-center bg-surface-low p-4 sm:p-8 lg:p-12">
          <div className={`${width} w-full overflow-hidden rounded-2xl border border-white/60 bg-white shadow-glow transition-all duration-500`}>
            <div className="flex h-11 items-center justify-between bg-surface-mid px-4">
              <div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-red-200" /><span className="h-3 w-3 rounded-full bg-yellow-200" /><span className="h-3 w-3 rounded-full bg-gray-300" /></div>
              <span className="rounded-full bg-white px-4 py-1 text-[10px] text-muted sm:text-xs">createyourmoments.com/m/demo</span>
              <span className="w-8" />
            </div>
            <div className="max-h-[72vh] overflow-y-auto bg-white">
              <RealTemplateExperience slug={template.slug} mode="embedded" />
            </div>
          </div>
        </div>

        <aside className="border-l border-outline/30 bg-surface-low p-6 sm:p-10">
          <div className="mb-6 flex w-max rounded-full bg-surface-high p-1">
            {[[Monitor, "desktop"], [Tablet, "tablet"], [Smartphone, "mobile"]].map(([Icon, d]) => {
              const I = Icon as typeof Monitor;
              return <button key={d as string} onClick={() => setDevice(d as "desktop" | "tablet" | "mobile")} className={`rounded-full p-3 ${device === d ? "bg-primary text-white" : "text-muted"}`}><I size={18} /></button>;
            })}
          </div>
          <p className="caps text-tertiary">Template 00{templates.indexOf(template) + 1}</p>
          <h1 className="serif mt-3 text-4xl font-bold">{template.title}</h1>
          <p className="mt-4 text-muted">{template.description}</p>
          <div className="mt-5 rounded-2xl bg-cream/70 p-4">
            <p className="text-sm text-muted">Price</p>
            <p className="serif text-3xl font-bold text-primary">{displayTemplatePrice(template)}</p>
            <p className="text-sm text-muted">Active period: {template.activePeriod}</p>
          </div>
          <div className="mt-8">
            <h3 className="caps mb-4">Included Features</h3>
            <ul className="space-y-4">{template.features.map((f) => <li className="flex gap-3" key={f}><CheckCircle className="shrink-0 text-primary" size={20} /><span className="text-muted">{f}</span></li>)}</ul>
          </div>
          <div className="mt-8">
            <h3 className="caps mb-4">Why this works</h3>
            <div className="grid gap-3 text-sm text-muted">
              <div><Wand2 size={16} className="mr-2 inline text-primary" />30% reading</div>
              <div><Wand2 size={16} className="mr-2 inline text-primary" />30% interaction</div>
              <div><Wand2 size={16} className="mr-2 inline text-primary" />20% animation</div>
              <div><Wand2 size={16} className="mr-2 inline text-primary" />20% surprise</div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="caps mb-4">Color Palette</h3>
            <div className="flex gap-3">{template.palette.map((c) => <span key={c} style={{ background: c }} className="h-10 w-10 rounded-full border border-outline/40" />)}</div>
          </div>
          <Link to={`/m/${template.slug}`} className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl border border-primary py-4 font-bold text-primary"><ExternalLink size={18} /> Live Demo</Link>
          <Link to={`/create?template=${template.slug}`} className="btn-primary mt-4 block w-full py-4 text-center">Use This Template →</Link>
        </aside>
      </section>
    </Layout>
  );
}
