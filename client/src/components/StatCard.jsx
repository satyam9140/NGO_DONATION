export default function StatCard({ label, value, detail, icon: Icon }) {
  return (
    <div className="glass-card gradient-border rounded-[2rem] p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        {Icon && (
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primarySoft text-primary">
            <Icon size={23} />
          </span>
        )}
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-muted shadow-sm">Live</span>
      </div>
      <p className="font-display text-3xl font-extrabold text-ink">{value}</p>
      <p className="mt-1 font-semibold text-ink">{label}</p>
      {detail && <p className="mt-2 text-sm text-muted">{detail}</p>}
    </div>
  );
}
