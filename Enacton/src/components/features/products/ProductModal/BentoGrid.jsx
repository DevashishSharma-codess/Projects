import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Check, ShieldCheck, Zap } from "lucide-react";

export const BentoGrid = ({ product }) => {
  const bentoTiles = [
    {
      id: "hero",
      title: "Core System Gateway",
      subtitle: "Production Topology & API Engine",
      image: product?.image || "https://images.unsplash.com/photo-1556742049-0a670fc8077a?auto=format&fit=crop&w=1200&q=85",
      badge: "MAIN FOCUS",
      icon: Check,
    },
    {
      id: "architecture",
      title: "Pipeline Architecture",
      subtitle: "Sub-Second Execution Loop",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85",
      badge: "< 50ms SLA",
      icon: Zap,
    },
    {
      id: "analytics",
      title: "Real-Time Telemetry",
      subtitle: "Live Dashboard & Metrics",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
      badge: "SOC2 COMPLIANT",
      icon: ShieldCheck,
    },
    {
      id: "security",
      title: "Enterprise Payload Encryption",
      subtitle: "AICPA Certified Infrastructure",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=85",
      badge: "SECURE PAYLOAD",
      icon: ShieldCheck,
    },
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeTile = bentoTiles[activeImageIndex] || bentoTiles[0];

  return (
    <div className="flex flex-col h-full justify-between space-y-4">
      {/* Main Focus Active Stage Preview */}
      <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[300px] rounded-2xl overflow-hidden border border-white/20 bg-black/60 shadow-2xl group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeTile.image}
            src={activeTile.image}
            alt={activeTile.title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </AnimatePresence>

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none z-10" />

        {/* Top-Left Floating Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/20 text-white font-mono text-xs shadow-lg">
          <activeTile.icon size={13} className="text-emerald-400" />
          <span>{activeTile.title}</span>
        </div>

        {/* Bottom-Left Active Subtitle */}
        <div className="absolute bottom-4 left-4 z-20">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">
            SELECTED BENTO MODULE VIEW
          </span>
          <h4 className="font-outfit text-lg font-bold text-white tracking-tight">
            {activeTile.subtitle}
          </h4>
        </div>
      </div>

      {/* Asymmetrical Bento Grid Tile Array */}
      <div className="grid grid-cols-12 gap-3 h-full">
        {/* Tile 1: Top-Left Hero Tile (Spans 7 cols) */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveImageIndex(0)}
          className={`col-span-7 relative h-32 sm:h-36 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer group shadow-lg ${
            activeImageIndex === 0
              ? "border-white/90 ring-2 ring-white/30"
              : "border-white/15 opacity-75 hover:opacity-100 hover:border-white/40"
          }`}
        >
          <img
            src={bentoTiles[0].image}
            alt={bentoTiles[0].title}
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent z-10" />
          <div className="absolute inset-0 z-20 p-3 flex flex-col justify-between">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/80 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 w-fit">
              {bentoTiles[0].badge}
            </span>
            <h5 className="font-outfit text-xs font-semibold text-white tracking-tight">
              {bentoTiles[0].title}
            </h5>
          </div>
        </motion.div>

        {/* Tile 2: Top-Right Side Tile (Spans 5 cols) */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveImageIndex(1)}
          className={`col-span-5 relative h-32 sm:h-36 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer group shadow-lg ${
            activeImageIndex === 1
              ? "border-white/90 ring-2 ring-white/30"
              : "border-white/15 opacity-75 hover:opacity-100 hover:border-white/40"
          }`}
        >
          <img
            src={bentoTiles[1].image}
            alt={bentoTiles[1].title}
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent z-10" />
          <div className="absolute inset-0 z-20 p-3 flex flex-col justify-between">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/80 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 w-fit">
              {bentoTiles[1].badge}
            </span>
            <h5 className="font-outfit text-xs font-semibold text-white tracking-tight">
              {bentoTiles[1].title}
            </h5>
          </div>
        </motion.div>

        {/* Tile 3: Wide Bottom Tile 1 (Spans 6 cols) */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveImageIndex(2)}
          className={`col-span-6 relative h-28 sm:h-32 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer group shadow-lg ${
            activeImageIndex === 2
              ? "border-white/90 ring-2 ring-white/30"
              : "border-white/15 opacity-75 hover:opacity-100 hover:border-white/40"
          }`}
        >
          <img
            src={bentoTiles[2].image}
            alt={bentoTiles[2].title}
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent z-10" />
          <div className="absolute inset-0 z-20 p-3 flex flex-col justify-between">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/80 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 w-fit">
              {bentoTiles[2].badge}
            </span>
            <h5 className="font-outfit text-xs font-semibold text-white tracking-tight">
              {bentoTiles[2].title}
            </h5>
          </div>
        </motion.div>

        {/* Tile 4: Wide Bottom Tile 2 (Spans 6 cols) */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveImageIndex(3)}
          className={`col-span-6 relative h-28 sm:h-32 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer group shadow-lg ${
            activeImageIndex === 3
              ? "border-white/90 ring-2 ring-white/30"
              : "border-white/15 opacity-75 hover:opacity-100 hover:border-white/40"
          }`}
        >
          <img
            src={bentoTiles[3].image}
            alt={bentoTiles[3].title}
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent z-10" />
          <div className="absolute inset-0 z-20 p-3 flex flex-col justify-between">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/80 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 w-fit">
              {bentoTiles[3].badge}
            </span>
            <h5 className="font-outfit text-xs font-semibold text-white tracking-tight">
              {bentoTiles[3].title}
            </h5>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BentoGrid;
