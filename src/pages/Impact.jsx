import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { PageHero, Section, Tabs, StatCard, Card, Photo, CTABand, Button, RevealOnScroll } from "../components/ui";
import ReachMap from "../components/ReachMap";
import meeraImg from "../assets/IMG_20250822_114337 (1).jpg";
import tailoringImg from "../assets/IMG_7746.JPG";
import homeCareImg from "../assets/IMG_20260105_182908.jpg";

const TABS = [
  { id: "dashboard", label: "Impact dashboard" },
  { id: "stories", label: "Impact stories" },
];

const CUMULATIVE_DATA = [
  { year: "2019-20", need: 1175, provided: 705 },
  { year: "2020-21", need: 2274, provided: 1071 },
  { year: "2021-22", need: 2853, provided: 1566 },
  { year: "2022-23", need: 3467, provided: 2469 },
  { year: "2023-24", need: 4649, provided: 3482 },
  { year: "2024-25", need: 6978, provided: 4762 },
  { year: "2025-26", need: 8780, provided: 5878 }
];

const YEARLY_DATA = [
  { year: "2019-20", total: 705, breakdown: { "Prosthetic & Orthotics": 118, "Rehab Therapy": "265", "Mobility Services": 58, "Developmental Aids & Appliances": 112, "In-patient Services": 74, "Peer Counselling": 51, "Wheelchair Skill Training": 27 } },
  { year: "2020-21", total: 366, breakdown: { "Prosthetic & Orthotics": 114, "Rehab Therapy": 23, "Mobility Services": 116, "Developmental Aids & Appliances": 93, "In-patient Services": 13, "Peer Counselling": 7, "Wheelchair Skill Training": 0 } },
  { year: "2021-22", total: 495, breakdown: { "Prosthetic & Orthotics": 70, "Rehab Therapy": "122", "Mobility Services": 73, "Developmental Aids & Appliances": 49, "In-patient Services": 26, "Peer Counselling": 118, "Wheelchair Skill Training": 37 } },
  { year: "2022-23", total: 903, breakdown: { "Prosthetic & Orthotics": 92, "Rehab Therapy": "244", "Mobility Services": 92, "Developmental Aids & Appliances": 42, "In-patient Services": 49, "Peer Counselling": 211, "Wheelchair Skill Training": 173 } },
  { year: "2023-24", total: 1013, breakdown: { "Prosthetic & Orthotics": 110, "Rehab Therapy": "322", "Mobility Services": 112, "Developmental Aids & Appliances": 56, "In-patient Services": 56, "Peer Counselling": 134, "Wheelchair Skill Training": 223 } },
  { year: "2024-25", total: 1280, breakdown: { "Prosthetic & Orthotics": 189, "Rehab Therapy": "598", "Mobility Services": 119, "Developmental Aids & Appliances": 178, "In-patient Services": 43, "Peer Counselling": 97, "Wheelchair Skill Training": 56 } },
  { year: "2025-26", total: 1116, breakdown: { "Prosthetic & Orthotics": 112, "Rehab Therapy": 119, "Mobility Services": 289, "Developmental Aids & Appliances": 246, "In-patient Services": 100, "Peer Counselling": 142, "Wheelchair Skill Training": 108 } }
];



