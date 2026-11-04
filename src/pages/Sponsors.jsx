import React, { useState } from "react";
import { PageHero, Section, Tabs, Card, CTABand, Button, RevealOnScroll } from "../components/ui";

const TABS = [
  { id: "institutional", label: "Institutional donors" },
  { id: "knowledge", label: "Knowledge & Technical Partners" },
  { id: "philanthropic", label: "Corporate & Philanthropic Support" },
  { id: "international", label: "International Friends & Supporters" },
];

const INSTITUTIONAL = [
  "Rotary District 3020",
  "Motivation India",
  "Jiv Daya Foundation",
  "GAIL (India) Limited",
  "Hyundai Motor India Foundation",
  "Hindustan Petroleum Corporation Limited, Visakha Refinery",
  "Mobility India",
  "MPLADS Fund from MP T. Subrahmanyam Reddy",
  "CLASP (Consolidating Logistics for Assistive Technology Supply and Provision)",
  "ACC Limited, Visakhapatnam",
  "MIBLOU, Switzerland",
  "L&T Prayas Trust, Visakhapatnam",
  "Coromandel Fertilisers Employees Union – Trade Union Social Responsibility",
  "L&T Defence",
  "Rashtriya Ispat Nigam Limited, Vizag Steel, Visakhapatnam",
  "Visakhapatnam Steel Plant, Corporate Social Responsibility (CSR) Initiative",
  "Walkabout Foundation, London",
  "Visteel Mahila Samiti, Visakhapatnam",
  "Indian Head Injury Foundation",
  "Concentrix Daksh Services India Private Limited",
  "Azim Premji Foundation",
  "Tech Mahindra Foundation",
  "NMDC",
  "IHIF (Indian Head Injury Foundation)"
];

const KNOWLEDGE_PARTNERS = [
  "The Association of People with Disability, Bangalore",
  "The Spinal Foundation, India",
  "Mobility India Research Rehabilitation & Training Centre, Bangalore",
  "Motivation India, Bangalore",
  "Indian Head Injury Foundation, New Delhi",
  "More Than Walking, USA",
  "Dhwani Foundation, Bangalore",
  "Tata Pro Engage, India"
];

const CORPORATE_SUPPORT = [
  { title: "Chezuba & TATA ProEngage", desc: "Skilled corporate volunteers supporting communications, visibility, and capacity-building" },
  { title: "Rotary International & Local Rotary Chapters", desc: "Award recognition, public campaigns, and device sponsorships" },
  { title: "LIC of India", desc: "Awards and CSR visibility for road safety and rehabilitation work" }
];

const INTERNATIONAL_SUPPORTERS = [
  { title: "Jonathan (USA)", desc: "SCI mentor and co-trainer during TAP's foundational Active Rehab Camps" },
  { title: "Marika Millar (MIBLOU)", desc: "Volunteer, fundraiser, and early supporter of TAP's vision" },
  { title: "Student-led fundraisers (Canada, USA)", desc: "Support via schools, clubs, and DECA events" }
];

export default function Sponsors() {
  const [tab, setTab] = useState("institutional");

  return (
    <div>
      <PageHero 
        trail={[{ label: "Sponsors" }]} 
        eyebrow="Working together" 
        title="Our Sponsors" 
      />

      <Section bg="bg-white" tight revealChildren>
        <div className="text-center mb-8">
          <h2 className="text-[24px] text-teal-deep font-display mb-3">Other Partnerships & Recognitions</h2>
        </div>
        <Tabs tabs={TABS} active={tab} onChange={setTab} />

        {tab === "institutional" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {INSTITUTIONAL.map((n, index) => (
              <RevealOnScroll key={n} delay={Math.min(index * 0.1, 0.6)}>
              <span className="px-5 py-3 bg-cream rounded-lg text-[14px] font-bold text-teal-deep border border-line flex items-center justify-center text-center h-full">{n}</span>
              </RevealOnScroll>
            ))}
          </div>
        )}

        {tab === "knowledge" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {KNOWLEDGE_PARTNERS.map((n, index) => (
              <RevealOnScroll key={n} delay={Math.min(index * 0.1, 0.6)}>
              <span className="px-5 py-3 bg-cream rounded-lg text-[14px] font-bold text-teal-deep border border-line flex items-center justify-center text-center h-full">{n}</span>
              </RevealOnScroll>
            ))}
          </div>
        )}

        {tab === "philanthropic" && (
          <div className="flex gap-4 flex-wrap">
            {CORPORATE_SUPPORT.map((partner, index) => (
              <RevealOnScroll key={partner.title} delay={Math.min(index * 0.1, 0.6)}>
              <div className="px-5 py-4 bg-cream rounded-lg border border-line flex flex-col gap-1.5 flex-1 min-w-[280px]">
                <span className="text-[14px] font-bold text-teal-deep">{partner.title}</span>
                <span className="text-[13.5px] text-stone leading-snug">{partner.desc}</span>
              </div>
              </RevealOnScroll>
            ))}
          </div>
        )}

        {tab === "international" && (
          <div className="flex gap-4 flex-wrap">
            {INTERNATIONAL_SUPPORTERS.map((partner, index) => (
              <RevealOnScroll key={partner.title} delay={Math.min(index * 0.1, 0.6)}>
              <div className="px-5 py-4 bg-cream rounded-lg border border-line flex flex-col gap-1.5 flex-1 min-w-[280px]">
                <span className="text-[14px] font-bold text-teal-deep">{partner.title}</span>
                <span className="text-[13.5px] text-stone leading-snug">{partner.desc}</span>
              </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </Section>

      <CTABand title="Partner with TAP" desc="Corporate and institutional partners can co-design a project with clear goals and transparent reporting.">
        <Button to="/contact" variant="primary">Start a conversation</Button>
      </CTABand>
    </div>
  );
}
