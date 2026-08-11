import { motion } from "framer-motion";
import { Globe, Smartphone, Cpu, Layers } from "lucide-react";

import cardBg1 from "../../../assets/card-bgs/card-bg-1.jpg";
import cardBg2 from "../../../assets/card-bgs/card-bg-2.jpg";
import cardBg3 from "../../../assets/card-bgs/card-bg-3.jpg";
import cardBg4 from "../../../assets/card-bgs/card-bg-4.jpg";

const SERVICES = [
  {
    num: "01",
    title: "Web Platforms",
    desc: "Scalable, blazing-fast web applications built on modern stacks.",
    bg: cardBg1,
    borderStyle: {
      borderColor: "rgba(116, 192, 252, 0.85)",
      boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 0 1px rgba(116, 192, 252, 0.4)",
    },
    Icon: Globe,
  },
  {
    num: "02",
    title: "Mobile Apps",
    desc: "Native-grade iOS & Android experiences that feel effortless.",
    bg: cardBg2,
    borderStyle: {
      borderColor: "rgba(255, 146, 43, 0.85)",
      boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 0 1px rgba(255, 146, 43, 0.4)",
    },
    Icon: Smartphone,
  },
  {
    num: "03",
    title: "AI Products",
    desc: "LLM features, RAG pipelines & autonomous intelligent agents.",
    bg: cardBg3,
    borderStyle: {
      borderColor: "rgba(59, 201, 219, 0.85)",
      boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 0 1px rgba(59, 201, 219, 0.4)",
    },
    Icon: Cpu,
  },
  {
    num: "04",
    title: "Design & Systems",
    desc: "Design systems & cloud infrastructure built to scale fast.",
    bg: cardBg4,
    borderStyle: {
      borderColor: "rgba(130, 201, 30, 0.85)",
      boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 0 1px rgba(130, 201, 30, 0.4)",
    },
    Icon: Layers,
  },
];

export const WhatWeDo = () => {
  return (
    <section
      id="what-we-do"
      data-testid="what-we-do-section"
      className="relative z-10 w-full bg-white pt-28 sm:pt-36 pb-20 sm:pb-28 border-t border-ink/10 select-none overflow-hidden"
    >
      {/* Fine Dotted Matrix Canvas Overlay with Enhanced Contrast for Lower Resolution Screens */}
      <div className="absolute inset-0 bg-[radial-gradient(#17130f_1px,transparent_1px)] [background-size:16px_16px] opacity-30 max-lg:opacity-30 lg:opacity-22 pointer-events-none" />

      <span id="services" className="absolute -top-24" aria-hidden="true" />
      
      <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Eyebrow Label in Running Font */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8 sm:mb-12"
        >
          <span className="font-outfit text-xs uppercase tracking-[0.25em] text-ink/50 font-semibold">
            / FILTERING FOR YOUR DIGITAL PRODUCTS
          </span>
        </motion.div>

        {/* Section Title in Running Font */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="font-outfit text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-ink leading-[1.05]">
            A full-stack studio for ambitious products.
          </h2>
          <p className="mt-4 font-outfit text-ink/65 text-xs sm:text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            From first architectural sketch to production scale, we craft resilient digital experiences end-to-end.
          </p>
        </motion.div>

        {/* 4 Vertical Cards Grid with Watercolor Backgrounds & Artwork-Matched Outlines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {SERVICES.map((s, idx) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              data-testid={`what-we-do-card-${s.num}`}
              style={s.borderStyle}
              className="group relative h-[310px] sm:h-[340px] md:h-[370px] rounded-none border-[3px] overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-5 sm:p-6 select-none"
            >
              {/* Watercolor Background Image */}
              <img
                src={s.bg}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Seamless Artwork Inner Frame Highlight */}
              <div className="absolute inset-1 border border-white/40 pointer-events-none z-10 opacity-70" />

              {/* Top Row: Icon in stroke style */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-none bg-white/45 backdrop-blur-xs flex items-center justify-center border border-black/10 text-ink">
                  <s.Icon size={18} strokeWidth={1.75} />
                </div>
                <span className="font-outfit text-xs font-bold text-ink/40">
                  {s.num}
                </span>
              </div>

              {/* Bottom Row: Title & Subtitle */}
              <div className="relative z-10 mt-auto">
                <h3 className="font-outfit text-xl sm:text-2xl font-medium tracking-tight text-ink mb-1.5">
                  {s.title}
                </h3>
                <p className="font-outfit text-xs sm:text-sm font-light text-ink/75 leading-relaxed line-clamp-2">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Continue Scrolling Normal Text Indicator in Running Font */}
        <div className="flex flex-col items-center justify-center pt-16 sm:pt-20">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 font-outfit text-xs uppercase tracking-[0.2em] text-ink/60 font-semibold"
          >
            <span>CONTINUE SCROLLING</span>
            <span className="text-ink/40">↓</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
