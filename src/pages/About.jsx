import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageHero, Section, Tabs, Photo, StatCard, Card, IconBullet, Pill, Button, RevealOnScroll } from "../components/ui";
import { ChevronDown, ChevronUp, Building2, Activity, Truck, Award, MapPin, Users, Globe, PlusCircle, Stethoscope, Briefcase, Heart, Shield, Target, Accessibility } from "lucide-react";
import founderImg from "../assets/WhatsApp Image 2026-07-10 at 6.45.26 PM.jpeg";
import groupImg from "../assets/group photo.jpg";
import orgImg from "../assets/org image.jpg";

// Import governing board photos
import board1Img from "../assets/padala vijaya shankar.jpg";
import board2Img from "../assets/kavya poornima balajei.jpg";
import board3Img from "../assets/IMG-20260710-WA0010.jpg.jpeg";
import board4Img from "../assets/diwakar k vadapelli.jpg";
import board5Img from "../assets/perla bhuloka rao.jpg";
import board6Img from "../assets/karntakapu satheesh.jpg";
import board7Img from "../assets/subhadra anupindi.jpg";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "founder", label: "Founder's story" },
  { id: "vmv", label: "Vision, mission & values" },
  { id: "history", label: "Our journey" },
  { id: "team", label: "Team & board" },
];

const TIMELINE = [
  { year: "1997", title: "The turning point", desc: "Founder Dilip Patro sustained a cervical spinal cord injury in a road traffic accident, becoming a quadriplegic. This experience later inspired the establishment of TAP.", icon: Accessibility },
  { year: "2007", title: "TAP founded", desc: "The Ability People (TAP) was founded in Visakhapatnam as a Disabled People's Organisation (DPO) by persons with disabilities for persons with disabilities. The organisation began focusing on rehabilitation, inclusion, peer support, and empowerment.", icon: Building2 },
  { year: "2008", title: "CBR activities expanded", desc: "Community-based rehabilitation (CBR) activities expanded, focusing on identifying persons with disabilities and providing basic rehabilitation support.", icon: Users },
  { year: "2009", title: "Networking strengthened", desc: "Strengthened networking with government departments and local stakeholders to improve access to disability welfare schemes.", icon: Globe },
  { year: "2010", title: "Structured programmes initiated", desc: "Initiated structured rehabilitation programmes for persons with spinal cord injury and locomotor disabilities through community outreach.", icon: Activity },
  { year: "2011", title: "Assistive device support", desc: "Expanded assistive device support and referral services for rehabilitation, education, and livelihood.", icon: PlusCircle },
  { year: "2012", title: "Rural and tribal outreach", desc: "Increased outreach into rural and tribal communities through rehabilitation camps and awareness programmes.", icon: MapPin },
  { year: "2013", title: "Hospital partnerships", desc: "Strengthened partnerships with hospitals and rehabilitation professionals for multidisciplinary rehabilitation services.", icon: Stethoscope },
  { year: "2014", title: "Advocacy and awareness", desc: "Expanded disability awareness, advocacy, accessibility promotion, and community participation initiatives.", icon: Users },
  { year: "2015", title: "Collaborations developed", desc: "Developed stronger collaborations with government departments, CSR partners, and voluntary organisations.", icon: Briefcase },
  { year: "2016", title: "Enhanced services", desc: "Enhanced rehabilitation services and increased focus on customised assistive technology and mobility solutions.", icon: Activity },
  { year: "2017", title: "SCI programmes strengthened", desc: "Strengthened programmes for persons with spinal cord injury, promoting active rehabilitation and independent living.", icon: Heart },
  { year: "2018", title: "Community outreach expanded", desc: "Expanded community outreach and rehabilitation services to underserved rural populations.", icon: MapPin },
  { year: "2019", title: "CSR engagement", desc: "Increased engagement with CSR partners and strengthened institutional systems for programme implementation and monitoring.", icon: Award },
  { year: "2020", title: "COVID-19 response", desc: "Despite the COVID-19 pandemic, continued rehabilitation support through home visits, tele-support where feasible, assistive devices, and emergency assistance to persons with disabilities.", icon: Shield },
  { year: "2021", title: "Partnerships expanded", desc: "Expanded rehabilitation programmes and strengthened partnerships with healthcare institutions and government agencies.", icon: Stethoscope },
  { year: "2022", title: "Therapy services strengthened", desc: "Further strengthened community-based rehabilitation, multidisciplinary therapy services, and customised assistive technology interventions.", icon: Users },
  { year: "2023", title: "Ability Rehabilitation Centre (ARC)", desc: "Established and strengthened the Ability Rehabilitation Centre (ARC) in Dabagardens, Visakhapatnam, providing integrated physiotherapy, occupational therapy, prosthetics & orthotics, active rehabilitation, peer counselling, and assistive technology services.", icon: Building2 },
  { year: "2024", title: "Rehab on Wheels expanded", desc: "Expanded Rehab on Wheels and outreach services across coastal Andhra Pradesh and tribal regions. Strengthened partnerships with government hospitals and CSR organisations.", icon: Truck },
  { year: "2025", title: "FCRA renewal", desc: "Achieved FCRA renewal (valid from 29 June 2025 for five years). Expanded multidisciplinary rehabilitation services, outreach programmes, and collaborations with government departments.", icon: Award },
  { year: "2026", title: "Major expansion year", desc: (
    <ul className="list-disc pl-4 space-y-1.5">
      <li>APF-supported Early Intervention Programme approved (₹98.5 lakh over three years)</li>
      <li>Strengthened Early Intervention services for children with developmental delays</li>
      <li>Expanded rehabilitation services in Alluri Sitharama Raju District through GGH Paderu and PHCs</li>
      <li>Implemented structured hospital- and community-based assessment models</li>
      <li>Strengthened Goonjan MIS for monitoring and evaluation</li>
      <li>Continued CSR collaborations (BDL, Concentrix, IMEG, etc.)</li>
      <li>Expanded SCI, paediatric rehabilitation, assistive technology, and community-based rehabilitation programmes</li>
      <li>Developed the "Cot-to-Community" rehabilitation model and strengthened convergence with Health, ICDS, Education, and Tribal Welfare departments</li>
    </ul>
  ), icon: Target },
];

