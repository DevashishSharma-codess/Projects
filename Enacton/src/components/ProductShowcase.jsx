import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "./products";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FALLBACK_HERO_IMAGE =
  "https://static.prod-images.emergentagent.com/jobs/aaff03bd-13eb-4784-a3f9-c2ad7e7acf3a/images/7c1aafe5306058007c7c92a2a22e1fb606d2e6c48cbf50c3a393af8c07c0079a.jpeg";

export function ProductShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  const pinnedCanvasRef = useRef(null);

  // GSAP ScrollTrigger Synchronized Pinning
  useEffect(() => {
    const el = containerRef.current;
    const canvas = pinnedCanvasRef.current;
    if (!el || !canvas) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        pin: canvas,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = Math.max(0, Math.min(0.999, self.progress));
          const idx = Math.floor(progress * PRODUCTS.length);
          setActiveIdx(idx);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeProduct = PRODUCTS[activeIdx] || PRODUCTS[0];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % PRODUCTS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  return (
    <div
      ref={containerRef}
      id="products"
      data-testid="product-showcase-section"
      className="relative z-10 w-full bg-[#fdfbf9] border-t border-ink/10 min-h-[320vh] select-none m-0 p-0"
    >
      {/* GSAP PINNED CANVAS — 100% FLUSH TOP STICKY STAGE */}
      <div
        ref={pinnedCanvasRef}
        className="w-full h-screen bg-[#fdfbf9] text-ink select-none overflow-hidden flex flex-col justify-between m-0 p-0 rounded-none border-none shadow-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full w-full overflow-hidden m-0 p-0">
          {/* LEFT 50%: B&W Photographic Showcase */}
          <div className="relative lg:col-span-6 h-[45vh] lg:h-full w-full overflow-hidden bg-[#0c0a08] flex flex-col justify-between p-6 sm:p-10 lg:p-16 border-r border-ink/10">
            {/* Active Black & White Photo */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeProduct.id}
                src={activeProduct.image || FALLBACK_HERO_IMAGE}
                alt={activeProduct.name}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover grayscale brightness-90 contrast-125 z-0"
              />
            </AnimatePresence>

            {/* High-Tech Pixel Map Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none z-10 opacity-75 mix-blend-overlay" />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none z-10" />

            {/* Top Row: Eyebrow + Version Badge */}
            <div className="relative z-20 flex items-center justify-between text-white/90 pt-12 sm:pt-16 lg:pt-20">
              <span className="font-outfit text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-white/80">
                EnactON Studio / Products
              </span>
              <span className="font-mono text-[10px] sm:text-xs bg-white/20 backdrop-blur-md px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full border border-white/30 text-white">
                {activeProduct.tag} v{activeProduct.version}
              </span>
            </div>

            {/* Bottom Headline */}
            <div className="relative z-20 mt-auto pt-6 pb-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="font-outfit text-3xl sm:text-5xl lg:text-7xl font-light tracking-tight text-white leading-none">
                    {activeProduct.name}.
                  </h2>
                  <p className="mt-2.5 font-outfit text-xs sm:text-sm md:text-base font-light text-white/80 max-w-md leading-relaxed">
                    {activeProduct.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[10px] sm:text-[11px] text-white/60 pt-2.5 border-t border-white/15">
                    <span>CATEGORY : {activeProduct.category}</span>
                    <span>·</span>
                    <span>METRIC : {activeProduct.metric}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT 50%: Off-White Interactive Orbit Stage */}
          <div className="relative lg:col-span-6 h-[55vh] lg:h-full w-full bg-[#fdfbf9] p-6 sm:p-10 lg:p-16 flex flex-col justify-between overflow-hidden">
            {/* Background Image Backdrop */}
            <img
              src={FALLBACK_HERO_IMAGE}
              alt="Black and white landscape backdrop"
              className="absolute inset-0 h-full w-full object-cover grayscale opacity-18 mix-blend-multiply pointer-events-none z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf9]/75 via-transparent to-[#fdfbf9]/85 pointer-events-none z-0" />

            {/* SOLID Circular Orbit Arc Line */}
            <svg
              className="absolute -left-48 sm:-left-64 top-1/2 -translate-y-1/2 w-[600px] sm:w-[760px] h-[600px] sm:h-[760px] pointer-events-none text-ink opacity-25 overflow-hidden z-10"
              viewBox="0 0 760 760"
              fill="none"
            >
              <circle
                cx="380"
                cy="380"
                r="340"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>

            {/* Top Row: Counter + Navigation Arrows */}
            <div className="relative z-20 flex items-center justify-between pt-12 sm:pt-16 lg:pt-20">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-ink/60 font-medium">
                0{activeIdx + 1} / 0{PRODUCTS.length} — Interactive Suite
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Product"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Product"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Center Product List Curved in a PERFECT CIRCULAR ORBIT ARC */}
            <div className="relative z-20 my-auto py-2 flex flex-col justify-center min-h-[380px] sm:min-h-[440px]">
              <div className="relative space-y-5 sm:space-y-7 pl-20 sm:pl-44 lg:pl-52">
                {PRODUCTS.map((product, idx) => {
                  const isActive = idx === activeIdx;
                  const offset = idx - activeIdx;

                  // Exact Circular Orbit Arc Trigonometry
                  const angle = offset * 0.16;
                  const xOrbitOffset = (Math.cos(angle) - 1) * (window.innerWidth < 640 ? 180 : 360);

                  return (
                    <motion.div
                      key={product.id}
                      onClick={() => setActiveIdx(idx)}
                      animate={{
                        x: isActive ? xOrbitOffset + 18 : xOrbitOffset,
                        scale: isActive ? 1.06 : 0.94,
                        opacity: isActive
                          ? 1
                          : Math.max(0.25, 0.65 - Math.abs(offset) * 0.1),
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative flex items-center cursor-pointer transition-all duration-300"
                    >
                      {/* Active Indicator Dot */}
                      {isActive && (
                        <motion.span
                          layoutId="activeDot"
                          className="absolute -left-6 sm:-left-7 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-[#C2612B] shadow-md border-2 border-[#fdfbf9]"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Product Name & Subtitle */}
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2.5 sm:gap-3.5">
                          <h3
                            className={`font-outfit transition-all duration-300 ${
                              isActive
                                ? "text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink"
                                : "text-base sm:text-xl font-light text-ink/40 group-hover:text-ink/80"
                            }`}
                          >
                            {product.name}
                          </h3>

                          {isActive && (
                            <span className="font-mono text-[10px] sm:text-xs text-[#C2612B] font-semibold uppercase">
                              {product.tag}
                            </span>
                          )}
                        </div>

                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-outfit text-xs sm:text-sm text-ink/70 font-normal mt-1"
                          >
                            {product.category} · {product.product}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductShowcase;