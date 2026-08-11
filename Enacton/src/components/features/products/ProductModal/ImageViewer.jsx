import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, ArrowUpRight } from "lucide-react";

export const ImageViewer = ({ activeImage, productName, badges = [], metrics = [] }) => {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden border border-white/15 bg-black/60 shadow-2xl group">
      {/* Hero Image with smooth fade & subtle floating feel */}
      <AnimatePresence mode="wait">
        <motion.img
          key={activeImage}
          src={activeImage}
          alt={productName}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </AnimatePresence>

      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none z-10" />

      {/* Top Left Vertical Tag Pill (Inspired by Reference UI Layout) */}
      <div className="absolute top-6 left-6 z-20 flex flex-col items-center gap-2">
        <div className="bg-white/10 backdrop-blur-xl px-3 py-6 rounded-full border border-white/20 shadow-xl text-white font-mono text-[11px] font-bold uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
          {productName}
        </div>
        <motion.div
          whileHover={{ rotate: 45 }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-lg cursor-pointer"
        >
          <ArrowUpRight size={16} />
        </motion.div>
      </div>

      {/* Floating Glassmorphism Tooltip 1 */}
      {metrics[0] && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="absolute top-10 left-[45%] sm:left-[48%] z-20 flex items-center gap-2.5 bg-black/45 backdrop-blur-xl px-4 py-2 rounded-full border border-white/25 shadow-2xl text-white font-outfit text-xs font-medium"
        >
          <Check size={14} className="text-emerald-400" />
          <span>{metrics[0]}</span>
        </motion.div>
      )}

      {/* Floating Glassmorphism Tooltip 2 */}
      {metrics[1] && (
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="absolute bottom-28 right-6 sm:right-8 z-20 flex items-center gap-2.5 bg-black/45 backdrop-blur-xl px-4 py-2 rounded-full border border-white/25 shadow-2xl text-white font-outfit text-xs font-medium"
        >
          <ShieldCheck size={14} className="text-sky-400" />
          <span>{metrics[1]}</span>
        </motion.div>
      )}

      {/* Bottom Right Floating Badge Pills */}
      <div className="absolute bottom-6 right-6 sm:right-8 z-20 flex flex-wrap max-w-xs justify-end gap-2">
        {badges.map((badge, idx) => (
          <span
            key={idx}
            className="bg-white/15 backdrop-blur-xl border border-white/20 text-white/90 text-xs font-outfit px-3.5 py-1 rounded-full shadow-md"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;
