import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Template } from "../data/templates";
export default function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="group glass overflow-hidden rounded-2xl shadow-ambient transition hover:-translate-y-1 hover:shadow-glow">
      <Link
        to={`/templates/${template.slug}`}
        className="block relative aspect-[4/5] overflow-hidden"
      >
        <img
          src={template.image}
          alt={template.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur">
          {template.category}
        </span>
        {template.badge && (
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-blush/90 px-3 py-1 text-[10px] font-bold uppercase text-secondary">
            <Star size={12} fill="currentColor" /> {template.badge}
          </span>
        )}
      </Link>
      <div className="p-6 sm:p-7">
        <h3 className="font-serif text-2xl font-bold">{template.title}</h3>
        <p className="mt-2 min-h-12 text-sm text-muted">
          {template.description}
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            to={`/templates/${template.slug}`}
            className="flex-1 rounded-xl border border-outline/70 py-3 text-center text-sm font-semibold hover:bg-surface-mid"
          >
            Preview
          </Link>
          <Link
            to={`/create?template=${template.slug}`}
            className="btn-primary flex-1 py-3 text-center text-sm"
          >
            Use Template
          </Link>
        </div>
      </div>
    </article>
  );
}
