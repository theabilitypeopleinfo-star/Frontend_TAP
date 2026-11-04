import React, { useState } from "react";
import { PageHero, Section, IconBullet, Button, RevealOnScroll, Eyebrow } from "../components/ui";
import { MapPin, Calendar, Flag, Flame, Sun, Moon, Gift, Star } from "lucide-react";
import { encryptPayload } from "../lib/encryptPayload";

const HOLIDAYS_2026 = [
  {
    month: "January",
    items: [
      { date: "14 JAN 2026", day: "WED", name: "Bhogi", icon: Flame },
      { date: "15 JAN 2026", day: "THU", name: "Sankranti", icon: Sun },
      { date: "16 JAN 2026", day: "FRI", name: "Kanuma", icon: Calendar },
      { date: "26 JAN 2026", day: "MON", name: "Republic Day", icon: Flag }
    ]
  },
  {
    month: "February",
    items: [{ date: "16 FEB 2026", day: "MON", name: "Maha Shivaratri", icon: Moon }]
  },
  {
    month: "March",
    items: [{ date: "19 MAR 2026", day: "THU", name: "Ugadi", icon: Star }]
  },
  {
    month: "August",
    items: [
      { date: "15 AUG 2026", day: "SAT", name: "Independence Day", icon: Flag },
      { date: "28 AUG 2026", day: "FRI", name: "Raksha Bandhan", icon: Gift }
    ]
  },
  {
    month: "September",
    items: [{ date: "14 SEP 2026", day: "MON", name: "Ganesh Puja", icon: Star }]
  },
  {
    month: "October",
    items: [
      { date: "2 OCT 2026", day: "FRI", name: "Gandhi Jayanti", icon: Star },
      { date: "20 OCT 2026", day: "TUE", name: "Dussehra (Vijayadashami)", icon: Star }
    ]
  },
  {
    month: "November",
    items: [{ date: "13 NOV 2026", day: "FRI", name: "Nagula Chavithi", icon: Star }]
  },
  {
    month: "December",
    items: [{ date: "25 DEC 2026", day: "FRI", name: "Christmas", icon: Gift }]
  }
];


