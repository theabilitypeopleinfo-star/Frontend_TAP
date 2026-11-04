import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { PageHero, Section, Tabs, Photo, CTABand, Button, Pill, RevealOnScroll } from "../components/ui";
import { NEWS_ARTICLES } from "../data/newsArticles";


// Import gallery images
import gallery1 from "../assets/IMG20250102162413.jpg";
import gallery2 from "../assets/IMG20250102163814.jpg";
import gallery3 from "../assets/IMG20250102164501.jpg";
import gallery4 from "../assets/WhatsApp Image 2026-02-10 at 3.23.42 PM.jpg";
import gallery5 from "../assets/WhatsApp Image 2026-02-10 at 3.23.43 PM.jpg";
import gallery6 from "../assets/WhatsApp Image 2026-02-10 at 3.27.39 PM.jpg";
import gallery7 from "../assets/WhatsApp Image 2026-07-07 at 9.38.36 PM.jpeg";
import gallery8 from "../assets/IMG_20250822_114248 (1).jpg";
import gallery9 from "../assets/IMG_7708.JPG";
import gallery10 from "../assets/IMG-20250228-WA0138.jpg";

import rehab1 from "../assets/WhatsApp Image 2026-07-14 at 2.56.54 PM.jpeg";
import rehab2 from "../assets/WhatsApp Image 2026-07-14 at 2.56.55 PM.jpeg";
import rehab3 from "../assets/WhatsApp Image 2026-07-14 at 2.56.57 PM.jpeg";
import rehab4 from "../assets/WhatsApp Image 2026-07-14 at 2.57.10 PM.jpeg";
import rehab5 from "../assets/WhatsApp Image 2026-07-14 at 2.57.15 PM.jpeg";
import rehab6 from "../assets/WhatsApp Image 2026-07-14 at 2.57.20 PM.jpeg";
import rehab7 from "../assets/WhatsApp Image 2026-07-14 at 2.57.22 PM.jpeg";
import rehab8 from "../assets/WhatsApp Image 2026-07-14 at 2.58.55 PM.jpeg";
import rehab9 from "../assets/WhatsApp Image 2026-07-14 at 3.04.12 PM.jpeg";
import rehab10 from "../assets/WhatsApp Image 2026-07-14 at 3.04.12 PM (2).jpeg";
import rehab11 from "../assets/WhatsApp Image 2026-07-14 at 3.04.13 PM (1).jpeg";


import annualReport2223Pdf from "../assets/2022-2023  report.pdf";
import annualReport2324Pdf from "../assets/the ability people Annual Report 2023-2024 .pdf.pdf";
import brochure2026Pdf from "../assets/Brochure 2026.pdf";
import flyer2026Pdf from "../assets/Flyer 2026.pdf";

const TABS = [
  { id: "news", label: "Print Media" },
  { id: "articles", label: "News Articles" },
  { id: "tv", label: "Digital Media" },
  { id: "gallery", label: "Photo gallery" },
  { id: "publications", label: "Publications" },
];

const NEWS_COVERAGE = [
  {
    title: `The Hindu — "The wind beneath their wheels"`,
    desc: "Feature on TAP's rural rehabilitation work.",
    tag: "External link",
    url: "https://www.thehindu.com/news/cities/Visakhapatnam/crippling-accident-did-not-deter-him-in-visakhapatnam/article6394768.ece",
  },
  {
    title: "Deccan Chronicle — Founder interview",
    desc: "Dilip Patro discusses two decades of disability rehabilitation.",
    tag: "External link",
    url: "https://sociostory.org/impact-stories/a-road-crash-survivor-himself-dilip-patro-is-now-on-a-mission-to-give-a-new-lease-of-life-to-people-with-spinal-cord-injuries",
  },
];

