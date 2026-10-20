import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import SectionHeader from "../components/SectionHeader.jsx";
import NGOCard from "../components/NGOCard.jsx";
import { fetchNgos } from "../services/api.js";
import { featuredNgos } from "../data/content.js";

const categories = ["All", "Education", "Healthcare", "Environment", "Disaster Relief", "Women Empowerment"];

export default function Directory() {
  const [ngos, setNgos] = useState(featuredNgos);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNgos()
      .then((payload) => setNgos(payload.ngos || featuredNgos))
      .catch(() => setNgos(featuredNgos))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return ngos.filter((ngo) => {
      const matchesQuery = [ngo.name, ngo.category, ngo.location, ngo.description].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || ngo.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [ngos, query, category]);

  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeader
          eyebrow="NGO Directory"
          title="Search verified partners before you donate"
          description="A good donation site should reduce decision anxiety. This directory gives donor-facing proof points at a glance."
        />

        <div className="mb-8 rounded-[2rem] border border-outline bg-white p-4 shadow-soft md:flex md:items-center md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={19} />
            <input
              className="input-field pl-12"
              placeholder="Search NGO, city, cause, or description..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="mt-3 flex items-center gap-3 md:mt-0">
            <SlidersHorizontal className="text-primary" />
            <select className="input-field min-w-48" value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[2rem] bg-white p-10 text-center font-semibold text-muted shadow-soft">Loading NGOs...</div>
        ) : filtered.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filtered.map((ngo) => <NGOCard key={ngo.id} ngo={ngo} />)}
          </div>
        ) : (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
            <p className="font-display text-2xl font-extrabold">No NGO matched this filter.</p>
            <p className="mt-2 text-muted">Try a broader category or remove the search keyword.</p>
          </div>
        )}
      </div>
    </section>
  );
}
