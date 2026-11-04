import React from "react";
import { PageHero, Section, Card, CTABand, Button, Photo, RevealOnScroll } from "../components/ui";
import assistiveDevicesImg from "../assets/IMG_7521.JPG";

const AIDS = [
  { title: "Critical care bedside support", desc: "Rehabilitation support delivered at the hospital bedside for critical patients." },
  { title: "Prosthetic & orthotic", desc: "Callipers and artificial limbs, custom-fitted." },
  { title: "Developmental aids for children", desc: "Devices supporting mobility and daily function in children." },
  { title: "Assistive devices for daily living", desc: "Equipment supporting independence in everyday tasks." },
  { title: "Assistive technology", desc: "Broader technology solutions matched to individual need." },
  { title: "Foot care for all", desc: "Preventive and corrective foot care services." },
];

export default function RehabAids() {
  return (
    <div>
      <PageHero
        trail={[{ label: "Our work", to: "/our-work" }, { label: "Rehab Aids & Appliances" }]}
        eyebrow="Assistive Technology (AT) Services"
        title="Rehab Aids & Appliances"
        desc="Custom prosthetics, orthotics, developmental aids and assistive devices that support daily living and long-term mobility."
      />
      <Section tight revealChildren>
        <div className="grid md:grid-cols-3 gap-6">
          {AIDS.map((a, index) => (
            <RevealOnScroll key={a.title} delay={Math.min(index * 0.1, 0.6)}>
            <Card>
              <div className="p-6">
                <h3 className="text-[18px] text-teal-deep mb-2">{a.title}</h3>
                <p className="text-[14px] text-stone">{a.desc}</p>
              </div>
            </Card>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.15}>
        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <div>
            <h2 className="text-[24px] text-teal-deep mb-3">Rentals & the elderly (mobility support)</h2>
            <p className="text-stone mb-3">
              TAP also offers mobility support and community care for the elderly, and rents out wheelchairs,
              hospital beds and mobility aids for short-term or long-term need.
            </p>
            <Button to="/inpatient-services" variant="outline" size="sm">View rental & in-patient services</Button>
          </div>
          <Photo src={assistiveDevicesImg} tall label="Older adult using a mobility aid with support from a caregiver" />
        </div>
        </RevealOnScroll>
      </Section>

      <CTABand title="Need an assistive device fitted or assessed?" desc="Our AT team can advise on the right device and support financing options where applicable.">
        <Button to="/contact" variant="primary">Book an assessment</Button>
      </CTABand>
    </div>
  );
}
