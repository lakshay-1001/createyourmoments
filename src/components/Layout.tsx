import { Link, NavLink } from "react-router-dom";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";
const links = [
  ["/templates", "Templates"],
  ["/pricing", "Pricing"],
  ["/dashboard", "Dashboard"],
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-white/50 bg-surface/75 backdrop-blur-2xl shadow-ambient">
        <div className="container-pad flex h-16 sm:h-20 items-center justify-between">
          <Link
            to="/"
            className="font-serif text-2xl sm:text-4xl font-bold text-primary"
          >
            Moments
          </Link>
          <div className="hidden md:flex items-center gap-9">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? "text-primary border-b-2 border-primary" : "text-muted hover:text-primary"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/contact"
              className="text-sm text-muted hover:text-primary"
            >
              Login
            </Link>
            <Link to="/create" className="btn-primary px-6 py-3 text-sm">
              Create Moment
            </Link>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-full border border-outline/60 p-2"
          >
            <Menu size={20} />
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-outline/40 bg-surface px-5 py-4">
            <div className="grid gap-3">
              {links.map(([to, label]) => (
                <Link
                  onClick={() => setOpen(false)}
                  key={to}
                  to={to}
                  className="py-2 text-muted"
                >
                  {label}
                </Link>
              ))}
              <Link
                onClick={() => setOpen(false)}
                to="/create"
                className="btn-primary text-center px-5 py-3"
              >
                Create Moment
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
export function Footer() {
  return (
    <footer className="bg-surface-high mt-20">
      <div className="container-pad py-14 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="font-serif text-3xl font-bold text-primary">
            Moments
          </h3>
          <p className="mt-4 text-sm text-muted max-w-xs">
            Creating the world's most meaningful interactive celebration pages.
          </p>
          <div className="mt-5 flex gap-3">
            <span className="glass h-9 w-9 rounded-full flex items-center justify-center">
              <Sparkles size={15} />
            </span>
            <span className="glass h-9 w-9 rounded-full flex items-center justify-center">
              ♡
            </span>
          </div>
        </div>
        <FooterCol
          title="Product"
          items={["Templates", "Showcase", "Pricing", "Demo"]}
        />
        <FooterCol
          title="Company"
          items={[
            "About Us",
            "Help Center",
            "Privacy Policy",
            "Terms of Service",
          ]}
        />
        <div>
          <h4 className="font-bold mb-4">Newsletter</h4>
          <p className="text-sm text-muted mb-4">
            Get new templates and launch offers.
          </p>
          <div className="flex rounded-xl bg-white p-1">
            <input
              className="flex-1 bg-transparent px-3 text-sm outline-none"
              placeholder="Email address"
            />
            <button className="accent text-white rounded-lg px-3">→</button>
          </div>
        </div>
      </div>
      <div className="border-t border-outline/40 py-5 text-center text-xs text-muted">
        © 2026 Create Your Moments. All rights reserved.
      </div>
    </footer>
  );
}
function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-bold mb-4">{title}</h4>
      <div className="grid gap-2 text-sm text-muted">
        {items.map((i) => (
          <a key={i} href="#" className="hover:text-primary">
            {i}
          </a>
        ))}
      </div>
    </div>
  );
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">{children}</main>
      <Footer />
    </>
  );
}
