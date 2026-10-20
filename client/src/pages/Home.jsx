import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, BarChart3, Globe2, HandCoins, HeartHandshake, ShieldCheck, UsersRound } from "lucide-react";
import SectionHeader from "../components/SectionHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import NGOCard from "../components/NGOCard.jsx";
import { causes, featuredNgos, impactStats, testimonials } from "../data/content.js";

const statIcons = [ShieldCheck, HandCoins, UsersRound, BarChart3];

export default function Home() {
  return (
    <>
      <section className="hero-grid section-pad overflow-hidden">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-outline bg-white px-4 py-2 text-sm font-bold text-primary shadow-soft">
              <BadgeCheck size={17} /> Verified giving. Transparent impact.
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Donate smarter. Track every rupee. Scale real NGO impact.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              UnityAid brings donors, NGOs, volunteers, and impact reporting into one clean platform. No messy trust gap, no fake transparency, no dead dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/donate" className="btn-primary">
                Start Donating <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn-secondary">
                Register NGO
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-muted">
              <span className="flex items-center gap-2"><ShieldCheck className="text-success" size={18} /> NGO verification</span>
              <span className="flex items-center gap-2"><BarChart3 className="text-primary" size={18} /> Impact dashboard</span>
              <span className="flex items-center gap-2"><HeartHandshake className="text-secondary" size={18} /> Donor trust layer</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.55 }} className="relative">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-8 right-5 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
            <div className="glass-card relative rounded-[2.5rem] p-4 shadow-glow">
              <img
                className="h-[470px] w-full rounded-[2rem] object-cover"
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=80"
                alt="Volunteers planning community relief work"
              />
              <div className="absolute bottom-8 left-8 right-8 rounded-[1.5rem] bg-white/92 p-5 shadow-soft backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-xl font-extrabold">Live impact map</p>
                  <Globe2 className="text-primary" />
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-primarySoft p-3">
                    <p className="font-display text-2xl font-extrabold text-primary">87%</p>
                    <p className="text-xs font-semibold text-muted">Funds used</p>
                  </div>
                  <div className="rounded-2xl bg-cyan-50 p-3">
                    <p className="font-display text-2xl font-extrabold text-secondary">42</p>
                    <p className="text-xs font-semibold text-muted">Programs</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-3">
                    <p className="font-display text-2xl font-extrabold text-success">9.8k</p>
                    <p className="text-xs font-semibold text-muted">This month</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} icon={statIcons[index]} />
          ))}
        </div>
      </section>

      <section className="section-pad bg-white/55">
        <div className="container-page">
          <SectionHeader
            eyebrow="How it works"
            title="A better donation platform needs more than a payment button"
            description="Most NGO websites stop at collection. UnityAid continues into verification, program allocation, reporting, and decision-ready impact metrics."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Verify", "NGOs submit identity, program, document, and bank details through a structured registration flow.", ShieldCheck],
              ["Donate", "Donors pick verified causes, NGOs, amounts, and frequency with a clean donation record.", HandCoins],
              ["Track", "Dashboard converts raw donations and program status into simple KPIs for donors and NGO teams.", BarChart3]
            ].map(([title, text, Icon], index) => (
              <div key={title} className="rounded-[2rem] border border-outline bg-white p-7 shadow-soft">
                <span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primarySoft text-primary">
                  <Icon />
                </span>
                <p className="mb-2 text-sm font-bold text-primary">0{index + 1}</p>
                <h3 className="font-display text-2xl font-extrabold">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeader
              align="left"
              eyebrow="Verified NGOs"
              title="Featured partners ready for support"
              description="Browse high-signal NGO cards with category, location, funding progress, and beneficiary reach."
            />
            <Link to="/directory" className="btn-secondary self-start md:self-auto">
              View Directory <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredNgos.map((ngo) => (
              <NGOCard key={ngo.id} ngo={ngo} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-primaryDeep text-white">
        <div className="container-page">
          <SectionHeader
            eyebrow="Impact areas"
            title="Choose the cause, not the confusion"
            description="Donation categories are cleanly mapped to program outcomes so donors know what they are funding."
            tone="dark"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {causes.map((cause) => (
              <div key={cause.id} className="overflow-hidden rounded-[2rem] bg-white/10 shadow-soft ring-1 ring-white/10">
                <img className="h-44 w-full object-cover" src={cause.image} alt={cause.title} />
                <div className="p-6">
                  <h3 className="font-display text-xl font-extrabold">{cause.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{cause.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <blockquote key={item.name} className="rounded-[2rem] border border-outline bg-white p-8 shadow-soft">
              <p className="text-xl font-semibold leading-9 text-ink">“{item.quote}”</p>
              <footer className="mt-6">
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-muted">{item.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
