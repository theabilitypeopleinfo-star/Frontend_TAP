import React from "react";
import { useParams, Link } from "react-router-dom";
import { PageHero, Section, Photo, Button, RevealOnScroll } from "../components/ui";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";
import ananthagiriImg from "../assets/2cb68f6d-e84f-4242-a050-4f8ffc10263d.jpg";
import munchingiputtuImg from "../assets/2f6d75d5-9f1f-4461-81f5-195322c4f81b.jpg";
import gghPaderuImg from "../assets/0b717652-4507-4f5e-bee6-278191587d18.jpg";
import arakuImg from "../assets/03b4f973-d194-4aea-b851-e158a271820f.jpg";
import chintapalliImg from "../assets/5c1775ef-83fa-437a-88c2-468371dc5424.jpg";
import rjPalemImg from "../assets/3dbfdffd-bcb7-498f-97a1-a7e29383114a.jpg";

const SHARED_ABOUT = [
  "Background: assessment camps conducted across ASR District (24 June – 3 July 2026), in collaboration with District Administration and Government Health Institutions, supported by a CSR initiative from Bharat Dynamics Limited (BDL).",
  "Overall totals: 153 total beneficiaries assessed across all 6 camps; 70 identified as eligible for assistive devices; 83 identified for alternative rehabilitation pathways (physiotherapy, medical/surgical referral, follow-up).",
  "Major disability categories identified: Cerebral Palsy, Muscular Dystrophy, Stroke, Spinal Cord Injury, Amputation, Developmental Delay, Neurological Disorders, Congenital Deformities, Locomotor Disabilities, Multiple Disabilities.",
  "Process flow: Beneficiary Registration → General & Clinical Assessment → Functional Evaluation → Assistive Technology Needs Assessment → Rehabilitation Plan & Referral Services."
];

const EVENTS_DB = {
  "ggh-paderu-assessment-camp": {
    title: "GGH Paderu Camp",
    date: "24 June 2026",
    time: "9:00 AM - 4:00 PM",
    location: "GGH Paderu",
    eyebrow: "Camp",
    desc: "Multidisciplinary disability assessment camp covering PHC-Minumuluru, Hukkumpeta, Uppa, Edulapalem, G.Madugula & Gemmeli.",
    phcs: "Minumuluru, Hukkumpeta, Uppa, Edulapalem, G.Madugula, Gemmeli",
    team: "Mr. Subhrashu Mishra (P&O, Assistive Devices Specialist & Assistive Technology), Ms. Anusha (Physiotherapist), Durga (Technician), Sai (Office Assistant), Mrs. Venkatalakshmi (Field Coordinator)",
    beneficiaries: "16",
    image: gghPaderuImg
  },
  "chc-munchingiputtu-assessment-camp": {
    title: "CHC Munchingiputtu Camp",
    date: "25 June 2026",
    time: "9:00 AM - 4:00 PM",
    location: "CHC Munchingiputtu",
    eyebrow: "Camp",
    desc: "Disability assessment camp covering PHC-Pedabayalu, Gomangi, Rudakota, Kilagada & Labburu.",
    phcs: "Pedabayalu, Gomangi, Rudakota, Kilagada, Labburu",
    team: "Mr. Subhrashu Mishra, Mrs. Manju (Physiotherapist), Durga (Technician), Sai (Office Assistant), Mr. Alrick (Field Coordinator)",
    beneficiaries: "13",
    image: munchingiputtuImg
  },
  "area-hospital-araku-assessment-camp": {
    title: "Area Hospital Araku Camp",
    date: "27 June 2026",
    time: "9:00 AM - 4:00 PM",
    location: "Area Hospital Araku",
    eyebrow: "Camp",
    desc: "Disability assessment camp covering PHC-Dumbriguda, Killoguda, Gannela, Madagada & Sunkarametta.",
    phcs: "Dumbriguda, Killoguda, Gannela, Madagada, Sunkarametta",
    team: "Mr. Subhrashu Mishra, Ms. Anusha (Physiotherapist), Durga (Technician), Mr. Alrick (Field Coordinator)",
    beneficiaries: "9",
    image: arakuImg
  },
  "phc-ananthagiri-assessment-camp": {
    title: "PHC Ananthagiri Camp",
    date: "29 June 2026",
    time: "9:00 AM - 4:00 PM",
    location: "PHC Ananthagiri",
    eyebrow: "Camp",
    desc: "Disability assessment camp covering PHC-Ananthagiri, Lungaparthi, Bheemavaram & Pinakota.",
    phcs: "Ananthagiri, Lungaparthi, Bheemavaram, Pinakota",
    team: "Mr. Subhrashu Mishra, Mrs. Manju (Physiotherapist), Sai (Office Assistant), Mr. Alrick (Field Coordinator)",
    beneficiaries: "58",
    image: ananthagiriImg
  },
  "area-hospital-chintapalli-assessment-camp": {
    title: "Area Hospital Chintapalli Camp",
    date: "1 July 2026",
    time: "9:00 AM - 4:00 PM",
    location: "Area Hospital Chintapalli",
    eyebrow: "Camp",
    desc: "Disability assessment camp covering 11 PHCs across the Chintapalli mandal region.",
    phcs: "Tajangi, Lambasingi, Lothugedda, RV Nagar, G.K. Veedhi, Jerrila, Korukonda, Pedavalasa, Seeleru, Sapparla, Darakonda",
    team: "Mr. Subhrashu Mishra, Ms. Anusha (Physiotherapist), Durga (Technician)",
    beneficiaries: "19",
    image: chintapalliImg
  },
  "phc-rj-palem-assessment-camp": {
    title: "PHC RJ Palem Camp",
    date: "3 July 2026",
    time: "9:00 AM - 4:00 PM",
    location: "PHC RJ Palem",
    eyebrow: "Camp",
    desc: "Disability assessment camp covering PHC-Kantaram, Downuru, U.Cheedipalem & RJ.Palem.",
    phcs: "Kantaram, Downuru, U.Cheedipalem, RJ.Palem",
    team: "Mr. Subhrashu Mishra, Mrs. Manju (Physiotherapist), Durga (Technician), Mr. Raj Kumar (Operations Manager)",
    beneficiaries: "38",
    image: rjPalemImg
  }
};

