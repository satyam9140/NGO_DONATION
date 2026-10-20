import { Outlet, NavLink, Link } from "react-router-dom";
import { HeartHandshake, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Directory", to: "/directory" },
  { label: "Register NGO", to: "/register" },
  { label: "Impact", to: "/dashboard" }
];

function navClass({ isActive }) {
  return `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive ? "bg-primary text-white shadow-soft" : "text-muted hover:bg-primarySoft hover:text-primaryDeep"
  }`;
}

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen text-ink">
      <header className="sticky top-0 z-50 border-b border-outline/70 bg-background/85 backdrop-blur-xl">
        <div className="container-page flex h-20 items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-white shadow-glow">
              <HeartHandshake size={24} />
            </span>
            <span>
              <span className="block font-display text-xl font-extrabold tracking-tight">UnityAid</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-muted">Verified impact</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/register" className="btn-secondary py-2.5">
              Join as NGO
            </Link>
            <Link to="/donate" className="btn-primary py-2.5">
              Donate Now
            </Link>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-2xl border border-outline bg-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="border-t border-outline bg-white px-5 py-4 shadow-soft lg:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={navClass} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              ))}
              <Link to="/donate" className="btn-primary mt-2" onClick={() => setOpen(false)}>
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-outline bg-primaryDeep text-white">
        <div className="container-page grid gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-12">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary">
                <HeartHandshake size={24} />
              </span>
              <span className="font-display text-2xl font-extrabold">UnityAid</span>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/75">
              A transparent giving platform for donors, NGOs, volunteers, and partners who want proof of real-world impact.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Platform</h3>
            <div className="space-y-3 text-sm text-white/75">
              <p>NGO Directory</p>
              <p>Donation Portal</p>
              <p>Impact Dashboard</p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">For NGOs</h3>
            <div className="space-y-3 text-sm text-white/75">
              <p>Registration</p>
              <p>Verification</p>
              <p>Donor Reporting</p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <div className="space-y-3 text-sm text-white/75">
              <p>support@unityaid.local</p>
              <p>Delhi NCR, India</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/60">
          Built for demo and submission use. Add real payment gateway keys before production deployment.
        </div>
      </footer>
    </div>
  );
}
