import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Eyebrow, SectionHead, Photo, Card, CTABand, Wrap, Section, Pill, RevealOnScroll, CountUp, SponsorCard } from "../components/ui";
import ReachMap from "../components/ReachMap";
import heroBgImg from "../assets/logoremover_1787636928887.jpeg";
import founderImg from "../assets/WhatsApp Image 2026-07-10 at 6.45.26 PM.jpeg";
import rehabOnWheelsImg from "../assets/WhatsApp Image 2026-02-10 at 3.23.43 PM (1).jpg";
import meeraImg from "../assets/IMG_20250822_114337 (1).jpg";
import rehabTherapyImg from "../assets/IMG_7755.JPG";
import assistiveDevicesImg from "../assets/IMG_7521.JPG";
import outreachImg from "../assets/IMG_6679.jpg";
import inpatientServicesImg from "../assets/20250618_112454 (1).jpg";
import speechTherapyImg from "../assets/IMG_20250822_114248 (1).jpg";

const RECOGNITIONS = [
  {
    title: "Extraordinary Achievements India@2047 Conference & Bharat Ke Maharathi Award Show",
    desc: "Constitution Club of India, New Delhi",
    year: "2023"
  },
  {
    title: "Outstanding Social Services Recognition",
    desc: "Acknowledged as the best in social services by the SDM, Visakhapatnam, and LIC of India",
    year: "2023"
  },
  {
    title: "National Recognition for Road Safety Excellence",
    desc: "Selected among 12 National Personalities for outstanding contributions to road safety at the National Conference of Road Safety, Pune, organized by the Motor Driving School Owners Association Maharashtra State (MDSOA) and Pune Auto Expo",
    year: "2022"
  },
  {
    title: "Red FM Business Brilliance Awards 2022",
    desc: "Recognized for excellence in Humanitarian Service, Visakhapatnam",
    year: "2022"
  },
  {
    title: "Distinguished Citizen Award 2021-22",
    desc: "Honored by the Rotary Club of Hyderabad",
    year: "2022"
  },
  {
    title: "ACME Felicitation",
    desc: "One of three eminent individuals felicitated by ACME (A Creative Makers in Events), Visakhapatnam, for services in commemoration of the 75th year of Indian Independence, Azadi Ka Amrit Mahotsav",
    year: "2021"
  },
  {
    title: "Income Tax Department Felicitation",
    desc: "Felicitated by the Income Tax Department, Visakhapatnam, as part of the Azadi Ka Amrit Mahotsav celebrations",
    year: "2021"
  },
  {
    title: "Rotary International Vocational Services Award",
    desc: "Recognized for outstanding vocational services",
    year: "2016"
  },
  {
    title: "Fellowship Award for Best Social Entrepreneur",
    desc: "Received from Sri Bhaskar Ramamurthi, Director, Indian Institute of Technology Madras, Chennai",
    year: "2015"
  },
  {
    title: "Sadguru Gnanananda Fellowship Award",
    desc: "Best Social Entrepreneur, from Manava Seva Dharma Samvardhani",
    year: "2014"
  },
  {
    title: "Hyundai Motor Foundation Recognition",
    desc: "Recognized with a Verna vehicle (Automatic Transmission) for the Road Safety initiative",
    year: "2013"
  },
  {
    title: "High-Level Meeting Recognition",
    desc: "Felicitated by Shri Oscar Fernandes, Honourable Minister, Ministry of Road Transport & Highways, New Delhi, for Strengthening Road Safety Legislation and Saving Lives",
    year: "2013"
  }
];

const STEPS = [
  "Outreach",
  "Registration",
  "Assessment",
  "Care pathway",
  "Treatment & fitting",
  "Social security",
  "Reintegration",
];

