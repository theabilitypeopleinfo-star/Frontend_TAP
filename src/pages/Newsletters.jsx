import React from "react";
import { PageHero, Section, CTABand, Button, RevealOnScroll } from "../components/ui";

import jan2026Pdf from "../assets/January 2026 News Letter .pdf";
import feb2026Pdf from "../assets/Feburary News Letter  (1).pdf";
import may2026Pdf from "../assets/May Newsletter (1).pdf";
import june2026Pdf from "../assets/June newsletter.pdf";

import apr2025Pdf from "../assets/newsletters/2025/2025-04.pdf";
import may2025Pdf from "../assets/newsletters/2025/2025-05.pdf";
import june2025Pdf from "../assets/newsletters/2025/2025-06.pdf";
import july2025Pdf from "../assets/newsletters/2025/2025-07.pdf";
import aug2025Pdf from "../assets/newsletters/2025/2025-08.pdf";
import sept2025Pdf from "../assets/newsletters/2025/2025-09.pdf";
import oct2025Pdf from "../assets/newsletters/2025/2025-10.pdf";
import nov2025Pdf from "../assets/newsletters/2025/2025-11.pdf";
import dec2025Pdf from "../assets/December Month News Letter.pdf";

const NEWSLETTERS_DATA = [
  {
    group: "Monthly Newsletters of 2026",
    items: [
      { month: "January", year: "2026", fileUrl: jan2026Pdf },
      { month: "February", year: "2026", fileUrl: feb2026Pdf },
      { month: "March", year: "2026", fileUrl: "#" },
      { month: "April", year: "2026", fileUrl: "#" },
      { month: "May", year: "2026", fileUrl: may2026Pdf },
      { month: "June", year: "2026", fileUrl: june2026Pdf },
      { month: "July", year: "2026", fileUrl: "#" },
      { month: "August", year: "2026", fileUrl: "#" },
      { month: "September", year: "2026", fileUrl: "#" },
      { month: "October", year: "2026", fileUrl: "#" },
      { month: "November", year: "2026", fileUrl: "#" },
      { month: "December", year: "2026", fileUrl: "#" },
    ]
  },
  {
    group: "Monthly Newsletters of 2025",
    items: [
      { month: "April", year: "2025", fileUrl: apr2025Pdf },
      { month: "May", year: "2025", fileUrl: may2025Pdf },
      { month: "June", year: "2025", fileUrl: june2025Pdf },
      { month: "July", year: "2025", fileUrl: july2025Pdf },
      { month: "August", year: "2025", fileUrl: aug2025Pdf },
      { month: "September", year: "2025", fileUrl: sept2025Pdf },
      { month: "October", year: "2025", fileUrl: oct2025Pdf },
      { month: "November", year: "2025", fileUrl: nov2025Pdf },
      { month: "December", year: "2025", fileUrl: dec2025Pdf },
    ]
  }
];

export default function Newsletters() {
  return (
    <div>
      <PageHero
        trail={[{ label: "Media", to: "/media" }, { label: "Newsletters" }]}
        eyebrow="Monthly Newsletters"
        title="Stay updated with TAP"
        desc="Read our monthly updates on clinical progress, outreach expansions, and community highlights."
      />
      <Section tight revealChildren>
        <div className="max-w-4xl mx-auto space-y-12">
          {NEWSLETTERS_DATA.map((group, groupIdx) => (
            <RevealOnScroll key={group.group} delay={Math.min(groupIdx * 0.1, 0.6)}>
            <div>
              <h3 className="text-[20px] text-teal-deep mb-6 font-bold">{group.group}</h3>
              <div className="space-y-4">
                {group.items.map((item, idx) => (
                  <RevealOnScroll key={idx} delay={Math.min(idx * 0.1, 0.6)}>
                    <NewsletterRow item={item} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>
      <CTABand title="Subscribe to receive printed newsletters" desc="Would you like to receive our printed newsletters directly in your mailbox?">
        <Button to="/contact" variant="primary">Contact our team</Button>
      </CTABand>
    </div>
  );
}

function NewsletterRow({ item }) {
  const title = `Monthly Newsletter — ${item.month} ${item.year}`;
  const desc = `Overview of activities, events, and updates for ${item.month} ${item.year}.`;
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-5 border border-line rounded-xl2 bg-white hover:border-teal-light transition-all duration-300">
      <div>
        <h4 className="text-[17px] font-bold text-teal-deep mb-1 font-display flex items-center gap-2 flex-wrap">
          {title}
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-cream border border-line text-[11px] font-body text-stone">
            PDF
          </span>
        </h4>
        <p className="text-[14px] text-stone leading-relaxed max-w-[65ch]">{desc}</p>
      </div>
      {item.fileUrl ? (
        <Button 
          href={item.fileUrl}
          download
          variant="outline" 
          size="sm"
          className="h-fit w-fit"
        >
          Download
        </Button>
      ) : (
        <Button 
          disabled
          variant="outline" 
          size="sm"
          className="h-fit w-fit opacity-50 cursor-not-allowed"
        >
          Coming soon
        </Button>
      )}
    </div>
  );
}
