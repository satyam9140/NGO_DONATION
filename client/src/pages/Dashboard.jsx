import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, BarChart3, FileCheck2, HandCoins, HeartHandshake, UsersRound } from "lucide-react";
import SectionHeader from "../components/SectionHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import { fetchDashboard } from "../services/api.js";

const fallback = {
  stats: {
    totalDonations: 3080000,
    donorCount: 1240,
    registrations: 28,
    beneficiariesReached: 63250
  },
  programs: [
    { name: "Digital Classrooms", progress: 82, target: 100, category: "Education" },
    { name: "Mobile Health Camps", progress: 66, target: 100, category: "Healthcare" },
    { name: "Flood Relief Kits", progress: 74, target: 100, category: "Disaster Relief" },
    { name: "Clean Water Units", progress: 58, target: 100, category: "Environment" }
  ],
  donations: [],
  registrations: []
};

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function Dashboard() {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard()
      .then((payload) => setData(payload))
      .catch(() => setData(fallback))
      .finally(() => setLoading(false));
  }, []);

  const totalProgramProgress = useMemo(() => {
    if (!data.programs?.length) return 0;
    return Math.round(data.programs.reduce((sum, item) => sum + item.progress, 0) / data.programs.length);
  }, [data.programs]);

  const stats = [
    { label: "Total donations", value: money.format(data.stats.totalDonations || 0), detail: "recorded through platform", icon: HandCoins },
    { label: "Donors", value: (data.stats.donorCount || 0).toLocaleString("en-IN"), detail: "unique supporters", icon: UsersRound },
    { label: "NGO reviews", value: (data.stats.registrations || 0).toLocaleString("en-IN"), detail: "registration pipeline", icon: FileCheck2 },
    { label: "Avg. progress", value: `${totalProgramProgress}%`, detail: "across active programs", icon: BarChart3 }
  ];

  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeader
          eyebrow="Impact Dashboard"
          title="Don’t just collect donations. Prove outcomes."
          description="This dashboard turns donation records, NGO registrations, and program progress into decision-ready impact signals."
        />

        {loading && <div className="mb-6 rounded-2xl bg-white p-4 text-center font-semibold text-muted shadow-soft">Loading dashboard...</div>}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => <StatCard key={item.label} {...item} />)}
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.5rem] border border-outline bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Program progress</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold">Active impact streams</h3>
              </div>
              <BadgeCheck className="text-success" />
            </div>
            <div className="space-y-6">
              {(data.programs || []).map((program) => (
                <div key={program.name}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold">{program.name}</p>
                      <p className="text-sm text-muted">{program.category}</p>
                    </div>
                    <p className="font-display text-xl font-extrabold text-primary">{program.progress}%</p>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${program.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-primaryDeep p-6 text-white shadow-glow sm:p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-skySoft">Impact index</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold">Outcome snapshot</h3>
              </div>
              <HeartHandshake />
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-sm text-white/65">Beneficiaries reached</p>
                <p className="mt-1 font-display text-4xl font-extrabold">{(data.stats.beneficiariesReached || 0).toLocaleString("en-IN")}</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-sm text-white/65">Cost per beneficiary</p>
                <p className="mt-1 font-display text-4xl font-extrabold">
                  {money.format(Math.round((data.stats.totalDonations || 0) / Math.max(1, data.stats.beneficiariesReached || 1)))}
                </p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-sm text-white/65">Decision warning</p>
                <p className="mt-2 text-sm leading-6 text-white/80">If a program has high spending and low beneficiary movement, it needs review. Cosmetic dashboards hide this; useful dashboards expose it.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-2">
          <div className="rounded-[2.5rem] border border-outline bg-white p-6 shadow-soft sm:p-8">
            <h3 className="font-display text-2xl font-extrabold">Recent donations</h3>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.16em] text-muted">
                  <tr><th className="py-3">Donor</th><th>NGO</th><th>Amount</th><th>Frequency</th></tr>
                </thead>
                <tbody className="divide-y divide-outline">
                  {(data.donations || []).slice(0, 8).map((donation) => (
                    <tr key={donation.id}>
                      <td className="py-4 font-semibold">{donation.donor?.name || "Anonymous"}</td>
                      <td>{donation.ngoName}</td>
                      <td className="font-bold text-primary">{money.format(donation.amount || 0)}</td>
                      <td className="capitalize">{donation.frequency}</td>
                    </tr>
                  ))}
                  {!data.donations?.length && <tr><td className="py-5 text-muted" colSpan="4">No new donations yet. Use the donation page to add sample records.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-outline bg-white p-6 shadow-soft sm:p-8">
            <h3 className="font-display text-2xl font-extrabold">NGO registration pipeline</h3>
            <div className="mt-5 space-y-4">
              {(data.registrations || []).slice(0, 6).map((registration) => (
                <div key={registration.id} className="rounded-2xl border border-outline p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">{registration.organizationName}</p>
                      <p className="text-sm text-muted">{registration.category} • {registration.city}</p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Under review</span>
                  </div>
                </div>
              ))}
              {!data.registrations?.length && <p className="rounded-2xl bg-slate-50 p-5 text-sm text-muted">No registration submissions yet. Use the NGO registration page to add sample records.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
