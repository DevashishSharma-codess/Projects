import { motion } from "framer-motion";
import { HeroLineAnimation } from "./HeroLineAnimation";

const HERO_IMG = "/hero-bg.jpg";

const LINES = ["Engineering Digital", "Experiences", "That Scale"];

const lineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

const lineItem = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------------------------------------------------------
   Hero Section Component
--------------------------------------------------------- */
export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100dvh] h-[100dvh] w-full max-w-full flex flex-col items-center justify-between bg-[#fdfbf9] select-none py-2 sm:py-4 z-20"
    >
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 overflow-hidden gpu-layer"
      >
        <img
          src={HERO_IMG}
          alt="Surreal mountains rising above a sea of pastel clouds"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover opacity-85"
        />
      </motion.div>

      {/* Atmospheric overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-transparent to-paper z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(253,251,249,0.65),transparent_70%)] z-0 pointer-events-none" />

      {/* Hero Headline & Subtext Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-8 text-center pt-7 sm:pt-10 md:pt-11 lg:pt-12 mb-2 sm:mb-4 flex-1 flex flex-col items-center justify-center">
        {/* Main Headline */}
        <motion.h1
          variants={lineContainer}
          initial="hidden"
          animate="show"
          data-testid="hero-heading"
          className="font-outfit font-light tracking-[-0.05em] leading-[1.02] text-ink text-[9.5vw] sm:text-5xl md:text-6xl lg:text-[5.0rem]"
        >
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.25em] -mb-[0.18em]">
              <motion.span variants={lineItem} className="block">
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          data-testid="hero-subheading"
          className="mx-auto mt-3.5 sm:mt-4.5 max-w-lg text-xs sm:text-sm md:text-base font-light leading-relaxed text-ink/85 px-2"
        >
          We design, build, and ship high-performance web, mobile, and
          AI-powered products for modern businesses.
        </motion.p>
      </div>

      {/* Converging SVG Line Animation Stage at Bottom */}
      <HeroLineAnimation />
    </section>
  );
};