export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General enquiry",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      return "Please enter your full name (at least 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (formData.phone && formData.phone.trim()) {
      const cleanPhone = formData.phone.trim().replace(/[\s\-\(\)\+]/g, "");
      if (cleanPhone.length < 7 || cleanPhone.length > 15 || !/^\d+$/.test(cleanPhone)) {
        return "Please enter a valid phone number (between 7 and 15 digits).";
      }
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      return "Please enter a message (at least 5 characters).";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side validation check
    const validationErr = validateForm();
    if (validationErr) {
      setErrorMessage(validationErr);
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const baseUrl = import.meta.env.VITE_CONTACT_API_URL || "http://localhost:4000";
    const endpoint = `${baseUrl}/api/contact`;

    try {
      // Encrypt form payload using Web Crypto API
      const encryptedPayload = await encryptPayload(formData);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(encryptedPayload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== false) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General enquiry",
          message: "",
          honeypot: "",
        });
      } else {
        // Detailed console logging of failed HTTP response
        console.error(`[Contact Form] Submission failed with status ${response.status} (${response.statusText}):`, {
          status: response.status,
          statusText: response.statusText,
          responseBody: data,
          endpoint,
        });

        // Determine specific user-friendly error message
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
          } else if (response.status === 415) {
            specificError = "Unsupported request format. Please refresh the page and try again.";
          } else if (response.status >= 500) {
            specificError = "Our mail server encountered an internal error. Please try again or contact us directly.";
          } else {
            specificError = `Request failed with error code ${response.status}.`;
          }
        }

        setErrorMessage(specificError);
        setStatus("error");
      }
    } catch (error) {
      // Detailed console logging of network / client exception
      console.error("[Contact Form] Exception occurred during submission:", {
        error: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error,
        endpoint,
      });

      let netErrorMsg = "Unable to send your message. ";
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

  return (
    <div>
      <PageHero
        trail={[{ label: "Contact us" }]}
        eyebrow="Get in touch"
        title="We're here to help"
        desc="We would be delighted to hear from you. Whether you are seeking rehabilitation services, looking to partner with us, support our mission, or volunteer, our team is here to assist you."
      />
      <Section tight revealChildren>
        <div className="max-w-4xl mx-auto">
          {/* Form Section - Constrained to max-w-2xl */}
          <RevealOnScroll>
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-[22px] text-teal-deep mb-4">Send a message</h2>
            {status === "success" ? (
              <div className="p-6 rounded-xl2 bg-peach text-teal-deep font-semibold">
                Message sent successfully!
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {status === "error" && (
                  <div className="p-4 mb-4 rounded-lg bg-red-50 text-red-800 text-[14px] border border-red-200">
                    <p className="font-semibold">{errorMessage || "Something went wrong."}</p>
                    <p className="mt-1 text-[13px] text-red-700">
                      If the issue persists, you can also email us directly at{" "}
                      <a href="mailto:connect@theabilitypeople.org" className="font-bold underline text-teal-deep hover:text-teal">
                        connect@theabilitypeople.org
                      </a>
                    </p>
                  </div>
                )}
                
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                  <Field
                    id="c-name"
                    name="name"
                    label="Full name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Field
                    id="c-email"
                    name="email"
                    label="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Field
                    id="c-phone"
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="c-subject" className="block text-[13.5px] font-bold text-teal-deep mb-1.5">Subject</label>
                  <select
                    id="c-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 border-[1.5px] border-line rounded-lg text-[14.5px] bg-white focus:border-teal outline-none"
                  >
                    <option>General enquiry</option>
                    <option>Referral</option>
                    <option>Volunteering</option>
                    <option>Media enquiry</option>
                    <option>Donation query</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="c-msg" className="block text-[13.5px] font-bold text-teal-deep mb-1.5">Message</label>
                  <textarea
                    id="c-msg"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 border-[1.5px] border-line rounded-lg text-[14.5px] bg-white focus:border-teal outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === "submitting"}
                  className="disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                >
                  {status === "submitting" ? "Sending..." : "Send message"}
                </Button>
              </form>
            )}
          </div>
          </RevealOnScroll>

          {/* Visit or call us Section */}
          <div className="border-t border-line/60 pt-12">
            <RevealOnScroll>
            <h2 className="text-[22px] text-teal-deep mb-6">Visit or call us</h2>
            </RevealOnScroll>
            
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Card 1: Registered Office */}
              <RevealOnScroll delay={0.15} className="h-full flex">
              <div className="bg-cream border border-line rounded-xl2 p-6 w-full flex flex-col hover:border-teal-light transition-all duration-300">
                <div className="flex-1">
                  <h3 className="font-bold text-teal-deep text-[16px] mb-3 font-display">Registered Office</h3>
                  <p className="text-[14px] text-stone leading-relaxed">
                    The Ability People, Ground Floor, SashiRaj Palace,<br />
                    # 49-27-10, Madhura Nagar, Saibaba Temple Road,<br />
                    Opp. Sravani Electronics, Near Seethammapeta Junction,<br />
                    Visakhapatnam – 530 016, Andhra Pradesh, INDIA
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-line/40 shrink-0">
                  <span className="block text-[11px] uppercase tracking-wide text-stone font-bold mb-0.5">Phone</span>
                  <a href="tel:+918914600066" className="font-mono font-semibold text-teal-deep hover:text-teal text-[14.5px]">+91-891-4600066</a>
                </div>
              </div>
              </RevealOnScroll>

              {/* Card 2: Ability Rehabilitation Centre (ARC) */}
              <RevealOnScroll delay={0.3} className="h-full flex">
              <div className="bg-cream border border-line rounded-xl2 p-6 w-full flex flex-col hover:border-teal-light transition-all duration-300">
                <h3 className="font-bold text-teal-deep text-[16px] mb-3 font-display">Ability Rehabilitation Centre (ARC)</h3>
                <p className="text-[14px] text-stone leading-relaxed flex-1">
                  # 28-21-2, 44th Ward, Sachivalaya Basement,<br />
                  Opp. Classic Complex, Behind Tummidi Brothers,<br />
                  GVMC DWACRA Bazar, Dabagardens,<br />
                  Visakhapatnam – 530 020
                </p>
              </div>
              </RevealOnScroll>

              {/* Card 3: Phone */}
              <RevealOnScroll delay={0.45} className="h-full flex">
              <div className="bg-cream border border-line rounded-xl2 p-6 w-full flex flex-col hover:border-teal-light transition-all duration-300">
                <h3 className="font-bold text-teal-deep text-[16px] mb-4 font-display">Phone</h3>
                <div className="space-y-3.5 flex-1">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-stone font-bold mb-0.5">Reception & Appointments</span>
                    <a href="tel:+918500365736" className="font-mono font-semibold text-teal-deep hover:text-teal text-[14.5px]">+91 85003 65736</a>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-stone font-bold mb-0.5">Office</span>
                    <a href="tel:+918985448911" className="font-mono font-semibold text-teal-deep hover:text-teal text-[14.5px]">+91 89854 48911</a>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-stone font-bold mb-0.5">Director's Office</span>
                    <div className="flex flex-col gap-0.5 font-body">
                      <a href="tel:+919177363600" className="font-mono font-semibold text-teal-deep hover:text-teal text-[14.5px]">+91 91773 63600</a>
                      <a href="tel:+916305136877" className="font-mono font-semibold text-teal-deep hover:text-teal text-[14.5px]">+91 63051 36877</a>
                    </div>
                  </div>
                </div>
              </div>
              </RevealOnScroll>

              {/* Card 4: Email */}
              <RevealOnScroll delay={0.6} className="h-full flex">
              <div className="bg-cream border border-line rounded-xl2 p-6 w-full flex flex-col hover:border-teal-light transition-all duration-300">
                <h3 className="font-bold text-teal-deep text-[16px] mb-4 font-display">Email</h3>
                <div className="space-y-3.5 font-body flex-1">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-stone font-bold mb-0.5">General Enquiries</span>
                    <a href="mailto:info@theabilitypeople.org" className="font-semibold text-teal hover:underline text-[14px]">info@theabilitypeople.org</a>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-stone font-bold mb-0.5">Rehabilitation Services</span>
                    <a href="mailto:aat@theabilitypeople.org" className="font-semibold text-teal hover:underline text-[14px]">aat@theabilitypeople.org</a>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-stone font-bold mb-0.5">Careers</span>
                    <a href="mailto:jobs@theabilitypeople.org" className="font-semibold text-teal hover:underline text-[14px]">jobs@theabilitypeople.org</a>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-stone font-bold mb-0.5">Human Resources</span>
                    <a href="mailto:hrd@theabilitypeople.org" className="font-semibold text-teal hover:underline text-[14px]">hrd@theabilitypeople.org</a>
                  </div>
                </div>
              </div>
              </RevealOnScroll>

              {/* Card 5: Office Hours */}
              <RevealOnScroll delay={0.75} className="h-full flex">
              <div className="bg-cream border border-line rounded-xl2 p-6 w-full flex flex-col hover:border-teal-light transition-all duration-300 font-body">
                <h3 className="font-bold text-teal-deep text-[16px] mb-4 font-display">Office hours</h3>
                <div className="space-y-3.5 flex-1">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-stone font-bold mb-0.5">Working Days</span>
                    <span className="font-semibold text-teal-deep text-[14.5px]">Monday to Saturday</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-stone font-bold mb-0.5">Office Timings</span>
                    <span className="font-semibold text-teal-deep text-[14.5px]">9:00 AM – 6:00 PM</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-stone font-bold mb-0.5">Weekly Holiday</span>
                    <span className="font-semibold text-stone text-[14.5px]">Sunday</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-[12px] italic text-stone">
                      * Emergency support is available by prior appointment.
                    </p>
                  </div>
                </div>
              </div>
              </RevealOnScroll>

              {/* Card 6: Map Embed */}
              <RevealOnScroll delay={0.9} className="h-full flex">
              <div className="border border-line rounded-xl2 overflow-hidden w-full flex shadow-sm hover:border-teal-light transition-all duration-300 h-[300px] md:h-full min-h-[300px]">
                <iframe
                  title="Ability Rehabilitation Centre Map"
                  src="https://maps.google.com/maps?q=17.713802,83.302048&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
              </RevealOnScroll>

            </div>

            {/* Approved Holidays */}
            <div className="mt-12">
              <RevealOnScroll delay={0.15}>
                <div className="bg-white border border-line rounded-xl2 p-6 md:p-8 hover:border-teal-light transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                  {/* Header Block */}
                  <div className="mb-8 md:mb-10 text-center md:text-left">
                    <span className="inline-block text-[11px] font-bold tracking-[0.15em] text-gold uppercase mb-2">Institutional Calendar</span>
                    <h3 className="font-display font-bold text-teal-deep text-[28px] md:text-[32px] leading-tight mb-3">Holiday Schedule 2026</h3>
                    <p className="text-[14.5px] text-stone leading-relaxed max-w-2xl font-body">
                      Here is the schedule of observed holidays for 2026, ensuring our team and community can rest and celebrate with dignity.
                    </p>
                  </div>
                  
                  {/* Month Groups */}
                  <div className="space-y-10">
                    {HOLIDAYS_2026.map((group) => (
                      <div key={group.month}>
                        {/* Month Heading & Pill */}
                        <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-teal-light/30">
                          <h4 className="font-display font-bold text-[22px] text-teal">{group.month}</h4>
                          <span className="px-2.5 py-0.5 rounded-full bg-gold/10 text-gold-dark text-[11px] font-bold uppercase tracking-wide">
                            {group.items.length} {group.items.length === 1 ? 'Holiday' : 'Holidays'}
                          </span>
                        </div>
                        
                        {/* Rows */}
                        <div className="flex flex-col">
                          {group.items.map((holiday, idx) => {
                            const Icon = holiday.icon || Calendar;
                            return (
                              <div 
                                key={holiday.name} 
                                className="group flex items-center justify-between py-4 border-b border-line/50 last:border-b-0 hover:bg-cream/40 transition-colors px-2 md:px-4 rounded-lg -mx-2 md:-mx-4 cursor-default"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="mt-1 w-9 h-9 rounded-full bg-teal/5 flex items-center justify-center shrink-0">
                                    <Icon size={16} className="text-teal" />
                                  </div>
                                  <div className="flex flex-col font-body">
                                    <span className="text-[15.5px] font-bold text-teal-deep mb-0.5 group-hover:text-teal transition-colors">{holiday.name}</span>
                                    <span className="text-[13px] font-semibold text-stone/80 tracking-wide">{holiday.date}</span>
                                  </div>
                                </div>
                                <div className="pr-1 md:pr-2">
                                  <span className="inline-block px-2.5 py-1 rounded bg-stone/5 text-stone text-[10.5px] font-bold tracking-wider group-hover:bg-teal/5 group-hover:text-teal transition-colors">
                                    {holiday.day}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[12.5px] italic text-stone mt-10 max-w-4xl leading-relaxed pt-6 border-t border-line/60">
                    Note: If any holiday is declared, modified, or rescheduled by the Government of Andhra Pradesh or the Government of India, the Management of The Ability People (TAP) reserves the right to revise this holiday list accordingly. Additional holidays, if any, may be notified separately.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Field({ id, label, type, required, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-[13.5px] font-bold text-teal-deep mb-1.5">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-3.5 py-3 min-h-[44px] border-[1.5px] border-line rounded-lg text-[14.5px] bg-white focus:border-teal outline-none"
      />
    </div>
  );
}
