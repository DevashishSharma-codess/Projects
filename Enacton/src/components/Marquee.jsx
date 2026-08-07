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
      className="relative z-10 border-y border-ink/10 bg-paper py-6 md:py-8 overflow-hidden select-none"
    >
      <motion.div
        className="flex whitespace-nowrap shrink-0"
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
            <span className="font-outfit text-4xl md:text-6xl font-medium tracking-tight text-ink/90 whitespace-nowrap px-8 md:px-14">
              {item}
            </span>
            <span className="text-2xl md:text-4xl text-[#C2612B]">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
