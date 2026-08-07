import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./Navbar";
import { Grain } from "./components/Grain";
import { MarqueeStrip } from "./components/Marquee";
import { WhatWeDo } from "./components/WhatWeDo";
import { ProductShowcase } from "./components/ProductShowcase";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonilas";
import { WisprFlowMarquee } from "./components/Marque";
import { Footer } from "./components/Footer";
import { LogoMark } from "./components/LogoMark";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/aaff03bd-13eb-4784-a3f9-c2ad7e7acf3a/images/7c1aafe5306058007c7c92a2a22e1fb606d2e6c48cbf50c3a393af8c07c0079a.jpeg";

const LINES = ["Engineering Digital", "Experiences", "That Scale"];

const lineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

const lineItem = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] } },
};

// Converging SVG Line Paths & Dash Array Config
const PATHS = [
  { d: "M 0 0 L 0 404.609", transform: "translate(370 0)", dim: 20 },
  {
    d: "M 164 0 L 98.814 0 L 0 83.557 L 0 205",
    transform: "translate(400 110)",
  },
  {
    d: "M 0 0 L 56.317 0 C 93.572 34.834 114.632 53.417 155 84.826 L 155 206",
    transform: "translate(181.152 110)",
  },
  { d: "M 0 0 L 295 0 L 295 81", transform: "translate(0 221)" },
  { d: "M 296 0 L 0 0 L 0 79", transform: "translate(438 221)" },
];

/* ---------------------------------------------------------
   Hero Line Animation Component (Fully Responsive Across All Screens)
--------------------------------------------------------- */
function HeroLineAnimation() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 w-full px-3 sm:px-6 pb-3 sm:pb-6 md:pb-8">
      {/* Stage matches SVG viewBox (734:405) aspect ratio */}
      <div className="relative mx-auto aspect-[734/405] max-h-[30vh] sm:max-h-[32vh] w-full max-w-[620px] sm:max-w-[720px] lg:max-w-[780px]">
        {/* Responsive Capability Tags */}
        <div className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2.5 py-1 text-center font-mono text-[8px] sm:text-[10px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-60 md:px-4 tracking-wider absolute left-[50.41%] top-0 z-30 w-fit -translate-x-1/2 -translate-y-1/2">
          Autonomous AI Agents
        </div>
        <div className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2.5 py-1 text-center font-mono text-[8px] sm:text-[10px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-60 md:px-4 tracking-wider absolute left-[24.68%] top-[27.16%] z-30 w-fit -translate-x-1/2 -translate-y-1/2">
          High Scale Platforms
        </div>
        <div className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2.5 py-1 text-center font-mono text-[8px] sm:text-[10px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-60 md:px-4 tracking-wider absolute left-[76.84%] top-[27.16%] z-30 w-fit max-w-[55%] -translate-x-1/2 -translate-y-1/2 sm:max-w-none">
          Native Mobile Apps
        </div>
        <div className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2.5 py-1 text-center font-mono text-[8px] sm:text-[10px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-60 md:px-4 tracking-wider absolute left-0 top-[54.56%] z-30 w-fit -translate-x-1/2 -translate-y-1/2">
          Cloud Infrastructure
        </div>
        <div className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2.5 py-1 text-center font-mono text-[8px] sm:text-[10px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-60 md:px-4 tracking-wider absolute left-full top-[54.56%] z-30 w-fit -translate-x-1/2 -translate-y-1/2">
          Enterprise Systems
        </div>

        {/* Converging SVG Line Paths at z-10 */}
        <svg
          role="presentation"
          viewBox="0 0 734 405"
          className="absolute inset-0 h-full w-full z-10"
          fill="none"
        >
          {PATHS.map((path) => (
            <g key={path.d} transform={path.transform}>
              <path
                d={path.d}
                stroke="rgba(23, 19, 15, 0.15)"
                strokeWidth={3}
              />
              <motion.path
                d={path.d}
                pathLength={1}
                stroke="#17130f"
                strokeWidth={2.5}
                strokeLinecap="butt"
                strokeDasharray="0.2 0.8"
                animate={{ strokeDashoffset: [0, -1] }}
                transition={{
                  duration: 2.2,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 0,
                }}
              />
            </g>
          ))}
        </svg>

        {/* Destination Node: Glossy Black Translucent Box with White EnactON LogoMark */}
        <div className="pointer-events-auto absolute bottom-0 left-[50.41%] size-16 sm:size-24 md:size-28 lg:size-32 -translate-x-1/2 translate-y-1/2 rounded-xl bg-gradient-to-br from-black/90 via-black/75 to-black/50 backdrop-blur-xl border border-white/40 shadow-2xl p-1.5 sm:p-2.5 z-40 flex items-center justify-center">
          <LogoMark className="text-white w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-lg" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Hero Section Component
--------------------------------------------------------- */
export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative h-[100dvh] w-full max-w-full overflow-hidden flex flex-col items-center justify-between bg-[#fdfbf9] select-none"
    >
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src={HERO_IMG}
          alt="Surreal mountains rising above a sea of pastel clouds"
          className="h-full w-full object-cover opacity-85"
        />
      </motion.div>

      {/* Atmospheric overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-transparent to-paper z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(253,251,249,0.65),transparent_70%)] z-0" />

      {/* Hero Headline & Subtext Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 text-center pt-20 sm:pt-28 pb-2">
        {/* Main Headline */}
        <motion.h1
          variants={lineContainer}
          initial="hidden"
          animate="show"
          data-testid="hero-heading"
          className="font-outfit font-medium tracking-tighter leading-[1.0] text-ink text-[11vw] sm:text-6xl md:text-7xl lg:text-[5.6rem]"
        >
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.18em]">
              <motion.span variants={lineItem} className="block">
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          data-testid="hero-subheading"
          className="mx-auto mt-4 sm:mt-6 max-w-2xl text-xs sm:text-base md:text-lg font-light leading-relaxed text-ink/85 px-2"
        >
          We design, build, and ship high-performance web, mobile, and
          AI-powered products for modern businesses.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 sm:mt-6 flex flex-row items-center justify-center gap-3"
        >
          <a
            href="#contact"
            data-testid="hero-cta-primary"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 sm:px-7 py-2.5 sm:py-3 font-outfit text-xs sm:text-sm font-medium text-paper transition-transform duration-300 hover:scale-[1.04] shadow-md"
          >
            Get Started
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#products"
            data-testid="hero-cta-secondary"
            className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-md border border-white/90 px-5 sm:px-7 py-2.5 sm:py-3 font-outfit text-xs sm:text-sm font-medium text-ink transition-colors duration-300 hover:bg-white/90 shadow-sm"
          >
            View Products
          </a>
        </motion.div>
      </div>

      {/* Converging SVG Line Animation Stage at Bottom */}
      <HeroLineAnimation />
    </section>
  );
};

/* ---------------------------------------------------------
   Main App Export with Lenis Liquid Smooth Scroll Integration
--------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    // Initialize Lenis Inertia Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis Scroll Events with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger calculations after Lenis mounts
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans relative selection:bg-[#C2612B] selection:text-white overflow-x-hidden">
      <Grain />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <WhatWeDo />
        <ProductShowcase />
        <About />
        <Testimonials />
        <WisprFlowMarquee />
      </main>
      <Footer />
    </div>
  );
}
