import { motion } from "framer-motion";

const CHAPTERS = [
  {
    no: "01",
    title: "Craft over noise",
    body: "We obsess over the details others skip — the micro-interactions, zero-friction flows, and sub-second latency that make software feel alive.",
  },
  {
    no: "02",
    title: "Ship, then scale",
    body: "Momentum matters. We get production apps into real hands fast, then engineer resilient cloud architectures that hold up under millions.",
  },
  {
    no: "03",
    title: "Partners, not vendors",
    body: "We embed directly with your product team, share execution risk, and treat your long-term roadmap as our own craft.",
  },
];

const STATS = [
  { value: "120+", label: "Products Shipped" },
  { value: "14", label: "Countries Served" },
  { value: "40M+", label: "Users Reached" },
  { value: "9 YRS", label: "Building Together" },
];

export const About = () => (
  <section
    id="about"
    data-testid="about-section"
    className="relative z-10 bg-[#0c0a08] text-paper py-20 sm:py-28 md:py-40 border-t border-white/10 overflow-hidden select-none"
  >
    {/* HIGH-TECH STARBURST LASER GRID OVERLAY */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />

    <svg
      className="absolute right-0 top-0 w-full h-full pointer-events-none opacity-25"
      viewBox="0 0 1200 800"
      fill="none"
    >
      <line x1="950" y1="500" x2="0" y2="0" stroke="white" strokeWidth="1" />
      <line x1="950" y1="500" x2="1200" y2="0" stroke="white" strokeWidth="1" />
      <line x1="950" y1="500" x2="0" y2="800" stroke="white" strokeWidth="1" />
      <line x1="950" y1="500" x2="1200" y2="800" stroke="white" strokeWidth="1" />
      <line x1="950" y1="500" x2="0" y2="500" stroke="white" strokeWidth="1" />
      <line x1="950" y1="500" x2="950" y2="0" stroke="white" strokeWidth="1" />
      <line x1="950" y1="500" x2="950" y2="800" stroke="white" strokeWidth="1" />
      <line x1="950" y1="500" x2="1200" y2="500" stroke="white" strokeWidth="1" />
      <circle cx="950" cy="500" r="24" fill="white" fillOpacity="0.25" />
      <circle cx="950" cy="500" r="4" fill="white" />
    </svg>

    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
      {/* Top Banner Row */}
      <div className="flex items-center justify-between mb-12 sm:mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 border border-white/35 px-3.5 py-1 sm:px-4 sm:py-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-paper/90 bg-white/5 backdrop-blur-md shadow-lg"
        >
          <span>[ ENACTON_STUDIO ]</span>
        </motion.div>

        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-paper/40 hidden sm:block">
          // MANIFESTO & PHILOSOPHY
        </span>
      </div>

      {/* Main Headline Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end mb-16 sm:mb-24 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-8"
        >
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-paper/50 block mb-3">
            PROGRAM STATEMENT / 01
          </span>
          <h2 className="font-outfit text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-paper leading-[1.06]">
            ENGINEERING HIGH-FREQUENCY DIGITAL SYSTEMS FOR MODERN BUILDERS
          </h2>
        </motion.div>

        {/* Leadership Avatars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-3.5 border-t lg:border-t-0 pt-6 lg:pt-0 border-white/15"
        >
          <div className="flex -space-x-3 overflow-hidden shrink-0">
            <img
              className="inline-block h-12 w-12 sm:h-14 sm:w-14 rounded-full ring-2 ring-[#0c0a08] grayscale object-cover border border-white/20"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt="Leadership team member"
            />
            <img
              className="inline-block h-12 w-12 sm:h-14 sm:w-14 rounded-full ring-2 ring-[#0c0a08] grayscale object-cover border border-white/20"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
              alt="Leadership team member"
            />
          </div>
          <div className="text-left font-mono text-xs text-paper/60 leading-tight">
            <p className="font-bold text-paper uppercase tracking-wider text-[11px] sm:text-xs">ENACTON LEADERSHIP</p>
            <p className="mt-0.5 text-paper/40 text-[10px] sm:text-xs">Architecture & Craft</p>
          </div>
        </motion.div>
      </div>

      {/* 3 Manifesto Chapter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-16 sm:mb-24">
        {CHAPTERS.map((c, i) => (
          <motion.div
            key={c.no}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            data-testid={`about-chapter-${i + 1}`}
            className="group relative rounded-2xl bg-white/[0.04] p-6 sm:p-8 border border-white/15 hover:border-white/35 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-paper/40 mb-5 pb-3.5 border-b border-white/10">
                <span>CHAPTER / {c.no}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-[#C2612B] transition-colors" />
              </div>
              <h3 className="font-outfit text-xl sm:text-2xl font-bold tracking-tight text-paper mb-2.5">
                {c.title}
              </h3>
              <p className="font-outfit text-xs sm:text-sm text-paper/70 font-light leading-relaxed">
                {c.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4 Key Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 border-t border-white/15 pt-10 sm:pt-12">
        {STATS.map(({ value, label }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            data-testid={`about-stat-${label}`}
          >
            <div className="font-outfit text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-paper">
              {value}
            </div>
            <div className="mt-1.5 font-mono text-[10px] sm:text-xs text-paper/50 uppercase tracking-wider">
              {label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
