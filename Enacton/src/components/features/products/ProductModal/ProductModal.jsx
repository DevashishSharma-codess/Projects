import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { MacControls } from "./MacControls";
import { ProductContent } from "./ProductContent";
import { ProductImageGrid } from "./ProductImageGrid";

export const ProductModal = ({
  isOpen = false,
  product = null,
  onClose,
  allProducts = [],
}) => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  useEffect(() => {
    if (product && allProducts.length > 0) {
      const idx = allProducts.findIndex((p) => p.id === product.id);
      if (idx !== -1) setActiveProductIndex(idx);
    }
  }, [product, allProducts]);

  // SCROLL LOCK CONTROL: Lock body scroll strictly when modal is open
  useEffect(() => {
    if (!isOpen) {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "auto";
        document.body.style.touchAction = "";
      }
      return;
    }

    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "auto";
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product || typeof document === "undefined") return null;

  const currentProduct =
    allProducts.length > 0 && allProducts[activeProductIndex]
      ? allProducts[activeProductIndex]
      : product;

  const totalCount = allProducts.length > 0 ? allProducts.length : 12;
  const displayIndex = activeProductIndex + 1;

  const handlePrevProduct = () => {
    if (allProducts.length === 0) return;
    setActiveProductIndex((prev) => (prev > 0 ? prev - 1 : allProducts.length - 1));
  };

  const handleNextProduct = () => {
    if (allProducts.length === 0) return;
    setActiveProductIndex((prev) => (prev < allProducts.length - 1 ? prev + 1 : 0));
  };

  const modalElement = (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[999999] flex items-center justify-center p-2 sm:p-5 lg:p-8 select-none"
        style={{
          background: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
        onClick={onClose}
      >
        {/* TRUE macOS PRISM GLASS MODAL CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl h-[92vh] sm:h-[90vh] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden flex flex-col justify-between shadow-[0_32px_80px_rgba(0,0,0,0.75),inset_0_1px_2px_rgba(255,255,255,0.35)]"
          style={{
            background: "rgba(20, 20, 24, 0.92)",
            backdropFilter: "blur(45px) saturate(210%)",
            WebkitBackdropFilter: "blur(45px) saturate(210%)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          {/* Header Bar: macOS Traffic Lights + Spec Title + Glass Project Controls */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-3 bg-white/[0.05] backdrop-blur-md border-b border-white/15 flex-shrink-0">
            {/* Left: macOS traffic lights */}
            <div className="flex items-center gap-3 sm:gap-4">
              <MacControls onClose={onClose} />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50 font-bold hidden md:inline-block border-l border-white/15 pl-4">
                ENACTON STUDIO // PRISM GLASS LAYER
              </span>
            </div>

            {/* Right: Glass Next/Previous Project Switcher & ESC button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-0.5 sm:gap-1 bg-white/10 backdrop-blur-md border border-white/20 px-2 sm:px-3 py-1 rounded-full shadow-sm text-white">
                <button
                  onClick={handlePrevProduct}
                  className="w-6 h-6 rounded-full hover:bg-white hover:text-black flex items-center justify-center text-white transition-colors cursor-pointer"
                  title="Previous Project"
                  aria-label="Previous project"
                >
                  <ArrowLeft size={13} />
                </button>
                <span className="font-mono text-[10px] sm:text-xs font-bold text-white px-1 sm:px-2">
                  PROJECT {String(displayIndex).padStart(2, "0")}/{String(totalCount).padStart(2, "0")}
                </span>
                <button
                  onClick={handleNextProduct}
                  className="w-6 h-6 rounded-full hover:bg-white hover:text-black flex items-center justify-center text-white transition-colors cursor-pointer"
                  title="Next Project"
                  aria-label="Next project"
                >
                  <ArrowRight size={13} />
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                title="Close (ESC)"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* RESPONSIVE SMOOTH SCROLLABLE CONTAINER FOR MOBILE & PC */}
          <div
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 w-full min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain p-4 sm:p-7 flex flex-col lg:grid lg:grid-cols-[48%_52%] gap-6 sm:gap-8 touch-pan-y"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* EDITORIAL CONTENT PANEL WITH DEDICATED SCROLL */}
            <div
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="w-full h-auto lg:h-full lg:min-h-0 lg:overflow-y-auto overflow-x-hidden pr-0 lg:pr-4 overscroll-contain touch-pan-y"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255, 255, 255, 0.25) transparent",
              }}
            >
              <ProductContent
                product={currentProduct}
                currentIndex={displayIndex}
                totalCount={totalCount}
              />
            </div>

            {/* HERO IMAGE & GALLERY PANEL */}
            <div className="h-[280px] sm:h-[380px] lg:h-full min-h-[260px] w-full flex-shrink-0 overflow-hidden">
              <ProductImageGrid product={currentProduct} />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalElement, document.body);
};

export default ProductModal;