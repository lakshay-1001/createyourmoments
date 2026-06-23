import { Link } from "react-router-dom";
import { Clock, Sparkles, Star } from "lucide-react";
import type { Template } from "../data/templates";
import { displayTemplatePrice } from "../data/templates";

export default function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="group glass overflow-hidden rounded-[1.75rem] shadow-ambient transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <Link to={`/templates/${template.slug}`} className="relative block aspect-[4/5] overflow-hidden">
        <img src={template.image} alt={template.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur">
          {template.category}
        </span>
        {template.badge && (
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-blush/95 px-3 py-1 text-[10px] font-bold uppercase text-secondary backdrop-blur">
            <Star size={12} fill="currentColor" /> {template.badge}
          </span>
        )}
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <p className="caps opacity-80">{displayTemplatePrice(template)}</p>
          <h3 className="mt-1 font-serif text-2xl font-bold">{template.title}</h3>
        </div>
      </Link>
      <div className="p-6 sm:p-7">
        <p className="min-h-14 text-sm leading-relaxed text-muted">{template.description}</p>
        <div className="mt-5 grid gap-2 text-xs text-muted">
          <div className="flex items-center gap-2"><Clock size={15} className="text-primary" /> Active: {template.activePeriod}</div>
          <div className="flex items-center gap-2"><Sparkles size={15} className="text-primary" /> {template.interactions.slice(0, 2).join(" · ")}</div>
        </div>
        <div className="mt-6 flex gap-3">
          <Link to={`/templates/${template.slug}`} className="flex-1 rounded-xl border border-outline/70 py-3 text-center text-sm font-semibold hover:bg-surface-mid">
            Preview
          </Link>
          <Link to={`/create?template=${template.slug}`} className="btn-primary flex-1 py-3 text-center text-sm">
            Use Template
          </Link>
        </div>
      </div>
    </article>
  );
}
