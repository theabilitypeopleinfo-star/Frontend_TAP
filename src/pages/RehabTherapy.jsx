import React from "react";
import { PageHero, Section, Photo, IconBullet, CTABand, Button, RevealOnScroll } from "../components/ui";
import rehabTherapyImg from "../assets/IMG_7755.JPG";

const LEFT_SERVICES = [
  { title: "Spinal cord injury rehabilitation", desc: "Active rehab-focused therapy for SCI survivors, in-patient and out-patient." },
  { title: "Amputee rehabilitation", desc: "Post-amputation therapy and mobility retraining." },
  { title: "Paediatric rehabilitation", desc: "Early intervention and early education for children with developmental needs." },
  { title: "Online consultation", desc: "Remote therapist consultations for follow-up and rural access." },
  { title: "Daily living assistance for elderly", desc: "Rehabilitation for mobility issues in elderly individuals to improve daily living." },
];

const RIGHT_SERVICES = [
  { title: "Neuro rehabilitation", desc: "Stroke and brain injury recovery programmes." },
  { title: "Orthopaedic rehabilitation", desc: "Recovery support for fractures, joint replacement and related conditions." },
  { title: "Speech & language therapy", desc: "Assessment and therapy for communication and swallowing difficulties." },
  { title: "Rehab on Wheels", desc: "Mobile therapy units bringing rehabilitation services directly to remote and underserved communities." },
];

export default function RehabTherapy() {
  return (
    <div>
      <PageHero
        trail={[{ label: "Our work", to: "/our-work" }, { label: "Rehab Therapy Services" }]}
        eyebrow="Physical Medicine and Rehabilitation (PMR) Services"
        title="Rehab Therapy Services"
        desc="Clinical, therapist-led rehabilitation for spinal cord injury, neurological conditions, amputation and orthopaedic recovery."
      />
      <Section tight revealChildren>
        <RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-12 mb-10 items-center">
          <Photo src={rehabTherapyImg} tall label="Patient undergoing active rehabilitation with parallel bars" />
          <div>
            <h2 className="text-[24px] text-teal-deep mb-3">A structured path to physical independence</h2>
            <p className="text-stone mb-5">
              Physical Medicine and Rehabilitation (PMR) Services brings together physiotherapists, occupational therapists and rehabilitation
              physicians to design individual care plans — moving each person from acute care toward the fullest
              possible independence.
            </p>
            <Button to="/contact" variant="outline" size="sm">Request a referral</Button>
          </div>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
        <h3 className="text-[20px] text-teal-deep mb-2">Therapy areas</h3>
        <div className="grid md:grid-cols-2 gap-x-10 mt-2">
          <div>
            {LEFT_SERVICES.map((s, index) => (
              <RevealOnScroll key={s.title} delay={Math.min(index * 0.1, 0.6)}>
                <IconBullet title={s.title} noDivider className="!py-0 mb-6">{s.desc}</IconBullet>
              </RevealOnScroll>
            ))}
          </div>
          <div>
            {RIGHT_SERVICES.map((s, index) => (
              <RevealOnScroll key={s.title} delay={Math.min(index * 0.1, 0.6)}>
                <IconBullet title={s.title} noDivider className="!py-0 mb-6">{s.desc}</IconBullet>
              </RevealOnScroll>
            ))}
          </div>
        </div>
        </RevealOnScroll>
      </Section>

      <CTABand title="Ready to begin a rehabilitation journey?" desc="Our clinical team can assess suitability and design a care plan tailored to the individual.">
        <Button to="/contact" variant="primary">Talk to our clinical team</Button>
        <Button to="/rehab-aids" variant="outlineLight">See rehab aids & appliances</Button>
      </CTABand>
    </div>
  );
}
