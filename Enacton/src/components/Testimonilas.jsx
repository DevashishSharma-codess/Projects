import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const QUOTES = [
  {
    quote:
      "EnactON shipped in weeks what our last agency couldn't in a year. The craft is on another level.",
    name: "Sara Lindqvist",
    role: "VP Product, Lumen",
  },
  {
    quote:
      "They think like founders. Every decision felt like it moved the business forward, not just the codebase.",
    name: "Daniel Okafor",
    role: "CEO, Orbit",
  },
  {
    quote:
      "The AI features they built quietly became the reason our users stay. Beautifully engineered.",
    name: "Mei Tanaka",
    role: "CTO, Neura",
  },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  const q = QUOTES[i];
  const go = (d) => setI((p) => (p + d + QUOTES.length) % QUOTES.length);

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative z-10 bg-ink text-paper py-20 sm:py-28 md:py-36 border-t border-paper/10 select-none overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-paper/40 mb-8 sm:mb-12">
          / Kind words
        </p>

        <div className="min-h-[180px] sm:min-h-[220px] md:min-h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              data-testid="testimonial-quote"
              className="font-playfair text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.28] tracking-tight px-2"
            >
              “{q.quote}”
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => go(-1)}
            data-testid="testimonial-prev"
            aria-label="Previous testimonial"
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-paper/25 transition-colors duration-300 hover:bg-paper hover:text-ink cursor-pointer active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="text-left min-w-[140px] sm:min-w-[160px]">
            <div className="font-outfit font-medium text-sm sm:text-base">{q.name}</div>
            <div className="text-xs sm:text-sm text-paper/50">{q.role}</div>
          </div>

          <button
            onClick={() => go(1)}
            data-testid="testimonial-next"
            aria-label="Next testimonial"
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-paper/25 transition-colors duration-300 hover:bg-paper hover:text-ink cursor-pointer active:scale-95"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
