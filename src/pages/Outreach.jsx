import React from "react";
import { PageHero, Section, Photo, IconBullet, CTABand, Button, StatCard, RevealOnScroll } from "../components/ui";
import rehabOnWheelsImg from "../assets/WhatsApp Image 2026-02-10 at 3.23.43 PM (1).jpg";

export default function Outreach() {
  return (
    <div>
      <PageHero
        trail={[{ label: "Our work", to: "/our-work" }, { label: "Independent Living Program" }]}
        eyebrow="Community-based programme"
        title="Independent Living Program"
        desc="Bringing rehabilitation therapy and assistive devices directly to rural and underserved communities."
      />
      <Section tight revealChildren>
        <RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 sm:mb-16">
          <Photo src={rehabOnWheelsImg} tall label="Rehab on Wheels mobile van at a rural outreach camp" caption="Rehab on Wheels, coastal Andhra Pradesh" />
          <div>
            <IconBullet title="Independent Living Program">Community-based support for independent living.</IconBullet>
            <IconBullet title="Rehab on Wheels — mobile clinic">A fully-equipped van bringing therapy and devices to rural areas.</IconBullet>
            <IconBullet title="Community-based rehabilitation">Village-level therapy and training delivered by trained community workers.</IconBullet>
            <IconBullet title="Elderly mobility support">Community care for age-related mobility loss.</IconBullet>
            <IconBullet title="Promoting entrepreneurship">Livelihood support helping beneficiaries build sustainable income.</IconBullet>
          </div>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <StatCard value="33" label="Mandals covered" />
          <StatCard value="30+" label="Outreach camps / year" />
          <StatCard value="3,000+" label="Rural beneficiaries" />
          <StatCard value="1" label="Mobile clinic vehicle" />
        </div>
        </RevealOnScroll>
      </Section>

      <CTABand title="Bring the mobile clinic to your community" desc="Panchayats, schools and community groups can request a Rehab on Wheels visit.">
        <Button to="/contact" variant="primary">Request a visit</Button>
      </CTABand>
    </div>
  );
}
