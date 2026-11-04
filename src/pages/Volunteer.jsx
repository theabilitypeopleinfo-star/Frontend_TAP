import React, { useState } from "react";
import { PageHero, Section, Photo, Card, CTABand, Button, RevealOnScroll } from "../components/ui";
import { encryptPayload } from "../lib/encryptPayload";

import awarenessImg from "../assets/IMG_7729.JPG";
import schoolsImg from "../assets/IMG_7571.JPG";
import corporateImg from "../assets/IMG_7585 (1).JPG";
import ruralImg from "../assets/IMG_7234.jpg";

const SESSIONS = [
  {
    title: "Schools & College Campaigns",
    desc: "Interactive sessions highlighting inclusion, accessibility barriers, and educating youth on locomotor disabilities. Includes early identification checklists for teaching staff.",
    label: "Speaker presenting to students in a school assembly room",
    src: schoolsImg,
  },
  {
    title: "Corporate Sensitivity Workshops",
    desc: "Empowering workplaces to build inclusive hiring pipelines, adapt digital interfaces, and design barrier-free infrastructure for employees of all abilities.",
    label: "Adults participating in a workplace sensitivity training workshop",
    src: corporateImg,
  },
  {
    title: "Rural Community Camps",
    desc: "Grassroots awareness camps in village hubs explaining available schemes under the National Trust, disability certification paths, and early intervention benefits.",
    label: "Outreach clinical staff speaking with village community members",
    src: ruralImg,
  },
];

