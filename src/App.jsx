import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import OurWork from "./pages/OurWork";
import RehabTherapy from "./pages/RehabTherapy";
import RehabAids from "./pages/RehabAids";
import Outreach from "./pages/Outreach";
import InpatientServices from "./pages/InpatientServices";
import SocialSecuritySchemes from "./pages/SocialSecuritySchemes";
import Sponsors from "./pages/Sponsors";
import Partners from "./pages/Partners";
import Media from "./pages/Media";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Volunteer from "./pages/Volunteer";
import EventDetail from "./pages/EventDetail";
import Projects from "./pages/Projects";
import Workflow from "./pages/Workflow";
import Impact from "./pages/Impact";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Newsletters from "./pages/Newsletters";


import NotFound from "./pages/NotFound";
import UnderConstruction from "./pages/UnderConstruction";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/rehab-therapy" element={<RehabTherapy />} />
          <Route path="/rehab-aids" element={<RehabAids />} />
          <Route path="/outreach" element={<Outreach />} />
          <Route path="/inpatient-services" element={<InpatientServices />} />
          <Route path="/national-trust" element={<Navigate to="/social-security-schemes" replace />} />
          <Route path="/social-security-schemes" element={<SocialSecuritySchemes />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/media" element={<Media />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-us" element={<Navigate to="/careers" replace />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/impact/:id" element={<CaseStudyDetail />} />
          <Route path="/newsletters" element={<Newsletters />} />
          <Route path="/resources" element={<Navigate to="/media" state={{ tab: "publications" }} replace />} />
          <Route path="/awareness" element={<Navigate to="/volunteer" replace />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/under-construction" element={<UnderConstruction />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
