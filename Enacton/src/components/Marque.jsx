import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WAVE_BAR_COUNT = 32;

const LEFT_BASE =
  "Engineering digital experiences that scale · Architecting autonomous AI agents, high-frequency web platforms, and native mobile apps · Built with zero friction, sub-second latency, and enterprise security · From initial design concept to production scale, we own the craft end-to-end · Rapid deployment, resilient infrastructure, and high reliability for modern builders";

const RIGHT_BASE =
  "Full-stack Web Platforms · Native iOS & Android Apps · AI Copilots & RAG Engines · Design Systems · Cloud Infrastructure · 120+ Products Shipped · 40M+ Users Reached · Sub-second Latency · 99.99% Uptime Guarantee · Crafted by EnactON Studio";

const LEFT_TEXT = `${LEFT_BASE} · ${LEFT_BASE} · ${LEFT_BASE}`;
const RIGHT_TEXT = `${RIGHT_BASE} · ${RIGHT_BASE} · ${RIGHT_BASE}`;

const STATUS_STEPS = [
  {
    text: "Listening...",
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="6" />
      </svg>
    ),
  },
  {
    text: "Cleaning up...",
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 3v3m0 12v3M3 12h3m12 0h3m-3.5-6.5l-2 2m-7 7l-2 2m11 0l-2-2m-7-7l-2-2" />
      </svg>
    ),
  },
  {
    text: "Filler identified",
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    text: "Formatting...",
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#C2612B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
      </svg>
    ),
  },
  {
    text: "Polished & Ready",
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

function AudioStatusText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATUS_STEPS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const current = STATUS_STEPS[index];
  const characters = current.text.split("");

  return (
    <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-40 pointer-events-none w-max">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 sm:gap-2.5 text-sm sm:text-lg md:text-xl font-outfit font-semibold text-ink drop-shadow-xs"
        >
          {current.icon}
          <motion.div className="flex items-center">
            {characters.map((char, charIdx) => (
              <motion.span
                key={charIdx}
                initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.28,
                  delay: charIdx * 0.025,
                  ease: "easeOut",
                }}
                className={char === " " ? "mr-1 sm:mr-1.5" : "inline-block"}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function WaveformMarquee() {
  const bars = Array.from({ length: WAVE_BAR_COUNT }, (_, index) => index);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="flex h-full w-max items-center gap-1.5 px-3"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
      >
        {[...bars, ...bars].map((index, key) => (
          <motion.span
            key={key}
            className="block w-1.5 shrink-0 rounded-full bg-ink"
            animate={{
              height: ["20%", `${30 + (index % 8) * 7}%`, "50%", "20%"],
            }}
            transition={{
              duration: 0.35 + (index % 4) * 0.1,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.05,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function Content() {
  return (
    <div className="relative z-10 flex w-full max-w-5xl flex-col items-center pt-6 sm:pt-10 md:pt-12 pb-6 sm:pb-10 md:pb-12 text-center select-none">
      {/* Halftone Hands Graphic Asset Container */}
      <div className="relative w-full min-h-[340px] sm:min-h-[480px] md:min-h-[620px] flex items-center justify-center p-3 sm:p-4">
        {/* Black & White Halftone Hands PNG Background Asset */}
        <img
          src="/halftone-hands.png"
          alt="Halftone hands graphic asset"
          className="absolute inset-0 h-full w-full object-contain grayscale brightness-90 contrast-125 pointer-events-none z-0 opacity-95 scale-110 sm:scale-115"
        />

        {/* Continuous Looping Curve SVG Line */}
        <svg
          viewBox="0 0 540 420"
          className="absolute inset-0 h-full w-full pointer-events-none z-10 overflow-visible scale-105 sm:scale-110"
          fill="none"
        >
          <path
            d="M 60 140 C 160 30, 360 30, 420 160 C 480 300, 220 400, 110 300 C 20 190, 140 40, 320 60 C 440 80, 510 190, 525 190"
            stroke="#17130f"
            strokeWidth="2.4"
            fill="none"
          />
          <circle cx="525" cy="190" r="5" fill="#17130f" />
        </svg>

        {/* Centered Journey Headline inside the loop */}
        <div className="relative z-20 text-center max-w-xs sm:max-w-md px-3 sm:px-4">
          <h2 className="font-outfit text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.08]">
            Let's take <br />
            this <span className="font-playfair italic text-[#C2612B] font-normal">journey</span> <br />
            together.
          </h2>
        </div>
      </div>
    </div>
  );
}

function SVGAnimation() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-1/2 left-1/2 z-0 h-152 w-6xl -translate-x-1/2 translate-y-[45%]"
    >
      <div
        className="absolute -left-80 -top-80"
        style={{ clipPath: "polygon(0 0, 100% 0, 96% 96%, 0 100%)" }}
      >
        <svg
          id="hero-svg"
          className="h-auto w-[1200px] -translate-x-72 -translate-y-20 scale-150"
          viewBox="0 0 1048 594"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="first-curve"
            className="fill-transparent stroke-transparent"
            d="M0.597656 50.924805C17.4612 143.2965 97.8522 293.141 284.508 353.548C440.828 399.056 583.839 294.067 500.618 184.7492C417.397 75.4309 238.217 282.098 499.258 441.668C551.913 477.802 817.468 561.26 1046.43 565.235"
          />
          <text className="text-[15px]">
            <motion.textPath
              href="#first-curve"
              startOffset="0%"
              className="fill-ink font-normal opacity-40 [baseline-shift:-20%]"
              animate={{ startOffset: ["-100%", "0%"] }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            >
              {LEFT_TEXT}
            </motion.textPath>
          </text>
        </svg>
      </div>

      <div className="absolute -right-60 -top-92 w-[780px]">
        <svg
          className="h-auto w-[1200px] scale-[1.2]"
          viewBox="0 0 1024 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="second-curve"
            className="stroke-ink stroke-[30]"
            d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216"
          />
          <text className="text-[15px]">
            <motion.textPath
              href="#second-curve"
              startOffset="0%"
              className="fill-paper font-semibold [baseline-shift:-30%]"
              animate={{ startOffset: ["-100%", "0%"] }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            >
              {RIGHT_TEXT}
            </motion.textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}

export function WisprFlowMarquee() {
  useEffect(() => {
    const id = "baskervville-font";

    if (document.getElementById(id)) {
      return;
    }

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <section className="relative min-h-[80vh] md:min-h-[92vh] pt-10 sm:pt-12 md:pt-16 pb-24 sm:pb-28 md:pb-36 w-full overflow-hidden flex flex-col items-center justify-center bg-[#fdfbf9] border-t border-ink/10 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(253,251,249,0.95),transparent_75%)]" />

      <Content />

      <div className="absolute bottom-5 sm:bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3">
        <div className="relative w-64 sm:w-84 overflow-visible">
          <AudioStatusText />
          <SVGAnimation />
          <div className="relative z-10 flex h-16 sm:h-20 w-full items-center overflow-hidden rounded-full border-2 border-ink bg-white/90 backdrop-blur-md shadow-xl">
            <WaveformMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WisprFlowMarquee;
