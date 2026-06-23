import { useState } from "react";
import Layout from "../components/Layout";
import TemplateCard from "../components/TemplateCard";
import { categories, templates } from "../data/templates";
import type { TemplateCategory } from "../data/templates";
import { Link } from "react-router-dom";

type Cat = "All Templates" | TemplateCategory;

export default function Templates() {
  const [cat, setCat] = useState<Cat>("All Templates");
  const filtered = cat === "All Templates" ? templates : templates.filter((t) => t.category === cat);
  return (
    <Layout>
      <section className="mesh py-16 text-center sm:py-24">
        <div className="container-pad">
          <p className="caps text-primary">Template Gallery</p>
          <h1 className="serif mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">Interactive experiences for every special moment.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted">Start with fewer, better templates: birthday, love story, anniversary, friendship, family and premium wedding card experiences.</p>
        </div>
      </section>

      <section className="container-pad py-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c as Cat)} className={`rounded-full px-5 py-3 text-sm font-bold transition ${cat === c ? "bg-primary text-white shadow-glow" : "bg-surface-mid text-muted hover:bg-surface-high"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{filtered.map((t) => <TemplateCard key={t.id} template={t} />)}</div>
        <div className="mt-20 rounded-[2rem] bg-surface-high p-8 text-center sm:p-10">
          <h2 className="serif text-4xl font-bold">Need a custom wedding or event template?</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">For launch, we will keep custom requests manual. This keeps quality high and helps us learn what customers actually want.</p>
          <Link to="/contact" className="btn-primary mt-8 inline-block px-8 py-4">Request Custom Design</Link>
        </div>
      </section>
    </Layout>
  );
}