const STORIES = [
  {
    title: "Back on Her Feet, Back in the Field",
    type: "Prosthetic Support",
    desc: "After an accident cost her her right leg below the knee, a below-knee prosthesis with a Jaipur foot helped Varalakshmi walk, work, and farm again.",
    label: "Placeholder image",
    src: meeraImg,
    slug: "story-4"
  },
  {
    title: "Nishanth's Steady Progress",
    type: "Paediatric Rehab",
    desc: "An ongoing physiotherapy plan is helping 11-year-old Nishanth manage Duchenne muscular dystrophy and preserve his mobility.",
    label: "Placeholder image",
    src: tailoringImg,
    slug: "story-5"
  },
  {
    title: "Back to School, Standing Tall",
    type: "Paediatric Rehab",
    desc: "TB arthritis left 13-year-old Shanmukh Priya with scoliosis and a shortened leg — a custom brace and orthosis got her walking without pain again.",
    label: "Placeholder image",
    src: homeCareImg,
    slug: "story-6"
  },
  {
    title: "Two Legs, One Dream",
    type: "Prosthetic Support",
    desc: "Born without her right leg, Saba became one of the first in India fitted with a hip disarticulation prosthesis — designed and fitted with remote clinical guidance during the pandemic.",
    label: "Placeholder image",
    src: meeraImg,
    slug: "story-7"
  },
  {
    title: "From Bed to Mobility",
    type: "Community-Based Rehab",
    desc: "After a road accident took his father's life and left 5-year-old Sana with a spinal cord injury, a custom walker helped him stand, walk, and return to school.",
    label: "Placeholder image",
    src: tailoringImg,
    slug: "story-8"
  },
  {
    title: "A New Hope to Stand",
    type: "Paediatric Rehab",
    desc: "Cerebral palsy left 6-year-old Chaitanya unable to stand — a customized orthosis and gait training changed that.",
    label: "Placeholder image",
    src: homeCareImg,
    slug: "story-9"
  },
  {
    title: "Back on Her Feet, Back to Work",
    type: "Livelihood Support",
    desc: "Decades after childhood polio, worsening knee and leg pain nearly stopped Chandramani from working — a custom orthosis got her walking again.",
    label: "Placeholder image",
    src: meeraImg,
    slug: "story-10"
  },
  {
    title: "From Shadow to Hope of Light",
    type: "Community-Based Rehab",
    desc: "An untreated clubfoot condition kept Sakir Ali out of school until age 8 — a custom orthosis, found through a remote tribal outreach camp, gave him his first steps.",
    label: "Placeholder image",
    src: tailoringImg,
    slug: "story-11"
  },
  {
    title: "The Struggle for Life",
    type: "Community-Based Rehab",
    desc: "While undergoing treatment for spinal cancer, 4-year-old Yamini was fitted with a hospital-bedside orthosis to help speed her recovery.",
    label: "Placeholder image",
    src: homeCareImg,
    slug: "story-12"
  },
  {
    title: "Standing Strong After Loss",
    type: "Prosthetic Support",
    desc: "A bone tumour led to a hip disarticulation amputation for 16-year-old Yohanu — a custom prosthesis and gait training got him walking independently again.",
    label: "Placeholder image",
    src: meeraImg,
    slug: "story-13"
  },
  {
    title: "Steady Steps Forward",
    type: "Orthotic Support",
    desc: "Childhood polio left Amala's left leg weak — physiotherapy and a custom orthosis gave her a steadier, more independent walk.",
    label: "Placeholder image",
    src: tailoringImg,
    slug: "story-14"
  },
  {
    title: "Wheels and Will",
    type: "Paediatric Rehab",
    desc: "Born with spina bifida, 9-year-old Naga Dilip — a state-level singer — regained mobility through a combination of orthoses and wheelchair training.",
    label: "Placeholder image",
    src: homeCareImg,
    slug: "story-15"
  },
  {
    title: "Lighter Steps, New Freedom",
    type: "Prosthetic Support",
    desc: "A train accident cost Neelaveni both legs above the knee — a lightweight prosthesis with an automatic locking knee ended years of pain from her old, heavy limbs.",
    label: "Placeholder image",
    src: meeraImg,
    slug: "story-16"
  },
  {
    title: "Sitting Tall, Moving Forward",
    type: "Paediatric Rehab",
    desc: "Congenital leg weakness and scoliosis kept 11-year-old Rajasekhar from standing — a supportive wheelchair and orthoses gave him comfort and independence.",
    label: "Placeholder image",
    src: tailoringImg,
    slug: "story-17"
  },
  {
    title: "Hands to Work Again",
    type: "Prosthetic Support",
    desc: "An electrical accident cost Jagan Mohan both hands below the elbow — a bilateral prosthesis gave him back his independence and his livelihood.",
    label: "Placeholder image",
    src: homeCareImg,
    slug: "story-18"
  }
];