export default function EventDetail() {
  const { id } = useParams();
  const event = EVENTS_DB[id];

  if (!event) {
    return (
      <Section>
        <div className="text-center py-20">
          <h2 className="text-[28px] text-teal-deep mb-4 font-display">Event Not Found</h2>
          <p className="text-stone mb-6">The event you are looking for does not exist or has been removed.</p>
          <Button to="/" variant="primary">Back to home</Button>
        </div>
      </Section>
    );
  }

  return (
    <div>
      <SEO 
        title={event.title}
        description={event.desc}
        image={event.image}
        url={`/events/${id}`}
      />
      <PageHero
        trail={[{ label: "Events", to: "/" }, { label: event.title }]}
        eyebrow={event.eyebrow}
        title={event.title}
        desc={event.desc}
      />

      <Section tight revealChildren>
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 md:gap-12 items-start">
          <div className="space-y-6">
            <RevealOnScroll>
            <Link to="/" className="inline-flex items-center gap-2 text-[14px] font-bold text-teal hover:text-teal-deep mb-2">
              <ArrowLeft size={16} /> Back to home
            </Link>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.15}>
            <div className="space-y-4 text-stone text-[15.5px] leading-relaxed">
              <h4 className="text-[17px] font-bold text-teal-deep mb-2 font-display">Camp Details</h4>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li><strong>PHCs covered:</strong> {event.phcs}</li>
                <li><strong>Team:</strong> {event.team}</li>
                <li><strong>Beneficiaries assessed at this venue:</strong> {event.beneficiaries}</li>
              </ul>
              
              <h4 className="text-[17px] font-bold text-teal-deep mt-8 mb-2 font-display">About this Programme</h4>
              {SHARED_ABOUT.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
            <div className="pt-6 border-t border-line mt-8">
              <h4 className="text-[17px] font-bold text-teal-deep mb-3 font-display">Share this event or register query</h4>
              <p className="text-[14px] text-stone mb-4">Interested in participating, sponsoring, or volunteering for this event? Get in touch with our coordinating team.</p>
              <Button to="/contact" variant="primary" size="sm">Enquire About Event</Button>
            </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.15}>
          <div className="bg-white border border-line rounded-xl2 p-6 space-y-6 shadow-sm">
            <h3 className="text-[19px] font-bold text-teal-deep border-b border-line pb-3 font-display">Event Details</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <Calendar size={18} className="text-gold-dark mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-stone">Date</span>
                  <span className="text-[14px] font-bold text-teal-deep">{event.date}</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Clock size={18} className="text-gold-dark mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-stone">Time</span>
                  <span className="text-[14px] font-bold text-teal-deep">{event.time}</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin size={18} className="text-gold-dark mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-stone">Location</span>
                  <span className="text-[14px] font-bold text-teal-deep leading-normal">{event.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-line/60">
              <Photo 
                src={event.image}
                short 
                label={event.image ? `${event.title} consultation` : "Event visual (Placeholder: pending real photo)"} 
              />
              {!event.image && (
                <p className="text-[11.5px] text-stone text-center mt-2.5 italic">Note: Real venue photo pending</p>
              )}
            </div>
          </div>
          </RevealOnScroll>
        </div>
      </Section>
    </div>
  );
}
