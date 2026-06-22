import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { templates } from "../data/templates";
import {
  CheckCircle,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
} from "lucide-react";
export default function TemplatePreview() {
  const { slug } = useParams();
  const template = useMemo(
    () => templates.find((t) => t.slug === slug) || templates[0],
    [slug],
  );
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const width = {
    desktop: "max-w-5xl",
    tablet: "max-w-2xl",
    mobile: "max-w-sm",
  }[device];
  return (
    <Layout>
      <section className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-[1fr_420px]">
        <div className="bg-surface-low p-5 sm:p-8 lg:p-12 flex items-center justify-center">
          <div
            className={`${width} w-full transition-all duration-500 rounded-2xl overflow-hidden bg-white shadow-glow border border-white/60`}
          >
            <div className="h-11 bg-surface-mid flex items-center justify-between px-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-200" />
                <span className="h-3 w-3 rounded-full bg-yellow-200" />
                <span className="h-3 w-3 rounded-full bg-gray-300" />
              </div>
              <span className="rounded-full bg-white px-4 py-1 text-xs text-muted">
                createyourmoments.com/m/demo
              </span>
              <span className="w-10" />
            </div>
            <div className="max-h-[72vh] overflow-y-auto">
              <div className="relative h-80">
                <img
                  src={template.image}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
                <div className="absolute bottom-8 left-5 right-5 text-center">
                  <p className="caps text-primary">{template.category}</p>
                  <h1 className="serif mt-2 text-4xl sm:text-6xl font-bold">
                    {template.title}
                  </h1>
                  <p className="mx-auto mt-3 max-w-xl text-muted italic">
                    {template.description}
                  </p>
                </div>
              </div>
              <div className="grid gap-8 p-8 md:grid-cols-2">
                <div>
                  <h2 className="serif text-3xl font-bold text-primary">
                    Our Story
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted">
                    This interactive experience opens with a premium reveal,
                    guides the visitor through emotional sections, and ends with
                    a memorable surprise.
                  </p>
                  <button className="mt-6 rounded-full border border-outline px-6 py-3 font-bold text-primary">
                    Try Interaction
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-cream p-6 shadow-ambient">
                    Open Envelope
                  </div>
                  <div className="mt-8 rounded-2xl bg-blush p-6 shadow-ambient">
                    Reveal Memory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="border-l border-outline/30 bg-surface-low p-6 sm:p-10">
          <div className="mb-6 flex rounded-full bg-surface-high p-1 w-max">
            {[
              [Monitor, "desktop"],
              [Tablet, "tablet"],
              [Smartphone, "mobile"],
            ].map(([Icon, d]) => (
              <button
                key={d as string}
                onClick={() => setDevice(d as any)}
                className={`rounded-full p-3 ${device === d ? "bg-primary text-white" : "text-muted"}`}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
          <p className="caps text-tertiary">
            Template 00{templates.indexOf(template) + 1}
          </p>
          <h1 className="serif mt-3 text-4xl font-bold">{template.title}</h1>
          <p className="mt-4 text-muted">{template.description}</p>
          <div className="mt-8">
            <h3 className="caps mb-4">Included Features</h3>
            <ul className="space-y-4">
              {template.features.map((f) => (
                <li className="flex gap-3" key={f}>
                  <CheckCircle className="text-primary" size={20} />
                  <span className="text-muted">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="caps mb-4">Color Palette</h3>
            <div className="flex gap-3">
              {template.palette.map((c) => (
                <span
                  key={c}
                  style={{ background: c }}
                  className="h-10 w-10 rounded-full border border-outline/40"
                />
              ))}
            </div>
          </div>
          <Link
            to="/m/demo"
            className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl border border-primary py-4 font-bold text-primary"
          >
            <ExternalLink size={18} /> Live Demo
          </Link>
          <Link
            to={`/create?template=${template.slug}`}
            className="btn-primary mt-4 block w-full py-4 text-center"
          >
            Use This Template →
          </Link>
          <div className="fixed bottom-0 left-0 right-0 lg:static mt-8 bg-surface/90 backdrop-blur p-4 lg:p-0">
            <div className="flex justify-between rounded-2xl bg-white p-4 shadow-ambient">
              <span>
                <b>Setup Time</b>
                <br />
                <span className="text-muted">15-20 minutes</span>
              </span>
              <span>
                <b>Price</b>
                <br />
                <span className="text-primary font-bold">
                  ₹{template.price}
                </span>
              </span>
            </div>
          </div>
        </aside>
      </section>
    </Layout>
  );
}
