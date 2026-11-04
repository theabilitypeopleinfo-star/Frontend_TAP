import React from "react";
import { PageHero, Section, Photo, IconBullet, CTABand, Button, Pill, RevealOnScroll } from "../components/ui";
import nationalTrustImg from "../assets/6298815109094116467.jpg";

export default function SocialSecuritySchemes() {
  return (
    <div>
      <PageHero
        trail={[{ label: "Our work", to: "/our-work" }, { label: "Social Security Schemes" }]}
        eyebrow="Government empanelment"
        title="Social Security Schemes"
        desc="TAP is empanelled to deliver assistive device and welfare schemes under the National Trust for the Welfare of Persons with Autism, Cerebral Palsy, Mental Retardation and Multiple Disabilities."
      />
      <Section tight revealChildren>
        <RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
          <Photo src={nationalTrustImg} tall label="Wheelchair and assistive device distribution event under a government scheme" />
          <div>
            <Pill>Empanelled since 2021</Pill>
            <h2 className="text-[24px] text-teal-deep mt-4 mb-3">Social Security Programs</h2>
            <p className="text-stone">
              Through this empanelment, TAP facilitates access to assistive devices, disability certification support,
              and welfare scheme registration for eligible beneficiaries across Andhra Pradesh.
            </p>
          </div>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
        <h3 className="text-[20px] text-teal-deep mb-4">Services offered</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <RevealOnScroll delay={0.3}>
          <div className="bg-white p-5 rounded-xl border border-line hover:border-teal-light transition-colors h-full">
            <h4 className="text-[15px] font-bold text-teal-deep mb-1.5 flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
              Niramaya Health Insurance
            </h4>
            <p className="text-[13.5px] text-stone leading-relaxed pl-4">Enrolment and renewal support for Niramaya Health Insurance coverage for persons with disabilities.</p>
          </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.45}>
          <div className="bg-white p-5 rounded-xl border border-line hover:border-teal-light transition-colors h-full">
            <h4 className="text-[15px] font-bold text-teal-deep mb-1.5 flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
              Legal Guardianship
            </h4>
            <p className="text-[13.5px] text-stone leading-relaxed pl-4">Assistance with legal guardianship applications and documentation under the National Trust Act.</p>
          </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.6}>
          <div className="bg-white p-5 rounded-xl border border-line hover:border-teal-light transition-colors h-full">
            <h4 className="text-[15px] font-bold text-teal-deep mb-1.5 flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
              National Trust (NT) Schemes
            </h4>
            <p className="text-[13.5px] text-stone leading-relaxed pl-4">Facilitation of access to specialised welfare schemes administered under the National Trust.</p>
          </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.75}>
          <div className="bg-white p-5 rounded-xl border border-line hover:border-teal-light transition-colors h-full">
            <h4 className="text-[15px] font-bold text-teal-deep mb-1.5 flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
              Unique Disability ID (UDID) Card
            </h4>
            <p className="text-[13.5px] text-stone leading-relaxed pl-4">Support with UDID card application, documentation, and issuance for eligible beneficiaries.</p>
          </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.9}>
          <div className="bg-white p-5 rounded-xl border border-line hover:border-teal-light transition-colors h-full">
            <h4 className="text-[15px] font-bold text-teal-deep mb-1.5 flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
              NTR Bharosa Pension Scheme
            </h4>
            <p className="text-[13.5px] text-stone leading-relaxed pl-4">Guidance and assistance with enrolment into the NTR Bharosa Pension Scheme for persons with disabilities.</p>
          </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.9}>
          <div className="bg-white p-5 rounded-xl border border-line hover:border-teal-light transition-colors h-full">
            <h4 className="text-[15px] font-bold text-teal-deep mb-1.5 flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
              Divyangjan Railway Identity Card
            </h4>
            <p className="text-[13.5px] text-stone leading-relaxed pl-4">Support in applying for the Divyangjan Railway ID Card, enabling travel concessions.</p>
          </div>
          </RevealOnScroll>

        </div>
        </RevealOnScroll>
      </Section>

      <CTABand title="Enquire about eligibility" desc="Our team can help determine which Social Security schemes apply to you or a family member.">
        <Button to="/contact" variant="primary">Check eligibility</Button>
      </CTABand>
    </div>
  );
}
