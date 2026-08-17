import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight, Sparkles, Layers } from "lucide-react";
import { PRODUCTS } from "../../../data/products";

export function AllProductsModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Lock body scroll and stop Lenis when modal is open
  useEffect(() => {
    if (!isOpen) {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        if (window.lenis) window.lenis.start();
      }
      return;
    }

    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      if (window.lenis) window.lenis.stop();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        if (window.lenis) window.lenis.start();
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  // Filter products by search and category
  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSelectProduct = (prodId) => {
    onClose();
    navigate(`/products/${prodId}`);
  };

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 lg:p-8 select-none"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onClick={onClose}
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-7xl h-[92vh] sm:h-[88vh] rounded-[2rem] sm:rounded-[2.5rem] bg-[#0d0d0f] text-white border border-white/15 shadow-[0_32px_96px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-white/[0.03] backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/15">
                <Layers size={18} className="text-white" />
              </div>
              <div>
                <h2 className="font-outfit text-lg sm:text-xl font-medium tracking-tight text-white flex items-center gap-2">
                  <span>EnactOn Product Catalog</span>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/10">
                    {PRODUCTS.length} Products
                  </span>
                </h2>
                <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                  Enterprise Platform Architecture & Software Solutions
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-all border border-white/15 cursor-pointer active:scale-95 shadow-sm"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="px-6 sm:px-8 py-4 border-b border-white/10 bg-white/[0.01] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search products, technologies, features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-full pl-9 pr-4 py-2 text-xs font-outfit text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-white text-black font-semibold shadow-xs"
                      : "bg-white/5 text-white/70 hover:bg-white/15 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid Content Area */}
          <div className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
            {filteredProducts.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center">
                <p className="font-outfit text-base text-white/60 mb-2">No products match your search query.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="font-mono text-xs text-white underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod, idx) => (
                  <motion.div
                    key={prod.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                    onClick={() => handleSelectProduct(prod.id)}
                    className="group relative rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 p-5 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1"
                  >
                    {/* Background Product Image Preview */}
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-black/40 border border-white/10">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider">
                        <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-white/80 border border-white/15">
                          {prod.category}
                        </span>
                        <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md text-white font-semibold border border-white/20">
                          {prod.metric}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 font-mono text-[10px] text-white/60">
                        v{prod.version}
                      </div>
                    </div>

                    {/* Content Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-outfit text-xl font-medium text-white group-hover:text-amber-300 transition-colors">
                            {prod.name}
                          </h3>
                          <span className="font-mono text-[10px] text-white/40">
                            #{String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <p className="font-outfit text-xs font-light text-white/70 leading-relaxed line-clamp-2 mb-4">
                          {prod.subhead || prod.description}
                        </p>
                      </div>

                      {/* Tech Stack Pills & CTA */}
                      <div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {prod.techStack?.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-white/60"
                            >
                              {tech}
                            </span>
                          ))}
                          {prod.techStack?.length > 3 && (
                            <span className="font-mono text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md text-white/40">
                              +{prod.techStack.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/10 font-mono text-xs">
                          <span className="text-white/40 text-[10px] uppercase">
                            Architecture Spec
                          </span>
                          <span className="text-white font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            View Layer <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 sm:px-8 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono text-white/40 shrink-0">
            <span>Click any product card to launch interactive spec modal</span>
            <span>ESC to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
