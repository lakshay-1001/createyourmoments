import { useState } from "react";
import Layout from "../components/Layout";
import TemplateCard from "../components/TemplateCard";
import { categories, templates } from "../data/templates";
export default function Templates() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All Templates");
  const filtered =
    cat === "All Templates"
      ? templates
      : templates.filter((t) => t.category === cat);
  return (
    <Layout>
      <section className="mesh py-20 sm:py-28 text-center">
        <div className="container-pad">
          <p className="caps text-primary">The Gallery</p>
          <h1 className="serif mx-auto mt-5 max-w-3xl text-4xl sm:text-6xl font-bold leading-tight">
            Exquisite templates for your life's milestones.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted">
            Select a canvas tailored to your story. Every template is crafted
            with emotional minimalism, breathing space and timeless elegance.
          </p>
        </div>
      </section>
      <section className="container-pad py-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-3 text-sm font-bold transition ${cat === c ? "bg-primary text-white shadow-glow" : "bg-surface-mid text-muted hover:bg-surface-high"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
        <div className="mt-20 rounded-[2rem] bg-surface-high p-10 text-center">
          <h2 className="serif text-4xl font-bold">
            Can't find the perfect fit?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Our custom studio lets you build a Moment from scratch with our
            interactive drag-and-drop builder.
          </p>
          <button className="btn-primary mt-8 px-8 py-4">
            Launch Custom Studio
          </button>
        </div>
      </section>
    </Layout>
  );
}