const GALLERY_IMAGES = [
  { src: gallery1, label: "Community outreach camp" },
  { src: gallery2, label: "Therapy session" },
  { src: gallery3, label: "Fundraising event" },
  { src: gallery4, label: "Device distribution" },
  { src: gallery5, label: "Rehabilitation support" },
  { src: gallery6, label: "Patient mobility training" },
  { src: gallery7, label: "Group photo at TAP" },
  { src: gallery8, label: "Clinical checkup" },
  { src: gallery9, label: "Assisting a patient" },
  { src: gallery10, label: "Community consultation" },
];

const REHAB_IMAGES = [
  { src: rehab1, label: "Prosthetics/orthotics workshop with tools and equipment" },
  { src: rehab2, label: "Physiotherapy equipment room (traction/exercise devices)" },
  { src: rehab3, label: "Patient ward with two beds" },
  { src: rehab4, label: "Treatment room with therapy tables and leg equipment box" },
  { src: rehab5, label: "Rehabilitation gym with wheelchairs, treadmill, parallel bars" },
  { src: rehab6, label: "Rehabilitation gym wide shot with overhead sling/lift equipment" },
  { src: rehab7, label: "Ward room with three beds" },
  { src: rehab8, label: "Ward room with two beds and orange mat" },
  { src: rehab9, label: "Prosthetics workshop close-up with materials and cardboard boxes" },
  { src: rehab10, label: "Ward room with two floral-bedsheet beds" },
  { src: rehab11, label: "Rehabilitation gym with red curtains and equipment (wide angle)" },
];

const REPORTS = [
  { 
    title: "Annual Report 2023-24", 
    size: "PDF, 4.1 MB", 
    desc: "A comprehensive review of our operations, audited financials, and clinical milestones for the year 2023-24.",
    url: annualReport2324Pdf
  },
  { 
    title: "Annual Report 2022-23", 
    size: "PDF, 10.0 MB", 
    desc: "A comprehensive review of our operations, audited financials, and clinical milestones for the year 2022-23.",
    url: annualReport2223Pdf
  },
];



const BROCHURES = [
  { 
    title: "TAP Brochure 2026", 
    size: "PDF, 4.8 MB", 
    desc: "A comprehensive overview of our 2026 initiatives, programmes, and impact goals.",
    url: brochure2026Pdf
  },
  { 
    title: "TAP Flyer 2026", 
    size: "PDF, 4.7 MB", 
    desc: "A quick-reference guide highlighting our key services and how to get involved in 2026.",
    url: flyer2026Pdf
  },
];

