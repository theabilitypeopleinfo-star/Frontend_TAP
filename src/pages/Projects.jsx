import React, { useState } from "react";
import { PageHero, Section, Tabs, Card, Photo, CTABand, Button, RevealOnScroll } from "../components/ui";
import SEO from "../components/SEO";
import wheelchairImg from "../assets/wheelchair tap.jpg";
import earlyInterventionImg from "../assets/IMG_7549.jpg";
import coastalExpansionImg from "../assets/IMG_7733 (2).JPG";

import { UPCOMING_PROGRAMMES } from "../data/programmes";

const TABS = [
  { id: "ongoing", label: "Ongoing programmes" },
  { id: "upcoming", label: "Upcoming programmes" },
];

const ONGOING = [
  {
    sponsor: "Wipro Foundation",
    title: "1,000 wheelchairs for rural AP",
    desc: "Distributing customized, rough-terrain active wheelchairs to survivors in remote villages.",
    progress: 64,
    stat: "640 of 1,000 distributed",
    timeline: "Started Jan 2026",
    label: "Wheelchair distribution event in a rural area",
    src: wheelchairImg,
  },
  {
    sponsor: "CSR — KIMS Hospitals",
    title: "Early intervention for 200 children",
    desc: "Providing developmental aids and early pediatric therapy for children under 12 in 3 districts.",
    progress: 30,
    stat: "18 months duration · Active clinical support",
    timeline: "Started Mar 2026",
    label: "Children playing in an early intervention therapy room",
    src: earlyInterventionImg,
  },
  {
    sponsor: "Govt. of Andhra Pradesh",
    title: "Rehab on Wheels — coastal expansion",
    desc: "Expanding our mobile rehabilitation clinics to reach 4 new underserved coastal districts.",
    progress: 15,
    stat: "Mobile workshop clinical deployment active",
    timeline: "Started Jun 2026",
    label: "Mobile clinic van visiting a coastal community",
    src: coastalExpansionImg,
  },
];



const LEFT_CURRENT_PROGRAMMES = [
  { title: "Greater Visakhapatnam Municipal Corporation-Ability Rehabilitation Centre", desc: "Programme centre initiated in collaboration with GVMC (Greater Visakhapatnam Municipal Corporation) at the Ability Rehabilitation Centre (ARC)." },
  { title: "Rehab on Wheels", desc: "Mobile therapy units bringing rehabilitation services directly to remote and underserved communities." },
];

const RIGHT_CURRENT_PROGRAMMES = [
  { title: "Government General Hospital Paderu", desc: "Programme centre operating at Government General Hospital, Paderu, serving tribal rehabilitation needs." },
];

export default function Projects() {
  const [tab, setTab] = useState("ongoing");

  return (
    <div>
      <SEO 
        title={tab === "ongoing" ? "Ongoing Programmes" : "Upcoming & Proposed Programmes"}
        description={tab === "ongoing"
          ? "Discover TAP's active community-based rehabilitation, pediatric support, and assistive device distribution initiatives."
          : "Explore proposed programmes and co-designed CSR initiatives looking for funding partners."}
        url="/projects"
      />
      <PageHero
        trail={[{ label: "Our work", to: "/our-work" }, { label: "Programmes" }]}
        eyebrow="Present and previous"
        title="Time-bound initiatives, backed by our partners"
        desc="Beyond our ongoing services, TAP runs funded programmes with clear goals, timelines and transparent reporting."
      />

      <Section tight revealChildren>
        <Tabs tabs={TABS} active={tab} onChange={setTab} />

        {tab === "ongoing" && (
          <div className="pt-2">
            <h2 className="text-[22px] font-bold text-teal-deep mb-6 font-display">Current Programmes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                {LEFT_CURRENT_PROGRAMMES.map((c, index) => (
                  <RevealOnScroll key={c.title} delay={Math.min(index * 0.1, 0.6)}>
                  <div className="bg-white p-5 rounded-xl border border-line hover:border-teal-light transition-colors h-full">
                    <h4 className="text-[15px] font-bold text-teal-deep mb-1.5 flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                      {c.title}
                    </h4>
                    <p className="text-[13.5px] text-stone leading-relaxed pl-4">{c.desc}</p>
                  </div>
                  </RevealOnScroll>
                ))}
              </div>
              <div className="space-y-4">
                {RIGHT_CURRENT_PROGRAMMES.map((c, index) => (
                  <RevealOnScroll key={c.title} delay={Math.min(index * 0.1, 0.6)}>
                  <div className="bg-white p-5 rounded-xl border border-line hover:border-teal-light transition-colors h-full">
                    <h4 className="text-[15px] font-bold text-teal-deep mb-1.5 flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                      {c.title}
                    </h4>
                    <p className="text-[13.5px] text-stone leading-relaxed pl-4">{c.desc}</p>
                  </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        )}



        {tab === "upcoming" && (
          <div className="max-w-4xl space-y-6 sm:space-y-8">
            {UPCOMING_PROGRAMMES.map((prog, idx) => (
              <RevealOnScroll key={idx} delay={Math.min(idx * 0.1, 0.6)}>
              <div className="bg-white border border-line rounded-xl2 p-4 sm:p-8 shadow-sm hover:border-teal-light transition-colors">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-block px-3 py-1 rounded-full bg-peach text-teal-deep text-xs font-bold uppercase tracking-wider">
                    Proposed Programme
                  </span>
                </div>
                <h3 className="text-[24px] font-bold text-teal-deep mb-3 font-display">{prog.title}</h3>
                <h4 className="text-[16px] font-semibold text-teal mb-0">{prog.subtitle}</h4>
              </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </Section>

      <CTABand
        title="Partner with us on the next programme"
        desc="CSR and institutional partners can co-design a programme with defined outcomes and transparent quarterly reporting."
      >
        <Button to="/contact" variant="primary">Start a conversation</Button>
      </CTABand>
    </div>
  );
}
