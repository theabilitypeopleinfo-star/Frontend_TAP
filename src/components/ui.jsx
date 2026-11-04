import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function RevealOnScroll({ children, delay = 0, className = "", type = "fade" }) {
  const shouldReduceMotion = useReducedMotion();
  
  let initial = { opacity: 0, y: 40 };
  let whileInView = { opacity: 1, y: 0 };
  
  if (type === "image") {
    initial = { opacity: 0, scale: 0.95 };
    whileInView = { opacity: 1, scale: 1 };
  }
  
  if (shouldReduceMotion) {
    initial = { opacity: 1, y: 0, scale: 1 };
  }
  
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.75, delay }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ value, suffix = "", duration = 0.9, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    const targetValue = parseInt(value.toString().replace(/,/g, ""), 10);
    
    if (shouldReduceMotion) {
      setDisplayValue(value.toString());
      return;
    }
    
    if (isInView && !isNaN(targetValue)) {
      const controls = animate(0, targetValue, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest).toLocaleString());
        }
      });
      return controls.stop;
    }
  }, [value, isInView, shouldReduceMotion, duration]);
  
  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  );
}

/* ---------- Button ---------- */
export function Button({ to, href, onClick, variant = "primary", size = "md", type = "button", className = "", children, ...rest }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 whitespace-nowrap min-h-[44px]";
  const sizes = {
    md: "px-5 sm:px-6 py-2.5 sm:py-3 text-[14px] md:text-[15px]",
    sm: "px-4 py-2 text-[12.5px] md:text-[13px]",
  };
  const variants = {
    primary: "bg-gold text-teal-deep hover:bg-gold-dark shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md",
    outline: "border-2 border-teal text-teal hover:bg-teal hover:text-white motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md",
    outlineLight: "border-2 border-white/50 text-white hover:bg-white hover:text-teal-deep motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md",
    ghost: "text-teal-deep hover:bg-peach",
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return (
    <button type={type} onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}

/* ---------- Eyebrow (small label with a mark) ---------- */
export function Eyebrow({ children, light = false, center = false }) {
  return (
    <p
      className={`flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.12em] mb-3.5 ${
        light ? "text-gold-light" : "text-gold-dark"
      } ${center ? "justify-center" : ""}`}
    >
      <span className={`h-[2px] w-7 ${light ? "bg-gold-light" : "bg-gold"}`} />
      {children}
    </p>
  );
}

/* ---------- Pill ---------- */
export function Pill({ children, tone = "peach" }) {
  const tones = {
    peach: "bg-peach text-teal-deep",
    gold: "bg-gold/20 text-gold-dark",
    outline: "bg-white/10 text-white border border-white/25",
  };
  return (
    <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* ---------- Photo placeholder (spoke motif instead of generic target rings) ---------- */
export function Photo({ src, label, caption, tall, short, className = "" }) {
  const h = tall ? "h-[280px] sm:h-[340px]" : short ? "h-[150px] sm:h-[160px]" : "h-[200px] sm:h-[240px]";
  return (
    <div
      role="img"
      aria-label={label || "Photograph placeholder"}
      className={`relative overflow-hidden rounded-xl2 border border-line flex items-end ${h} ${className}`}
      style={!src ? { background: "linear-gradient(135deg, #FBE6CC, #F3D9AE)" } : undefined}
    >
      {src ? (
        <img
          src={src}
          alt={label || ""}
          className="absolute inset-0 h-full w-full object-cover max-w-full"
        />
      ) : (
        <svg
          className="absolute inset-0 h-full w-full opacity-25"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <g stroke="#B87F22" strokeWidth="1.1" fill="none">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x2 = 100 + 92 * Math.cos(angle);
              const y2 = 100 + 92 * Math.sin(angle);
              return <line key={i} x1="100" y1="100" x2={x2} y2={y2} />;
            })}
            <circle cx="100" cy="100" r="46" />
            <circle cx="100" cy="100" r="92" />
          </g>
        </svg>
      )}
      {caption && (
        <span className="relative z-10 w-full bg-teal-deep/85 text-white text-xs font-semibold px-4 py-2.5">
          {caption}
        </span>
      )}
    </div>
  );
}

/* ---------- Section heading block ---------- */
export function SectionHead({ eyebrow, title, desc, center = false, light = false, className = "" }) {
  return (
    <div className={`max-w-xl ${center ? "mx-auto text-center" : ""} mb-6 sm:mb-8 md:mb-11 ${className}`}>
      {eyebrow && <Eyebrow center={center} light={light}>{eyebrow}</Eyebrow>}
      <h2 className={`text-[22px] sm:text-[26px] md:text-[32px] leading-tight mb-3 ${light ? "text-white" : "text-teal-deep"}`}>{title}</h2>
      {desc && <p className={`text-[13.5px] sm:text-[14px] md:text-[15.5px] ${light ? "text-cream/80" : "text-stone"}`}>{desc}</p>}
    </div>
  );
}

/* ---------- Stat card ---------- */
export function StatCard({ value, label, subtext, dark = false }) {
  return (
    <div
      className={`flex flex-col justify-center h-full rounded-2xl border p-4 sm:p-5 text-center ${
        dark ? "border-white/20 bg-white/5" : "border-line bg-white"
      }`}
    >
      <strong className={`block font-display text-[22px] sm:text-[26px] md:text-[30px] ${dark ? "text-gold" : "text-teal-deep"}`}>{value}</strong>
      {subtext && <span className={`block text-[11px] sm:text-[12px] font-medium leading-tight mt-0.5 mb-1 ${dark ? "text-cream/60" : "text-stone/80"}`}>{subtext}</span>}
      <span className={`block text-[11.5px] sm:text-[12.5px] font-semibold ${dark ? "text-cream/70" : "text-stone"}`}>{label}</span>
    </div>
  );
}

/* ---------- Icon bullet row ---------- */
export function IconBullet({ title, children, noDivider = false, className = "" }) {
  return (
    <div className={`flex gap-3 sm:gap-3.5 items-start py-3.5 sm:py-4 ${noDivider ? "" : "border-b border-line last:border-b-0"} ${className}`}>
      <span className="mt-2 h-2 w-2 rounded-full bg-gold flex-shrink-0" />
      <div>
        <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-teal-deep mb-1">{title}</h4>
        {children && <div className="text-[13px] sm:text-[13.5px] text-stone leading-relaxed w-full">{children}</div>}
      </div>
    </div>
  );
}

/* ---------- Card ---------- */
export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white border border-line rounded-xl2 overflow-hidden flex flex-col transition-all duration-200 hover:border-teal-light motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Sponsor Logo Card ---------- */
export function SponsorCard({ partner }) {
  const shouldReduceMotion = useReducedMotion();
  const hoverState = shouldReduceMotion ? {} : { 
    scale: 1.06,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  };

  return (
    <div className="flex flex-col items-center group">
      <motion.div 
        className="w-full aspect-square bg-white rounded-xl border border-line flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden"
        whileHover={hoverState}
        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
      >
        <img 
          src={partner.logo} 
          alt={`${partner.name} logo`} 
          className={`w-full h-full object-contain mix-blend-multiply ${partner.scale || "scale-100"}`} 
        />
      </motion.div>
      <span className="text-[12px] sm:text-[13px] md:text-[14px] text-stone mt-2.5 sm:mt-3 text-center leading-tight transition-colors duration-200 group-hover:text-teal-deep">
        {partner.name}
      </span>
    </div>
  );
}

/* ---------- Tabs (subnav) ---------- */
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-4 sm:gap-6 border-b-2 border-line mb-7 sm:mb-9 overflow-x-auto no-scrollbar" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          onClick={() => onChange(t.id)}
          className={`pb-3 -mb-0.5 text-[13.5px] sm:text-[14.5px] font-bold border-b-[3px] whitespace-nowrap transition-colors min-h-[44px] flex items-center ${
            active === t.id
              ? "text-teal-deep border-gold"
              : "text-stone border-transparent hover:text-teal-deep"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Breadcrumb ---------- */
export function Breadcrumb({ trail }) {
  return (
    <p className="text-[12px] sm:text-[12.5px] text-cream/70 mb-4 flex flex-wrap items-center gap-2">
      <Link to="/" className="hover:text-gold-light">Home</Link>
      {trail.map((t, i) => (
        <React.Fragment key={i}>
          <span className="opacity-50">/</span>
          {t.to ? (
            <Link to={t.to} className="hover:text-gold-light">{t.label}</Link>
          ) : (
            <span className="text-white">{t.label}</span>
          )}
        </React.Fragment>
      ))}
    </p>
  );
}

/* ---------- Page hero for inner pages ---------- */
export function PageHero({ trail, eyebrow, title, desc, children }) {
  return (
    <div className="topo bg-teal-deep text-white pt-10 sm:pt-14 pb-8 sm:pb-11 relative">
      <div className="max-w-wrap mx-auto px-4 sm:px-6 md:px-8">
        <Breadcrumb trail={trail} />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Eyebrow light>{eyebrow}</Eyebrow>
            <h1 className="text-[24px] sm:text-[34px] md:text-[40px] lg:text-[48px] text-white max-w-3xl leading-tight md:leading-[1.1]">{title}</h1>
            {desc && <p className="text-cream/85 max-w-2xl mt-3 text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-relaxed">{desc}</p>}
          </div>
          {children && (
            <div className="mt-4 md:mt-0 flex-shrink-0">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- CTA band ---------- */
export function CTABand({ title, desc, children, revealChildren = false }) {
  const content = (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <span className="block w-8 h-0.5 bg-gold mx-auto mb-4 md:mb-5" />
      <h2 className="text-[22px] sm:text-[24px] md:text-[28px] text-white mb-3 leading-tight">{title}</h2>
      {desc && <p className="text-cream/80 text-[13px] sm:text-[13.5px] md:text-[14.5px] mb-6 md:mb-7 leading-relaxed">{desc}</p>}
      <div className="flex flex-col sm:flex-row gap-3.5 justify-center w-full max-w-xs sm:max-w-none mx-auto">{children}</div>
    </div>
  );

  return (
    <div className="topo bg-teal-deep text-white py-12 sm:py-16 md:py-20 text-center relative">
      {revealChildren ? content : <RevealOnScroll>{content}</RevealOnScroll>}
    </div>
  );
}

/* ---------- Wrap container ---------- */
export function Wrap({ children, className = "" }) {
  return <div className={`max-w-wrap mx-auto px-4 sm:px-6 md:px-8 ${className}`}>{children}</div>;
}

/* ---------- Section ---------- */
export function Section({ children, className = "", tight = false, bg = "", revealChildren = false }) {
  const content = <Wrap>{children}</Wrap>;
  return (
    <section className={`${tight ? "py-10 sm:py-12 md:py-16" : "py-12 sm:py-16 md:py-24"} ${bg} ${className}`}>
      {revealChildren ? content : <RevealOnScroll>{content}</RevealOnScroll>}
    </section>
  );
}