const FOCUS_AREAS = [
  {
    title: "Rehab Therapy Services",
    label: "Comprehensive physiotherapy and rehabilitation programs tailored to restore strength, mobility, and independence.",
    to: "/rehab-therapy",
    src: rehabTherapyImg,
    alt: "Therapy session"
  },
  {
    title: "Rehab Aids & Appliances",
    label: "Custom-fitted mobility aids, braces, and assistive devices designed to support everyday movement and comfort.",
    to: "/rehab-aids",
    src: assistiveDevicesImg,
    alt: "Assistive aids"
  },
  {
    title: "Independent Living Program",
    label: "Guided support helping individuals build the skills and confidence needed for daily independent living.",
    to: "/outreach",
    src: outreachImg,
    alt: "Mobile van outreach"
  },
  {
    title: "In-Patient Services",
    label: "Round-the-clock clinical care and monitoring for patients undergoing intensive rehabilitation.",
    to: "/inpatient-services",
    src: inpatientServicesImg,
    alt: "In-patient ward"
  },
  {
    title: "Social Security Schemes",
    label: "Assistance navigating government welfare schemes and benefits available to persons with disabilities.",
    to: "/social-security-schemes",
    src: speechTherapyImg,
    alt: "Social security assistance"
  }
];

import { ALL_PARTNERS } from "../data/partners";
import { UPCOMING_PROGRAMMES } from "../data/programmes";