const ADMIN_TEAM = [
  { name: "U Sravani", role: "Executive, HRD & Finance" },
  { name: "C Vimala", role: "Admin and supervising (overall Centre management and follow up)" },
  { name: "K. Alrick", role: "Outreach and admin assistant" },
  { name: "P. Saikiran", role: "Office, Therapy and workshop Assistant" }
];

const CLINICAL_TEAM = [
  { name: "Mr. Subhranshu Misra", role: "Sr. Clinical Prosthetist & Orthotist, Head/In-charge, Adaptive & Assistive Technology Specialist" },
  { name: "Mrs. Rukmini Sindhura Pulathota", role: "Sr. Clinical Physiotherapist (Ortho, Neuro & Paediatric), Lead Rehab Services, Head/In-charge, SCI & Early Intervention Centre" },
  { name: "Ms. G. Anusha", role: "Clinical Physiotherapist, Rehab Services" },
  { name: "Mrs. Ch Sai Manju", role: "Clinical Physiotherapist, Rehab Services" },
  { name: "Mrs. G. Rupa Vennela Reddy", role: "Speech Therapist" }
];

const SUPPORT_TEAM = [
  { name: "Krishna Vishnubotla", role: "Office Assistant" },
  { name: "Durgabai Deshmukh", role: "Maintenance, Technician & Driver" },
  { name: "Mukkala Nagaratnam", role: "House Keeping" },
  { name: "Borra Easudu", role: "Watchman" }
];

const BOARD_MEMBERS = [
  { name: "Padala Vijay Shankar", role: "President", img: board1Img, bio: "A seasoned entrepreneur with over two decades of experience in the electronics and mobile industry, Mr. Vijay Shankar brings strong business acumen and leadership to TAP. As President, he provides strategic direction, strengthens governance practices, and supports institutional growth, sustainability, and long-term partnerships." },
  { name: "Kavya Poornima Balajepalli", role: "Vice President", img: board2Img, bio: "An architect, disability inclusion advocate, and Javed Abidi Fellow on Disability, Ms. Kavya combines professional expertise with lived experience of visual impairment. She is passionate about universal accessibility, inclusive design, disability rights, and evidence-based policy advocacy, helping shape TAP's vision of an inclusive society." },
  { name: "U. Dilip Kumar Patro", role: "Founder Secretary & CEO", img: board3Img, bio: "A software professional turned social entrepreneur, Mr. Dilip Kumar Patro founded TAP in 2007 following his own spinal cord injury. His lived experience drives his unwavering commitment to transforming rehabilitation services in India. He leads the organisation's strategic vision, pioneering innovative models such as 'Cot-to-Community' rehabilitation, assistive technology solutions, community-based rehabilitation, and inclusive livelihood initiatives for persons with disabilities." },
  { name: "Diwakar K. Vadapalli", role: "Joint Secretary", img: board4Img, bio: "A technology professional, entrepreneur, and governance expert with international exposure, Mr. Diwakar contributes strategic insights in organisational development, innovation, public policy, and institutional strengthening. His expertise supports TAP in building sustainable systems and expanding its social impact." },
  { name: "Perla Bhuloka Rao", role: "Treasurer", img: board5Img, style: { objectPosition: "center top" }, bio: "A legal professional, social worker, and disability rights advocate, Mr. Bhuloka Rao brings extensive experience in community service and consumer protection. As Treasurer, he ensures sound financial governance, transparency, accountability, and regulatory compliance while supporting the organisation's mission-driven growth." },
  { name: "Karnatakapu Satheesh", role: "Executive Member", img: board6Img, bio: "An experienced professional with a strong commitment to social development, Mr. Satheesh actively contributes to organisational governance, community engagement, and strategic planning. His practical approach and dedication help strengthen TAP's programmes and institutional effectiveness." },
  { name: "Subhadra Anupindi", role: "Executive Member", hideAvatar: true, bio: "A respected educationist and community leader with a postgraduate background in science, Mrs. Subhadra brings valuable perspectives to TAP's governance. She actively supports inclusive rehabilitation initiatives, community outreach, and organisational development, reinforcing the organisation's commitment to dignity, equality, and empowerment for persons with disabilities." },
];

