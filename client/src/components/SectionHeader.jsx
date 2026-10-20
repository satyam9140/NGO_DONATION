export default function SectionHeader({ eyebrow, title, description, align = "center", tone = "light" }) {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <div className={centered ? "mx-auto mb-12 max-w-3xl text-center" : "mb-10 max-w-3xl"}>
      {eyebrow && (
        <p className={`mb-3 text-sm font-bold uppercase tracking-[0.24em] ${dark ? "text-skySoft" : "text-primary"}`}>{eyebrow}</p>
      )}
      <h2 className={`font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {description && <p className={`mt-4 text-base leading-7 ${dark ? "text-white/70" : "text-muted"}`}>{description}</p>}
    </div>
  );
}
