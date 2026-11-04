import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/tap-logo-cropped.png";

const SocialIcon = ({ path, viewBox = "0 0 24 24" }) => (
  <svg width="15" height="15" viewBox={viewBox} fill="currentColor" aria-hidden="true">
    <path d={path} fillRule="evenodd" clipRule="evenodd" />
  </svg>
);

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/TheAbilityPeople", d: "M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.3C16.2 4.26 15.2 4.17 14 4.17c-2.4 0-4 1.47-4 4.16V10.5H7.5v3H10V21h3.5z" },
  { label: "Instagram", href: "https://www.instagram.com/theabilityppl?utm_source=qr&igsh=NTVybmhlZjkxaGx2", d: "M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zM12 2c-2.7 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47a4.9 4.9 0 0 0-1.77 1.15A4.9 4.9 0 0 0 2.53 5.45c-.25.64-.42 1.37-.47 2.43C2.01 8.94 2 9.3 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43.26.66.6 1.22 1.15 1.77.55.55 1.11.9 1.77 1.15.64.25 1.37.42 2.43.47C8.94 21.99 9.3 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47a4.9 4.9 0 0 0 1.77-1.15 4.9 4.9 0 0 0 1.15-1.77c.25-.64.42-1.37.47-2.43.05-1.06.06-1.42.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.15-1.77A4.9 4.9 0 0 0 18.55 2.53c-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.7 2 12 2z" },
  { label: "YouTube", href: "https://www.youtube.com/@theabilitypeople1", d: "M21.6 7.2s-.21-1.5-.86-2.16c-.82-.86-1.74-.86-2.16-.91C15.6 4 12 4 12 4h-.01s-3.6 0-6.58.13c-.42.05-1.34.05-2.16.91C2.6 5.7 2.4 7.2 2.4 7.2S2.19 8.94 2.19 10.68v1.63c0 1.74.21 3.48.21 3.48s.2 1.5.85 2.16c.82.86 1.9.83 2.38.92 1.73.17 7.35.22 7.35.22s3.6-.01 6.58-.13c.42-.05 1.34-.05 2.16-.91.65-.66.86-2.16.86-2.16s.21-1.74.21-3.48v-1.63c0-1.74-.21-3.48-.21-3.48zM9.98 14.6V8.9l5.6 2.86-5.6 2.84z" },
  { label: "LinkedIn", href: "https://in.linkedin.com/company/the-ability-people", d: "M6.94 8.5H3.56V20.4h3.38V8.5zM5.25 3.6a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 20.4h-3.37v-6.02c0-1.44-.03-3.28-2-3.28-2 0-2.31 1.56-2.31 3.17v6.13H9.4V8.5h3.24v1.63h.05c.45-.86 1.56-1.77 3.21-1.77 3.43 0 4.06 2.26 4.06 5.2v6.84z" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-[#DCE3E6] pt-12 md:pt-16 pb-6">
      <div className="max-w-wrap mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 sm:gap-10 mb-12">
          <div>
            <Link to="/" className="inline-block text-white mb-4">
              <img src={logo} alt="TAP Logo" className="h-10 w-auto object-contain bg-white/95 px-2.5 py-1 rounded-lg" />
            </Link>
            <p className="text-[13.5px] text-[#AEBBC0] max-w-[34ch] mb-5">
              The wind beneath your wheels — rehabilitation, assistive technology and dignity for every ability, across Andhra Pradesh.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${s.label}`}
                  className="h-11 w-11 min-w-[44px] min-h-[44px] rounded-full border border-white/15 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                >
                  <SocialIcon path={s.d} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-[14.5px] font-extrabold tracking-wide mb-4">About</h4>
            <FootLink to="/about">Our story</FootLink>
            <FootLink to="/about">Team & board</FootLink>
            <FootLink to="/impact">Our impact</FootLink>
            <FootLink to="/sponsors">Sponsors</FootLink>
            <FootLink to="/partners">Partners & memberships</FootLink>
          </div>

          <div>
            <h4 className="text-white text-[14.5px] font-extrabold tracking-wide mb-4">Our work</h4>
            <FootLink to="/rehab-therapy">Rehab therapy services</FootLink>
            <FootLink to="/rehab-aids">Rehab aids & appliances</FootLink>
            <FootLink to="/outreach">Outreach & independent living</FootLink>
            <FootLink to="/inpatient-services">In-patient services</FootLink>
            <FootLink to="/social-security-schemes">Social Security Schemes</FootLink>
            <FootLink to="/workflow">Our Process</FootLink>
            <FootLink to="/volunteer">Awareness programs</FootLink>
          </div>

          <div>
            <h4 className="text-white text-[14.5px] font-extrabold tracking-wide mb-4">Get involved</h4>
            <FootLink to="/donate">Donate</FootLink>
            <FootLink to="/careers">Careers</FootLink>
            <FootLink to="/volunteer">Volunteer</FootLink>
            <FootLink to="/media" state={{ tab: "publications" }}>Resources & reports</FootLink>
            <FootLink to="/media">Media</FootLink>
            <FootLink to="/contact">Contact us</FootLink>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-wrap justify-between gap-3 text-[12.5px] text-[#8B9BA1]">
          <span>© {new Date().getFullYear()} The Ability People (TAP). All rights reserved.</span>
          <span>Ability Rehabilitation Centre (ARC), Visakhapatnam, Andhra Pradesh</span>
        </div>
      </div>
    </footer>
  );
}

function FootLink({ to, state, children }) {
  return (
    <Link to={to} state={state} className="block text-[13.5px] text-[#AEBBC0] mb-2.5 hover:text-gold transition-colors">
      {children}
    </Link>
  );
}
