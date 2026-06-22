import Layout from "../components/Layout";
import { Eye, Share2, Clock, Edit3 } from "lucide-react";
const moments = [
  ["Birthday Treasure Box", "124 views", "31 shares", "Expires in 58 days"],
  ["Ethereal Union", "856 views", "103 shares", "Active 1 year"],
];
export default function Dashboard() {
  return (
    <Layout>
      <section className="container-pad py-12 sm:py-20">
        <p className="caps text-primary">Dashboard</p>
        <h1 className="serif mt-3 text-4xl sm:text-6xl font-bold">
          Your created moments
        </h1>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            [Eye, "980", "Views"],
            [Share2, "134", "Shares"],
            [Clock, "60", "Days hosting"],
            [Edit3, "2", "Drafts"],
          ].map(([Icon, n, l]) => (
            <div className="glass rounded-3xl p-6" key={String(l)}>
              <Icon className="text-primary" />
              <p className="serif mt-4 text-4xl font-bold">{n as string}</p>
              <p className="text-muted">{l as string}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-4 bg-surface-high p-4 text-sm font-bold">
            <span>Name</span>
            <span>Views</span>
            <span>Shares</span>
            <span>Status</span>
          </div>
          {moments.map((m) => (
            <div
              className="grid grid-cols-4 border-t border-outline/30 p-4 text-sm"
              key={m[0]}
            >
              {m.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
