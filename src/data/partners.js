import gvmcLogo from "../assets/gvmc logo new.jpg";
import apTransportLogo from "../assets/Government of andhra pradesh transport logo.png";
import apLogo from "../assets/govt of andhra pradesh.jpg";
import globalAllianceLogo from "../assets/global alliance logo.png";
import rotaryLogo from "../assets/rotary international logo.jpg";
import gailLogo from "../assets/gail logo.webp";
import nmdcLogo from "../assets/NMDC-New-logo.png";
import hpLogo from "../assets/HP logo.gif";
import ltLogo from "../assets/L&T logo.webp";
import hyundaiLogo from "../assets/hyundai logo.jpg";
import vizagSteelLogo from "../assets/vizag steel logo.png";
import tataElxsiLogo from "../assets/tata elxi logo.avif";
import techMahindraLogo from "../assets/tech mahindra logo.jpg";
import imegLogo from "../assets/IMEG logo.webp";
import dhwaniLogo from "../assets/Dhwani-Foundation-Logo.png";
import tataEngageLogo from "../assets/tata engage be the change logo.png";
import apdLogo from "../assets/the association of people with disability logo.png";
import mobilityIndiaLogo from "../assets/mobility india logo.jpg";
import motivationIndiaLogo from "../assets/motivation india logo.png";
import accLogo from "../assets/ACC.jpg";
import prayasLogo from "../assets/prayas logo.webp";
import coromandelLogo from "../assets/coromandel-logo.png";
import ltDefenceLogo from "../assets/L&t defence logo.webp";
import rinlLogo from "../assets/rashtriya ispat nigam logo.webp";
import walkaboutLogo from "../assets/walkabout foundation logo.webp";
import ihifLogo from "../assets/indian head injury logo.jpg";
import azimLogo from "../assets/azim logo.webp";

export const CSR_PARTNERS = [
  { name: "GAIL", logo: gailLogo },
  { name: "NMDC", logo: nmdcLogo },
  { name: "HP (Hindustan Petroleum)", logo: hpLogo },
  { name: "Larsen & Toubro (L&T)", logo: ltLogo },
  { name: "Hyundai", logo: hyundaiLogo },
  { name: "Vizag Steel", logo: vizagSteelLogo, scale: "scale-[1.4]" },
  { name: "Tata Elxsi", logo: tataElxsiLogo },
  { name: "Rotary International", logo: rotaryLogo },
  { name: "Tech Mahindra", logo: techMahindraLogo, scale: "scale-[1.35]" },
  { name: "IMEG", logo: imegLogo },
  { name: "ACC Limited", logo: accLogo },
  { name: "L&T Prayas Trust", logo: prayasLogo },
  { name: "Coromandel Fertilisers Employees Union - Trade Union Social Responsibility", logo: coromandelLogo },
  { name: "L&T Defence", logo: ltDefenceLogo, scale: "scale-[1.4]" },
  { name: "Rashtriya Ispat Nigam Limited (RINL)", logo: rinlLogo, scale: "scale-[2]" }
];

export const DEVELOPMENT = [
  { name: "Dhwani Foundation", logo: dhwaniLogo, scale: "scale-[1.2]" },
  { name: "Tata Engage — Be The Change", logo: tataEngageLogo, scale: "scale-[1.5]" },
  { name: "The Association of People with Disability (APD)", logo: apdLogo },
  { name: "Mobility India", logo: mobilityIndiaLogo },
  { name: "Motivation India", logo: motivationIndiaLogo },
  { name: "Walkabout Foundation", logo: walkaboutLogo },
  { name: "Indian Head Injury Foundation (IHIF)", logo: ihifLogo },
  { name: "Azim Premji Foundation", logo: azimLogo, scale: "scale-[1.8]" }
];

export const GOVERNMENT = [
  { name: "Greater Visakhapatnam Municipal Corporation", logo: gvmcLogo, scale: "scale-[1.4]" },
  { name: "Government of Andhra Pradesh Transport Department", logo: apTransportLogo, scale: "scale-[1.3]" },
  { name: "Global Alliance of NGOs for Road Safety", logo: globalAllianceLogo, scale: "scale-[1.3]" }
];

export const ALL_PARTNERS = [...CSR_PARTNERS, ...DEVELOPMENT, ...GOVERNMENT];
