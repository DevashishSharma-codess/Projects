import { motion } from "framer-motion";
import { LogoMark } from "./LogoMark";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

const SEGMENT = 0.1;
const GAP = 1 - SEGMENT;

// Signature Studio Hero Image Asset desaturated to clean monochrome
const HERO_IMAGE_ASSET =
  "https://static.prod-images.emergentagent.com/jobs/aaff03bd-13eb-4784-a3f9-c2ad7e7acf3a/images/7c1aafe5306058007c7c92a2a22e1fb606d2e6c48cbf50c3a393af8c07c0079a.jpeg";

function Tag({ children, className }) {
  return (
    <div
      className={cn(
        "max-w-[calc(100%-0.5rem)] border border-white/40 bg-white/10 px-2 py-1 text-center font-mono text-[9px] font-medium uppercase text-white backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[10px] md:w-52 md:px-3 md:text-xs shadow-lg tracking-wider",
        className
      )}
    >
      {children}
    </div>
  );
}

function AnimatedLine({ d, transform }) {
  return (
    <g transform={transform}>
      <path
        d={d}
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth={3}
      />
      <motion.path
        d={d}
        pathLength={1}
        stroke="#ffffff"
        strokeWidth={1.5}
        strokeLinecap="butt"
        strokeDasharray={`${SEGMENT} ${GAP}`}
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -(SEGMENT + GAP) }}
        transition={{
          duration: 2.5,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0.5,
        }}
      />
    </g>
  );
}

export default function LineSection() {
  return (
    <section
      id="line-section"
      data-testid="line-animation-section"
      className="relative z-10 w-full h-screen bg-[#0c0a08] text-white py-4 sm:py-6 border-t border-white/10 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Signature Studio Hero Image Asset Background */}
      <img
        src={HERO_IMAGE_ASSET}
        alt="Studio signature landscape background"
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover grayscale brightness-125 contrast-110 opacity-30 [mask-image:linear-gradient(to_bottom,black_0%,transparent_90%)]"
      />

      {/* Top Header Block */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto pt-16 sm:pt-20">
        <div className="inline-flex items-center gap-2 border border-white/35 px-3 py-1 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/90 bg-white/5 backdrop-blur-md shadow-lg mb-3">
          <span>[ ENACTON_ECOSYSTEM ]</span>
        </div>

        <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-light uppercase tracking-tight text-white leading-tight">
          READY TO BUILD THE FUTURE WITH ENACTON STUDIO?
        </h2>

        <p className="font-outfit mt-2 text-xs sm:text-sm font-extralight text-white/80 max-w-xl leading-relaxed">
          Autonomous AI agents, cloud infrastructure, and enterprise platforms converging into one unified engine.
        </p>

        <div className="mt-4 sm:mt-5">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-outfit text-xs sm:text-sm font-medium text-ink transition-all duration-300 hover:scale-105 shadow-xl"
          >
            <span>Discuss Your Project</span>
          </a>
        </div>
      </div>

      {/* Converging SVG Stage Container */}
      <div className="relative z-20 w-full max-w-[640px] sm:max-w-[700px] mx-auto px-4 pb-10 sm:pb-14 mt-auto">
        <div className="relative mx-auto aspect-[734/405] w-full">
          {/* Relevant EnactON Studio Product & Capability Tags */}
          <Tag className="absolute left-[50.41%] top-0 z-10 w-fit -translate-x-1/2">
            Autonomous AI Agents
          </Tag>
          <Tag className="absolute left-[24.68%] top-[27.16%] z-10 w-fit -translate-x-1/2">
            High Scale Platforms
          </Tag>
          <Tag className="absolute left-[76.84%] top-[27.16%] z-10 w-fit max-w-[60%] -translate-x-1/2 sm:max-w-none">
            Native Mobile Apps
          </Tag>
          <Tag className="absolute left-0 top-[49.57%] z-10 w-fit -translate-x-1/2">
            Cloud Infrastructure
          </Tag>
          <Tag className="absolute left-full top-[49.57%] z-10 w-fit -translate-x-1/2">
            Enterprise Systems
          </Tag>

          <svg
            role="presentation"
            viewBox="0 0 734 405"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            {PATHS.map((path) => (
              <AnimatedLine key={path.d} {...path} />
            ))}
          </svg>

          {/* Solid White Square Box Destination Node containing Black EnactON Logo Mark */}
          <div className="absolute bottom-0 left-[50.41%] size-20 sm:size-28 md:size-32 lg:size-36 -translate-x-1/2 translate-y-1/2 rounded-md bg-white/20 p-1 sm:p-1.5 z-20 shadow-2xl backdrop-blur-md">
            <div className="size-full bg-white rounded-xs shadow-xl flex items-center justify-center">
              <LogoMark className="text-black w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}