export default function Impact() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const tab = searchParams.get("tab") || location.state?.tab || "dashboard";
  
  const setTab = (newTab) => {
    setSearchParams({ tab: newTab }, { replace: true });
  };

  return (
    <div>
      <PageHero
        trail={[{ label: "About us", to: "/about" }, { label: "Our Impact" }]}
        eyebrow="Our Impact"
        title="Numbers, and the people behind them"
        desc="Demographic and geographic reach data alongside stories of rehabilitation, hope and independence."
      />

      <Section tight revealChildren>
        <Tabs tabs={TABS} active={tab} onChange={setTab} />

        {tab === "dashboard" && (
          <div className="space-y-12">
            {/* Total Beneficiaries Hero Stat */}
            <RevealOnScroll>
            <div className="bg-gradient-to-br from-teal-deep to-teal rounded-xl2 p-8 md:p-12 text-center text-white shadow-md relative overflow-hidden border border-teal-light/20">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-gold opacity-10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col items-center justify-center">
                <p className="text-[13px] md:text-[15px] font-bold text-gold uppercase tracking-widest mb-3">Total Beneficiaries</p>
                <div className="text-[64px] md:text-[80px] font-bold font-display leading-none text-white mb-4 drop-shadow-sm">5,878</div>
                <p className="text-[15px] md:text-[17px] text-white/90 max-w-md mx-auto">Persons reached across all programs</p>
              </div>
            </div>
            </RevealOnScroll>

            {/* Needs & Services Breakdown */}
            <RevealOnScroll delay={0.1}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Needs Identified Card */}
              <div className="bg-white border border-line rounded-xl2 p-6 md:p-8 shadow-sm">
                <h3 className="text-[20px] font-bold text-teal-deep font-display mb-2">Needs Identified</h3>
                <p className="text-[13px] text-stone mb-5">(Cumulative totals, 2019–20 to 2025–26)</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>Spinal Cord Injury</span>
                    <strong className="text-teal-deep">1,172</strong>
                  </div>
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>Post-Polio Residual Paralysis</span>
                    <strong className="text-teal-deep">1,131</strong>
                  </div>
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>Cerebral Palsy</span>
                    <strong className="text-teal-deep">2,076</strong>
                  </div>
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>Lower & Upper Limb Amputee</span>
                    <strong className="text-teal-deep">836</strong>
                  </div>
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>DMD, Stroke</span>
                    <strong className="text-teal-deep">699</strong>
                  </div>
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>Other Orthopaedic Disabilities</span>
                    <strong className="text-teal-deep">2,866</strong>
                  </div>
                  <div className="flex justify-between items-center text-[16px] border-t border-line pt-4 mt-5">
                    <strong className="text-teal-deep font-display uppercase tracking-wide">Total Identified</strong>
                    <strong className="text-teal-deep text-[18px]">8,780</strong>
                  </div>
                </div>
              </div>

              {/* Services Offered Card */}
              <div className="bg-white border border-line rounded-xl2 p-6 md:p-8 shadow-sm">
                <h3 className="text-[20px] font-bold text-teal-deep font-display mb-2">Services Offered</h3>
                <p className="text-[13px] text-stone mb-5">(Cumulative totals, 2019–20 to 2025–26)</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>Prosthetic & Orthotics</span>
                    <strong className="text-teal-deep">805</strong>
                  </div>
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>Rehab Therapy Services</span>
                    <strong className="text-teal-deep">1,693</strong>
                  </div>
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>Mobility Services</span>
                    <strong className="text-teal-deep">859</strong>
                  </div>
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>Developmental Aids & Appliances</span>
                    <strong className="text-teal-deep">776</strong>
                  </div>
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>In-Patient Services</span>
                    <strong className="text-teal-deep">361</strong>
                  </div>
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>Peer Counselling</span>
                    <strong className="text-teal-deep">760</strong>
                  </div>
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold"></span>Wheelchair Skill Training</span>
                    <strong className="text-teal-deep">624</strong>
                  </div>
                  <div className="flex justify-between items-center text-[16px] border-t border-line pt-4 mt-5">
                    <strong className="text-teal-deep font-display uppercase tracking-wide">Total Provided</strong>
                    <strong className="text-teal-deep text-[18px]">5,878</strong>
                  </div>
                </div>
              </div>
            </div>
            </RevealOnScroll>

            {/* Cumulative Growth Chart */}
            <RevealOnScroll delay={0.2}>
            <div className="bg-white border border-line rounded-xl2 p-6 md:p-8 shadow-sm">
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h3 className="text-[20px] font-bold text-teal-deep mb-2 font-display">Cumulative Growth by Year</h3>
                  <p className="text-[14.5px] text-stone">
                    Running total of identified needs vs services provided.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-stone">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gold"></div> Need identified
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-teal"></div> Services provided
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between h-64 md:h-80 pt-8 border-b border-line/50 relative">
                {CUMULATIVE_DATA.map((d) => {
                  const maxVal = Math.max(...CUMULATIVE_DATA.map(c => Math.max(c.need, c.provided)));
                  const needHeight = (d.need / maxVal) * 100;
                  const providedHeight = (d.provided / maxVal) * 100;

                  return (
                    <div key={d.year} className="flex flex-col items-center flex-1 group h-full justify-end">
                      <div className="flex items-end gap-1 md:gap-2 w-full justify-center h-full">
                        {/* Need bar */}
                        <div 
                          className="w-3 sm:w-6 md:w-10 bg-gold rounded-t-sm relative group-hover:opacity-90 transition-opacity" 
                          style={{ height: `${needHeight}%` }}
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] sm:text-[11px] font-bold text-stone opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{d.need}</span>
                        </div>
                        {/* Provided bar */}
                        <div 
                          className="w-3 sm:w-6 md:w-10 bg-teal rounded-t-sm relative group-hover:opacity-90 transition-opacity" 
                          style={{ height: `${providedHeight}%` }}
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] sm:text-[11px] font-bold text-teal-deep opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{d.provided}</span>
                        </div>
                      </div>
                      <span className="text-[10px] sm:text-[12px] font-medium text-stone mt-3 text-center w-full">{d.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            </RevealOnScroll>

            {/* Year-on-Year Growth */}
            <RevealOnScroll delay={0.1}>
            <div className="border-t border-line/60 pt-10">
              <div className="mb-8">
                <h3 className="text-[22px] font-bold text-teal-deep mb-2 font-display">Beneficiaries Served by Year</h3>
                <p className="text-[14.5px] text-stone">
                  Year-on-year, TAP's service delivery has grown across every core program area.
                </p>
              </div>
              
              <div className="space-y-6">
                {YEARLY_DATA.map((d, idx) => {
                  const maxTotal = Math.max(...YEARLY_DATA.map(y => y.total));
                  const percent = Math.max((d.total / maxTotal) * 100, 5);
                  
                  return (
                    <RevealOnScroll key={d.year} delay={Math.min(idx * 0.1, 0.6)}>
                    <div className="bg-white border border-line rounded-xl2 p-6 shadow-sm hover:border-teal-light transition-colors">
                      <div className="flex flex-col md:flex-row gap-5 items-start md:items-center mb-5">
                        <div className="w-24 flex-shrink-0">
                          <span className="text-[18px] font-bold text-teal-deep font-display">{d.year}</span>
                        </div>
                        <div className="flex-1 w-full">
                          <div className="h-7 bg-cream rounded-full overflow-hidden w-full max-w-lg flex items-center relative border border-line">
                            <div 
                              className="absolute left-0 top-0 bottom-0 bg-gold transition-all duration-1000"
                              style={{ width: `${percent}%` }}
                            />
                            <span className="relative z-10 text-[13px] font-bold text-teal-deep pl-4">
                              Total: {d.total}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 pt-4 border-t border-line/40">
                        {Object.entries(d.breakdown).map(([label, val]) => (
                          <div key={label} className="flex flex-col">
                            <span className="text-[11px] font-bold text-stone uppercase tracking-wider mb-1 opacity-70 leading-tight">{label}</span>
                            <span className="text-[14.5px] font-medium text-teal-deep">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    </RevealOnScroll>
                  );
                })}
              </div>
            </div>
            </RevealOnScroll>

            {/* Reach Map */}
            <RevealOnScroll delay={0.2}>
            <div className="border-t border-line/60 pt-10">
              <div className="mb-6">
                <h3 className="text-[22px] font-bold text-teal-deep mb-2 font-display">Geographic Reach</h3>
                <p className="text-[14.5px] text-stone">
                  Click or hover on districts in our interactive map to see active coverage and expansion zones across Andhra Pradesh.
                </p>
              </div>
              <ReachMap />
            </div>
            </RevealOnScroll>

            {/* Demographics */}
            <RevealOnScroll delay={0.3}>
            <div className="bg-cream border border-line rounded-xl2 p-6 md:p-8 space-y-6">
              <h3 className="text-[19px] text-teal-deep font-bold font-display">Demographic Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard value="2,310" label="Male Beneficiaries (55%)" />
                <StatCard value="1,260" label="Female Beneficiaries (30%)" />
                <StatCard value="420" label="Children under 18 (10%)" />
                <StatCard value="210" label="Elderly Care (5%)" />
              </div>
              <div className="space-y-5 pt-2">
                <ProgressBarLabel label="Male Beneficiaries" percentage={55} count="2,310" color="bg-teal" />
                <ProgressBarLabel label="Female Beneficiaries" percentage={30} count="1,260" color="bg-teal-light" />
                <ProgressBarLabel label="Children (Paediatric Rehab)" percentage={10} count="420" color="bg-gold" />
                <ProgressBarLabel label="Elderly Care & Support" percentage={5} count="210" color="bg-peach border border-gold-dark/30" />
              </div>
            </div>
            </RevealOnScroll>
          </div>
        )}

        {tab === "stories" && (
          <div>
            {/* Story Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {STORIES.map((s, index) => (
                <RevealOnScroll delay={Math.min(index * 0.1, 0.6)} key={s.title}>
                <Card>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1.5 rounded-full bg-peach text-teal-deep text-[13px] font-bold mb-4">
                        {s.type}
                      </span>
                      <h3 className="text-[20px] text-teal-deep font-bold mb-3 font-display leading-tight">{s.title}</h3>
                      <p className="text-[14.5px] text-stone leading-relaxed mb-6">{s.desc}</p>
                    </div>
                    <Button to={`/impact/${s.slug}`} variant="outline" size="sm" className="w-full justify-center mt-auto border-line/60 hover:border-teal">
                      Read full story
                    </Button>
                  </div>
                </Card>
                </RevealOnScroll>
              ))}
            </div>

            {/* Key Impacts Heading */}
            <RevealOnScroll>
            <div className="mt-20 mb-10 max-w-xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-dark mb-3">
                <span className="h-[2px] w-7 bg-gold" /> OUR REACH
              </span>
              <h2 className="text-[30px] text-teal-deep font-bold font-display">Key Impacts</h2>
            </div>
            </RevealOnScroll>

            {/* Key Impacts Sections */}
            <div className="space-y-12 max-w-4xl mx-auto">
              

              {/* 2. Projects & Rehabilitation Models */}
              <RevealOnScroll delay={0.1}>
              <div className="space-y-4">
                <h3 className="text-[19px] font-bold text-teal-deep font-display flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold" /> Projects & Rehabilitation Models
                </h3>
                <div className="overflow-x-auto border border-line rounded-xl2 bg-white shadow-sm -mx-2 sm:mx-0">
                  <table className="w-full text-left border-collapse min-w-[540px]">
                    <thead>
                      <tr className="bg-teal-deep text-white border-b border-line">
                        <th className="px-4 sm:px-6 py-3.5 font-display font-bold text-[14.5px] tracking-wide w-1/3 sm:w-1/4">Program</th>
                        <th className="px-4 sm:px-6 py-3.5 font-display font-bold text-[14.5px] tracking-wide w-2/3 sm:w-3/4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line text-[14px] text-stone">
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-4 sm:px-6 py-3.5 font-bold text-teal-deep">ARC – Ability Rehabilitation Centre</td>
                        <td className="px-4 sm:px-6 py-3.5 leading-relaxed">Hub model rehab centre at GVMC-KGH campus for SCI & cross-disability rehab</td>
                      </tr>
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-4 sm:px-6 py-3.5 font-bold text-teal-deep">RoW – Rehab on Wheels</td>
                        <td className="px-4 sm:px-6 py-3.5 leading-relaxed">Mobile outreach covering 33 mandals for door-to-door care</td>
                      </tr>
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-4 sm:px-6 py-3.5 font-bold text-teal-deep">CBR – Community-Based Rehabilitation</td>
                        <td className="px-4 sm:px-6 py-3.5 leading-relaxed">In 33 mandals using a hub-and-spoke model to deliver services</td>
                      </tr>
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-4 sm:px-6 py-3.5 font-bold text-teal-deep">Hospital-Based Support</td>
                        <td className="px-4 sm:px-6 py-3.5 leading-relaxed">At RCD Children's Hospital (Visakhapatnam) & GGH Paderu (ASR district)</td>
                      </tr>
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-4 sm:px-6 py-3.5 font-bold text-teal-deep">Tech-Aided Mobility</td>
                        <td className="px-4 sm:px-6 py-3.5 leading-relaxed">Development & distribution of appropriate, low-cost assistive technology</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              </RevealOnScroll>

              <hr className="border-t border-line/60" />

              {/* 3. Geographic Reach */}
              <RevealOnScroll delay={0.1}>
              <div className="space-y-4">
                <h3 className="text-[19px] font-bold text-teal-deep font-display flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold" /> Geographic Reach
                </h3>
                <div className="overflow-x-auto border border-line rounded-xl2 bg-white shadow-sm -mx-2 sm:mx-0">
                  <table className="w-full text-left border-collapse min-w-[540px]">
                    <thead>
                      <tr className="bg-teal-deep text-white border-b border-line">
                        <th className="px-4 sm:px-6 py-3.5 font-display font-bold text-[14.5px] tracking-wide w-1/3 sm:w-1/4">Area</th>
                        <th className="px-4 sm:px-6 py-3.5 font-display font-bold text-[14.5px] tracking-wide w-2/3 sm:w-3/4">Coverage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line text-[14px] text-stone">
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-4 sm:px-6 py-3.5 font-bold text-teal-deep">Districts Covered</td>
                        <td className="px-4 sm:px-6 py-3.5 leading-relaxed">Visakhapatnam, Anakapalli, ASR</td>
                      </tr>
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-4 sm:px-6 py-3.5 font-bold text-teal-deep">Mandals Covered</td>
                        <td className="px-4 sm:px-6 py-3.5 leading-relaxed">33 Mandals (11 in Visakhapatnam, 22 in ASR)</td>
                      </tr>
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-4 sm:px-6 py-3.5 font-bold text-teal-deep">Target Population</td>
                        <td className="px-4 sm:px-6 py-3.5 leading-relaxed">Approx. 9.6 million (5–7% estimated PwDs)</td>
                      </tr>
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-4 sm:px-6 py-3.5 font-bold text-teal-deep">Rural & Tribal Focus</td>
                        <td className="px-4 sm:px-6 py-3.5 leading-relaxed">72% of services delivered in inaccessible locations</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              </RevealOnScroll>

              <hr className="border-t border-line/60" />

              {/* 4. Social Security Schemes Facilitated */}
              <RevealOnScroll delay={0.1}>
              <div className="space-y-4">
                <h3 className="text-[19px] font-bold text-teal-deep font-display flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold" /> Social Security Schemes Facilitated
                </h3>
                <div className="overflow-x-auto border border-line rounded-xl2 bg-white shadow-sm -mx-2 sm:mx-0">
                  <table className="w-full text-left border-collapse min-w-[540px]">
                    <thead>
                      <tr className="bg-teal-deep text-white border-b border-line">
                        <th className="px-4 sm:px-6 py-3.5 font-display font-bold text-[14.5px] tracking-wide w-1/3 sm:w-1/4">Scheme</th>
                        <th className="px-4 sm:px-6 py-3.5 font-display font-bold text-[14.5px] tracking-wide w-2/3 sm:w-3/4">Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line text-[14px] text-stone">
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-6 py-3.5 font-bold text-teal-deep">SADAREM Disability Certification</td>
                        <td className="px-6 py-3.5 leading-relaxed">Enabled for &gt;500 PwDs through camps & follow-ups</td>
                      </tr>
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-6 py-3.5 font-bold text-teal-deep">Niramaya Health Insurance (National Trust)</td>
                        <td className="px-6 py-3.5 leading-relaxed">Awareness + Enrolment Support for SCI & special needs children</td>
                      </tr>
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-6 py-3.5 font-bold text-teal-deep">Legal Guardianship Certification</td>
                        <td className="px-6 py-3.5 leading-relaxed">For children with intellectual and multiple disabilities</td>
                      </tr>
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-6 py-3.5 font-bold text-teal-deep">ADIP Assistive Devices Scheme</td>
                        <td className="px-6 py-3.5 leading-relaxed">Device mapping, training, and advocacy for timely delivery</td>
                      </tr>
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-6 py-3.5 font-bold text-teal-deep">Livelihood Linkages</td>
                        <td className="px-6 py-3.5 leading-relaxed">Through NRLM/SRLM and convergence with SSA for inclusive education</td>
                      </tr>
                      <tr className="hover:bg-cream/40 transition-colors odd:bg-white even:bg-cream/10">
                        <td className="px-6 py-3.5 font-bold text-teal-deep">SSA-DEIC Support</td>
                        <td className="px-6 py-3.5 leading-relaxed">Children linked with rehab, education, and therapy through convergence</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              </RevealOnScroll>

              <hr className="border-t border-line/60" />

              {/* 5. Advocacy & Systems Strengthening */}
              <RevealOnScroll delay={0.1}>
              <div className="space-y-4">
                <h3 className="text-[19px] font-bold text-teal-deep font-display flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold" /> Advocacy & Systems Strengthening
                </h3>
                <ul className="space-y-3.5 pl-6 list-disc text-[14.5px] text-stone leading-relaxed">
                  <li>Recognized by District Collectors, Disability Welfare Departments, and National Trust.</li>
                  <li>Supported government efforts in hospital convergence, community disability census, and eye/health camps.</li>
                  <li>Member of multiple District Road Safety Councils and Hospital Development Societies.</li>
                  <li>Represented in policy forums to advocate for disability inclusion, rehab integration, and assistive tech scale-up.</li>
                </ul>
              </div>
              </RevealOnScroll>

              {/* Geographic Footprint Stat Strip */}
              <RevealOnScroll delay={0.2}>
              <div className="bg-cream border border-line rounded-xl2 p-6 mt-12">
                <h3 className="text-[17px] font-bold text-teal-deep mb-4 font-display flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold" /> Geographic Footprint
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0 text-center md:divide-x divide-line/60">
                  <div className="px-2">
                    <span className="block text-[11px] font-bold text-stone uppercase tracking-wider mb-1">States</span>
                    <strong className="text-[18px] text-teal-deep font-bold font-display">Andhra Pradesh & bordering Odisha</strong>
                  </div>
                  <div className="px-2">
                    <span className="block text-[11px] font-bold text-stone uppercase tracking-wider mb-1">Districts</span>
                    <strong className="text-[18px] text-teal-deep font-bold font-display">Visakhapatnam, Anakapalli, ASR</strong>
                  </div>
                  <div className="px-2">
                    <span className="block text-[11px] font-bold text-stone uppercase tracking-wider mb-1">Mandals</span>
                    <strong className="text-[18px] text-teal-deep font-bold font-display">33 Mandals</strong>
                  </div>
                  <div className="px-2">
                    <span className="block text-[11px] font-bold text-stone uppercase tracking-wider mb-1">Reach</span>
                    <strong className="text-[18px] text-teal-deep font-bold font-display">~9.6M Population</strong>
                  </div>
                </div>
              </div>
              </RevealOnScroll>

            </div>
          </div>
        )}
      </Section>

      <CTABand
        title="Every number is a person"
        desc="Your contributions and sponsorships turn raw numbers into concrete steps of independence for someone with disability."
      >
        <Button to="/donate" variant="primary">Support our work</Button>
      </CTABand>
    </div>
  );
}

function ProgressBarLabel({ label, percentage, count, color }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[14px] font-bold text-teal-deep">
        <span>{label}</span>
        <span>{count} ({percentage}%)</span>
      </div>
      <div className="w-full bg-white rounded-full h-3 border border-line overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
