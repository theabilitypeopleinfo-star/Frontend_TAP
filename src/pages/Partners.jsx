import React, { useState } from "react";
import { PageHero, Section, Tabs, IconBullet, CTABand, Button, RevealOnScroll } from "../components/ui";

const TABS = [
  { id: "tap", label: "TAP partners" },
  { id: "memberships", label: "Dilip Patro's memberships" },
];

export default function Partners() {
  const [tab, setTab] = useState("tap");

  return (
    <div>
      <PageHero
        trail={[{ label: "Partners & Memberships" }]}
        eyebrow="Working together"
        title="Partners & Memberships"
        desc="The organisations we work alongside, and the committees our founder serves on."
      />
      <Section tight revealChildren>
        <Tabs tabs={TABS} active={tab} onChange={setTab} />

        {tab === "tap" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-10">
            <RevealOnScroll delay={0.15}>
            <div>
              <h3 className="text-[17px] text-teal-deep mb-2">Knowledge Partners</h3>
              <IconBullet noDivider className="!py-3" title="Dhwani Foundation" />
              <IconBullet noDivider className="!py-3" title="The Association of People with Disability (since 1959)" />
              <IconBullet noDivider className="!py-3" title="Mobility India — Respecting people's abilities" />
              <IconBullet noDivider className="!py-3" title="TATA Engage" />
              <IconBullet noDivider className="!py-3" title="Motivation — Freedom Through Mobility" />
            </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
            <div>
              <h3 className="text-[17px] text-teal-deep mb-2">NGOs</h3>
              <IconBullet noDivider className="!py-3" title="Rotary Club Visakhapatnam" />
              <IconBullet noDivider className="!py-3" title="Regional disability-sector NGO network" />
            </div>
            </RevealOnScroll>
          </div>
        )}

        {tab === "memberships" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-10">
            <RevealOnScroll delay={0.15}>
            <div>
              <h3 className="text-[17px] text-teal-deep mb-2">State & district committees</h3>
              <IconBullet title="State disability advisory committee">Dilip Patro serves as a nominated member.</IconBullet>
              <IconBullet title="District rehabilitation committee">Ongoing advisory role, Visakhapatnam district.</IconBullet>
            </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
            <div>
              <h3 className="text-[17px] text-teal-deep mb-2">Advisory boards & nominations</h3>
              <IconBullet title="Advisory board — regional assistive technology programme">Provides clinical and community-access guidance.</IconBullet>
              <IconBullet title="Government nomination — welfare scheme review panel">Reviews scheme design and implementation.</IconBullet>
            </div>
            </RevealOnScroll>
          </div>
        )}
      </Section>

      <CTABand title="Interested in partnering with TAP?" desc="We welcome collaboration from government bodies, hospitals and NGOs working in disability inclusion.">
        <Button to="/contact" variant="primary">Get in touch</Button>
      </CTABand>
    </div>
  );
}
