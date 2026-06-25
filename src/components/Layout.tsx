import { Link, NavLink } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["/templates", "Templates"],
  ["/pricing", "Pricing"],
  ["/faq", "FAQ"],
  ["/dashboard", "Dashboard"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/50 bg-surface/80 backdrop-blur-2xl shadow-ambient">
      <div className="container-pad flex h-16 items-center justify-between sm:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/src/assets/favicon-48x48.png"
            alt="Create Your Moments logo"
            className="h-9 w-9 rounded-xl"
          />
          <span className="hidden font-serif text-2xl font-bold text-primary sm:block lg:text-3xl">
            Create Your Moments
          </span>
          <span className="font-serif text-2xl font-bold text-primary sm:hidden">
            CYM
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted hover:text-primary"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/contact"
            className="text-sm font-semibold text-muted hover:text-primary"
          >
            Contact
          </Link>
          <Link to="/create" className="btn-primary px-6 py-3 text-sm">
            Create Moment
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-outline/60 bg-white/60 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-outline/40 bg-surface px-5 py-4 md:hidden">
          <div className="grid gap-3">
            {links.map(([to, label]) => (
              <Link
                onClick={() => setOpen(false)}
                key={to}
                to={to}
                className="rounded-2xl px-3 py-3 text-muted hover:bg-surface-mid"
              >
                {label}
              </Link>
            ))}
            <Link
              onClick={() => setOpen(false)}
              to="/contact"
              className="rounded-2xl px-3 py-3 text-muted hover:bg-surface-mid"
            >
              Contact
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/create"
              className="btn-primary mt-2 text-center px-5 py-3"
            >
              Create Moment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 bg-surface-high">
      <div className="container-pad grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/favicon-48x48.png"
              alt="Create Your Moments"
              className="h-10 w-10 rounded-xl"
            />
            <h3 className="font-serif text-2xl font-bold text-primary">
              Create Your Moments
            </h3>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted">
            Interactive digital celebration pages for birthdays, weddings,
            anniversaries, love stories and family memories.
          </p>
          <div className="mt-5 flex gap-3">
            <span className="glass flex h-9 w-9 items-center justify-center rounded-full">
              <Sparkles size={15} />
            </span>
            <span className="glass flex h-9 w-9 items-center justify-center rounded-full">
              ♡
            </span>
          </div>
        </div>
        <FooterCol
          title="Product"
          items={[
            ["Templates", "/templates"],
            ["Pricing", "/pricing"],
            ["Create Moment", "/create"],
            ["Live Demo", "/m/demo"],
          ]}
        />
        <FooterCol
          title="Support"
          items={[
            ["Contact", "/contact"],
            ["FAQ", "/faq"],
            ["Privacy Policy", "/privacy"],
            ["Terms", "/terms"],
            ["Copyright Policy", "/copyright"],
          ]}
        />
        <div>
          <h4 className="mb-4 font-bold">Launch Updates</h4>
          <p className="mb-4 text-sm text-muted">
            Get new template drops, launch offers and business updates.
          </p>
          <div className="flex rounded-xl bg-white p-1 shadow-ambient">
            <input
              className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
              placeholder="Email address"
            />
            <button className="accent rounded-lg px-3 text-white">→</button>
          </div>
          <p className="mt-4 text-xs text-muted">
            Support: support@createyourmoments.com
          </p>
        </div>
      </div>
      <div className="border-t border-outline/40 py-5 text-center text-xs text-muted">
        © 2026 Create Your Moments. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <div>
      <h4 className="mb-4 font-bold">{title}</h4>
      <div className="grid gap-2 text-sm text-muted">
        {items.map(([label, href]) => (
          <Link key={label} to={href} className="hover:text-primary">
            {label}
          </Link>
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
