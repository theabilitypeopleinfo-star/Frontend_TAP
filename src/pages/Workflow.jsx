import React from "react";
import { PageHero, Section, CTABand, Button, RevealOnScroll } from "../components/ui";

const STAGES = [
  {
    num: 1,
    title: "Outreach & Referral",
    desc: "Beneficiaries reach TAP through hospital referrals, community outreach camps, field outreach, direct walk-ins, or the official helpline.",
  },
  {
    num: 2,
    title: "Registration & Identification",
    desc: "Field coordinators or centre visits capture beneficiary details, generate a unique beneficiary ID, and assign the case to the appropriate programme.",
  },
  {
    num: 3,
    title: "Functional Assessment",
    desc: "A multidisciplinary team of therapists and physiotherapists conducts a clinical evaluation to determine need level and route the beneficiary to the right care pathway — community-based or centre-based.",
  },
  {
    num: 4,
    title: "Individualised Care Pathway",
    desc: "Based on assessed need, beneficiaries follow a Low-to-Moderate Need (community-based) or High Need (centre-based) pathway, each offering tailored therapy, counselling, and assistive device support for both CwSN (Children with Special Needs) and SCI (Spinal Cord Injury) cases.",
  },
  {
    num: 5,
    title: "Treatment, Device Fitting & Quality Check",
    desc: "Care is delivered through physiotherapy, prosthetic & orthotic services (casting, re-casting where needed, moulding, trial fitting), and a formal quality check before device handover.",
  },
  {
    num: 6,
    title: "Social Security Linkage & Delivery",
    desc: "Beneficiaries are supported in accessing entitlements such as health insurance, UDID/disability certificates, legal guardianship, and Aadhaar linkage, alongside final device delivery with documented consent and feedback.",
  },
  {
    num: 7,
    title: "Outcomes & Continuity of Care",
    desc: "Every stage is tracked and recorded, and outcomes are reviewed — improved mobility and function, continuum of care, and increased independence for the beneficiary.",
  },
];

const CARDS = [
  {
    title: "Multidisciplinary Clinical Assessment",
    desc: "Comprehensive evaluation by clinical directors, therapists, and orthotic technicians to establish evidence-based benchmarks.",
  },
  {
    title: "Goal-Oriented Care Plans",
    desc: "Every care plan is mapped to functional milestone outcomes — from sitting balance to independent outdoor mobility.",
  },
  {
    title: "Home-Transition Focus",
    desc: "We prioritize caregiver training and home environment advice early in the process to reduce post-discharge secondary complications.",
  },
  {
    title: "Livelihood & Lived Integration",
    desc: "True rehabilitation extends to social and financial independence. We support peer mentorship, vocational guidance, and business setups.",
  },
];

export default function Workflow() {
  return (
    <div>
      <PageHero
        trail={[{ label: "Our work", to: "/our-work" }, { label: "Our Process" }]}
        eyebrow="How we help"
        title="The beneficiary journey, from entry to independence"
        desc="A structured, seven-stage process ensures every beneficiary receives care matched to their needs — and that families and referral partners know exactly what to expect."
      />

      <Section tight revealChildren>
        <div className="space-y-6 max-w-3xl mx-auto">
          {STAGES.map((s, index) => (
            <RevealOnScroll key={s.num} delay={Math.min(index * 0.1, 0.6)}>
            <div className="flex gap-5 py-5 border-b border-line last:border-b-0 items-start">
              <div className="h-10 w-10 rounded-full bg-teal-deep text-white flex items-center justify-center font-display text-lg flex-shrink-0">
                {s.num}
              </div>
              <div>
                <h4 className="text-[17px] font-bold text-teal-deep mb-1 font-display">{s.title}</h4>
                <p className="text-[14.5px] text-stone leading-relaxed">{s.desc}</p>
              </div>
            </div>
            </RevealOnScroll>
          ))}
          <RevealOnScroll delay={0.9}>
          <p className="text-[12.5px] text-stone pt-3 italic text-center">
            This process is reviewed periodically by TAP's clinical board to reflect international best practices in rehabilitation.
          </p>
          </RevealOnScroll>
        </div>
      </Section>

      <Section bg="bg-cream" revealChildren>
        <RevealOnScroll>
        <div className="text-center mb-10 max-w-xl mx-auto">
          <span className="eyebrow text-gold-dark text-[13px] font-bold uppercase tracking-[0.12em] mb-3.5 block justify-center flex items-center gap-2">
            <span className="h-[2px] w-7 bg-gold" /> Key Principles
          </span>
          <h2 className="text-[28px] text-teal-deep leading-tight font-display mb-3">Our service delivery principles</h2>
          <p className="text-[15.5px] text-stone">Behind our workflow is a commitment to dignity, clinical rigor, and long-term independence.</p>
        </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {CARDS.map((c, index) => (
            <RevealOnScroll key={c.title} delay={Math.min(index * 0.1, 0.6)}>
            <div className="bg-white border border-line rounded-xl2 p-4 sm:p-6 md:p-8 hover:border-teal-light transition-all duration-300">
              <h4 className="text-[17px] font-bold text-teal-deep mb-2 font-display">{c.title}</h4>
              <p className="text-[14.5px] text-stone leading-relaxed">{c.desc}</p>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      <CTABand
        title="Refer a beneficiary, or ask us a question"
        desc="Hospitals, social workers, families and community members can reach out directly to our intake coordination team."
      >
        <Button to="/contact" variant="primary">Contact our intake team</Button>
      </CTABand>
    </div>
  );
}
