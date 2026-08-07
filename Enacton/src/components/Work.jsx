import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Lumen Finance",
    cat: "Web Platform",
    year: "2025",
    img: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMDNkJTIwcmVuZGVyJTIwc29mdCUyMHBhc3RlbCUyMHNoYXBlfGVufDB8fHx8MTc4NjA3OTQxMXww&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-7",
    h: "h-[62vh]",
  },
  {
    title: "Orbit Mobile",
    cat: "iOS · Android",
    year: "2025",
    img: "https://images.unsplash.com/photo-1766503206606-27de0861e8a4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbW9iaWxlJTIwYXBwJTIwbW9ja3VwJTIwbWluaW1hbHxlbnwwfHx8fDE3ODYwNzk0MTF8MA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-5 md:mt-28",
    h: "h-[52vh]",
  },
  {
    title: "Neura AI",
    cat: "AI Product",
    year: "2024",
    img: "https://images.unsplash.com/photo-1670189577367-2c6ef31a4b8c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMDNkJTIwcmVuZGVyJTIwc29mdCUyMHBhc3RlbCUyMHNoYXBlfGVufDB8fHx8MTc4NjA3OTQxMXww&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-5",
    h: "h-[52vh]",
  },
  {
    title: "Halo Design System",
    cat: "Design System",
    year: "2024",
    img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMDNkJTIwcmVuZGVyJTIwc29mdCUyMHBhc3RlbCUyMHNoYXBlfGVufDB8fHx8MTc4NjA3OTQxMXww&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-7 md:-mt-16",
    h: "h-[62vh]",
  },
];

const ParallaxCard = ({ p, i }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`work-item-${i}`}
      className={`group ${p.span}`}
    >
      <div className={`relative w-full ${p.h} overflow-hidden rounded-2xl bg-ink/5`}>
        <motion.img
          src={p.img}
          alt={p.title}
          style={{ y }}
          className="absolute inset-0 h-[120%] w-full object-cover -top-[10%] transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/70 backdrop-blur-md opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between">
        <h3 className="font-outfit text-xl md:text-2xl font-medium tracking-tight">
          {p.title}
        </h3>
        <span className="text-sm text-ink/40">{p.year}</span>
      </div>
      <p className="text-sm text-ink/55">{p.cat}</p>
    </motion.div>
  );
};

export const Work = () => (
  <section
    id="work"
    data-testid="work-section"
    className="relative z-10 bg-paper py-24 md:py-36"
  >
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-ink/50 mb-5">
            / Selected work
          </p>
          <h2 className="font-outfit text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
            Products in the wild
          </h2>
        </div>
        <span className="font-outfit text-sm text-ink/50">
          A glimpse of recent launches
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {PROJECTS.map((p, i) => (
          <ParallaxCard key={p.title} p={p} i={i} />
        ))}
      </div>
    </div>
  </section>
);
