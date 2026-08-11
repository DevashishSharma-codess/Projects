import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { PRODUCTS } from "../../../data/products";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85";

export function ProductShowcase() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  const pinnedCanvasRef = useRef(null);
  const stRef = useRef(null);
  const activeIdxRef = useRef(0);
  const lenisRef = useRef(null);
  const lenisTickerFn = useRef(null);

  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const lineRefs = useRef([]);

  const startLenis = () => {
    if (typeof window === "undefined" || lenisRef.current || window.__isProgrammaticScroll) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    lenisTickerFn.current = tick;
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  };

  const stopLenis = () => {
    if (lenisTickerFn.current) {
      gsap.ticker.remove(lenisTickerFn.current);
      lenisTickerFn.current = null;
    }
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }
    if (typeof window !== "undefined" && window.lenis) {
      window.lenis = null;
    }
  };

  // Synchronize modal state with URL parameter /products/:productId
  useEffect(() => {
    if (productId) {
      const idx = PRODUCTS.findIndex((p) => p.id === productId);
      if (idx !== -1) {
        setActiveIdx(idx);
        activeIdxRef.current = idx;
      }
    }
  }, [productId]);

  const openProductModal = (prod) => {
    const target = prod || PRODUCTS[activeIdx] || PRODUCTS[0];
    navigate(`/products/${target.id}`);
  };

  // Auto-scroll the right product list so the active item is ALWAYS centered in view
  useEffect(() => {
    if (!listRef.current || !itemRefs.current[activeIdx]) return;

    const container = listRef.current;
    const activeItem = itemRefs.current[activeIdx];

    if (container && activeItem) {
      const containerHeight = container.clientHeight;
      const itemOffsetTop = activeItem.offsetTop;
      const itemHeight = activeItem.clientHeight;

      const targetScrollTop = itemOffsetTop - containerHeight / 2 + itemHeight / 2;

      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: "smooth",
      });
    }
  }, [activeIdx]);

  // GSAP ScrollTrigger Synchronized Pinning - Lenis DYNAMICALLY CREATED ONLY inside Product Showcase
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 640) return;

    const el = containerRef.current;
    const canvas = pinnedCanvasRef.current;
    if (!el || !canvas) return;

    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        trigger: el,
        pin: canvas,
        start: "top top",
        end: () => `+=${window.innerHeight * (PRODUCTS.length * 1.0)}`,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: startLenis,
        onLeave: stopLenis,
        onEnterBack: startLenis,
        onLeaveBack: stopLenis,
        onUpdate: (self) => {
          const totalProducts = PRODUCTS.length;
          const raw = self.progress * totalProducts;
          const clampedIdx = Math.min(totalProducts - 1, Math.max(0, Math.floor(raw)));
          const itemProgress = Math.min(1, Math.max(0, raw - clampedIdx));

          if (clampedIdx !== activeIdxRef.current) {
            activeIdxRef.current = clampedIdx;
            setActiveIdx(clampedIdx);
          }

          // Direct DOM mutation for smooth line fill across all items
          lineRefs.current.forEach((lineEl, idx) => {
            if (!lineEl) return;
            if (idx < clampedIdx) {
              lineEl.style.width = "100%";
            } else if (idx === clampedIdx) {
              const widthPct = Math.max(15, Math.min(100, (itemProgress + 0.15) * 100));
              lineEl.style.width = `${widthPct}%`;
            } else {
              lineEl.style.width = "0%";
            }
          });
        },
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      stopLenis();
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const activeProduct = PRODUCTS[activeIdx] || PRODUCTS[0];

  const handleSelectProduct = (targetIdx) => {
    const clamped = Math.min(PRODUCTS.length - 1, Math.max(0, targetIdx));
    activeIdxRef.current = clamped;
    setActiveIdx(clamped);

    if (stRef.current && window.innerWidth >= 640) {
      const st = stRef.current;
      const progressRatio = (clamped + 0.1) / PRODUCTS.length;
      const targetScroll = st.start + progressRatio * (st.end - st.start);

      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetScroll, { duration: 0.65 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % PRODUCTS.length;
    handleSelectProduct(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + PRODUCTS.length) % PRODUCTS.length;
    handleSelectProduct(prevIdx);
  };

  return (
    <section
      ref={containerRef}
      id="products"
      data-testid="product-showcase-section"
      className="relative z-10 w-full bg-[#fdfbf9] border-t border-ink/10 select-none m-0 p-0"
    >
      {/* MOBILE RESPONSIVE VIEW (<640px): Clean Monochromatic Card */}
      <div className="block sm:hidden w-full min-h-[90dvh] bg-[#fdfbf9] text-ink p-4 pt-14 pb-6 flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-ink/10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60 font-semibold">
            {String(activeIdx + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")} — PRODUCTS
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Product"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95 shadow-xs"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Product"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95 shadow-xs"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Product Image & Details */}
        <div className="my-auto py-4 flex flex-col gap-4">
          <div
            onClick={() => openProductModal(activeProduct)}
            className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-black shadow-xl border border-white/10 cursor-pointer group"
          >
            <motion.img
              key={activeProduct.id}
              src={activeProduct.image || FALLBACK_HERO_IMAGE}
              alt={activeProduct.name}
              initial={{ opacity: 0.6, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full object-cover grayscale brightness-90 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white/90 font-mono text-[9px] uppercase tracking-wider">
              <span>ENACTON STUDIO</span>
              <span>{activeProduct.category}</span>
            </div>
          </div>

          <motion.div
            key={activeProduct.id + "-mobile-text"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col justify-between"
          >
            <h2 className="font-outfit text-2xl font-light tracking-tight text-ink leading-tight mb-1.5">
              {activeProduct.name}.
            </h2>
            <p className="font-outfit text-xs font-light text-ink/75 leading-relaxed mb-3 line-clamp-3">
              {activeProduct.subhead || activeProduct.description}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-ink/10">
              <span className="font-mono text-[10px] text-ink/50 uppercase">
                {String(activeIdx + 1).padStart(2, "0")} / {activeProduct.category}
              </span>
              <button
                onClick={() => openProductModal(activeProduct)}
                className="inline-flex items-center gap-1.5 bg-ink text-paper text-xs font-mono font-medium px-3.5 py-2 rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
              >
                View Layer ↗
              </button>
            </div>
          </motion.div>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {PRODUCTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectProduct(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIdx
                  ? "w-6 bg-gradient-to-r from-[#e58b82] via-[#ff922b] via-[#74c0fc] to-[#d8f28c]"
                  : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* TABLET & DESKTOP STICKY STAGE (>=640px): PICTURE ON LEFT | PRODUCTS MENU ON RIGHT */}
      <div
        ref={pinnedCanvasRef}
        className="hidden sm:flex w-full h-screen bg-[#fdfbf9] text-ink select-none overflow-hidden flex-col justify-between m-0 p-0 rounded-none border-none shadow-none"
      >
        <div className="grid grid-cols-12 h-full w-full overflow-hidden m-0 p-0">
          
          {/* LEFT COLUMN (lg:col-span-7 / 58%): FULL-HEIGHT B&W PRODUCT IMAGE SHOWCASE */}
          <div className="lg:col-span-7 h-full w-full bg-[#0c0a08] p-6 sm:p-8 lg:p-10 xl:p-14 flex flex-col justify-between overflow-hidden relative border-r border-white/10">
            
            {/* Background B&W Image with Fast Snappy Switch */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0.7, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.7, scale: 0.99 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute inset-0 z-0 overflow-hidden"
              >
                <img
                  src={activeProduct.image || FALLBACK_HERO_IMAGE}
                  alt={activeProduct.name}
                  className="h-full w-full object-cover grayscale brightness-90 contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/50 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none z-10 opacity-60 mix-blend-overlay" />
              </motion.div>
            </AnimatePresence>

            {/* Top Eyebrow Row */}
            <div className="relative z-20 flex items-center justify-between text-white/90 pt-10 sm:pt-12">
              <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                ENACTON STUDIO / PRODUCTS
              </span>

              <span className="font-mono text-xs text-white/70 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                0{activeIdx + 1} / 0{PRODUCTS.length}
              </span>
            </div>

            {/* Bottom Info Block */}
            <div className="relative z-20 mt-auto pt-6">
              <motion.div
                key={activeProduct.id + "-card-info"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white leading-tight tracking-tight mb-2 drop-shadow-md">
                  {activeProduct.headline || activeProduct.name}
                </h2>

                <p className="font-outfit text-xs sm:text-sm lg:text-base font-light text-white/85 max-w-xl leading-relaxed mb-6">
                  {activeProduct.description}
                </p>

                <div className="flex items-center gap-4 border-t border-white/20 pt-4">
                  {/* Glassmorphic Morphic Style Action Button */}
                  <button
                    onClick={() => openProductModal(activeProduct)}
                    className="group relative inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 sm:py-3 font-outfit text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:scale-105 shadow-[0_8px_32px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden border border-white/40 bg-white/10 backdrop-blur-xl hover:bg-white/25 hover:border-white/70 active:scale-95"
                    style={{
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      backdropFilter: "blur(20px) saturate(180%)",
                    }}
                  >
                    {/* Glass Gloss Sheen Reflection */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none z-0" />
                    
                    <span className="relative z-10 text-white font-semibold">View Product Layer</span>
                    <ArrowRight size={16} className="relative z-10 text-white group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="font-mono text-[10px] sm:text-xs text-white/60">
                    Press to open interactive architecture modal
                  </span>
                </div>
              </motion.div>
            </div>

          </div>

          {/* RIGHT COLUMN (lg:col-span-5 / 42%): VALLEY AI MENU WITH DYNAMIC AUTO-CENTERING SCROLL */}
          <div className="lg:col-span-5 h-full w-full bg-[#fdfbf9] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between overflow-hidden">
            
            {/* Top Eyebrow Header */}
            <div className="flex items-center justify-between pb-3 border-b border-ink/10 shrink-0">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-ink/60">
                [ ENACTON_SUITE ]
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-ink/40">
                {String(activeIdx + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
              </span>
            </div>

            {/* Product List Menu with Smooth Vertical Auto-Centering */}
            <div
              ref={listRef}
              className="my-auto py-4 flex flex-col gap-1.5 h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar pr-2 scroll-smooth"
            >
              {PRODUCTS.map((prod, idx) => {
                const isActive = idx === activeIdx;

                return (
                  <div
                    key={prod.id}
                    ref={(el) => (itemRefs.current[idx] = el)}
                    onClick={() => handleSelectProduct(idx)}
                    className={`group relative cursor-pointer py-3 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    {/* Meta Index & Category */}
                    <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-ink/50 mb-0.5">
                      <span>{String(idx + 1).padStart(2, "0")} / {prod.category}</span>
                    </div>

                    {/* Product Name Title */}
                    <h3
                      className={`font-outfit transition-colors duration-300 ${
                        isActive
                          ? "text-lg sm:text-xl lg:text-2xl font-normal text-ink tracking-tight"
                          : "text-sm sm:text-base lg:text-lg font-light text-ink/60"
                      }`}
                    >
                      {prod.name}
                    </h3>

                    {/* Valley AI Expanded Description Paragraph */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="font-outfit text-xs font-light text-ink/80 leading-relaxed pt-1.5 pb-1">
                            {prod.subhead || prod.description}
                          </p>

                          <div className="flex items-center justify-end pt-1 text-[10px] font-mono text-ink/60">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openProductModal(prod);
                              }}
                              className="text-ink font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>View Details ↗</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Valley AI Progress Line (Direct DOM updated, 0 React re-render overhead) */}
                    <div className="relative mt-2.5 h-[2.5px] w-full overflow-hidden rounded-full gpu-layer">
                      {isActive ? (
                        <div
                          ref={(el) => (lineRefs.current[idx] = el)}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#e58b82] via-[#ff922b] via-[#74c0fc] to-[#d8f28c] rounded-full transition-all duration-200 ease-out will-change-[width]"
                          style={{ width: "35%" }}
                        />
                      ) : (
                        <div className="h-[1px] w-full bg-ink/10" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="pt-3 border-t border-ink/10 flex items-center justify-between text-xs text-ink/60 font-mono shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Product"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95 shadow-xs"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Product"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95 shadow-xs"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              <button
                onClick={() => openProductModal(activeProduct)}
                className="inline-flex items-center gap-1 text-ink font-semibold text-xs hover:underline cursor-pointer"
              >
                <span>View Full Specs</span>
                <ExternalLink size={13} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;