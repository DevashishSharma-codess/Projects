import { motion } from "framer-motion";
import { LogoMark } from "../../common/LogoMark";

// Converging SVG Line Paths & Dash Array Config
const PATHS = [
  { d: "M 0 0 L 0 408", transform: "translate(370 0)", dim: 20 },
  {
    d: "M 145 0 L 98.814 0 L -15 83.557 L -15 298",
    transform: "translate(400 110)",
  },
  {
    d: "M 0 0 L 56.317 0 C 93.572 34.834 114.632 53.417 173.848 84.826 L 173.848 298",
    transform: "translate(181.152 110)",
  },
  { d: "M 0 0 L 340 0 L 340 187", transform: "translate(0 221)" },
  { d: "M 0 0 L -340 0 L -340 187", transform: "translate(740 221)" },
];

/* ---------------------------------------------------------
   Hero Line Animation Component (Fully Responsive Across All Screens)
--------------------------------------------------------- */
export function HeroLineAnimation() {
  return (
    <div className="pointer-events-none z-20 w-full px-4 sm:px-6 pb-6 sm:pb-8 md:pb-10 mt-auto">
      {/* Responsive stage with max-height & viewport scaling */}
      <div className="relative mx-auto aspect-[734/405] max-h-[22vh] sm:max-h-[26vh] md:max-h-[28vh] lg:max-h-[30vh] w-full max-w-[500px] sm:max-w-[650px] lg:max-w-[740px]">
        {/* Staggered Entrance Capability Tags */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[50.41%] top-0 z-30 w-fit -translate-x-1/2 -translate-y-1/2 gpu-layer"
        >
          Autonomous AI Agents
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.28, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[24.68%] top-[27.16%] z-30 w-fit -translate-x-1/2 -translate-y-1/2 gpu-layer"
        >
          High Scale Platforms
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.36, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[76.84%] top-[27.16%] z-30 w-fit max-w-[55%] -translate-x-1/2 -translate-y-1/2 sm:max-w-none gpu-layer"
        >
          Native Mobile Apps
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.44, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[12%] sm:left-0 top-[54.56%] z-30 w-fit -translate-x-1/2 -translate-y-1/2 gpu-layer"
        >
          <span className="block sm:inline">Cloud </span>
          <span className="block sm:inline">Infrastructure</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.52, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[88%] sm:left-full top-[54.56%] z-30 w-fit -translate-x-1/2 -translate-y-1/2 gpu-layer"
        >
          Enterprise Systems
        </motion.div>

        {/* Converging SVG Line Paths Fade-In Entrance (Pure CSS Hardware Accelerated) */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.35, ease: "easeOut" }}
          role="presentation"
          viewBox="0 0 734 405"
          className="absolute inset-0 h-full w-full z-10 gpu-layer"
          shapeRendering="geometricPrecision"
          fill="none"
        >
          {PATHS.map((path) => (
            <g key={path.d} transform={path.transform}>
              <path
                d={path.d}
                stroke="rgba(23, 19, 15, 0.15)"
                strokeWidth={3}
              />
              <path
                d={path.d}
                pathLength={1}
                stroke="#17130f"
                strokeWidth={2.5}
                strokeLinecap="butt"
                className="animate-hero-dash"
              />
            </g>
          ))}
        </motion.svg>

        {/* Destination Node: Sharp Glass Square Box with Transparent Outline & Bubble Glass Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto absolute bottom-0 left-[50.41%] size-24 sm:size-30 md:size-34 lg:size-38 aspect-square -translate-x-1/2 translate-y-1/2 rounded-none p-3 sm:p-4 z-50 flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 border-2 border-white/90 ring-4 ring-black/5 shadow-none gpu-layer"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(235, 238, 242, 0.88) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          {/* Glass Bubble Top Sheen Reflection */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white via-white/60 to-transparent pointer-events-none opacity-90 z-0" />
          
          {/* Bubble Curved Gloss Arc */}
          <div className="absolute inset-x-2 top-1 h-10 sm:h-14 bg-gradient-to-b from-white via-white/50 to-transparent pointer-events-none opacity-90 z-0" style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />

          {/* Crisp Pure Black Logo */}
          <LogoMark className="relative z-10 text-black w-13 h-13 sm:w-18 sm:h-18 md:w-21 md:h-21 shrink-0" />
        </motion.div>
      </div>
    </div>
  );
}
