import { motion } from "framer-motion";

export const ThumbnailList = ({ thumbnails = [], activeIndex = 0, onSelect }) => {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 pt-2">
      {thumbnails.map((thumb, index) => {
        const isActive = index === activeIndex;
        return (
          <motion.button
            key={thumb.id || index}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(index)}
            className={`relative rounded-2xl overflow-hidden p-1 bg-white/5 backdrop-blur-md border transition-all duration-300 cursor-pointer ${
              isActive
                ? "border-white/80 ring-2 ring-white/40 shadow-lg shadow-black/50 scale-105"
                : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
            }`}
          >
            <div className="relative w-20 h-15 sm:w-24 sm:h-18 rounded-xl overflow-hidden bg-black/40">
              <img
                src={thumb.image}
                alt={thumb.title || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover grayscale brightness-95 contrast-110"
              />
            </div>
            <div className="py-1 text-center font-outfit text-[11px] font-medium text-white/90 truncate max-w-[5rem] sm:max-w-[6rem] mx-auto">
              {thumb.title || `View ${index + 1}`}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ThumbnailList;
