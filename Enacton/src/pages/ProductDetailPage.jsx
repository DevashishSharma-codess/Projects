import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ArrowUpRight,
} from "lucide-react";
import { PRODUCTS } from "../data/products";
import { Navbar } from "../components/layout/Navbar";
import { LogoMark } from "../components/common/LogoMark";
import { Grain } from "../components/common/Grain";
import warmCoralBg from "../assets/card-bgs/featured-testimonial-bg.jpg";

const Footer = lazy(() => import("../components/layout/Footer"));

const OWNER_PHOTO = "/ovesh-dhanga-photo.jpg";

const LEFT_CARD_BG = "/card-bg-left.jpg";
const RIGHT_CARD_BG = "/card-bg-right.jpg";

export function ProductDetailPage() {
  const { productId } = useParams();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("python");
  const [copied, setCopied] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null);

  // CEO PFP Hover Card State (Manifesto Popover Feature)
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null); // 'left' | 'center' | 'right' | null
  const pillRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const [pillPos, setPillPos] = useState({ top: 0, left: 0, showBelow: false, isMobile: false });

  // Find target product or default to first
  const productIndex = PRODUCTS.findIndex((p) => p.id === productId);
  const currentProduct = productIndex !== -1 ? PRODUCTS[productIndex] : PRODUCTS[0];

  const prevProduct =
    PRODUCTS[(productIndex - 1 + PRODUCTS.length) % PRODUCTS.length];
  const nextProduct = PRODUCTS[(productIndex + 1) % PRODUCTS.length];

  // Scroll to top immediately on product route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const handleCopyCode = (codeText) => {
    if (!codeText) return;
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updatePosition = () => {
    if (pillRef.current && typeof window !== "undefined") {
      const rect = pillRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isMobile = viewportWidth < 640;

      let centerX = rect.left + rect.width / 2;
      const halfSpreadWidth = isMobile ? 180 : 265;

      if (centerX - halfSpreadWidth < 12) {
        centerX = halfSpreadWidth + 12;
      }
      if (centerX + halfSpreadWidth > viewportWidth - 12) {
        centerX = viewportWidth - halfSpreadWidth - 12;
      }

      const cardHeight = isMobile ? 280 : 350;
      let showBelow = false;
      let targetTop = rect.top - 8;

      if (rect.top - cardHeight < 90) {
        if (viewportHeight - rect.bottom > cardHeight + 20) {
          showBelow = true;
          targetTop = rect.bottom + 8;
        } else {
          targetTop = Math.max(90 + cardHeight, rect.top - 8);
        }
      }

      setPillPos({
        top: targetTop,
        left: centerX,
        showBelow,
        isMobile,
      });
    }
  };

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    updatePosition();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setHoveredCard(null);
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isHovered) return;
    const handleScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isHovered]);

  const currentSnippet =
    currentProduct.codeSnippets?.[activeTab] ||
    currentProduct.codeSnippets?.python ||
    "";

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-ink font-sans relative selection:bg-[#C2612B] selection:text-white overflow-x-hidden">
      <Grain />
      <Navbar isDarkPage={false} />

      <main className="pt-24 sm:pt-28 pb-16">
        {/* TOP BREADCRUMB & QUICK NAV BAR */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-6 sm:mb-8 flex items-center justify-between">
          <Link
            to="/#products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-outfit font-medium text-ink/70 hover:text-ink transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Products</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-ink/60">
            <span>
              {String(productIndex + 1).padStart(2, "0")} /{" "}
              {String(PRODUCTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------
            HERO SECTION: CRISP CONTAINER CARD WITH WARM CORAL WATERCOLOR BACKDROP
        --------------------------------------------------------- */}
        <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          {/* Ambient Blurred Warm Coral Watercolor Backdrop */}
          <div className="relative rounded-[2.5rem] sm:rounded-[3rem] p-3 sm:p-6 lg:p-8 overflow-hidden bg-[#faf7f2] border border-black/5 shadow-xl">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
              <img
                src={warmCoralBg}
                alt="Warm coral watercolor backdrop"
                className="w-full h-full object-cover scale-110 blur-xl opacity-75 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/50 to-white/80" />
            </div>

            {/* Container Card with Low-Opacity Warm Coral Background */}
            <div className="relative z-10 w-full rounded-[2rem] sm:rounded-[2.4rem] bg-white/95 backdrop-blur-md p-6 sm:p-10 md:p-12 lg:p-14 shadow-2xl border border-black/5 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center overflow-hidden">
              
              {/* Subdued Warm Coral Background Image Layer inside Card */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                  src={warmCoralBg}
                  alt="Warm coral watercolor texture"
                  className="w-full h-full object-cover opacity-25 saturate-150 mix-blend-multiply scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/92 via-white/80 to-white/92 pointer-events-none" />
              </div>

              {/* Left Column: Title, Headline, Details & CTA */}
              <div className="relative z-10 lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Category Tag & Version */}
                  <div className="flex items-center gap-2 mb-4 font-mono text-xs text-ink/60 font-semibold tracking-wider uppercase">
                    <span className="h-2 w-2 rounded-full bg-[#C2612B]" />
                    <span>{currentProduct.category}</span>
                    <span className="text-ink/30">•</span>
                    <span>v{currentProduct.version}</span>
                  </div>

                  {/* High Impact Headline */}
                  <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-ink leading-[1.08] mb-4">
                    {currentProduct.headline || currentProduct.name}
                  </h1>

                  {/* Subhead & Detailed Description */}
                  <p className="font-outfit text-sm sm:text-base font-light text-ink/80 leading-relaxed mb-4">
                    {currentProduct.subhead || currentProduct.description}
                  </p>

                  <p className="font-outfit text-xs sm:text-sm font-light text-ink/65 leading-relaxed mb-8">
                    {currentProduct.description}
                  </p>
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/contact"
                    state={{ backgroundLocation: location }}
                    className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-6 py-3 font-outfit text-xs sm:text-sm font-medium shadow-lg hover:bg-black transition-all cursor-pointer active:scale-95 group"
                  >
                    <span>Start Integration</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <button
                    onClick={() => {
                      const el = document.getElementById("features");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-5 py-3 font-outfit text-xs sm:text-sm font-medium text-ink hover:bg-ink/5 transition-all cursor-pointer"
                  >
                    <span>Explore Capabilities</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Code Snippet Window */}
              <div className="relative z-10 lg:col-span-6">
                <div className="relative w-full rounded-2xl bg-[#0d0d0f] text-white p-4 sm:p-5 shadow-2xl border border-white/10 overflow-hidden">
                  {/* Top Bar with Language Tabs & Copy Button */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-lg">
                      {["python", "typescript", "curl"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setActiveTab(lang)}
                          className={`px-3 py-1 rounded-md font-mono text-[11px] font-medium transition-colors cursor-pointer uppercase ${
                            activeTab === lang
                              ? "bg-white text-black shadow-xs font-semibold"
                              : "text-white/60 hover:text-white"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handleCopyCode(currentSnippet)}
                      className="flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white transition-colors cursor-pointer bg-white/5 px-2.5 py-1 rounded-md border border-white/10"
                    >
                      {copied ? (
                        <>
                          <Check size={13} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code Editor Body */}
                  <div className="relative font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 overflow-x-auto p-2 min-h-[220px]">
                    <pre className="whitespace-pre-wrap">
                      <code>{currentSnippet}</code>
                    </pre>
                  </div>

                  {/* Bottom Execution Telemetry Bar */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Status: 200 OK
                    </span>
                    <span>SLA: {currentProduct.metric}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------
            KEY FEATURES SECTION WITH MANIFESTO HOVER CARD EFFECT
        --------------------------------------------------------- */}
        <section id="features" className="max-w-7xl mx-auto px-5 sm:px-8 mb-20 sm:mb-28">
          <div className="mb-10 sm:mb-14">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50 font-semibold block mb-2">
              // ARCHITECTURAL CAPABILITIES
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight">
              Engineered for reliability & sub-second execution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {currentProduct.highlights?.map((feat, idx) => (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredCardIdx(idx)}
                onMouseLeave={() => setHoveredCardIdx(null)}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`group relative rounded-2xl bg-white p-6 sm:p-7 border border-black/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  hoveredCardIdx === idx ? "border-ink/40" : ""
                }`}
              >
                {/* Subtle Top Indicator Line */}
                <div className="flex items-center justify-between mb-4 font-mono text-xs text-ink/40">
                  <span>0{idx + 1}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-ink/20 group-hover:bg-ink transition-colors" />
                </div>

                <div>
                  <h3 className="font-outfit text-xl font-semibold text-ink tracking-tight mb-2">
                    {feat.title}
                  </h3>
                  <p className="font-outfit text-xs sm:text-sm font-light text-ink/75 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {/* Bottom Tech Badge */}
                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between font-mono text-[10px] text-ink/50">
                  <span>ENACTON CORE</span>
                  <span className="group-hover:text-ink transition-colors font-semibold">
                    Verified ↗
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------
            CEO QUOTE SECTION WITH MANIFESTO PFP HOVER EFFECT
        --------------------------------------------------------- */}
        <section className="relative w-full min-h-[60vh] py-16 sm:py-24 my-16 sm:my-24 select-none overflow-hidden flex items-center justify-center">
          {/* Edge-to-Edge Warm Coral Watercolor Backdrop Image */}
          <img
            src={warmCoralBg}
            alt="Warm coral watercolor quote background"
            className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
          />

          {/* Soft Overlay for High Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15 z-0 pointer-events-none" />

          {/* Glassmorphic CEO Quote Box */}
          <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 md:p-14 overflow-hidden border border-white/50 shadow-2xl backdrop-blur-2xl bg-white/20 text-white"
              style={{
                background: "rgba(255, 255, 255, 0.22)",
                backdropFilter: "blur(40px) saturate(200%)",
                WebkitBackdropFilter: "blur(40px) saturate(200%)",
              }}
            >
              {/* Glass Top Highlight Sheen */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col justify-between">
                {/* Eyebrow Label */}
                <div className="flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-widest text-white/80 font-semibold">
                  <LogoMark className="w-4 h-4 text-white" />
                  <span>FOUNDER ARCHITECTURE PERSPECTIVE</span>
                </div>

                {/* High Impact Quote */}
                <blockquote className="font-outfit text-xl sm:text-2xl md:text-3xl font-light leading-relaxed tracking-tight text-white drop-shadow-md mb-8">
                  "{currentProduct.ceoQuote || "Engineering isn't just about making things work — it's about sub-second responsiveness, zero friction, and building architectures that hold up under extreme scale."}"
                </blockquote>

                {/* CEO Author Footer with Manifesto Interactive Hover Trigger */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/30">
                  <div
                    ref={pillRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="relative group cursor-pointer"
                  >
                    <div className="relative p-[1.5px] rounded-full bg-gradient-to-r from-white/60 via-white/20 to-white/60 animate-shimmer-border">
                      <img
                        src={OWNER_PHOTO}
                        alt="Ovesh Dhanga"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>

                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="cursor-pointer"
                  >
                    <span className="font-outfit text-base font-semibold text-white block hover:text-white/80 transition-colors">
                      Ovesh Dhanga
                    </span>
                    <span className="font-mono text-xs text-white/80 font-medium uppercase tracking-wider block">
                      Founder & CEO @ EnactOn
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------------------
            PREV / NEXT PRODUCT NAVIGATION FOOTER BAR
        --------------------------------------------------------- */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 border-t border-black/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Previous Product Button */}
            <Link
              to={`/products/${prevProduct.id}`}
              className="group p-6 rounded-2xl bg-white border border-black/10 hover:border-black/30 transition-all flex items-center justify-between shadow-xs"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-1">
                  ← PREVIOUS PRODUCT
                </span>
                <span className="font-outfit text-lg font-medium text-ink group-hover:text-black transition-colors">
                  {prevProduct.name}
                </span>
              </div>
              <ArrowLeft className="w-5 h-5 text-ink/40 group-hover:text-ink transition-transform group-hover:-translate-x-1" />
            </Link>

            {/* Next Product Button */}
            <Link
              to={`/products/${nextProduct.id}`}
              className="group p-6 rounded-2xl bg-white border border-black/10 hover:border-black/30 transition-all flex items-center justify-between text-right shadow-xs"
            >
              <ArrowRight className="w-5 h-5 text-ink/40 group-hover:text-ink transition-transform group-hover:translate-x-1 order-2 sm:order-1" />
              <div className="order-1 sm:order-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-1">
                  NEXT PRODUCT →
                </span>
                <span className="font-outfit text-lg font-medium text-ink group-hover:text-black transition-colors">
                  {nextProduct.name}
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* ---------------------------------------------------------
          REACT PORTAL 3-CARD FAN POPUP MODAL ON CEO PFP HOVER
          (Identical to Manifesto / About section popover)
      --------------------------------------------------------- */}
      {isHovered && typeof document !== "undefined" && createPortal(
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "fixed",
            top: pillPos.showBelow ? pillPos.top - 16 : pillPos.top + 16,
            left: pillPos.left,
            transform: pillPos.showBelow ? "translate(-50%, 0%)" : "translate(-50%, -100%)",
            zIndex: 9999999,
            pointerEvents: "auto",
          }}
          className={`select-none flex items-center justify-center transition-all duration-150 ${
            pillPos.showBelow ? "pt-5 -mt-5" : "pb-5 -mb-5"
          }`}
        >
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: pillPos.showBelow ? -12 : 12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: pillPos.showBelow ? -12 : 12, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: pillPos.isMobile ? "360px" : "530px", maxWidth: "94vw" }}
            >
              <div className="relative w-full h-[270px] sm:h-[360px] flex items-center justify-center">

                {/* LEFT CARD */}
                <motion.div
                  onMouseEnter={() => setHoveredCard("left")}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, x: 0, rotate: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    x: pillPos.isMobile ? -85 : -120,
                    rotate: -8,
                    scale: hoveredCard === "left" ? (pillPos.isMobile ? 1.02 : 1.04) : 0.92,
                    zIndex: hoveredCard === "left" ? 40 : 10,
                  }}
                  exit={{ opacity: 0, x: 0, rotate: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 250, damping: 22 }}
                  className="absolute w-40 sm:w-54 h-[255px] sm:h-[335px] rounded-[1.5rem] sm:rounded-[1.8rem] bg-[#18181b] text-white p-3 sm:p-4 flex flex-col justify-between shadow-2xl border border-white/20 overflow-hidden cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <LogoMark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    </div>
                    <span className="font-outfit text-[11px] sm:text-xs font-semibold tracking-tight text-white">EnactOn</span>
                  </div>

                  <h4 className="font-outfit text-[10px] sm:text-sm font-light leading-snug tracking-tight text-white/95">
                    Never stop searching for something remarkable.
                  </h4>

                  <div className="relative h-28 sm:h-44 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                    <img
                      src={LEFT_CARD_BG}
                      alt="Aesthetic landscape"
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>
                </motion.div>

                {/* RIGHT CARD */}
                <motion.div
                  onMouseEnter={() => setHoveredCard("right")}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, x: 0, rotate: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    x: pillPos.isMobile ? 85 : 120,
                    rotate: 8,
                    scale: hoveredCard === "right" ? (pillPos.isMobile ? 1.02 : 1.04) : 0.92,
                    zIndex: hoveredCard === "right" ? 40 : 10,
                  }}
                  exit={{ opacity: 0, x: 0, rotate: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 250, damping: 22 }}
                  className="absolute w-40 sm:w-54 h-[255px] sm:h-[335px] rounded-[1.5rem] sm:rounded-[1.8rem] bg-[#121214] text-white p-3 sm:p-4 flex flex-col justify-between shadow-2xl border border-white/20 overflow-hidden cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <LogoMark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <span className="font-outfit text-[11px] sm:text-xs font-semibold tracking-tight text-white">EnactOn</span>
                    </div>
                    <span className="font-outfit text-[9px] sm:text-[10px] font-light text-white/50">EST. 2024</span>
                  </div>

                  <div className="relative h-28 sm:h-44 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                    <img
                      src={RIGHT_CARD_BG}
                      alt="Aesthetic architecture"
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>

                  <p className="font-outfit text-[10px] sm:text-xs font-light text-white/90 leading-tight drop-shadow">
                    The world is waiting to explore your next release.
                  </p>
                </motion.div>

                {/* CENTER MAIN CARD */}
                <motion.div
                  onMouseEnter={() => setHoveredCard("center")}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, y: 20, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: hoveredCard === "center" ? 1.03 : 1,
                    zIndex: (hoveredCard === "left" || hoveredCard === "right") ? 20 : 30,
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 270, damping: 22 }}
                  className="absolute w-48 sm:w-62 h-[270px] sm:h-[355px] rounded-[1.6rem] sm:rounded-[2rem] bg-[#09090b] text-white p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_30px_70px_rgba(0,0,0,0.95)] border border-white/30 overflow-hidden cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                      <LogoMark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black" />
                    </div>
                    <span className="font-outfit text-[11px] sm:text-xs font-semibold tracking-tight text-white">EnactOn</span>
                  </div>

                  <h3 className="font-outfit text-[11px] sm:text-sm font-light tracking-tight text-white leading-snug">
                    Helping you build your next digital leap.
                  </h3>

                  <div className="relative h-28 sm:h-44 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 shadow-xl group/photo">
                    <img
                      src={OWNER_PHOTO}
                      alt="Ovesh Dhanga"
                      className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-1.5 sm:bottom-2 left-2 sm:left-2.5 right-2 sm:right-2.5 text-left">
                      <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-widest text-[#84cc16] font-bold block">
                        FOUNDER & CEO
                      </span>
                      <span className="font-outfit text-[10px] sm:text-xs font-medium text-white block">
                        Ovesh Dhanga
                      </span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>,
        document.body
      )}
    </div>
  );
}

export default ProductDetailPage;