export default function Volunteer() {
  return (
    <div>
      <PageHero
        trail={[{ label: "Get involved", to: "/donate" }, { label: "Volunteer" }]}
        eyebrow="VOLUNTEER"
        title="Give your time to this work"
        desc="We match volunteers with opportunities based on background, availability, and specific clinical or operational needs."
      />

      <Section tight revealChildren>
        {/* VOLUNTEER SECTION */}
        <div className="max-w-4xl mx-auto mb-16">
          <RevealOnScroll>
            <VolunteerForm />
          </RevealOnScroll>

          <div className="space-y-6 mt-16">
            <RevealOnScroll>
              <div>
                <h3 className="text-[20px] text-teal-deep mb-2 font-display font-bold">How you can volunteer</h3>
                <p className="text-[14.5px] text-stone leading-relaxed">
                  Every role at TAP, whether clinical or operational, moves someone closer to physical independence and community dignity.
                </p>
              </div>
            </RevealOnScroll>
            <div className="space-y-4">
              <RevealOnScroll delay={0.15}>
                <div className="p-5 border border-line rounded-xl2 bg-white hover:border-teal-light transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md">
                  <h4 className="text-[16px] font-bold text-teal-deep mb-1 font-display">Clinical Support</h4>
                  <p className="text-[13.5px] text-stone leading-relaxed">
                    Assist therapists during rural outreach camps or in-patient rehabilitation sessions. Relevant background (PT/OT students) preferred.
                  </p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.3}>
                <div className="p-5 border border-line rounded-xl2 bg-white hover:border-teal-light transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md">
                  <h4 className="text-[16px] font-bold text-teal-deep mb-1 font-display">Event & Admin Support</h4>
                  <p className="text-[13.5px] text-stone leading-relaxed">
                    Help organize fundraising galas, school inclusion drives, or assist with data entry and impact evaluation reports at the office.
                  </p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.45}>
                <div className="p-5 border border-line rounded-xl2 bg-white hover:border-teal-light transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md">
                  <h4 className="text-[16px] font-bold text-teal-deep mb-1 font-display">Skills-Based Remote Volunteering</h4>
                  <p className="text-[13.5px] text-stone leading-relaxed">
                    Contribute your specialized skills in graphic design, copy writing, social media management, or translation remotely.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        {/* AWARENESS PROGRAMS SECTION */}
        <div className="border-t border-line/60 pt-16">
          <RevealOnScroll>
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-[32px] text-teal-deep leading-tight font-display mb-3">Awareness Programs</h2>
              <p className="text-[16px] text-stone leading-relaxed">
                Promoting disability inclusion and early identification by educating schools, corporate workspaces, and rural communities on physical accessibility, dignity, and available support schemes.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16 max-w-5xl mx-auto">
              <RevealOnScroll type="image">
                <Photo src={awarenessImg} tall label="Staff member presenting slides during an accessibility workshop" />
              </RevealOnScroll>
              <div>
                <h2 className="text-[26px] text-teal-deep mb-4 font-display">Why we educate</h2>
                <p className="text-stone mb-4 leading-relaxed">
                  Rehabilitation is only half the battle. True integration requires building an inclusive society that understands accessibility and values disability rights.
                </p>
                <p className="text-stone mb-6 leading-relaxed">
                  Our awareness campaigns bridge this gap by debunking myths, helping families spot locomotor issues early in childhood, and providing corporate entities the tools to hire inclusively.
                </p>
                <Button to="/contact" variant="outline" size="sm">Download awareness resources</Button>
              </div>
            </div>
          </RevealOnScroll>

          <div className="border-t border-line/60 pt-12">
            <RevealOnScroll>
              <div className="text-center mb-10 max-w-xl mx-auto">
                <span className="eyebrow text-gold-dark text-[13px] font-bold uppercase tracking-[0.12em] mb-3.5 block justify-center flex items-center gap-2">
                  <span className="h-[2px] w-7 bg-gold" /> Session Types
                </span>
                <h2 className="text-[28px] text-teal-deep leading-tight font-display mb-3">Our educational focus areas</h2>
                <p className="text-[15.5px] text-stone">We tailor our campaigns to different audiences for maximum educational impact.</p>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-6">
              {SESSIONS.map((s, idx) => (
                <RevealOnScroll key={s.title} delay={Math.min(idx * 0.1, 0.6)}>
                  <Card>
                    <RevealOnScroll type="image">
                      <Photo src={s.src} short label={s.label} />
                    </RevealOnScroll>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[18px] text-teal-deep font-bold mb-3 font-display">{s.title}</h3>
                        <p className="text-[14px] text-stone leading-relaxed mb-5">{s.desc}</p>
                      </div>
                      <Button to="/contact" variant="outline" size="sm" className="w-full justify-center">
                        Request session
                      </Button>
                    </div>
                  </Card>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </Section>

    </div>
  );
}

function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Clinical Support",
    skills: "",
    availability: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setStatus("submitting");

    const baseUrl = import.meta.env.VITE_CONTACT_API_URL || "http://localhost:4000";
    const endpoint = `${baseUrl}/api/volunteer-application`;

    try {
      // Encrypt form payload using AES-256-GCM via Web Crypto API
      const encryptedPayload = await encryptPayload(formData);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(encryptedPayload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== false) {
        setStatus("success");
      } else {
        console.error(`[Volunteer Form] Submission failed with status ${response.status} (${response.statusText}):`, {
          status: response.status,
          statusText: response.statusText,
          responseBody: data,
          endpoint,
        });

        let specificError = "";
        if (data.errors && typeof data.errors === "object") {
          const fieldMsgs = Object.values(data.errors).flat().filter(Boolean);
          if (fieldMsgs.length > 0) {
            specificError = fieldMsgs.join(" ");
          }
        }

        if (!specificError && data.message) {
          specificError = data.message;
        }

        if (!specificError) {
          if (response.status === 429) {
            specificError = "Too many requests. Please wait a few minutes before trying again.";
          } else if (response.status >= 500) {
            specificError = "Our server encountered an internal error. Please try again or contact us directly.";
          } else {
            specificError = `Submission failed (Error code ${response.status}).`;
          }
        }

        setErrorMessage(specificError);
        setStatus("error");
      }
    } catch (error) {
      console.error("[Volunteer Form] Exception occurred during submission:", {
        error: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error,
        endpoint,
      });

      let netErrorMsg = "Unable to submit your application. ";
      if (error instanceof TypeError && error.message.includes("fetch")) {
        netErrorMsg = "Could not connect to the backend server. Please verify your internet connection or that the server is running.";
      } else if (error instanceof Error && error.message) {
        netErrorMsg += error.message;
      } else {
        netErrorMsg += "An unexpected error occurred.";
      }

      setErrorMessage(netErrorMsg);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 rounded-xl2 bg-peach text-teal-deep font-bold border border-line text-center text-[18px]">
        Thanks — we'll be in touch soon.
      </div>
    );
  }

  return (
    <div className="bg-cream border border-line rounded-xl2 p-4 sm:p-8 md:p-10">
      <h3 className="text-[20px] sm:text-[24px] text-teal-deep mb-6 font-display font-bold">Apply to volunteer</h3>
      <form onSubmit={handleSubmit}>
        {/* Hidden Honeypot Field */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
        />
        {status === "error" && (
          <div className="p-4 mb-6 rounded-lg bg-red-50 text-red-800 text-[14.5px] border border-red-200">
            <p className="font-semibold">{errorMessage || "Something went wrong."}</p>
            <p className="mt-1 text-[13px] text-red-700">
              If the issue persists, you can also email us directly at{" "}
              <a href="mailto:info@theabilitypeople.org" className="font-bold underline text-teal-deep hover:text-teal">
                info@theabilitypeople.org
              </a>
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <div className="mb-4">
            <label className="block text-[13.5px] font-bold text-teal-deep mb-1.5">Full name</label>
            <input name="name" type="text" required value={formData.name} onChange={handleChange} className="w-full px-3.5 py-3 min-h-[44px] border-[1.5px] border-line rounded-lg text-[14.5px] bg-white focus:border-teal outline-none" />
          </div>
          <div className="mb-4">
            <label className="block text-[13.5px] font-bold text-teal-deep mb-1.5">Email</label>
            <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full px-3.5 py-3 min-h-[44px] border-[1.5px] border-line rounded-lg text-[14.5px] bg-white focus:border-teal outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <div className="mb-4">
            <label className="block text-[13.5px] font-bold text-teal-deep mb-1.5">Phone Number</label>
            <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="w-full px-3.5 py-3 min-h-[44px] border-[1.5px] border-line rounded-lg text-[14.5px] bg-white focus:border-teal outline-none" />
          </div>
          <div className="mb-4">
            <label className="block text-[13.5px] font-bold text-teal-deep mb-1.5">Volunteering Interest</label>
            <select name="interest" required value={formData.interest} onChange={handleChange} className="w-full px-3.5 py-3 min-h-[44px] border-[1.5px] border-line rounded-lg text-[14.5px] bg-white focus:border-teal outline-none">
              <option>Clinical Support</option>
              <option>Event & Admin Support</option>
              <option>Skills-Based Remote Volunteering</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[13.5px] font-bold text-teal-deep mb-1.5">Availability <span className="font-normal text-stone ml-1">(e.g. weekends, remote-only, specific days)</span></label>
          <input name="availability" type="text" required value={formData.availability} onChange={handleChange} className="w-full px-3.5 py-3 min-h-[44px] border-[1.5px] border-line rounded-lg text-[14.5px] bg-white focus:border-teal outline-none" />
        </div>

        <div className="mb-4">
          <label className="block text-[13.5px] font-bold text-teal-deep mb-1.5">Relevant background/skills <span className="font-normal text-stone ml-1">(Optional)</span></label>
          <textarea name="skills" rows={2} value={formData.skills} onChange={handleChange} className="w-full px-3.5 py-3 border-[1.5px] border-line rounded-lg text-[14.5px] bg-white focus:border-teal outline-none" placeholder="e.g. PT/OT student, graphic design..." />
        </div>

        <div className="mb-6">
          <label className="block text-[13.5px] font-bold text-teal-deep mb-1.5">Message / additional details <span className="font-normal text-stone ml-1">(Optional)</span></label>
          <textarea name="message" rows={3} value={formData.message} onChange={handleChange} className="w-full px-3.5 py-3 border-[1.5px] border-line rounded-lg text-[14.5px] bg-white focus:border-teal outline-none" />
        </div>

        <Button type="submit" variant="primary" disabled={status === "submitting"} className="w-full sm:w-auto min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed">
          {status === "submitting" ? "Submitting..." : "Apply to volunteer"}
        </Button>
      </form>
    </div>
  );
}
