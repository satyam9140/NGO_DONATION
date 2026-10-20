import { BadgeCheck, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function NGOCard({ ngo }) {
  const funded = Math.min(100, Math.round((ngo.raised / ngo.goal) * 100 || ngo.funded || 0));
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-outline bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
      <div className="relative h-52 overflow-hidden">
        <img src={ngo.image} alt={ngo.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-primary shadow-soft">
          <BadgeCheck size={15} /> Verified
        </div>
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">{ngo.category}</p>
            <h3 className="mt-1 font-display text-xl font-extrabold text-ink">{ngo.name}</h3>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700">
            <Star size={14} fill="currentColor" /> {ngo.rating}
          </span>
        </div>
        <p className="mb-4 flex items-center gap-2 text-sm text-muted"><MapPin size={16} /> {ngo.location}</p>
        <p className="min-h-[48px] text-sm leading-6 text-muted">{ngo.description}</p>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs font-bold text-muted">
            <span>{money.format(ngo.raised)} raised</span>
            <span>{funded}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-primary" style={{ width: `${funded}%` }} />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-muted">{ngo.beneficiaries} reached</span>
          <Link to={`/donate?ngo=${ngo.id}`} className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primaryDeep">
            Donate
          </Link>
        </div>
      </div>
    </article>
  );
}
