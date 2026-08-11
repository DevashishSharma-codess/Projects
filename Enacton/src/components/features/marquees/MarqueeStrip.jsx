import { motion } from "framer-motion";

const ITEMS = [
  "Web Platforms",
  "Mobile Apps",
  "AI Products",
  "Design Systems",
  "Cloud Infrastructure",
];

export const MarqueeStrip = () => {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <section
      data-testid="marquee-strip"
      className="relative z-10 bg-white py-6 md:py-8 overflow-hidden select-none"
    >
      {/* Fine Dotted Matrix Canvas Overlay matching WhatWeDo */}
      <div className="absolute inset-0 bg-[radial-gradient(#17130f_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

      <motion.div
        className="relative z-10 flex whitespace-nowrap shrink-0 gpu-layer"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 20,
        }}
      >
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="font-outfit text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-ink/80 whitespace-nowrap px-6 md:px-10">
              {item}
            </span>
            <span className="text-lg md:text-2xl text-ink/40">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default MarqueeStrip;
