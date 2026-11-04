import React from "react";
import { PageHero, Section, Photo, CTABand, Button, RevealOnScroll } from "../components/ui";
import rehabTherapyImg from "../assets/IMG_7526.JPG";
import rehabAidsImg from "../assets/IMG_7502 (2).JPG";
import outreachImg from "../assets/IMG_7572.JPG";
import inpatientImg from "../assets/IMG-20250228-WA0085 (1).jpg";
import otherSupportImg from "../assets/6298815109094116429.jpg";

const AREAS = [
  {
    num: "01.",
    title: "Physical Medicine and Rehabilitation (PMR) Services",
    list: [
      "Spinal Cord Injury Rehabilitation – Main Focus on Active Rehab",
      "Neuro Rehabilitation including Stroke & Brain Injury",
      "Amputee Rehabilitation",
      "Orthopaedic Rehabilitation",
      "Paediatric Rehabilitation (Early Intervention & Early Education)",
      "Speech & Language Therapy"
    ],
    to: "/rehab-therapy",
    label: "Therapist guiding a patient through active rehab exercises",
    src: rehabTherapyImg,
  },
  {
    num: "02.",
    title: "Assistive Technology (AT) Services",
    list: [
      "Critical care bed side rehabilitation support",
      "Prosthetic & Orthotic (Callipers and artificial limbs)",
      "Developmental Aids & Appliances for children",
      "Assistive Devices for Activities of Daily Living",
      "Assistive Technology",
      "Foot Care For All"
    ],
    to: "/rehab-aids",
    label: "Technician fitting a prosthetic limb",
    reverse: true,
    src: rehabAidsImg,
  },
  {
    num: "03.",
    title: "Outreach & independent living",
    list: [
      "Mobile Workshop/Clinic",
      "Rehab on Wheels",
      "Community Based Rehabilitation"
    ],
    to: "/outreach",
    label: "Mobile clinic van visiting a rural community",
    src: outreachImg,
  },
  {
    num: "04.",
    title: "In-patient Services",
    list: [
      "Short and long-term in-patient rehabilitation care",
      "Social security empanelled assistive device schemes",
      "Assistive device rental services"
    ],
    to: "/inpatient-services",
    label: "In-patient rehabilitation ward",
    reverse: true,
    src: inpatientImg,
  },
  {
    num: "05.",
    title: "Other Support Programmes",
    list: [
      "The Elderly (Mobility Support & Community Care)",
      "Promoting Entrepreneurship",
      "Short/Long-term In-Patient Services",
      "Providing Medical Kit to SCI & Bed-ridden patients",
      "Social Security Schemes",
      "Rental Services: Transport, Hospital Beds, Wheelchairs, Mobility Aids & Assistive Devices",
      "Online Consultation",
      "Awareness Programs"
    ],
    label: "Community outreach session",
    to: "/under-construction",
    src: otherSupportImg,
  },
];

export default function OurWork() {
  return (
    <div>
      <PageHero
        trail={[{ label: "Our work" }]}
        eyebrow="Programmes & services"
        title="Rehabilitation and assistive care, built around the person"
        desc="Comprehensive programme areas covering clinical therapy through to community reintegration."
      />
      <Section tight revealChildren>
        <RevealOnScroll>
        <div className="mb-4">
          <p className="eyebrow text-gold-dark text-[13px] font-bold uppercase tracking-[0.12em] mb-3">At a glance</p>
          <h2 className="text-[30px] text-teal-deep mb-3">Our programme areas, one goal</h2>
          <p className="text-stone max-w-xl">An overview of how TAP supports independence — open any area for full details.</p>
        </div>
        </RevealOnScroll>
        <div>
          {AREAS.map((a, index) => (
            <RevealOnScroll key={a.title} delay={Math.min(index * 0.1, 0.6)}>
            <div
              className={`grid lg:grid-cols-[340px_1fr] gap-6 lg:gap-10 items-center py-6 sm:py-9 border-b border-line last:border-b-0 ${
                a.reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <RevealOnScroll type="image">
              <Photo src={a.src} label={a.label} className="h-[220px]" />
              </RevealOnScroll>
              <div className="flex gap-6 items-start">
                <span className="font-display text-[26px] text-gold-dark min-w-[48px]">{a.num}</span>
                <div>
                  <h3 className="text-[21px] text-teal-deep mb-2">{a.title}</h3>
                  {a.desc ? (
                    <p className={`text-[14.5px] text-stone max-w-[56ch] ${a.to ? "mb-4" : ""}`}>{a.desc}</p>
                  ) : a.list ? (
                    <ul className={`${a.to ? "mb-4" : ""} ${a.list.length > 6 ? "space-y-1" : "space-y-1.5"}`}>
                      {a.list.map((item, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-[7px]" />
                          <span className="text-[14.5px] text-stone leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {a.to && <Button to={a.to} variant="outline" size="sm">Explore programme</Button>}
                </div>
              </div>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      <CTABand title="Not sure which service fits?" desc="Speak with our team and we'll help match you or your family member with the right programme.">
        <Button to="/contact" variant="primary">Talk to our team</Button>
      </CTABand>
    </div>
  );
}
