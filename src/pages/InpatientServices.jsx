import React from "react";
import { PageHero, Section, Photo, IconBullet, CTABand, Button, StatCard, RevealOnScroll } from "../components/ui";
import inpatientServicesImg from "../assets/20250618_112454 (1).jpg";

export default function InpatientServices() {
  return (
    <div>
      <PageHero
        trail={[{ label: "Our work", to: "/our-work" }, { label: "In-Patient Services" }]}
        eyebrow="Residential care"
        title="Short & Long-Term In-Patient Services"
        desc="Residential rehabilitation care at the Ability Rehabilitation Centre, Visakhapatnam, for those needing intensive or extended support."
      />
      <Section tight revealChildren>
        <RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
          <div>
            <h2 className="text-[24px] text-teal-deep mb-3">A 15-bed dedicated rehabilitation facility</h2>
            <p className="text-stone mb-5">
              The Ability Rehabilitation Centre (ARC) provides both short-term intensive rehabilitation and
              longer-term residential care for spinal cord injury, neuro-rehabilitation and complex mobility cases,
              with 24-hour nursing and therapy support.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              <StatCard value="15" label="In-patient beds" />
              <StatCard value="24/7" label="Nursing support" />
            </div>
          </div>
          <Photo src={inpatientServicesImg} tall label="In-patient rehabilitation ward with beds and therapy equipment" caption="Ability Rehabilitation Centre, Visakhapatnam" />
        </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
        <h3 className="text-[20px] text-teal-deep mb-2">What's included</h3>
        <div className="grid md:grid-cols-2 gap-x-10">
          <IconBullet title="Short-term intensive rehabilitation">Focused, time-bound programmes following surgery, injury or acute illness.</IconBullet>
          <IconBullet title="Long-term residential rehabilitation">Extended care for complex spinal cord injury and neuro-rehabilitation cases.</IconBullet>
          <IconBullet title="Medical kits for SCI & bed-ridden patients">Essential medical supply kits delivered to those in need.</IconBullet>
          <IconBullet title="Rental services">Transport, hospital beds, wheelchairs, mobility aids and assistive devices available on rent.</IconBullet>
        </div>
        </RevealOnScroll>
      </Section>

      <CTABand title="Enquire about admission" desc="Our clinical coordination team can advise on eligibility, costs and available beds.">
        <Button to="/contact" variant="primary">Enquire about admission</Button>
        <Button to="/social-security-schemes" variant="outlineLight">Social Security Schemes</Button>
      </CTABand>
    </div>
  );
}