export default function Media() {
  const location = useLocation();
  const [tab, setTab] = useState(location.state?.tab || "news");
  const [visibleCount, setVisibleCount] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const initialCount = 4;
  
  const cleanArticles = NEWS_ARTICLES.map(a => ({ ...a, title: a.title.replace(/^[\d\-]+\s*/, '') }));
  const filteredArticles = cleanArticles.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const articlesListRef = useRef(null);

  useEffect(() => {
    if (location.state?.tab) {
      setTab(location.state.tab);
    }
  }, [location.state]);

  return (
    <div>
      <PageHero trail={[{ label: "Media" }]} eyebrow="TAP in the news" title="Press coverage & media resources" desc="Coverage of our work, and a media kit for journalists." />
      <Section tight revealChildren>
        <RevealOnScroll>
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
        </RevealOnScroll>

        {tab === "news" && (
          <RevealOnScroll>
          <div>
            {NEWS_COVERAGE.map((item, idx) => (
              <RevealOnScroll key={idx} delay={Math.min(idx * 0.1, 0.6)}>
              <Row
                title={item.title}
                desc={item.desc}
                tag={item.tag}
                href={item.url}
              />
              </RevealOnScroll>
            ))}
          </div>
          </RevealOnScroll>
        )}

        {tab === "articles" && (
          <RevealOnScroll>
          <div className="flex flex-col gap-4">
            <div className="mb-4" ref={articlesListRef}>
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(initialCount); // Reset pagination on search
                }}
                className="w-full max-w-md px-4 py-2 border border-line rounded-lg focus:outline-none focus:border-teal transition-colors font-body text-[15px]"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              {displayedArticles.map((item, idx) => (
                <RevealOnScroll key={item.fileName} delay={Math.min((idx % initialCount) * 0.05, 0.6)}>
                <NewsArticleRow
                  title={item.title}
                  fileName={item.fileName}
                  fileType={item.fileType}
                  filePath={item.filePath}
                />
                </RevealOnScroll>
              ))}
              
              {filteredArticles.length === 0 && (
                <div className="py-8 text-center text-stone">No articles found matching "{searchQuery}".</div>
              )}
              
              {(visibleCount < filteredArticles.length || visibleCount > initialCount) && (
                <div className="mt-8 flex justify-center gap-4">
                  {visibleCount < filteredArticles.length && (
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => setVisibleCount(p => p + 4)}
                    >
                      Load more articles
                    </Button>
                  )}
                  
                  {visibleCount > initialCount && (
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => {
                        setVisibleCount(initialCount);
                        // Smoothly scroll back to the top of the news articles section
                        if (articlesListRef.current) {
                          articlesListRef.current.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Show less
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
          </RevealOnScroll>
        )}

        {tab === "tv" && (
          <RevealOnScroll>
          <div className="flex flex-col gap-6 mt-2">
            <p className="text-[14px] text-stone italic">Click on any title below to watch the video.</p>
            <RevealOnScroll delay={0.15}>
            <div>
              <a
                href="https://www.youtube.com/watch?v=DBdHKNnoWXI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[18px] font-bold text-teal-deep hover:underline font-display block"
              >
                Dilip Patro Service for Accident Victims Through The Ability People Organisation
              </a>
            </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
            <div>
              <a
                href="https://www.youtube.com/watch?v=G64O23gH1wc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[18px] font-bold text-teal-deep hover:underline font-display block"
              >
                Dilip Kumar Patro Exclusive Interview
              </a>
            </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.45}>
            <div>
              <a
                href="https://www.youtube.com/watch?v=VPdos-HCZ38"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[18px] font-bold text-teal-deep hover:underline font-display block"
              >
                Interview with Dilip Patro
              </a>
            </div>
            </RevealOnScroll>
          </div>
          </RevealOnScroll>
        )}

        {tab === "gallery" && (
          <div>
            <RevealOnScroll>
            <div className="mb-6">
              <h3 className="text-[20px] text-teal-deep font-bold">Inside Our Rehabilitation Center</h3>
            </div>
            </RevealOnScroll>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {GALLERY_IMAGES.map((img, idx) => (
                <RevealOnScroll key={idx} delay={Math.min(idx * 0.1, 0.6)} type="image">
                <Photo src={img.src} short label={img.label} />
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll>
            <div className="mt-12 mb-6">
              <h3 className="text-[20px] text-teal-deep font-bold">Ability Rehabilitation Center</h3>
            </div>
            </RevealOnScroll>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {REHAB_IMAGES.map((img, idx) => (
                <RevealOnScroll key={`rehab-${idx}`} delay={Math.min(idx * 0.1, 0.6)} type="image">
                <Photo src={img.src} short label={img.label} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        )}

        {tab === "publications" && (
          <div className="space-y-12 max-w-4xl">
            <RevealOnScroll>
            <div>
              <h3 className="text-[20px] text-teal-deep mb-4 font-bold">Annual & Impact Reports</h3>
              <div className="space-y-4">
                {REPORTS.map((r, idx) => <RevealOnScroll key={r.title} delay={Math.min(idx * 0.1, 0.6)}><ResourceRow r={r} /></RevealOnScroll>)}
              </div>
            </div>
            </RevealOnScroll>
            <RevealOnScroll>
            <div>
              <h3 className="text-[20px] text-teal-deep mb-4 font-bold">Monthly Newsletters</h3>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-5 border border-line rounded-xl2 bg-white hover:border-teal-light transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md">
                <div>
                  <h4 className="text-[17px] font-bold text-teal-deep mb-1 font-display flex items-center gap-2 flex-wrap">
                    TAP Monthly Newsletters
                  </h4>
                  <p className="text-[14px] text-stone leading-relaxed max-w-[65ch]">
                    Read our monthly updates on clinical progress, outreach expansions, and community highlights.
                  </p>
                </div>
                <Button to="/newsletters" variant="outline" size="sm" className="h-fit w-fit">
                  View Newsletters
                </Button>
              </div>
            </div>
            </RevealOnScroll>
            <RevealOnScroll>
            <div>
              <h3 className="text-[20px] text-teal-deep mb-4 font-bold">Brochures & Flyers</h3>
              <div className="space-y-4">
                {BROCHURES.map((r, idx) => <RevealOnScroll key={r.title} delay={Math.min(idx * 0.1, 0.6)}><ResourceRow r={r} /></RevealOnScroll>)}
              </div>
            </div>
            </RevealOnScroll>
          </div>
        )}
      </Section>

      <CTABand title="Working on a story?" desc="Our team can provide interviews, data, and high-resolution photography on request.">
        <Button to="/contact" variant="primary">Contact our media team</Button>
      </CTABand>
    </div>
  );
}

function Row({ date, title, desc, tag, href }) {
  return (
    <div className="flex gap-5 py-5 border-b border-line last:border-b-0 items-start">
      {date && <div className="min-w-[80px] font-bold text-teal text-[13.5px]">{date}</div>}
      <div className="flex-1">
        <h4 className="text-[16.5px] text-teal-deep mb-1">{title}</h4>
        <p className="text-[14px] text-stone">{desc}</p>
      </div>
      {tag && (
        href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Pill>{tag}</Pill>
          </a>
        ) : (
          <Pill>{tag}</Pill>
        )
      )}
    </div>
  );
}

function NewsArticleRow({ title, fileName, fileType, filePath }) {
  return (
    <div className="flex gap-5 py-5 border-b border-line last:border-b-0 items-start">
      <div className="flex-1">
        <h4 className="text-[16.5px] text-teal-deep mb-1 flex items-center gap-2 flex-wrap">
          {title}
          <span className="inline-block px-2 py-0.5 rounded bg-cream border border-line text-[10px] font-bold text-stone uppercase tracking-wider">
            {fileType === 'pdf' ? 'PDF' : 'Image'}
          </span>
        </h4>
        <p className="text-[14px] text-stone">
          Click View {fileType === 'pdf' ? 'PDF' : 'Image'} to {fileType === 'pdf' ? 'read' : 'view'} the full article
        </p>
      </div>
      {filePath ? (
        <a
          href={filePath}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          <Pill>View {fileType === 'pdf' ? 'PDF' : 'Image'}</Pill>
        </a>
      ) : (
        <span className="opacity-50 cursor-not-allowed whitespace-nowrap" title="File not yet uploaded">
          <div className="pointer-events-none">
            <Pill>View {fileType === 'pdf' ? 'PDF' : 'Image'}</Pill>
          </div>
        </span>
      )}
    </div>
  );
}

function ResourceRow({ r }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-5 border border-line rounded-xl2 bg-white hover:border-teal-light transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md">
      <div>
        <h4 className="text-[17px] font-bold text-teal-deep mb-1 font-display flex items-center gap-2 flex-wrap">
          {r.title}
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-cream border border-line text-[11px] font-body text-stone">
            {r.size}
          </span>
        </h4>
        <p className="text-[14px] text-stone leading-relaxed max-w-[65ch]">{r.desc}</p>
      </div>
      {r.url ? (
        <Button 
          href={r.url}
          download
          variant="outline" 
          size="sm"
          className="h-fit w-fit"
        >
          Download
        </Button>
      ) : (
        <Button 
          onClick={() => alert("This is a design prototype — report downloads will be active upon live asset linking.")} 
          variant="outline" 
          size="sm"
          className="h-fit w-fit"
        >
          Download
        </Button>
      )}
    </div>
  );
}
