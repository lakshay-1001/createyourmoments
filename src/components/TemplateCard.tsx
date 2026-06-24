import { Link } from "react-router-dom";
import { Clock, MousePointerClick, Sparkles, Star } from "lucide-react";
import type { Template } from "../data/templates";
import { displayTemplatePrice } from "../data/templates";

export default function TemplateCard({ template }: { template: Template }) {
  const isWedding = template.category === "Wedding";

  return (
    <article className="group glass overflow-hidden rounded-[1.75rem] shadow-ambient transition duration-300 hover:-translate-y-2 hover:shadow-glow">
      <Link to={`/templates/${template.slug}`} className="relative block aspect-[4/5] overflow-hidden">
        <img src={template.image} alt={template.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur">
          {template.category}
        </span>
        {template.badge && (
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-blush/95 px-3 py-1 text-[10px] font-bold uppercase text-secondary backdrop-blur">
            <Star size={12} fill="currentColor" /> {template.badge}
          </span>
        )}

        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 rounded-3xl border border-white/25 bg-white/14 p-4 text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <MousePointerClick size={15} /> Preview interaction
          </p>
          <div className="mt-3 grid gap-2 text-sm">
            {template.interactions.slice(0, 3).map((i) => (
              <span key={i} className="rounded-full bg-white/20 px-3 py-2">✓ {i}</span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-5 left-5 right-5 text-white">
          <p className="caps opacity-80">{displayTemplatePrice(template)} · {template.activePeriod}</p>
          <h3 className="mt-1 font-serif text-3xl font-bold">{template.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/80">{template.bestFor}</p>
        </div>
      </Link>

      <div className="p-6 sm:p-7">
        <p className="min-h-14 text-sm leading-relaxed text-muted">{template.description}</p>

        <div className="mt-5 rounded-2xl bg-surface-mid p-4">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles size={15} /> What viewer does
          </p>
          <p className="mt-2 text-sm text-muted">{template.interactions.slice(0, 3).join(" → ")}</p>
        </div>

        {isWedding && (
          <div className="mt-4 rounded-2xl bg-[#fff4db] p-4 text-sm text-primary">
            Includes personal guest URL like <b>/invite/code/riya-weds-rahul?to=Guest</b>
          </div>
        )}

        <div className="mt-5 grid gap-2 text-xs text-muted">
          <div className="flex items-center gap-2"><Clock size={15} className="text-primary" /> Active: {template.activePeriod}</div>
          <div className="flex items-center gap-2"><Sparkles size={15} className="text-primary" /> Personalized link + WhatsApp share message</div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link to={`/templates/${template.slug}`} className="flex-1 rounded-xl border border-outline/70 py-3 text-center text-sm font-semibold hover:bg-surface-mid">
            Live Preview
          </Link>
          <Link to={`/create?template=${template.slug}`} className="btn-primary flex-1 py-3 text-center text-sm">
            Use Template
          </Link>
        </div>
      </div>
    </article>
  );
}
