import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, CreditCard, Heart, IndianRupee, LockKeyhole, ShieldCheck } from "lucide-react";
import SectionHeader from "../components/SectionHeader.jsx";
import { causes, featuredNgos } from "../data/content.js";
import { createDonation } from "../services/api.js";

const amounts = [500, 1000, 2500, 5000, 10000];

export default function Donate() {
  const [searchParams] = useSearchParams();
  const selectedNgo = searchParams.get("ngo");
  const [amount, setAmount] = useState(2500);
  const [frequency, setFrequency] = useState("one-time");
  const [ngoId, setNgoId] = useState(selectedNgo || featuredNgos[0].id);
  const [causeId, setCauseId] = useState("education");
  const [donor, setDonor] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const ngo = useMemo(() => featuredNgos.find((item) => item.id === ngoId) || featuredNgos[0], [ngoId]);
  const cause = useMemo(() => causes.find((item) => item.id === causeId) || causes[0], [causeId]);

  const submit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Recording donation..." });
    try {
      await createDonation({ amount: Number(amount), frequency, ngoId, ngoName: ngo.name, causeId, causeTitle: cause.title, donor });
      setStatus({ type: "success", message: "Donation recorded successfully. Connect Razorpay/Stripe keys before real payment collection." });
      setDonor({ name: "", email: "", phone: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.error || "Donation could not be recorded." });
    }
  };

  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeader
          eyebrow="Secure Donation Portal"
          title="A clean donation flow donors can actually trust"
          description="The flow records donor, NGO, cause, amount, and frequency. It is intentionally ready for payment-gateway integration."
        />

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <form onSubmit={submit} className="rounded-[2.5rem] border border-outline bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-8 flex items-center gap-3 rounded-2xl bg-primarySoft p-4 text-primaryDeep">
              <LockKeyhole size={21} />
              <p className="text-sm font-bold">Demo-safe form. Real payments need gateway credentials and webhook verification.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="md:col-span-2">Choose NGO
                <select className="input-field mt-2" value={ngoId} onChange={(event) => setNgoId(event.target.value)}>
                  {featuredNgos.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </label>
              <label className="md:col-span-2">Choose cause
                <select className="input-field mt-2" value={causeId} onChange={(event) => setCauseId(event.target.value)}>
                  {causes.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                </select>
              </label>

              <div className="md:col-span-2">
                <p className="mb-3 font-semibold">Gift type</p>
                <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
                  {["one-time", "monthly"].map((item) => (
                    <button key={item} type="button" onClick={() => setFrequency(item)} className={`rounded-xl px-4 py-3 font-bold capitalize transition ${frequency === item ? "bg-white text-primary shadow-sm" : "text-muted"}`}>
                      {item.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <p className="mb-3 font-semibold">Amount</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {amounts.map((item) => (
                    <button key={item} type="button" onClick={() => setAmount(item)} className={`rounded-2xl border px-4 py-3 font-bold transition ${Number(amount) === item ? "border-primary bg-primarySoft text-primary" : "border-outline bg-white text-muted hover:border-primary"}`}>
                      ₹{item.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
                <label className="mt-4 block">Custom amount<input className="input-field mt-2" type="number" min="1" value={amount} onChange={(event) => setAmount(event.target.value)} required /></label>
              </div>

              <label>Donor name<input className="input-field mt-2" value={donor.name} onChange={(event) => setDonor({ ...donor, name: event.target.value })} required /></label>
              <label>Email<input className="input-field mt-2" type="email" value={donor.email} onChange={(event) => setDonor({ ...donor, email: event.target.value })} required /></label>
              <label className="md:col-span-2">Phone<input className="input-field mt-2" value={donor.phone} onChange={(event) => setDonor({ ...donor, phone: event.target.value })} /></label>
            </div>

            {status.message && (
              <div className={`mt-6 rounded-2xl p-4 text-sm font-semibold ${status.type === "success" ? "bg-emerald-50 text-success" : status.type === "error" ? "bg-red-50 text-danger" : "bg-blue-50 text-primary"}`}>
                {status.message}
              </div>
            )}

            <button className="btn-primary mt-8 w-full" type="submit" disabled={status.type === "loading"}>
              <CreditCard size={19} /> Proceed to Secure Payment
            </button>
          </form>

          <aside className="space-y-6">
            <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-soft">
              <img src={ngo.image} alt={ngo.name} className="h-64 w-full object-cover" />
              <div className="p-6">
                <p className="mb-2 flex items-center gap-2 text-sm font-bold text-success"><ShieldCheck size={17} /> Verified NGO</p>
                <h2 className="font-display text-2xl font-extrabold">{ngo.name}</h2>
                <p className="mt-3 leading-7 text-muted">{ngo.description}</p>
                <div className="mt-5 rounded-2xl bg-primarySoft p-4 text-primaryDeep">
                  <p className="flex items-center gap-2 font-bold"><Heart /> Donation summary</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <p>Amount<br /><span className="font-display text-xl font-extrabold">₹{Number(amount || 0).toLocaleString("en-IN")}</span></p>
                    <p>Frequency<br /><span className="font-display text-xl font-extrabold capitalize">{frequency}</span></p>
                    <p className="col-span-2">Cause<br /><span className="font-display text-xl font-extrabold">{cause.title}</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-outline bg-white p-6 shadow-soft">
              <p className="flex items-center gap-2 font-display text-xl font-extrabold"><IndianRupee className="text-primary" /> Where money goes</p>
              <div className="mt-5 space-y-4 text-sm font-semibold text-muted">
                <p className="flex items-center gap-2"><CheckCircle2 className="text-success" /> Program implementation</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="text-success" /> Field team and materials</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="text-success" /> Reporting and impact tracking</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
