import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { PageHero, Section, CTABand, Button, Photo, RevealOnScroll } from "../components/ui";
import SEO from "../components/SEO";

import meeraImg from "../assets/IMG_20250822_114337 (1).jpg";
import tailoringImg from "../assets/IMG_7746.JPG";
import homeCareImg from "../assets/IMG_20260105_182908.jpg";



const STORIES_DATA = {
  "story-4": {
    title: "Back on Her Feet, Back in the Field",
    type: "Prosthetic Support",
    desc: "After an accident cost her her right leg below the knee, a below-knee prosthesis with a Jaipur foot helped Varalakshmi walk, work, and farm again.",
    label: "Placeholder image",
    src: meeraImg,
    name: "Varalakshmi",
    background: "Varalakshmi, 38, from Makaverapalem, Visakhapatnam, worked as a daily wage agricultural laborer. A falling tree branch injured her leg; delayed treatment led to a septic infection and loss of the limb below the right knee.",
    intervention: "Assessed at a TAP camp sponsored by Concentrix; fitted with a right below-knee prosthesis with a Jaipur foot by TAP's clinical team.",
    outcome: "She regained mobility — walking, running, and returning to agricultural work, for which the Jaipur foot is especially suited."
  },
  "story-5": {
    title: "Nishanth's Steady Progress",
    type: "Paediatric Rehab",
    desc: "An ongoing physiotherapy plan is helping 11-year-old Nishanth manage Duchenne muscular dystrophy and preserve his mobility.",
    label: "Placeholder image",
    src: tailoringImg,
    name: "Nishanth",
    background: "Nishanth, 11, diagnosed with Duchenne muscular dystrophy (initial assessment April 2025), presenting with difficulty sitting and standing, delayed motor milestones, and lower-limb muscle tightness.",
    intervention: "A structured physiotherapy plan — daily stretching and ROM exercises, non-resistive strengthening, tilting-table standing support, night splints, and an ankle-foot orthosis (AFO) — plus family training in home-based exercises and monthly progress reviews.",
    outcome: "Short-term focus on maintaining joint range of motion and posture; long-term focus on delaying muscle weakness progression and supporting independence in daily activities."
  },
  "story-6": {
    title: "Back to School, Standing Tall",
    type: "Paediatric Rehab",
    desc: "TB arthritis left 13-year-old Shanmukh Priya with scoliosis and a shortened leg — a custom brace and orthosis got her walking without pain again.",
    label: "Placeholder image",
    src: homeCareImg,
    name: "Shanmukh Priya",
    background: "J Shanmukh Priya, 13, from Madhava Dhara, Visakhapatnam. TB arthritis progressed rapidly into scoliosis, causing both feet to turn to a valgus position and one leg to shorten.",
    intervention: "TAP's clinical team fitted her with a Boston brace, a right anterior-guided AFO, and a left supra-malleolar orthosis, with support from Concentrix.",
    outcome: "Significant pain reduction and postural correction; she now attends school regularly, with continued correction expected over time."
  },
  "story-7": {
    title: "Two Legs, One Dream",
    type: "Prosthetic Support",
    desc: "Born without her right leg, Saba became one of the first in India fitted with a hip disarticulation prosthesis — designed and fitted with remote clinical guidance during the pandemic.",
    label: "Placeholder image",
    src: meeraImg,
    name: "Saba",
    background: "Saba, from Visakhapatnam, was born with a congenital right hip disarticulation (no right leg from the hip). Her father, a tailor, is the family's sole earner.",
    intervention: "During COVID-19 lockdown, TAP partnered with Mobility India for a fully remote-guided fitting process — components couriered to TAP, with the prosthetist directing fabrication over video call. As Saba grew, TAP later upgraded her to a modular hip disarticulation prosthesis (with support from the Jivdaya Foundation) that adjusts to her growth, followed by gait retraining.",
    outcome: "Saba now walks independently and attends school, with a prosthesis designed to grow with her."
  },
  "story-8": {
    title: "From Bed to Mobility",
    type: "Community-Based Rehab",
    desc: "After a road accident took his father's life and left 5-year-old Sana with a spinal cord injury, a custom walker helped him stand, walk, and return to school.",
    label: "Placeholder image",
    src: tailoringImg,
    name: "Sana",
    background: "Shaik Dariya Sanavullo (\"Sana\"), from Prakasham, Andhra Pradesh, was 5 when a road accident killed his father and left him with a spinal cord injury and loss of mobility. His mother, Reshma Begum, became his sole caregiver and searched for treatment options.",
    intervention: "TAP's clinical team found hip joint rotation, a shortened right leg, and hip weakness, and fitted him with a bilateral HKAFO with walker — a complex fabrication given the hip misalignment — sponsored by Concentrix.",
    outcome: "Sana is now able to stand and walk with the support device and has rejoined school."
  },
  "story-9": {
    title: "A New Hope to Stand",
    type: "Paediatric Rehab",
    desc: "Cerebral palsy left 6-year-old Chaitanya unable to stand — a customized orthosis and gait training changed that.",
    label: "Placeholder image",
    src: homeCareImg,
    name: "Chaitanya",
    background: "L Chaitanya, 6, from a low-income family, has cerebral palsy and was unable to stand or walk at all; without early treatment, that risked becoming permanent.",
    intervention: "TAP fitted her with a bilateral customized KAFO with knee drop lock, supported by Concentrix, alongside therapy and gait training.",
    outcome: "She is now able to stand, with steady improvement and an ongoing care relationship with TAP's team."
  },
  "story-10": {
    title: "Back on Her Feet, Back to Work",
    type: "Livelihood Support",
    desc: "Decades after childhood polio, worsening knee and leg pain nearly stopped Chandramani from working — a custom orthosis got her walking again.",
    label: "Placeholder image",
    src: meeraImg,
    name: "Chandramani",
    background: "K Chandramani, 49, works at a special-needs school and has lived with residual paralysis from childhood polio. In later years, severe knee and leg pain left her unable to stand.",
    intervention: "TAP's clinical team fitted her with a bilateral KAFO with knee drop lock, custom-modified to her body and deformity, with gait training.",
    outcome: "Reduced pain, corrected gait, and restored ability to stand and walk — she now commutes to work independently using a tricycle scooter."
  },
  "story-11": {
    title: "From Shadow to Hope of Light",
    type: "Community-Based Rehab",
    desc: "An untreated clubfoot condition kept Sakir Ali out of school until age 8 — a custom orthosis, found through a remote tribal outreach camp, gave him his first steps.",
    label: "Placeholder image",
    src: tailoringImg,
    name: "Sakir Ali",
    background: "Master Sakir Ali has bilateral congenital CTEV (clubfoot), which went untreated in early childhood due to lack of awareness and access. By age 8, he had never attended school and walked only with support from both hands.",
    intervention: "TAP's team encountered him during a medical outreach camp in Paderu, a remote tribal area 150km from Visakhapatnam, and fitted him with a custom-modified KAFO after casting and measurement.",
    outcome: "He can now stand on his own feet and attends a nearby government school, with the device also improving outcomes for any future corrective surgery."
  },
  "story-12": {
    title: "The Struggle for Life",
    type: "Community-Based Rehab",
    desc: "While undergoing treatment for spinal cancer, 4-year-old Yamini was fitted with a hospital-bedside orthosis to help speed her recovery.",
    label: "Placeholder image",
    src: homeCareImg,
    name: "Yamini",
    background: "N Yamini Jyotshna, 4, was undergoing treatment for cancer of the spine at Homi Bhabha Cancer Hospital, Vizag.",
    intervention: "TAP's clinical team took measurements and fitted a KAFO with knee drop lock at her hospital bedside, and trained hospital staff on its use, with support from Concentrix.",
    outcome: "She is now able to stand, with her recovery improving gradually."
  },
  "story-13": {
    title: "Standing Strong After Loss",
    type: "Prosthetic Support",
    desc: "A bone tumour led to a hip disarticulation amputation for 16-year-old Yohanu — a custom prosthesis and gait training got him walking independently again.",
    label: "Placeholder image",
    src: meeraImg,
    name: "Yohanu",
    background: "Yohanu, 16, developed a bone tumor in his right lower limb extending to the hip joint, requiring amputation at the hip.",
    intervention: "TAP fitted him with a right hip disarticulation prosthesis, followed by gait training.",
    outcome: "He can now walk with the prosthesis (with some difficulty using a walker for support) and go outside independently."
  },
  "story-14": {
    title: "Steady Steps Forward",
    type: "Orthotic Support",
    desc: "Childhood polio left Amala's left leg weak — physiotherapy and a custom orthosis gave her a steadier, more independent walk.",
    label: "Placeholder image",
    src: tailoringImg,
    name: "Amala",
    background: "Amala, 23, contracted polio at age 5, which weakened her left leg and led to a limb length discrepancy. She was walking only with bilateral axillary crutches and struggled on uneven surfaces.",
    intervention: "A combined program of physiotherapy (stretching, strengthening, balance and coordination) with a custom left KAFO and gait training.",
    outcome: "She is now able to walk using the left KAFO."
  },
  "story-15": {
    title: "Wheels and Will",
    type: "Paediatric Rehab",
    desc: "Born with spina bifida, 9-year-old Naga Dilip — a state-level singer — regained mobility through a combination of orthoses and wheelchair training.",
    label: "Placeholder image",
    src: homeCareImg,
    name: "Naga Dilip",
    background: "S. Naga Dilip, 9, was born with spina bifida and underwent spinal surgery, leaving him unable to stand or sit independently, with reduced sensation in both legs and bowel/bladder control difficulties. He is cared for primarily by his grandfather and is a state-level shloka and classical singing performer.",
    intervention: "Physiotherapy, a properly fitted wheelchair with mobility and transfer-technique training, gait training with bilateral HKAFOs, and bilateral AFOs to correct foot deformities.",
    outcome: "He can now walk with bilateral HKAFOs and move independently outdoors using his wheelchair."
  },
  "story-16": {
    title: "Lighter Steps, New Freedom",
    type: "Prosthetic Support",
    desc: "A train accident cost Neelaveni both legs above the knee — a lightweight prosthesis with an automatic locking knee ended years of pain from her old, heavy limbs.",
    label: "Placeholder image",
    src: meeraImg,
    name: "Neelaveni",
    background: "Neelaveni, 26, lost both legs above the knee in a train accident. Her existing prostheses were heavy, uncomfortable, and caused pain in both thighs while walking.",
    intervention: "TAP fitted her with lightweight transfemoral prostheses featuring an automatic locking knee joint, along with gait training.",
    outcome: "She now walks properly without any support."
  },
  "story-17": {
    title: "Sitting Tall, Moving Forward",
    type: "Paediatric Rehab",
    desc: "Congenital leg weakness and scoliosis kept 11-year-old Rajasekhar from standing — a supportive wheelchair and orthoses gave him comfort and independence.",
    label: "Placeholder image",
    src: tailoringImg,
    name: "Rajasekhar",
    background: "Pidintla Rajasekhar Reddy, 11, has had weakness in both legs since birth, along with knee flexor contractures and scoliosis, leaving him unable to stand or walk independently.",
    intervention: "Physiotherapy, a properly fitted wheelchair with postural support and mobility training, and bilateral AFOs to correct foot deformities.",
    outcome: "He now sits with proper postural support on his wheelchair and can go outside independently using it."
  },
  "story-18": {
    title: "Hands to Work Again",
    type: "Prosthetic Support",
    desc: "An electrical accident cost Jagan Mohan both hands below the elbow — a bilateral prosthesis gave him back his independence and his livelihood.",
    label: "Placeholder image",
    src: homeCareImg,
    name: "Jagan Mohan",
    background: "Konthala Jagan Mohan, 32, lost both hands in a bilateral below-elbow amputation following an electric shock accident in 2020. He is the family's sole prospective earner, with his father currently the only income source, and was fully dependent for daily activities.",
    intervention: "TAP fitted him with bilateral trans-radial prostheses, with Jagan Mohan's stated goal of eventually using myoelectric hands for finer control.",
    outcome: "He can now carry out daily activities independently, go to work, ride a bicycle, and earn an income for his family."
  }
};