const MEDICAL_ADVISORY = [
  { name: "Dr. S. Suryaprakash Rao", role: "Honorary Chairman, Medical Panel Board Advisor; HOD & Associate Prof. (GVP Medical College), Retd. Govt. ENT Hospital, KGH (ENT & SCI Specialist)" },
  { name: "Dr. Kolli Vijay Krishna", role: "Honorary Consultant, Physical & Rehabilitation Medicine, Douglas Bader Rehabilitation Centre, Queen Mary's Hospital, Roehampton, London" },
  { name: "Dr. V. Atchuta Ramaiah", role: "Honorary Consultant, Orthopaedic Surgeon, Deputy CEO & Director, Rural Health Services, Gayatri Medical College" }
];

const MENTOR_SUPPORT = [
  { name: "Arunava Mukpodhyay" }
];

const ADVISORY_PATRONS = [
  { name: "Dr. S. Vijaya Kumar", role: "Honorary Patron; Chairman, Vijay Nirman Company Pvt. Ltd., Visakhapatnam" },
  { name: "Col. Sarvjit Singh (Retd.)", role: "Honorary Vice Chairman" }
];

const ADVISORY_BOARD = [
  { name: "B. Kiran", role: "Founder Chairman, Sahaayata" },
  { name: "Dr. Komal Kamra", role: "Associate Professor of Zoology (Retd.) & Head, Microbiology Research Laboratory, SGTB Khalsa College, University of Delhi; Secretary & Founder Member, The Spinal Foundation" },
  { name: "Jyothirmayi Mukthineni", role: "Mental Space Psychologist, NLP Master Practitioner, Counselor & Life Coach" },
  { name: "Venkat Giridhar Reddy Potamsetti", role: "Clinical Specialist in Neurological & Vestibular Rehabilitation Physiotherapy, St John's & St Elizabeth's Hospital, UK" },
  { name: "Dr. Usha Devi", role: "Secretary, Sreya Foundation, Visakhapatnam" },
  { name: "Ms. Prerna Arora Singh", role: "CEO & Managing Trustee, People's Trust, Jaipur; Road Safety Consultant, Community Participatory Road Safety Program (World Bank)" },
  { name: "Dillip Kumar Panda", role: "President, SAFE, Bhubaneswar" },
  { name: "Mr. Harpreet Singh", role: "National Awardee; Founder President, NGO Avoid Accident; Secretary, International Road Victims' Partnership; Founder, Post Crash Care Foundation; WHO Legal Development Program Member" },
  { name: "Reuban Daniel", role: "Lead, OAS Rehab and Training Programs, PACT INDIA" },
  { name: "Dheerendra Samineni", role: "Road Safety Trainer & Auditor, Lead, Safe Drive India" },
  { name: "Dr. Rajmohan Panda", role: "Additional Professor, MD, MPH, Public Health Foundation of India (PHFI), Delhi" },
  { name: "Rajasekhar Majji", role: "CEO & Director; serial entrepreneur, angel investor, mentor to startups" }
];



