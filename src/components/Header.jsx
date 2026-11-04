import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/tap-logo-cropped.png";

const NAV = [
  { to: "/", label: "Home" },
  {
    label: "About",
    to: "/about",
    children: [
      { to: "/about", label: "Overview" },
      { to: "/impact", label: "Our Impact" },
    ],
  },
  {
    label: "Our Work",
    to: "/our-work",
    children: [
      { to: "/our-work", label: "Overview" },
      { to: "/rehab-therapy", label: "Rehab Therapy Services" },
      { to: "/rehab-aids", label: "Rehab Aids & Appliances" },
      { to: "/outreach", label: "Independent Living Program" },
      { to: "/inpatient-services", label: "In-Patient Services" },
      { to: "/social-security-schemes", label: "Social Security Schemes" },
      { to: "/projects", label: "Programmes & Initiatives" },
      { to: "/workflow", label: "Our Process" },
    ],
  },
  { to: "/media", label: "Media" },
  {
    label: "Get Involved",
    to: "/donate",
    children: [
      { to: "/donate", label: "Donate Now" },
      { to: "/careers", label: "Careers" },
      { to: "/volunteer", label: "Volunteer" },
    ],
  },
  {
    label: "Contact",
    to: "/contact",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-line transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-wrap mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between gap-3 sm:gap-6">
          <Link to="/" className="flex items-center text-teal-deep flex-shrink-0">
            <img src={logo} alt="TAP Logo" className="h-10 sm:h-12 md:h-14 w-auto object-contain" />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Primary">
            {NAV.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredMenu(item.label)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `px-1.5 py-1 text-[15px] font-bold transition-colors whitespace-nowrap inline-flex items-center gap-1 ${
                        isActive ? "text-teal-deep" : "text-charcoal hover:text-teal-deep"
                      }`
                    }
                  >
                    {item.label}
                    <ChevronDown 
                      size={14} 
                      strokeWidth={3} 
                      className={`transition-transform duration-200 ${hoveredMenu === item.label ? "rotate-180" : ""}`} 
                    />
                  </NavLink>
                  {hoveredMenu === item.label && (
                    <div className="absolute top-full left-0 pt-2 w-72">
                      <div className="bg-white border border-line rounded-xl shadow-lift p-2">
                        {item.children.map((c) => (
                          <NavLink
                            key={c.to}
                            to={c.to}
                            className={({ isActive }) =>
                              `block px-3.5 py-2.5 rounded-lg text-[13.5px] font-semibold whitespace-nowrap ${
                                isActive ? "bg-peach text-teal-deep" : "text-charcoal hover:bg-peach/60"
                              }`
                            }
                          >
                            {c.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-1.5 py-1 text-[15px] font-bold transition-colors relative whitespace-nowrap ${
                      isActive ? "text-teal-deep" : "text-charcoal hover:text-teal-deep"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span className="absolute left-1.5 right-1.5 -bottom-1 h-[2px] bg-gold rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
            <Link
              to="/volunteer"
              className="hidden md:flex items-center justify-center px-6 py-2 border-2 border-teal text-teal text-[14px] font-bold rounded-full hover:bg-teal/5 transition-all min-h-[44px]"
            >
              Volunteer
            </Link>
            <Link
              to="/donate"
              className="px-4 py-2 sm:px-8 sm:py-3 bg-gold text-teal-deep text-xs sm:text-[14px] font-bold rounded-full shadow-sm hover:opacity-90 transition-all min-h-[44px] flex items-center justify-center whitespace-nowrap"
            >
              Donate now
            </Link>
            <button
              className="lg:hidden text-teal-deep p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-peach/50 transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden fixed inset-x-0 top-[80px] bottom-0 z-50 border-t border-line bg-cream flex flex-col gap-2 overflow-y-auto px-4 sm:px-6 py-6 shadow-xl">
            {NAV.map((item) => (
              <div key={item.label} className="flex flex-col">
                {item.children ? (
                  <>
                    <button
                      onClick={() => setExpandedMenu(expandedMenu === item.label ? null : item.label)}
                      className="flex items-center justify-between px-3 py-3 min-h-[44px] rounded-lg text-[16px] font-bold text-teal-deep hover:bg-peach/60 transition-colors w-full text-left"
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 text-teal ${
                          expandedMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedMenu === item.label && (
                      <div className="flex flex-col pl-4 mt-1 border-l-2 border-line/60 ml-3 gap-1 mb-2">
                        {item.children.map((c) => (
                          <NavLink
                            key={c.to}
                            to={c.to}
                            onClick={() => {
                              setOpen(false);
                              setExpandedMenu(null);
                            }}
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2.5 min-h-[44px] rounded-lg text-[14.5px] font-semibold transition-colors ${
                                isActive ? "bg-peach text-teal-deep" : "text-stone hover:bg-white"
                              }`
                            }
                          >
                            {c.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-3 min-h-[44px] rounded-lg text-[16px] font-bold transition-colors ${
                        isActive ? "bg-peach text-teal-deep" : "text-teal-deep hover:bg-peach/60"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
