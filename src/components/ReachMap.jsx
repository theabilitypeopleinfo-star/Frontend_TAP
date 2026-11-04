import React, { useState } from "react";

const DISTRICTS = [
  { id: "vsp", name: "Visakhapatnam", x: 440, y: 130, status: "Active Coverage", details: "Headquarters (Ability Rehab Centre). Active clinical operations, orthotics workshop, 24/7 in-patient care, and regular outreach camps." },
  { id: "vzm", name: "Vizianagaram", x: 470, y: 110, status: "Active Coverage", details: "Weekly mobile clinic visits via Rehab on Wheels, community-based rehab therapy, and assistive device distributions." },
  { id: "skm", name: "Srikakulam", x: 510, y: 90, status: "Active Coverage", details: "Monthly outreach assessment camps, patient referrals to ARC, and distribution of custom callipers and prosthetics." },
  { id: "eg", name: "East Godavari", x: 390, y: 160, status: "Expansion Zone", details: "New 'Rehab on Wheels' mobile clinic extension. Launching 6 new village hubs this quarter in partnership with Wipro Foundation." },
  { id: "wg", name: "West Godavari", x: 350, y: 180, status: "Active Coverage", details: "Bi-monthly outreach clinics, elder mobility support programs, and community reintegration workshops." },
  { id: "kr", name: "Krishna", x: 310, y: 210, status: "Active Coverage", details: "Disability welfare certification support, guardianship registrations, and coordination of local medical camps." },
  { id: "gn", name: "Guntur", x: 280, y: 230, status: "Active Coverage", details: "Partnership clinic with regional hospitals, clinical evaluations, and post-acute care referrals." },
  { id: "nl", name: "Nellore", x: 200, y: 290, status: "Active Coverage", details: "Outreach camp locations, local volunteer networks, and distribute-on-demand assistive aids." },
  { id: "ch", name: "Chittoor", x: 130, y: 320, status: "Active Coverage", details: "Outreach camps, coordination for National Trust welfare schemes, and elderly support groups." },
  { id: "at", name: "Anantapur", x: 100, y: 270, status: "Active Coverage", details: "Community-based rehabilitation therapy delivered by trained village workers, livelihood support." },
  { id: "kn", name: "Kurnool", x: 140, y: 230, status: "Expansion Zone", details: "Upcoming outreach hub. Planned mobile clinic routing and local stakeholder alignment starting next month." },
  { id: "kd", name: "Kadapa", x: 170, y: 260, status: "Active Coverage", details: "Spinal cord injury support groups, home-based therapy training for families, and aids distribution." }
];

export default function ReachMap() {
  const [activeDistrict, setActiveDistrict] = useState(DISTRICTS[0]);

  return (
    <div className="grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-10 items-center bg-white border border-line rounded-xl2 p-4 sm:p-6 md:p-8 shadow-sm">
      <div className="relative flex items-center justify-center bg-cream/30 border border-line/40 rounded-xl p-2 sm:p-4 overflow-hidden select-none">
        {/* AP SVG Outline */}
        <svg viewBox="0 0 600 400" className="w-full h-auto max-w-[500px]">
          {/* Simplified Coastline / AP Shape */}
          <path 
            d="M 430,60 L 480,75 L 530,95 L 560,115 L 530,135 L 480,155 L 430,175 L 380,205 L 330,235 L 260,265 L 190,295 L 130,315 L 90,335 L 60,315 L 80,285 L 120,265 L 170,245 L 210,225 L 230,195 L 260,165 L 300,145 L 340,125 L 370,95 L 410,75 Z"
            className="fill-peach/50 stroke-gold stroke-2"
          />
          
          {/* Districts Markers */}
          {DISTRICTS.map((d) => (
            <g 
              key={d.id} 
              className="cursor-pointer group"
              onClick={() => setActiveDistrict(d)}
              onMouseEnter={() => setActiveDistrict(d)}
            >
              <circle 
                cx={d.x} 
                cy={d.y} 
                r={activeDistrict.id === d.id ? "10" : "6"}
                className={`transition-all duration-300 ${
                  activeDistrict.id === d.id 
                    ? "fill-gold stroke-white stroke-2" 
                    : d.status === "Expansion Zone"
                      ? "fill-gold-light stroke-teal stroke-1"
                      : "fill-teal stroke-white stroke-1 group-hover:fill-gold"
                }`}
              />
              {activeDistrict.id === d.id && (
                <circle 
                  cx={d.x} 
                  cy={d.y} 
                  r="16"
                  className="fill-none stroke-gold stroke-1 opacity-50 animate-ping"
                />
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="flex flex-col justify-between h-full space-y-6">
        <div className="space-y-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
            activeDistrict.status === "Expansion Zone" ? "bg-gold/15 text-gold-dark" : "bg-teal/10 text-teal"
          }`}>
            {activeDistrict.status}
          </span>
          <h3 className="text-[20px] sm:text-[24px] text-teal-deep font-display leading-tight">{activeDistrict.name}</h3>
          <p className="text-[13.5px] sm:text-[14.5px] text-stone leading-relaxed">{activeDistrict.details}</p>
        </div>
        
        <div className="border-t border-line/60 pt-4 flex flex-wrap gap-3 sm:gap-4 text-[12.5px] sm:text-[13px] font-bold text-teal-deep">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-teal" /> Active Coverage
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-gold-light border border-teal" /> Expansion Zone
          </div>
        </div>
      </div>
    </div>
  );
}
