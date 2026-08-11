import { useState, useEffect } from "react";
import { ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";

// Curated high-resolution monochrome tech architectural image galleries (4 views per product)
const PRODUCT_GALLERIES = {
  "cashback-os": [
    { title: "Dashboard", src: "https://images.unsplash.com/photo-1556742049-0a67568d049f?auto=format&fit=crop&w=1600&q=85" },
    { title: "Analytics", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85" },
    { title: "Architecture", src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85" },
    { title: "API Specs", src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85" },
  ],
  "laraback": [
    { title: "Dashboard", src: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=85" },
    { title: "Analytics", src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=85" },
    { title: "Architecture", src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85" },
    { title: "API Specs", src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=85" },
  ],
  "crypto-cashback": [
    { title: "Dashboard", src: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1600&q=85" },
    { title: "Analytics", src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85" },
    { title: "Architecture", src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85" },
    { title: "API Specs", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85" },
  ],
  default: [
    { title: "Dashboard", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85" },
    { title: "Analytics", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85" },
    { title: "Architecture", src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85" },
    { title: "API Specs", src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85" },
  ],
};

export const ProductImageGrid = ({ product }) => {
  const gallery = (product && PRODUCT_GALLERIES[product.id])
    ? PRODUCT_GALLERIES[product.id]
    : PRODUCT_GALLERIES.default;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index when product changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [product]);

  const currentView = gallery[activeImageIndex] || gallery[0];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  const handleLaunchProject = () => {
    window.open(product?.demoUrl || "https://enacton.com", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative h-full w-full rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden shadow-2xl bg-black border border-white/20 group select-none flex flex-col justify-between">
      {/* High-Contrast Black & White Monochrome Hero Image */}
      <img
        src={currentView.src}
        alt={`${product?.name || "Product"} - ${currentView.title}`}
        className="w-full h-full object-cover grayscale contrast-[125%] brightness-[105%] transition-all duration-700 group-hover:scale-[1.03]"
      />

      {/* Glass overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

      {/* TOP-LEFT VERTICAL PRISM GLASS BUTTON: "VISIT LIVE PROJECT" */}
      <button
        onClick={handleLaunchProject}
        className="absolute top-3 left-3 sm:top-6 sm:left-6 z-30 flex flex-col items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-xl px-2.5 py-3.5 sm:px-3 sm:py-5 rounded-full border border-white/30 shadow-2xl hover:bg-white hover:text-black transition-all cursor-pointer group/btn"
        title="Visit Live Project Demo"
      >
        <div
          className="font-outfit text-[9px] sm:text-[11px] font-extrabold uppercase tracking-widest text-white group-hover/btn:text-black"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          VISIT LIVE PROJECT
        </div>
        <div className="w-5 h-5 sm:w-7 sm:h-7 bg-white text-black rounded-full flex items-center justify-center shadow-md group-hover/btn:bg-slate-900 group-hover/btn:text-white transition-colors">
          <ExternalLink size={11} className="sm:w-3.5 sm:h-3.5" />
        </div>
      </button>

      {/* DOCK CONTAINER: RESPONSIVE FLEX DOCK WITHOUT OVERFLOW CLIPPING */}
      <div className="absolute bottom-3 left-2 right-2 sm:bottom-6 sm:left-5 sm:right-5 z-30 flex items-center justify-between bg-black/75 backdrop-blur-2xl p-1.5 sm:p-2.5 rounded-[1.4rem] sm:rounded-[1.8rem] shadow-2xl border border-white/20 gap-1.5 overflow-x-auto">
        {/* 4 Thumbnails Flex Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto shrink-0">
          {gallery.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-11 sm:w-16 h-9 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 shadow-md group/thumb flex-shrink-0 ${
                activeImageIndex === idx
                  ? "border-white ring-2 ring-white/50 scale-105"
                  : "border-white/20 hover:border-white/60 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover grayscale contrast-125 group-hover/thumb:scale-110 transition-transform"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm py-0.5 text-center text-[7px] sm:text-[9px] font-outfit font-extrabold text-white truncate px-0.5">
                {item.title}
              </div>
            </button>
          ))}
        </div>

        {/* Carousel Navigation Arrow Controls */}
        <div className="flex items-center gap-1 bg-white/10 border border-white/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-inner flex-shrink-0">
          <button
            onClick={handlePrevImage}
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 hover:bg-white hover:text-black flex items-center justify-center text-white transition-colors cursor-pointer"
            title="Previous Image View"
            aria-label="Previous view"
          >
            <ArrowLeft size={11} />
          </button>
          <span className="font-mono text-[9px] sm:text-[10px] font-bold text-white/90 px-0.5 sm:px-1">
            {activeImageIndex + 1}/{gallery.length}
          </span>
          <button
            onClick={handleNextImage}
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 hover:bg-white hover:text-black flex items-center justify-center text-white transition-colors cursor-pointer"
            title="Next Image View"
            aria-label="Next view"
          >
            <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductImageGrid;
