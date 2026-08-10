import { useEffect, memo } from "react";

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

// OPTIMIZATION: Eradicated Framer Motion & React State. 
// Uses 100% native GPU-accelerated CSS keyframes. Zero main thread usage.
const AudioStatusText = memo(function AudioStatusText() {
  return (
    <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-40 pointer-events-none w-max h-8 flex items-center justify-center">
      <style>{`
        @keyframes status-cycle {
          0% { opacity: 0; transform: translateY(10px) scale(0.98); }
          3% { opacity: 1; transform: translateY(0) scale(1); }
          17% { opacity: 1; transform: translateY(0) scale(1); }
          20% { opacity: 0; transform: translateY(-10px) scale(0.98); }
          100% { opacity: 0; transform: translateY(-10px) scale(0.98); }
        }
        .status-item {
          position: absolute;
          opacity: 0;
          animation: status-cycle 12.5s infinite;
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
        }
      `}</style>
      
      {STATUS_STEPS.map((step, i) => (
        <div 
          key={i} 
          className="status-item text-sm sm:text-lg md:text-xl font-outfit font-semibold text-ink drop-shadow-xs"
          style={{ animationDelay: `${i * 2.5}s` }}
        >
          {step.icon}
          <span>{step.text}</span>
        </div>
      ))}
    </div>
  );
});

// OPTIMIZATION: 100% native CSS keyframes. Zero React state.
const WaveformMarquee = memo(function WaveformMarquee() {
  const bars = Array.from({ length: WAVE_BAR_COUNT }, (_, index) => index);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <style>{`
        @keyframes slide-mq { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
        .animate-slide-mq { animation: slide-mq 4s linear infinite; }
        
        ${Array.from({ length: 8 })
          .map(
            (_, i) => `
          @keyframes bar-pulse-${i} {
            0% { transform: scaleY(0.2); }
            33.33% { transform: scaleY(${(30 + i * 7) / 100}); }
            66.66% { transform: scaleY(0.5); }
            100% { transform: scaleY(0.2); }
          }
        `
          )
          .join("\n")}
      `}</style>
      
      <div className="flex h-full w-max items-center gap-1.5 px-3 animate-slide-mq">
        {[...bars, ...bars].map((index, key) => {
          const mod8 = index % 8;
          const dur = 0.35 + (index % 4) * 0.1;
          const delay = index * 0.05;
          return (
            <span
              key={key}
              className="block w-1.5 h-full shrink-0 rounded-full bg-ink origin-center"
              style={{
                animation: `bar-pulse-${mod8} ${dur}s linear ${delay}s infinite alternate`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
});

const Content = memo(function Content() {
  return (
    <div className="relative z-10 flex w-full max-w-5xl flex-col items-center pt-6 sm:pt-10 md:pt-12 pb-6 sm:pb-10 md:pb-12 text-center select-none">
      <div className="relative w-full min-h-[340px] sm:min-h-[480px] md:min-h-[620px] flex items-center justify-center p-3 sm:p-4">
        {/* Make sure halftone-hands.png is edited to B&W natively to remove CSS filter lag */}
        <img
          src="/halftone-hands.png"
          alt="Halftone hands graphic asset"
          className="absolute inset-0 h-full w-full object-contain pointer-events-none z-0 opacity-95 scale-110 sm:scale-115"
          style={{ transform: "translateZ(0)" }}
        />

        <svg
          viewBox="0 0 540 420"
          className="absolute inset-0 h-full w-full pointer-events-none z-10 overflow-visible scale-105 sm:scale-110"
          fill="none"
          style={{ transform: "translateZ(0)" }}
        >
          <path
            d="M 60 140 C 160 30, 360 30, 420 160 C 480 300, 220 400, 110 300 C 20 190, 140 40, 320 60 C 440 80, 510 190, 525 190"
            stroke="#17130f"
            strokeWidth="2.4"
            fill="none"
          />
          <circle cx="525" cy="190" r="5" fill="#17130f" />
        </svg>

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
});

const SVGAnimation = memo(function SVGAnimation() {
  // THE FINAL WISPRFLOW HACK: 
  // Pushed natively as an HTML string so React Virtual DOM completely ignores it.
  
  const rawSVG = `
    <!-- Left Curve -->
    <div class="absolute -left-80 -top-80" style="contain: layout paint;">
      <svg class="h-auto w-[1200px] -translate-x-72 -translate-y-20 scale-150" viewBox="0 0 1048 594" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
          #curve1 { fill: transparent; stroke: transparent; }
          #marquee-text-hero1 { font-family: inherit; font-size: 15px; font-weight: 400; fill: rgba(23, 19, 15, 0.4); }
        </style>
        <path id="curve1" d="M0.597656 50.924805C17.4612 143.2965 97.8522 293.141 284.508 353.548C440.828 399.056 583.839 294.067 500.618 184.7492C417.397 75.4309 238.217 282.098 499.258 441.668C551.913 477.802 817.468 561.26 1046.43 565.235"></path>
        <text x="-2947" text-rendering="optimizeSpeed">
          <textPath href="#curve1" id="marquee-text-hero1" baseline-shift="-20%">${LEFT_TEXT}</textPath>
          <animate attributeName="x" dur="35s" values="-2947; 0" repeatCount="indefinite" />
        </text>
      </svg>
    </div>

    <!-- Right Curve -->
    <div class="absolute -right-60 -top-92 w-[780px]" style="contain: layout paint;">
      <svg class="h-auto w-[1200px] scale-[1.2]" viewBox="0 0 1024 620" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
          #curve2 { fill: transparent; stroke: #17130f; stroke-width: 30; }
          #marquee-text-hero2 { font-family: inherit; font-size: 15px; font-weight: 600; fill: #FDFBF9; }
        </style>
        <path id="curve2" d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216"></path>
        <text x="-4018" text-rendering="optimizeSpeed">
          <textPath href="#curve2" id="marquee-text-hero2" baseline-shift="-30%">${RIGHT_TEXT}</textPath>
          <animate attributeName="x" dur="50s" values="-4018; 0" repeatCount="indefinite" />
        </text>
      </svg>
    </div>
  `;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-1/2 left-1/2 z-0 h-152 w-6xl -translate-x-1/2 translate-y-[45%]"
      dangerouslySetInnerHTML={{ __html: rawSVG }}
    />
  );
});

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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(253,251,249,0.95),transparent_75%)] pointer-events-none" />

      <Content />

      <div className="absolute bottom-5 sm:bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3">
        <div className="relative w-64 sm:w-84 overflow-visible">
          <AudioStatusText />
          <SVGAnimation />
          <div className="relative z-10 flex h-16 sm:h-20 w-full items-center overflow-hidden rounded-full border-2 border-ink bg-white/95 shadow-xl">
            <WaveformMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WisprFlowMarquee;
