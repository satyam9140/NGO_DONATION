import { useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Building2, CheckCircle2, FileCheck2, ShieldCheck } from "lucide-react";
import SectionHeader from "../components/SectionHeader.jsx";
import { registerNgo } from "../services/api.js";

const steps = [
  { title: "Organization", icon: Building2 },
  { title: "Program", icon: ShieldCheck },
  { title: "Documents", icon: FileCheck2 }
];

const initialForm = {
  organizationName: "",
  email: "",
  phone: "",
  city: "",
  category: "Education",
  registrationNumber: "",
  programTitle: "",
  programDescription: "",
  fundingGoal: "",
  beneficiariesTarget: "",
  website: "",
  bankAccountName: "",
  documentLink: ""
};

export default function Register() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const update = (event) => {
    setForm((value) => ({ ...value, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Submitting registration..." });
    try {
      await registerNgo(form);
      setStatus({ type: "success", message: "Registration submitted. Your NGO is now in review." });
      setForm(initialForm);
      setStep(0);
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.error || "Could not submit registration." });
    }
  };

  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeader
          eyebrow="NGO Registration"
          title="Make registration structured, not random"
          description="Bad NGO websites collect vague details. This flow captures identity, program, funding, and verification information cleanly."
        />

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-[2.5rem] bg-primaryDeep p-8 text-white shadow-glow">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
              <BadgeCheck size={17} /> Verification pipeline
            </div>
            <h2 className="font-display text-3xl font-extrabold">Three-step NGO onboarding</h2>
            <p className="mt-4 leading-7 text-white/70">
              Keep the UX simple but collect enough data to protect donors. Anything less is cosmetic, not a real platform.
            </p>
            <div className="mt-10 space-y-4">
              {steps.map((item, index) => {
                const Icon = item.icon;
                const active = index <= step;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setStep(index)}
                    className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition ${active ? "bg-white text-primaryDeep" : "bg-white/8 text-white/75 hover:bg-white/12"}`}
                  >
                    <span className={`grid h-11 w-11 place-items-center rounded-xl ${active ? "bg-primary text-white" : "bg-white/10"}`}>
                      <Icon size={21} />
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em]">Step {index + 1}</span>
                      <span className="block font-display text-lg font-extrabold">{item.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <form onSubmit={submit} className="rounded-[2.5rem] border border-outline bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-8 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>

            {step === 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                <label className="md:col-span-2">Organization name<input className="input-field mt-2" name="organizationName" value={form.organizationName} onChange={update} required /></label>
                <label>Email<input className="input-field mt-2" type="email" name="email" value={form.email} onChange={update} required /></label>
                <label>Phone<input className="input-field mt-2" name="phone" value={form.phone} onChange={update} required /></label>
                <label>City / State<input className="input-field mt-2" name="city" value={form.city} onChange={update} required /></label>
                <label>Primary category<select className="input-field mt-2" name="category" value={form.category} onChange={update}><option>Education</option><option>Healthcare</option><option>Environment</option><option>Disaster Relief</option><option>Women Empowerment</option></select></label>
                <label className="md:col-span-2">Registration number<input className="input-field mt-2" name="registrationNumber" value={form.registrationNumber} onChange={update} required /></label>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5 md:grid-cols-2">
                <label className="md:col-span-2">Program title<input className="input-field mt-2" name="programTitle" value={form.programTitle} onChange={update} required /></label>
                <label className="md:col-span-2">Program description<textarea className="input-field mt-2 min-h-36" name="programDescription" value={form.programDescription} onChange={update} required /></label>
                <label>Funding goal in INR<input className="input-field mt-2" type="number" name="fundingGoal" value={form.fundingGoal} onChange={update} required /></label>
                <label>Beneficiary target<input className="input-field mt-2" type="number" name="beneficiariesTarget" value={form.beneficiariesTarget} onChange={update} required /></label>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5 md:grid-cols-2">
                <label>Website / Social link<input className="input-field mt-2" name="website" value={form.website} onChange={update} placeholder="https://..." /></label>
                <label>Bank account name<input className="input-field mt-2" name="bankAccountName" value={form.bankAccountName} onChange={update} required /></label>
                <label className="md:col-span-2">Document folder link<input className="input-field mt-2" name="documentLink" value={form.documentLink} onChange={update} placeholder="Drive/Docs link for demo" /></label>
                <div className="md:col-span-2 rounded-2xl bg-primarySoft p-5 text-primaryDeep">
                  <p className="flex items-center gap-2 font-bold"><CheckCircle2 /> Before final submit</p>
                  <p className="mt-2 text-sm leading-6">Confirm documents, bank details, and program target. In a real production build, this step needs admin review and KYC verification.</p>
                </div>
              </div>
            )}

            {status.message && (
              <div className={`mt-6 rounded-2xl p-4 text-sm font-semibold ${status.type === "success" ? "bg-emerald-50 text-success" : status.type === "error" ? "bg-red-50 text-danger" : "bg-blue-50 text-primary"}`}>
                {status.message}
              </div>
            )}

            <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row">
              <button type="button" className="btn-secondary" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>
                <ArrowLeft size={18} /> Previous
              </button>
              {step < steps.length - 1 ? (
                <button type="button" className="btn-primary" onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))}>
                  Next Step <ArrowRight size={18} />
                </button>
              ) : (
                <button type="submit" className="btn-primary" disabled={status.type === "loading"}>
                  Submit Registration <ArrowRight size={18} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
