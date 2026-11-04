import React, { useState } from "react";
import { PageHero, Section, Tabs, Card, CTABand, Button, RevealOnScroll } from "../components/ui";
import gptwLogo from "../assets/greatplacetowork logo.jpeg";

const TABS = [
  { id: "careers", label: "Careers" },
  { id: "fellowships", label: "Fellowships & Internships" },
];

const JOBS = [
  {
    title: "Physiotherapist",
    type: "Full-time · Visakhapatnam",
    desc: "Deliver clinical, hands-on physical rehabilitation therapy for spinal cord injury survivors and neurological recovery patients at the ARC campus.",
  },
  {
    title: "Community Outreach Officer",
    type: "Full-time · Field-based",
    desc: "Coordinate Rehab on Wheels schedules, village-level medical stakeholder alignment, and outreach assessment camps across rural districts.",
  },
  {
    title: "Program Coordinator — CSR Projects",
    type: "Full-time · Visakhapatnam",
    desc: "Coordinate operational delivery, donor relations, progress metrics, and compliance reports for institutional and corporate social responsibility partnerships.",
  },
];

const INTERNSHIPS = [
  {
    title: "Clinical Rehabilitation Fellowship",
    type: "6-month duration · Stipend provided",
    desc: "A hands-on fellowship for recent physiotherapy or occupational therapy graduates, combining clinical supervision under senior directors with rural field rotations.",
  },
  {
    title: "Program Evaluation Internship",
    type: "3-month duration · Part-time option",
    desc: "Open to students in social work, public health, or development studies, supporting data monitoring, beneficiary surveys, and impact dashboard evaluations.",
  },
];

export default function Careers() {
  const [tab, setTab] = useState("careers");

  return (
    <div>
      <PageHero
        trail={[{ label: "Get involved", to: "/donate" }, { label: "Careers" }]}
        eyebrow="CAREERS"
        title="Build your career at TAP"
        desc="Join our team in a paid role or internship to move someone closer to physical independence and community dignity."
      >
        <div 
          className="w-[110px] md:w-[130px] rounded-xl shadow-lg border-2 border-white/20 bg-white flex-shrink-0 relative overflow-hidden"
          aria-hidden="true"
        >
          <img 
            src={gptwLogo} 
            alt="Great Place To Work Certified badge, December 2025 to December 2026" 
            className="w-full h-auto object-contain block"
          />
        </div>
      </PageHero>

      <Section tight revealChildren>
        <Tabs tabs={TABS} active={tab} onChange={setTab} />

        {tab === "careers" && (
          <div className="space-y-4 max-w-4xl">
            {JOBS.map((j, index) => (
              <RevealOnScroll key={j.title} delay={Math.min(index * 0.1, 0.6)}>
              <div className="flex flex-col sm:flex-row gap-4 justify-between p-5 border border-line rounded-xl2 bg-white hover:border-teal-light transition-all duration-300">
                <div>
                  <h4 className="text-[17px] font-bold text-teal-deep mb-1 font-display flex items-center gap-2 flex-wrap">
                    {j.title}
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-peach text-teal-deep text-[11px] font-body font-bold">
                      {j.type}
                    </span>
                  </h4>
                  <p className="text-[14px] text-stone leading-relaxed max-w-[65ch]">{j.desc}</p>
                </div>
                <Button to="/contact" variant="outline" size="sm" className="h-fit w-fit self-start sm:self-center">
                  Apply Now
                </Button>
              </div>
              </RevealOnScroll>
            ))}
            <RevealOnScroll>
            <p className="text-[14px] text-stone pt-4">
              Don't see a matching open position? Send a general application with your CV to{" "}
              <a href="mailto:jobs@theabilitypeople.org" className="text-teal font-bold hover:underline">
                jobs@theabilitypeople.org
              </a>
              .
            </p>
            </RevealOnScroll>
          </div>
        )}

        {tab === "fellowships" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {INTERNSHIPS.map((i, index) => (
              <RevealOnScroll key={i.title} delay={Math.min(index * 0.1, 0.6)}>
              <Card>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-peach text-teal-deep text-xs font-bold mb-3.5">
                      {i.type}
                    </span>
                    <h3 className="text-[19px] text-teal-deep font-bold mb-2 font-display">{i.title}</h3>
                    <p className="text-[14px] text-stone leading-relaxed mb-5">{i.desc}</p>
                  </div>
                  <Button to="/contact" variant="outline" size="sm" className="w-full justify-center">
                    Enquire about eligibility
                  </Button>
                </div>
              </Card>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </Section>

      <CTABand
        title="Your skills are needed here"
        desc="Bring your clinical knowledge or operational expertise to TAP."
      >
        <Button to="/contact" variant="primary">Get in touch with HR</Button>
      </CTABand>
    </div>
  );
}