export default function Home() {
  const [isFounderModalOpen, setIsFounderModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isFounderModalOpen) {
        setIsFounderModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFounderModalOpen]);

  useEffect(() => {
    if (isFounderModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFounderModalOpen]);

  return (
    <div>
      {/* HERO */}
      <div className="relative w-full py-16 md:py-20 min-h-[660px] flex items-center overflow-hidden bg-cream text-charcoal">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImg}
            alt="Therapist assisting a wheelchair user during a rehabilitation session"
            className="w-full h-full object-cover object-[75%_center]"
          />
          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/95 to-cream/70 md:to-transparent z-10" />
        </div>

        {/* Content Container */}
        <Wrap className="relative z-20 w-full">
          <div className="max-w-2xl">
            <RevealOnScroll delay={0}>
              <span className="inline-block px-4 py-1.5 bg-peach text-teal-deep border border-line text-xs font-bold uppercase tracking-wide rounded-full mb-4">
                The wind beneath your wheels
              </span>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-[28px] sm:text-[34px] md:text-[40px] lg:text-[48px] text-teal-deep leading-tight md:leading-[1.15] mb-4 font-bold tracking-tight">
                Rehabilitation, assistive technology and dignity — for every ability.
              </h1>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <p className="font-body text-[15px] md:text-[16px] text-stone leading-relaxed mb-6 max-w-[50ch]">
                The Ability People (TAP) supports persons with disabilities and mobility challenges across Andhra
                Pradesh through rehabilitation therapy, assistive devices, and community-based care.
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/volunteer"
                  className="px-8 py-3.5 bg-gold text-teal-deep font-bold rounded-full shadow-lg flex items-center gap-2 group hover:scale-[1.02] transition-transform text-[14.5px]"
                >
                  Become a volunteer
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/donate"
                  className="px-8 py-3.5 border-2 border-teal text-teal font-bold rounded-full hover:bg-teal hover:text-white transition-all text-[14.5px]"
                >
                  Donate now
                </Link>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              <div className="mt-8 sm:mt-10 max-w-xl">
                <span className="block text-xs font-bold uppercase tracking-widest text-stone mb-3">FY2019 – FY2026</span>
                <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-3 sm:gap-y-4 drop-shadow-sm">
                  <div className="flex-1 min-w-[95px] sm:min-w-[110px]">
                    <strong className="block font-display text-[18px] md:text-[22px] text-teal-deep leading-none mb-0.5"><CountUp value="1,693" /></strong>
                    <span className="text-[9.5px] font-bold text-stone uppercase tracking-wider leading-tight block">Rehabilitation Therapy</span>
                  </div>
                  <div className="flex-1 min-w-[95px] sm:min-w-[110px]">
                    <strong className="block font-display text-[18px] md:text-[22px] text-teal-deep leading-none mb-0.5"><CountUp value="859" /></strong>
                    <span className="text-[9.5px] font-bold text-stone uppercase tracking-wider leading-tight block">Mobility Services</span>
                  </div>
                  <div className="flex-1 min-w-[95px] sm:min-w-[110px]">
                    <strong className="block font-display text-[18px] md:text-[22px] text-teal-deep leading-none mb-0.5"><CountUp value="805" /></strong>
                    <span className="text-[9.5px] font-bold text-stone uppercase tracking-wider leading-tight block">Prosthetic & Orthotic Services</span>
                  </div>
                  <div className="flex-1 min-w-[95px] sm:min-w-[110px]">
                    <strong className="block font-display text-[18px] md:text-[22px] text-teal-deep leading-none mb-0.5"><CountUp value="776" /></strong>
                    <span className="text-[9.5px] font-bold text-stone uppercase tracking-wider leading-tight block">Developmental Aids</span>
                  </div>
                  <div className="flex-1 min-w-[95px] sm:min-w-[110px]">
                    <strong className="block font-display text-[18px] md:text-[22px] text-teal-deep leading-none mb-0.5"><CountUp value="760" /></strong>
                    <span className="text-[9.5px] font-bold text-stone uppercase tracking-wider leading-tight block">Peer Counselling</span>
                  </div>
                  <div className="flex-1 min-w-[95px] sm:min-w-[110px]">
                    <strong className="block font-display text-[18px] md:text-[22px] text-teal-deep leading-none mb-0.5"><CountUp value="624" /></strong>
                    <span className="text-[9.5px] font-bold text-stone uppercase tracking-wider leading-tight block">Wheelchair Skills Training</span>
                  </div>
                  <div className="flex-1 min-w-[95px] sm:min-w-[110px]">
                    <strong className="block font-display text-[18px] md:text-[22px] text-teal-deep leading-none mb-0.5"><CountUp value="361" /></strong>
                    <span className="text-[9.5px] font-bold text-stone uppercase tracking-wider leading-tight block">Active Rehabilitation Admissions</span>
                  </div>
                  <div className="flex-1 min-w-[95px] sm:min-w-[110px] sm:pl-2 sm:border-l border-line/60">
                    <strong className="block font-display text-[18px] md:text-[22px] text-gold leading-none mb-0.5"><CountUp value="5,878" /></strong>
                    <span className="text-[9.5px] font-bold text-teal-deep uppercase tracking-wider leading-tight block">Total Rehabilitation</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Wrap>

        {/* Caption overlay tag shifted right to cover watermark at right edge */}
        <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20 px-4 py-2 sm:px-8 sm:py-3.5 bg-gold text-teal-deep text-[11px] sm:text-[12px] md:text-[14.5px] font-bold tracking-wide rounded-full border border-white/10 shadow-md font-display pointer-events-none max-w-[90vw] truncate">
          Ability Rehabilitation Center — ARC, Visakhapatnam
        </div>
      </div>

      {/* FOUNDER'S MESSAGE */}
      <Section bg="bg-white" className="border-b border-line" revealChildren>
        <div className="max-w-5xl mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-[230px_1fr] lg:grid-cols-[250px_1fr] gap-8 md:gap-10 lg:gap-12">
          
          {/* Left Column: Photo & Attribution */}
          <div className="h-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="md:sticky md:top-28 flex flex-col items-center md:items-start w-full gap-5 pb-0"
            >
              <img 
                src={founderImg} 
                alt="Dilip Patro" 
                className="w-full max-w-[240px] md:max-w-full rounded-2xl object-cover shadow-sm border border-line" 
              />
              
              <div className="text-center md:text-left px-2 md:px-0 w-full max-w-[280px] md:max-w-full font-body flex flex-col gap-1.5">
                <p className="font-display font-bold text-teal-deep text-[20px] md:text-[22px]">Dilip Patro</p>
                <div className="text-[14px] text-stone leading-snug">
                  Founder, Director & Secretary<br />
                  The Ability People (TAP)
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="mb-8 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <Eyebrow>Founder's Message</Eyebrow>
              <h2 className="text-[32px] md:text-[38px] text-teal-deep leading-tight font-display mt-2">Founder's Message</h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="text-[15.5px] md:text-[16px] text-stone leading-relaxed space-y-5 text-left font-body"
            >
              <p>Welcome to <strong className="text-teal-deep">The Ability People (TAP).</strong></p>
              <p>More than an organisation, TAP is a movement born from lived experience, resilience, and the belief that every person deserves the opportunity to live with dignity, independence, and hope.</p>
              <p>In 1997, my life changed forever following a road traffic accident that resulted in a cervical spinal cord injury. Overnight, I experienced the challenges faced by persons with disabilities—not only the physical barriers, but also the lack of access to timely rehabilitation, assistive technology, healthcare, education, employment, and social acceptance. Through this journey, I realised that disability does not diminish a person's potential; it is often the absence of opportunities and support systems that limits lives.</p>
              
              <div className="pt-2 text-center md:text-left">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsFounderModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-[14.5px] font-bold text-teal hover:text-teal-deep transition-colors group"
                >
                  Read More
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* WHO WE ARE SNIPPET */}
      <Section bg="bg-white" tight className="border-b border-line">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <h2 className="text-[28px] text-teal-deep leading-tight font-display">Empowering independence, one journey at a time.</h2>
          <p className="text-[16px] text-stone leading-relaxed">
            The Ability People (TAP) is a non-profit trust dedicated to the clinical rehabilitation, assistive device access, and social reintegration of persons with mobility challenges. Founded and led by a spinal cord injury survivor, we bridge the gap between medical recovery and active community living.
          </p>
          <div>
            <Button to="/about" variant="outline" size="sm">Read Our Full Story</Button>
          </div>
        </div>
      </Section>


      {/* WHO WE ARE */}
      <Section className="pb-8 md:pb-12" revealChildren>
        <SectionHead
          eyebrow="Who we are"
          title="Two decades of rebuilding independence"
          desc="Founded by Dilip Patro, TAP works at the intersection of clinical rehabilitation and community reintegration — meeting people where they are, from hospital bedside to home."
        />
        <div className="grid md:grid-cols-3 gap-6">
          <RevealOnScroll delay={0.15}>
            <Card>
            <Photo src={founderImg} short label="Founder Dilip Patro speaking at a community event" caption="Dilip Patro" />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-[19px] text-teal-deep mb-2">Founder's Story</h3>
              <p className="text-[14.5px] text-stone mb-4 flex-1">
                "Ability is not the absence of a challenge — it is the presence of the right support." Read Dilip
                Patro's full story.
              </p>
              <Link to="/about" state={{ tab: "founder" }} className="text-[13.5px] font-bold text-teal flex items-center gap-1.5">
                Read Founder's Story <ArrowRight size={14} />
              </Link>
            </div>
          </Card>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
          <Card>
            <Photo src={rehabOnWheelsImg} short label="Mobile rehabilitation van parked in a rural village" caption="Rehab on Wheels" />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-[19px] text-teal-deep mb-2">Featured programme</h3>
              <p className="text-[14.5px] text-stone mb-4 flex-1">
                Our mobile clinic brings therapy and assistive devices directly to rural and underserved communities.
              </p>
              <Link to="/outreach" className="text-[13.5px] font-bold text-teal flex items-center gap-1.5">
                See our work <ArrowRight size={14} />
              </Link>
            </div>
          </Card>
          </RevealOnScroll>
          <RevealOnScroll delay={0.45}>
          <Card>
            <Photo src={meeraImg} short label="Child receiving a paediatric assistive device fitting" caption="Impact story" />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-[19px] text-teal-deep mb-2">Meera's story</h3>
              <p className="text-[14.5px] text-stone mb-4 flex-1">
                How an early-intervention programme helped a five-year-old take her first independent steps.
              </p>
              <Link to="/impact" state={{ tab: "stories" }} className="text-[13.5px] font-bold text-teal flex items-center gap-1.5">
                Read more stories <ArrowRight size={14} />
              </Link>
            </div>
          </Card>
          </RevealOnScroll>
        </div>
      </Section>

      {/* FOCUS AREAS */}
      <Section bg="bg-cream" className="pt-8 md:pt-12 border-b border-line" revealChildren>
        <RevealOnScroll>
          <SectionHead
            eyebrow="OUR FOCUS"
            title="Where we create impact"
            desc="TAP provides specialized rehabilitation and comprehensive support across key conditions."
            center
          />
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-0 items-stretch mt-10 overflow-hidden pb-4">
          {FOCUS_AREAS.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className={`h-full lg:px-5 ${
                index === 0 ? "lg:pr-5 lg:px-0" : "lg:border-l lg:border-line"
              } ${index === FOCUS_AREAS.length - 1 ? "lg:pl-5 lg:px-0" : ""}`}
            >
              <FocusAreaCard 
                src={area.src} 
                title={area.title} 
                label={area.label} 
                to={area.to} 
                alt={area.alt} 
              />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PROJECTS SECTION */}
      <Section bg="bg-white" className="border-b border-line">
        <SectionHead
          eyebrow="Our Programmes"
          title={<>Active <span className="font-sans font-bold">&</span> upcoming initiatives</>}
          desc="Discover our ongoing community interventions and future programmes currently looking for partners."
          center
        />
        
        <div className="space-y-10">
          <div>
            <h3 className="text-[20px] font-bold text-teal-deep mb-4 border-b border-line pb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal" /> Current Programmes
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ProjectCard 
                title="Greater Visakhapatnam Municipal Corporation-Ability Rehabilitation Centre" 
                desc="Programme centre initiated in collaboration with GVMC (Greater Visakhapatnam Municipal Corporation) at the Ability Rehabilitation Centre (ARC)."
                isCurrent
              />
              <ProjectCard 
                title="Government General Hospital Paderu" 
                desc="Programme centre operating at Government General Hospital, Paderu, serving tribal rehabilitation needs."
                isCurrent
              />

            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-[20px] font-bold text-teal-deep mb-4 border-b border-line pb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold" /> Future Programmes
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {UPCOMING_PROGRAMMES.map((prog, idx) => (
                <ProjectCard 
                  key={idx}
                  title={prog.title} 
                  desc={prog.subtitle}
                  isCurrent={false}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SPONSORS & PARTNERS SECTION */}
      <Section bg="bg-cream" className="border-b border-line overflow-hidden">
        <div className="text-center mb-10 max-w-xl mx-auto px-6">
          <span className="eyebrow text-gold-dark text-[13px] font-bold uppercase tracking-[0.12em] mb-3.5 block justify-center flex items-center gap-2">
            <span className="h-[2px] w-7 bg-gold" /> Working Together
          </span>
          <h2 className="text-[28px] text-teal-deep leading-tight font-display mb-3">Our Sponsors <span className="font-sans font-bold">&</span> Partners</h2>
          <p className="text-[15.5px] text-stone">The corporate, CSR, and government partners supporting physical independence and clinical rehabilitation.</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
            {ALL_PARTNERS.map((partner, idx) => (
              <RevealOnScroll key={idx} delay={Math.min(idx * 0.1, 0.6)}>
                <SponsorCard partner={partner} />
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <div className="text-center flex flex-wrap gap-4 justify-center mt-10">
          <Button to="/sponsors" variant="outline" size="sm">Learn More About Sponsors</Button>
          <Button to="/partners" variant="outline" size="sm">Learn More About Partners</Button>
        </div>
      </Section>

      {/* RECOGNITION & AWARDS SECTION */}
      <Section bg="bg-white" className="border-b border-line">
        <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto px-4 sm:px-6">
          <span className="eyebrow text-gold-dark text-[13px] font-bold uppercase tracking-[0.12em] mb-3.5 block justify-center flex items-center gap-2">
            <span className="h-[2px] w-7 bg-gold" /> NATIONAL RECOGNITION
          </span>
          <h2 className="text-[26px] sm:text-[32px] text-teal-deep leading-tight font-display mb-3 sm:mb-4">Recognition <span className="font-sans font-bold">&</span> Awards</h2>
          <p className="text-[14px] sm:text-[15.5px] text-stone">Honoring our commitment to empowering communities and fostering physical independence.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-6">
          {RECOGNITIONS.map((award, idx) => (
            <div key={idx} className="bg-[#F8F9FA] rounded-xl border border-line p-5 sm:p-6 flex flex-col hover:shadow-lg transition-shadow duration-300 group">
              <Award className="text-gold w-8 h-8 mb-4 sm:mb-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-[16px] sm:text-[17px] font-bold text-teal-deep mb-2 leading-snug">{award.title}</h3>
              <p className="text-[13.5px] sm:text-[14px] text-stone mb-4 sm:mb-5 flex-1">{award.desc}</p>
              <div className="text-[12px] font-bold text-stone/50 uppercase tracking-widest">{award.year}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* WORKFLOW */}
      <Section bg="bg-white" tight>
        <SectionHead
          eyebrow="How we help"
          title="From first referral to lasting independence"
          desc="Every beneficiary follows a structured journey, built around their individual needs."
          center
        />
        <div className="relative pt-2">
          <div
            className="hidden lg:block absolute top-[26px] left-[5%] right-[5%] h-[3px] opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #D69A34 0 10px, transparent 10px 18px)",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {STEPS.map((s, i) => (
              <div key={s} className="text-center">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-teal-deep text-white flex items-center justify-center font-display text-base sm:text-lg mx-auto mb-2 sm:mb-3">
                  {i + 1}
                </div>
                <p className="text-[12px] sm:text-[12.5px] font-bold text-teal-deep">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* INTERACTIVE REACH MAP */}
      <Section bg="bg-cream" className="border-b border-line">
        <SectionHead
          eyebrow="Our Reach"
          title="Interactive Map of Reach"
          desc="Click or hover on a district to see how TAP is bringing rehabilitation and assistive aids across Andhra Pradesh."
          center
        />
        
        <ReachMap />
      </Section>

      {/* EVENTS */}
      <Section bg="topo bg-teal-deep text-white">
        <SectionHead eyebrow="OUR EVENTS" title="Events Over the Years" light center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCard 
            slug="ggh-paderu-assessment-camp"
            date="24 Jun 2026" 
            title="GGH Paderu Camp" 
            desc="Multidisciplinary disability assessment camp covering PHC-Minumuluru, Hukkumpeta, Uppa, Edulapalem, G.Madugula & Gemmeli." 
          />
          <EventCard 
            slug="chc-munchingiputtu-assessment-camp"
            date="25 Jun 2026" 
            title="CHC Munchingiputtu Camp" 
            desc="Disability assessment camp covering PHC-Pedabayalu, Gomangi, Rudakota, Kilagada & Labburu." 
          />
          <EventCard 
            slug="area-hospital-araku-assessment-camp"
            date="27 Jun 2026" 
            title="Area Hospital Araku Camp" 
            desc="Disability assessment camp covering PHC-Dumbriguda, Killoguda, Gannela, Madagada & Sunkarametta." 
          />
          <EventCard 
            slug="phc-ananthagiri-assessment-camp"
            date="29 Jun 2026" 
            title="PHC Ananthagiri Camp" 
            desc="Disability assessment camp covering PHC-Ananthagiri, Lungaparthi, Bheemavaram & Pinakota." 
          />
          <EventCard 
            slug="area-hospital-chintapalli-assessment-camp"
            date="1 Jul 2026" 
            title="Area Hospital Chintapalli Camp" 
            desc="Disability assessment camp covering 11 PHCs across the Chintapalli mandal region." 
          />
          <EventCard 
            slug="phc-rj-palem-assessment-camp"
            date="3 Jul 2026" 
            title="PHC RJ Palem Camp" 
            desc="Disability assessment camp covering PHC-Kantaram, Downuru, U.Cheedipalem & RJ.Palem." 
          />
        </div>
      </Section>

      <CTABand
        title="Become the wind beneath someone's wheels"
        desc="Join us in supporting rehabilitation, assistive technology and dignity for persons with disabilities across Andhra Pradesh."
      >
        <Button to="/donate" variant="primary">Donate</Button>
        <Button to="/volunteer" variant="outlineLight">Volunteer</Button>
      </CTABand>
      <AnimatePresence>
        {isFounderModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
              onClick={() => setIsFounderModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto shadow-2xl z-10"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 flex items-center justify-between px-6 py-4 border-b border-line">
                <h2 className="text-[20px] font-display font-bold text-teal-deep">Founder's Message</h2>
                <button 
                  type="button"
                  onClick={() => setIsFounderModalOpen(false)}
                  className="p-2 -mr-2 text-stone hover:text-teal transition-colors rounded-full hover:bg-cream"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 md:p-8 text-[15px] md:text-[15.5px] text-stone leading-relaxed space-y-5 font-body">
                <div className="flex flex-col sm:flex-row gap-5 mb-6 pb-6 border-b border-line items-center sm:items-start text-center sm:text-left">
                  <img src={founderImg} className="w-24 h-24 rounded-full object-cover shrink-0 border border-line" alt="Dilip Patro" />
                  <div>
                    <p className="font-display font-bold text-[20px] text-teal-deep">Dilip Patro</p>
                    <p className="text-[14px] text-stone leading-snug mt-1">Founder, Director & Secretary<br />The Ability People (TAP)</p>
                  </div>
                </div>
                <p>Welcome to <strong className="text-teal-deep">The Ability People (TAP).</strong></p>
                <p>More than an organisation, TAP is a movement born from lived experience, resilience, and the belief that every person deserves the opportunity to live with dignity, independence, and hope.</p>
                <p>In 1997, my life changed forever following a road traffic accident that resulted in a cervical spinal cord injury. Overnight, I experienced the challenges faced by persons with disabilities—not only the physical barriers, but also the lack of access to timely rehabilitation, assistive technology, healthcare, education, employment, and social acceptance. Through this journey, I realised that disability does not diminish a person's potential; it is often the absence of opportunities and support systems that limits lives.</p>
                <p>This realisation inspired the establishment of <strong className="text-teal-deep">The Ability People (TAP)</strong> in 2007—a non-profit organisation founded by persons with disabilities, for persons with disabilities. Our vision has always been simple yet transformative: to ensure that every individual, regardless of disability, age, or background, has access to quality rehabilitation, equal opportunities, and the freedom to participate fully in society.</p>
                <p>Over the years, TAP has evolved into a multidisciplinary rehabilitation organisation serving children with developmental delays, persons with disabilities, spinal cord injury survivors, older persons, and people living in rural and tribal communities. Through our <strong className="text-teal-deep">Ability Rehabilitation Centre (ARC)</strong>, community outreach programmes, mobile rehabilitation services, and partnerships with government departments, hospitals, educational institutions, and corporate partners, we strive to bridge the gap between healthcare and community inclusion.</p>
                <p>We firmly believe that rehabilitation is not merely about recovery—it is about restoring confidence, rebuilding lives, and creating opportunities. Every assistive device fitted, every child reaching a developmental milestone, every survivor returning to school, work, sport, or family life represents a journey of renewed hope.</p>
                <p>Our work extends beyond clinical services. We empower families, build the capacities of caregivers and frontline workers, advocate for accessibility and inclusion, strengthen community-based rehabilitation systems, and connect individuals with government schemes and social security programmes. We believe that sustainable change happens when communities, professionals, governments, and citizens work together.</p>
                <p>As we move forward, our vision is to establish inclusive rehabilitation systems that are accessible, affordable, and available to everyone—especially those in underserved rural and tribal areas. We aim to harness innovation, assistive technology, digital systems, research, and collaborative partnerships to ensure that no child or adult is left behind because of disability.</p>
                <p>None of this would be possible without the dedication of our team, the resilience of the families we serve, the trust of our partners, and the generosity of our supporters. To all of you, I extend my heartfelt gratitude.</p>
                <p>I invite you to join us—whether as a beneficiary, volunteer, professional, donor, corporate partner, researcher, policymaker, or advocate. Together, we can create communities where ability is recognised, diversity is celebrated, and every person has the opportunity to realise their full potential.</p>
                <p>Thank you for visiting our website and for believing in our mission. Together, let us continue transforming lives, creating opportunities, and building a more inclusive society.</p>
                
                <div className="mt-8 border-t border-line/60 pt-6 pb-2 text-center sm:text-left">
                  <p className="font-display font-bold text-[20px] text-teal-deep">Dilip Patro</p>
                  <p className="text-[14px] text-stone mt-1 leading-snug">Founder, Director & Secretary<br />The Ability People (TAP)</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}



function EventCard({ slug, date, title, desc }) {
  return (
    <Card className="!bg-white/[0.06] !border-white/20 hover:!border-gold">
      <div className="p-6 flex-1 flex flex-col">
        <Pill tone="outline">{date}</Pill>
        <h3 className="text-white text-[19px] mt-3 mb-2">{title}</h3>
        <p className="text-cream/75 text-[14.5px] flex-1 mb-4">{desc}</p>
        <Link 
          to={`/events/${slug}`} 
          className="text-gold text-[13.5px] font-bold flex items-center gap-1.5 hover:underline"
        >
          View event details <ArrowRight size={14} />
        </Link>
      </div>
    </Card>
  );
}

function FocusAreaCard({ title, label, to, alt, src }) {
  return (
    <div className="group h-full flex flex-col">
      <div className="w-full h-[220px] overflow-hidden rounded-lg mb-4 flex-shrink-0">
        <img src={src} alt={alt} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="flex-1 flex flex-col items-start text-left gap-3">
        <h4 className="text-[19px] font-bold font-display text-teal leading-tight min-h-[3rem]">{title}</h4>
        <p className="text-[14px] font-body text-stone leading-relaxed flex-grow">{label}</p>
        <Link to={to} className="text-[13.5px] font-bold text-gold hover:text-gold-dark mt-auto inline-flex items-center gap-1.5 transition-colors">
          Learn more <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function ProjectCard({ title, desc, donor, isCurrent }) {
  return (
    <Card className="p-6 bg-cream/40">
      <span className={`inline-block w-fit px-2.5 py-1 rounded-full text-[11px] font-bold mb-3 ${
        isCurrent ? "bg-teal/10 text-teal" : "bg-gold/15 text-gold-dark"
      }`}>
        {isCurrent ? "Active Programme" : "Upcoming Programme"}
      </span>
      <h4 className="text-[18px] font-bold text-teal-deep mb-2">{title}</h4>
      <p className="text-[14px] text-stone mb-4 leading-relaxed">{desc}</p>
      {donor && (
        <div className="text-[12.5px] font-bold text-teal border-t border-line/60 pt-3 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {donor}
        </div>
      )}
    </Card>
  );
}