export default function CaseStudyDetail() {
  const { id } = useParams();
  const story = STORIES_DATA[id];

  if (!story) {
    return <Navigate to="/impact" replace />;
  }

  return (
    <div>
      <SEO 
        title={story.title}
        description={story.desc}
        image={story.src}
        url={`/impact/${id}`}
      />
      <PageHero
        trail={[
          { label: "Our Impact", to: "/impact?tab=stories" },
          { label: story.name }
        ]}
        eyebrow={story.type}
        title={story.title}
        desc={story.desc}
      />

      <Section tight revealChildren className="pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Narrative Content */}
          <div className="space-y-10 text-stone text-[16px] leading-relaxed">
            
            <RevealOnScroll>
            <section>
              <h2 className="text-[24px] text-teal-deep font-bold font-display mb-4">Background & Challenge</h2>
              <p>
                {story.background || story.desc}
              </p>
              
              {!story.background && (
                <div className="mt-6 p-4 bg-cream border border-gold-dark/30 rounded-lg">
                  <p className="text-[14.5px] text-teal-deep font-bold mb-2">
                    <span className="text-gold mr-2">✏️</span> 
                    Needs More Details:
                  </p>
                  <p className="text-[14px]">
                    Please fill in the full story details here. Include the initial situation, specific challenges faced by {story.name}, and the timeline of events leading up to TAP's intervention.
                  </p>
                </div>
              )}
            </section>
            </RevealOnScroll>

            <RevealOnScroll>
            <section>
              <h2 className="text-[24px] text-teal-deep font-bold font-display mb-4">Intervention & Support Provided</h2>
              
              {story.intervention ? (
                <p>{story.intervention}</p>
              ) : (
                <div className="p-4 bg-cream border border-gold-dark/30 rounded-lg">
                  <p className="text-[14.5px] text-teal-deep font-bold mb-2">
                    <span className="text-gold mr-2">✏️</span> 
                    Needs More Details:
                  </p>
                  <p className="text-[14px]">
                    Describe the specific therapies, devices, or support TAP provided. What was the treatment plan? Who was involved from the clinical/support team?
                  </p>
                </div>
              )}
            </section>
            </RevealOnScroll>

            <RevealOnScroll>
            <section>
              <h2 className="text-[24px] text-teal-deep font-bold font-display mb-4">Outcome & Where They Are Now</h2>
              
              {story.outcome ? (
                <p>{story.outcome}</p>
              ) : (
                <div className="p-4 bg-cream border border-gold-dark/30 rounded-lg">
                  <p className="text-[14.5px] text-teal-deep font-bold mb-2">
                    <span className="text-gold mr-2">✏️</span> 
                    Needs More Details:
                  </p>
                  <p className="text-[14px]">
                    Explain the current situation. How has {story.name}'s life changed? Include any metrics of success, increased independence, or long-term prognosis.
                  </p>
                </div>
              )}
            </section>
            </RevealOnScroll>
            
          </div>
        </div>
      </Section>

      <CTABand
        title="Interested in patient stories?"
        desc="Learn more about our impact or get in touch with our team for more detailed case studies."
      >
        <Button to="/contact" variant="primary">Enquire about patient stories</Button>
      </CTABand>
    </div>
  );
}