function BoardMemberCard({ m }) {
  return (
    <div className="flex flex-col gap-4 p-5 border border-line rounded-xl2 bg-white h-full hover:border-teal-light transition-all duration-300">
      <div className="flex items-center gap-4">
        {m.img ? (
          <img
            src={m.img}
            alt={`Photo of ${m.name}`}
            className="w-16 h-16 rounded-full object-cover border border-line flex-shrink-0"
            style={m.style ? m.style : undefined}
          />
        ) : !m.hideAvatar ? (
          <div className="w-16 h-16 rounded-full bg-cream border border-line flex items-center justify-center text-teal-deep font-bold text-[16px] flex-shrink-0">
            {m.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
          </div>
        ) : null}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
          <h4 className="font-bold text-teal-deep text-[15.5px] font-display break-words leading-tight">{m.name}</h4>
          <p className="text-gold-dark font-bold text-[11.5px] uppercase tracking-wider">{m.role}</p>
        </div>
      </div>
      {m.bio && (
        <div className="text-stone text-[14.5px] leading-relaxed flex-grow">
          {m.bio}
        </div>
      )}
    </div>
  );
}

export default function About() {
  const location = useLocation();
  const [tab, setTab] = useState(location.state?.tab || "overview");
  
  useEffect(() => {
    console.log("Initial mount tab state:", tab, "Location state:", location.state);
    if (location.state?.tab) {
      setTab(location.state.tab);
    }
  }, [location.state]);

  return (
    <div>
      <PageHero
        trail={[{ label: "About us" }]}
        eyebrow="Who we are"
        title="About The Ability People"
        desc="Our story, our people, and the governance that keeps us accountable."
      />
      <Section tight revealChildren>
        <RevealOnScroll>
          <Tabs tabs={TABS} active={tab} onChange={setTab} />
        </RevealOnScroll>

        <div className="pb-12 md:pb-16">
          {tab === "overview" && (
            <div className="space-y-12">
              <RevealOnScroll>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-[26px] text-teal-deep mb-3.5">Organisation overview</h2>
                  <p className="text-stone mb-3.5">
                    The Ability People (TAP) is a Visakhapatnam-based NGO working across rehabilitation therapy,
                    assistive technology, and community-based care for persons with disabilities, spinal cord injuries,
                    and age-related mobility loss.
                  </p>
                  <p className="text-stone">
                    TAP is registered as a public charitable trust and holds 12A and 80G exemption status, along with
                    FCRA registration for international contributions.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 mt-6">
                    <StatCard value="2009" label="Founded" />
                    <StatCard value="80G / 12A" subtext="(Under Renewal)" label="Tax exemption" />
                    <StatCard value="FCRA" label="Registered" />
                  </div>
                </div>
                <Photo src={orgImg} tall label="The Ability People Organisation" caption="The Ability People Organisation" />
              </div>
              </RevealOnScroll>

              {/* SECTION 1: Our Philosophy — Technology and Disability */}
              <RevealOnScroll>
              <div className="border-t border-line/60 pt-12">
                <h2 className="text-[26px] text-teal-deep mb-6">Our Philosophy — Technology and Disability</h2>
                <div className="border-l-4 border-gold pl-5 italic text-[18px] text-teal-deep font-bold mb-6">
                  "For a person without a disability, technology makes a task easier. For a person with a disability, technology makes a task possible."
                </div>
                <p className="text-[15.5px] text-stone mb-8 leading-relaxed">
                  TAP believes assistive and adaptive technology must be integral to development and healthcare systems. Effective interventions require:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6">
                  <IconBullet noDivider title="Assessing need" />
                  <IconBullet noDivider title="Adequate funding" />
                  <IconBullet noDivider title="Reliable supply" />
                  <IconBullet noDivider title="User-centred services" />
                  <IconBullet noDivider title="Trained personnel" />
                  <IconBullet noDivider title="Strong multi-stakeholder partnerships" />
                </div>
              </div>
              </RevealOnScroll>

              {/* SECTION 2: Our Reach */}
              <RevealOnScroll>
              <div className="border-t border-line/60 pt-12">
                <h2 className="text-[26px] text-teal-deep mb-6">Our Reach</h2>
                <div className="flex flex-wrap gap-2.5 mb-8">
                  <Pill tone="peach">Visakhapatnam</Pill>
                  <Pill tone="peach">Srikakulam</Pill>
                  <Pill tone="peach">Parvatipuram Manyam</Pill>
                  <Pill tone="peach">Vizianagaram</Pill>
                  <Pill tone="peach">Anakapalli</Pill>
                  <Pill tone="peach">Alluri Sitharama Raju (ASR – 11 mandals)</Pill>
                </div>
                <div className="grid gap-y-2">
                  <IconBullet noDivider title="Active operational presence across the above districts" />
                  <IconBullet noDivider title="Services extended to remote tribal mandals and hard-to-reach rural areas" />
                  <IconBullet noDivider title="TAP has directly supported thousands of persons with disabilities, including road crash survivors, persons with spinal cord injuries, amputees, children with disabilities, and elderly persons" />
                  <IconBullet noDivider title="Strong linkages with government health systems, district administration, and grassroots organisations ensure last-mile outreach" />
                </div>
              </div>
              </RevealOnScroll>

              {/* SECTION 3: Our Key Service Offerings */}
              <RevealOnScroll>
              <div className="border-t border-line/60 pt-12">
                <h2 className="text-[26px] text-teal-deep mb-6">Our Key Service Offerings</h2>
                <div className="grid md:grid-cols-2 gap-y-2 gap-x-6">
                  <IconBullet noDivider title="Comprehensive rehabilitation services (physiotherapy, occupational therapy, functional rehabilitation) for persons with spinal cord injuries, children with special needs, persons with mobility disabilities, and elderly persons" />
                  <IconBullet noDivider title="Provision of assistive and adaptive devices, including wheelchairs and mobility aids" />
                  <IconBullet noDivider title="Early intervention and therapy for children with disabilities" />
                  <IconBullet noDivider title="Bedside rehabilitation for hospitalised patients" />
                  <IconBullet noDivider title="Caregiver training and capacity building" />
                  <IconBullet noDivider title="Community-based rehabilitation and follow-up services" />
                  <IconBullet noDivider title="Assistive device assessment, fitting, and post-distribution support" />
                </div>
              </div>
              </RevealOnScroll>
            </div>
          )}

          {tab === "founder" && (
            <div className="grid lg:grid-cols-[1fr_320px] gap-8 md:gap-12 items-start">
              <RevealOnScroll>
              <div className="space-y-6">
                <h2 className="text-[26px] text-teal-deep mb-2">Dilip Patro's Story</h2>
                <div className="border-l-4 border-gold pl-5 italic text-[16px] text-teal-deep font-bold">
                  "Ability is not the absence of a challenge — it is the presence of the right support."
                </div>
                <p className="text-stone leading-relaxed">
                  In 1997, a major road accident left Dilip Patro with a spinal cord injury, shifting his life's path in an instant. Navigating a world with limited clinical and infrastructural support for disabled individuals in India, he experienced firsthand the severe gaps in rehabilitation therapy, assistive devices, and social integration.
                </p>
                <p className="text-stone leading-relaxed">
                  Rather than accepting these barriers, Dilip committed his life to building a support ecosystem for others facing mobility challenges. In 2009, he established The Ability People (TAP) in Visakhapatnam to ensure that no one with a disability would have to navigate their recovery alone.
                </p>
                <p className="text-stone leading-relaxed">
                  Over the last two decades, Dilip's work has evolved from a single rehabilitation clinic to a multi-district outreach program that has supported 248 spinal cord injury survivors and reached 4,278 persons with locomotor disabilities across 33 mandals. As a member of the State Disability Advisory Committee, he continues to advocate for policy-level shifts to promote dignity, independence, and full participation for every ability.
                </p>
              </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
              <div>
                <Photo src={founderImg} tall label="Founder Dilip Patro" caption="Dilip Patro, Founder & Managing Trustee of TAP" />
              </div>
              </RevealOnScroll>
            </div>
          )}

          {tab === "vmv" && (
            <div className="space-y-16 pt-2">
              <div className="grid md:grid-cols-2 gap-6">
                <RevealOnScroll delay={0.15}>
                  <Card className="h-full">
                    <div className="p-6 h-full flex flex-col">
                      <h3 className="text-[22px] text-teal-deep mb-3 font-display">Vision</h3>
                      <p className="text-[15.5px] text-stone leading-relaxed">To minimise the occurrence of spinal cord injuries and ensure access to the highest quality rehabilitation services for all affected individuals across Andhra Pradesh.</p>
                    </div>
                  </Card>
                </RevealOnScroll>
                <RevealOnScroll delay={0.3}>
                  <Card className="h-full">
                    <div className="p-6 h-full flex flex-col">
                      <h3 className="text-[22px] text-teal-deep mb-3 font-display">Mission</h3>
                      <p className="text-[15.5px] text-stone leading-relaxed">To prevent spinal cord injuries across Andhra Pradesh through clinical services, community awareness, and policy advocacy, and to deliver the highest quality rehabilitation and support to those affected.</p>
                    </div>
                  </Card>
                </RevealOnScroll>
              </div>

              <div className="border-t border-line/60 pt-16">
                <RevealOnScroll>
                  <div className="mb-10 text-center max-w-3xl mx-auto">
                    <h2 className="text-[32px] md:text-[38px] text-teal-deep leading-tight font-display mb-4">Our Values</h2>
                    <p className="text-[16px] text-stone leading-relaxed">
                      At <strong className="text-teal-deep">The Ability People (TAP)</strong>, our work is guided by values that place people, dignity, and inclusion at the heart of everything we do.
                    </p>
                  </div>
                </RevealOnScroll>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Dignity", text: "We believe every individual deserves to be treated with respect, compassion, and dignity, regardless of disability, age, gender, or socio-economic background." },
                    { title: "Inclusion", text: "We strive to build an inclusive society where every person has equal opportunities to participate, contribute, and thrive." },
                    { title: "Ability First", text: "We focus on people's strengths, aspirations, and potential rather than their limitations, empowering them to lead independent and meaningful lives." },
                    { title: "Person- and Family-Centred Care", text: "We place individuals and their families at the centre of every decision, ensuring services are tailored to their unique needs, goals, and circumstances." },
                    { title: "Compassion", text: "We serve with empathy, kindness, and respect, recognising the challenges faced by individuals and families while walking alongside them on their rehabilitation journey." },
                    { title: "Empowerment", text: "We enable persons with disabilities, caregivers, and communities with knowledge, skills, confidence, and opportunities to make informed decisions and advocate for their rights." },
                    { title: "Excellence", text: "We are committed to delivering high-quality, evidence-based rehabilitation services that meet national and international standards while continuously improving our practices." },
                    { title: "Collaboration", text: "We believe sustainable impact is achieved through partnerships with governments, healthcare professionals, educational institutions, communities, corporate partners, and civil society." },
                    { title: "Innovation", text: "We embrace new ideas, technology, assistive solutions, research, and best practices to improve access, quality, and outcomes in rehabilitation and disability inclusion." },
                    { title: "Integrity", text: "We uphold honesty, transparency, accountability, and ethical practices in all our programmes, partnerships, and stewardship of resources." },
                    { title: "Equity", text: "We work to eliminate barriers and ensure that every individual—especially those in rural, tribal, and underserved communities—has equitable access to rehabilitation, healthcare, education, and opportunities." },
                    { title: "Community Ownership", text: "We believe lasting change happens when families, communities, local institutions, and persons with disabilities actively participate in designing, implementing, and sustaining solutions." },
                    { title: "Resilience", text: "Inspired by the strength of the people we serve, we foster perseverance, hope, and determination to overcome challenges and create brighter futures." },
                    { title: "Advocacy", text: "We champion the rights, accessibility, and social inclusion of persons with disabilities, promoting policies and practices that create barrier-free and inclusive communities." },
                    { title: "Continuous Learning", text: "We encourage lifelong learning, innovation, research, and professional development to enhance our impact and remain responsive to emerging needs." }
                  ].map((value, idx) => (
                    <RevealOnScroll key={idx} delay={0.1 * (idx % 3)}>
                      <Card className="h-full">
                        <div className="p-6 flex flex-col h-full">
                          <h3 className="text-[18px] text-teal-deep mb-2 font-display">{value.title}</h3>
                          <p className="text-[14.5px] text-stone leading-relaxed flex-grow">{value.text}</p>
                        </div>
                      </Card>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "history" && (
            <div>
              {/* Intro Block */}
              <RevealOnScroll>
              <div className="text-center max-w-2xl mx-auto mb-6 pt-4">
                <div className="text-teal font-bold font-display text-[13px] tracking-[0.2em] uppercase mb-2">A Legacy of Inclusion</div>
                <h2 className="text-[32px] md:text-[42px] text-teal-deep mb-2 font-display">Our journey</h2>
                <p className="text-[17px] text-stone leading-relaxed">
                  From a single clinic to statewide impact.
                </p>
                <div className="mt-8 flex flex-col items-center gap-2">
                  <span className="text-[11px] font-bold text-stone/70 tracking-[0.2em] uppercase">Begin the journey</span>
                  <div className="w-[1px] h-10 bg-teal-light/40"></div>
                </div>
              </div>
              </RevealOnScroll>
              
              {/* Center-Line Timeline */}
              <div className="relative mb-24">
                {/* The vertical line */}
                <div className="absolute top-0 bottom-0 left-[16px] md:left-1/2 w-[1px] bg-teal-light/50 -translate-x-1/2"></div>
                
                {TIMELINE.map((t, index) => {
                  const Icon = t.icon;
                  const isLeft = index % 2 === 0;

                  return (
                    <RevealOnScroll key={index} delay={0.15}>
                    <div className={`relative flex flex-col md:flex-row items-start md:items-center w-full mb-12 md:mb-20 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      
                      {/* Center Dot */}
                      <div className="absolute left-[16px] md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-2.5 h-2.5 rounded-full bg-teal z-30"></div>
                      
                      {/* Side 1: Year & Title Block */}
                      <div className={`w-full md:w-1/2 pl-10 pr-0 md:px-14 flex flex-col justify-center ${isLeft ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} mb-4 md:mb-0`}>
                        <div className="text-[40px] md:text-[48px] lg:text-[56px] font-display font-bold text-teal-deep leading-none mb-3">
                          {t.year}
                        </div>
                        <div className={`flex items-center gap-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                          {Icon && <Icon className={`w-5 h-5 text-gold flex-shrink-0 ${isLeft ? 'md:order-last' : ''}`} />}
                          <h3 id={`milestone-${t.year}`} className="text-[18px] md:text-[20px] text-teal-deep font-bold font-display leading-tight scroll-mt-32">
                            {t.title}
                          </h3>
                        </div>
                      </div>

                      {/* Side 2: Description Card */}
                      <div className={`w-full md:w-1/2 pl-10 pr-0 md:px-14 flex ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                        <div className="bg-white border border-teal-light/40 rounded-2xl p-6 md:p-8 lg:p-10 w-full max-w-[460px] relative z-20">
                          <div className="text-[15px] md:text-[15.5px] text-stone leading-relaxed">{t.desc}</div>
                        </div>
                      </div>
                      
                    </div>
                    </RevealOnScroll>
                  );
                })}
              </div>

              {/* Closing Block & Stats */}
              <div className="bg-teal-deep rounded-[2rem] p-8 md:p-16 text-center text-white shadow-lg relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                  <div>
                    <div className="text-4xl md:text-5xl font-display font-bold text-gold mb-3">15+</div>
                    <div className="text-[13px] font-bold tracking-widest uppercase opacity-90">Years of Experience</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-display font-bold text-gold mb-3">248+</div>
                    <div className="text-[13px] font-bold tracking-widest uppercase opacity-90">SCI Survivors Supported</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-display font-bold text-gold mb-3">33</div>
                    <div className="text-[13px] font-bold tracking-widest uppercase opacity-90">Mandals Covered</div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto border-t border-white/20 pt-16">
                  <div className="text-gold font-bold font-display text-[13px] tracking-[0.2em] uppercase mb-4">The Next Chapter</div>
                  <h2 className="text-[32px] md:text-[42px] font-display font-bold mb-6">Continuing the Path</h2>
                  <p className="text-white/80 text-[16.5px] mb-10 leading-relaxed max-w-lg mx-auto">
                    Join us in building a more inclusive society. Your support helps us expand our reach and empower more individuals across the state.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button to="/donate" variant="solid" className="bg-gold text-teal-deep hover:bg-gold-light">
                      Donate Now
                    </Button>
                    <Button to="/contact" variant="outline" className="border-white text-white hover:bg-white/10">
                      Get Involved
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "team" && (
            <div className="space-y-12">
              <RevealOnScroll>
              <div>
                <h2 className="text-[26px] text-teal-deep mb-5 flex items-center gap-3 flex-wrap font-display">
                  Governing board <Pill>7 members</Pill>
                </h2>
                <p className="text-stone mb-6 leading-relaxed">
                  The Governing Board of The Ability People (TAP) comprises accomplished professionals from diverse fields, including social development, disability inclusion, architecture, law, business, technology, finance, and public policy. United by a shared commitment to equity and inclusion, the Board provides strategic direction, governance oversight, financial stewardship, and institutional leadership to advance TAP's mission of empowering persons with disabilities through comprehensive rehabilitation, assistive technology, and community inclusion.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {BOARD_MEMBERS.map((m, idx) => (
                    <RevealOnScroll key={idx} delay={Math.min(idx * 0.1, 0.6)}>
                      <BoardMemberCard m={m} />
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
              </RevealOnScroll>
              
              <div className="border-t border-line pt-10">
                <RevealOnScroll>
                <h2 className="text-[24px] text-teal-deep mb-6 font-display">Our Team</h2>
                </RevealOnScroll>
                <div className="space-y-12">
                  <div>
                    <RevealOnScroll delay={0.15}>
                    <h3 className="text-[20px] text-teal-deep mb-4 font-display">Admin Team</h3>
                    </RevealOnScroll>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                      {ADMIN_TEAM.map((m, idx) => (
                        <RevealOnScroll key={m.name} delay={Math.min(idx * 0.1, 0.6)}>
                        <Card key={m.name}>
                          <div className="p-5 h-full flex flex-col justify-center">
                            <h4 className="text-[17px] text-teal-deep font-bold font-display mb-1">{m.name}</h4>
                            <p className="text-[13.5px] text-stone leading-snug">{m.role}</p>
                          </div>
                        </Card>
                        </RevealOnScroll>
                      ))}
                    </div>
                  </div>
                  <div>
                    <RevealOnScroll delay={0.15}>
                    <h3 className="text-[20px] text-teal-deep mb-4 font-display">Clinical Team</h3>
                    </RevealOnScroll>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {CLINICAL_TEAM.map((m, idx) => (
                        <RevealOnScroll key={m.name} delay={Math.min(idx * 0.1, 0.6)}>
                        <Card>
                          <div className="p-5 h-full flex flex-col justify-center">
                            <h4 className="text-[17px] text-teal-deep font-bold font-display mb-1">{m.name}</h4>
                            <p className="text-[13.5px] text-stone leading-snug">{m.role}</p>
                          </div>
                        </Card>
                        </RevealOnScroll>
                      ))}
                    </div>
                  </div>
                  <div>
                    <RevealOnScroll delay={0.15}>
                    <h3 className="text-[20px] text-teal-deep mb-4 font-display">Support Team</h3>
                    </RevealOnScroll>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                      {SUPPORT_TEAM.map((m, idx) => (
                        <RevealOnScroll key={m.name} delay={Math.min(idx * 0.1, 0.6)}>
                        <Card>
                          <div className="p-5 h-full flex flex-col justify-center">
                            <h4 className="text-[17px] text-teal-deep font-bold font-display mb-1">{m.name}</h4>
                            <p className="text-[13.5px] text-stone leading-snug">{m.role}</p>
                          </div>
                        </Card>
                        </RevealOnScroll>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-line pt-10">
                <RevealOnScroll>
                <h2 className="text-[24px] text-teal-deep mb-5 font-display">Medical & Rehabilitation Advisory Panel</h2>
                </RevealOnScroll>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MEDICAL_ADVISORY.map((m, idx) => (
                    <RevealOnScroll key={m.name} delay={Math.min(idx * 0.1, 0.6)}>
                    <Card>
                      <div className="p-6 h-full flex flex-col justify-center">
                        <h3 className="text-[18px] text-teal-deep font-bold font-display mb-2">{m.name}</h3>
                        <p className="text-[13.5px] text-stone leading-snug">{m.role}</p>
                      </div>
                    </Card>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              <div className="border-t border-line pt-10">
                <RevealOnScroll>
                <h2 className="text-[24px] text-teal-deep mb-5 font-display">Mentor and support</h2>
                </RevealOnScroll>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MENTOR_SUPPORT.map((m, idx) => (
                    <RevealOnScroll key={m.name} delay={Math.min(idx * 0.1, 0.6)}>
                    <Card>
                      <div className="p-6 h-full flex flex-col justify-center">
                        <h3 className={`text-[18px] text-teal-deep font-bold font-display ${m.role ? 'mb-2' : ''}`}>{m.name}</h3>
                        {m.role && <p className="text-[13.5px] text-stone leading-snug">{m.role}</p>}
                      </div>
                    </Card>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              <div className="border-t border-line pt-10">
                <RevealOnScroll>
                <h2 className="text-[24px] text-teal-deep mb-5 font-display">Advisory Group — Patrons</h2>
                </RevealOnScroll>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ADVISORY_PATRONS.map((m, idx) => (
                    <RevealOnScroll key={m.name} delay={Math.min(idx * 0.1, 0.6)}>
                    <Card>
                      <div className="p-6 h-full flex flex-col justify-center">
                        <h3 className="text-[18px] text-teal-deep font-bold font-display mb-2">{m.name}</h3>
                        <p className="text-[13.5px] text-stone leading-snug">{m.role}</p>
                      </div>
                    </Card>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              <div className="border-t border-line pt-10">
                <RevealOnScroll>
                <h2 className="text-[24px] text-teal-deep mb-5 font-display">Advisory Board Members</h2>
                </RevealOnScroll>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {ADVISORY_BOARD.map((m, idx) => (
                    <RevealOnScroll key={m.name} delay={Math.min(idx * 0.1, 0.6)}>
                    <div className="bg-white p-5 rounded-xl2 border border-line hover:border-teal-light transition-all duration-300 h-full flex flex-col">
                      <h3 className="text-[16px] text-teal-deep font-bold font-display mb-2">{m.name}</h3>
                      <p className="text-[13.5px] text-stone leading-snug flex-1">{m.role}</p>
                    </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              <div className="border-t border-line pt-10">
                <RevealOnScroll>
                <h2 className="text-[24px] text-teal-deep mb-4 flex items-center gap-3 flex-wrap">
                  General body <Pill>15 members</Pill>
                </h2>
                <p className="text-stone mb-5">
                  The General Body oversees strategic direction and appoints the Governing Board annually.
                </p>
                <Button to="/contact" variant="outline" size="sm">Request governance policies</Button>
                </RevealOnScroll>
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}

