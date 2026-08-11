import { motion } from "framer-motion";
import featuredBg from "../../../assets/card-bgs/featured-testimonial-bg.jpg";

// Sharp Boxy Double Quote Mark Icon (matching reference screenshot)
const BoxyQuoteMark = ({ className = "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white mb-4 sm:mb-6 drop-shadow-sm" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="currentColor"
    className={`inline-block shrink-0 ${className}`}
  >
    {/* Left boxy quotation mark block */}
    <path d="M8 12h18v22H18v14H8V34h10V12H8z" />
    {/* Right boxy quotation mark block */}
    <path d="M38 12h18v22H48v14H38V34h10V12H38z" />
  </svg>
);

export const FeaturedTestimonial = () => {
  return (
    <section
      data-testid="featured-testimonial-section"
      className="relative z-10 w-full min-h-[65vh] py-14 sm:py-20 md:py-24 select-none overflow-hidden flex items-center justify-center"
    >
      {/* Full-Width Edge-to-Edge Watercolor Background Image */}
      <img
        src={featuredBg}
        alt="Coral watercolor section background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Glass Screen Container (Slightly Reduced Size) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="relative w-full rounded-none p-6 sm:p-10 md:p-12 lg:p-16 overflow-hidden min-h-[360px] sm:min-h-[420px] flex flex-col justify-between"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.22) 100%)",
            backdropFilter: "blur(36px) saturate(200%)",
            WebkitBackdropFilter: "blur(36px) saturate(200%)",
            border: "1.5px solid rgba(255, 255, 255, 0.65)",
            boxShadow:
              "inset 0 2px 3px rgba(255, 255, 255, 0.8), inset 0 -1.5px 2px rgba(255, 255, 255, 0.25), 0 25px 60px rgba(0, 0, 0, 0.18)",
          }}
        >
          {/* Glass Top Specular Sheen Highlight */}
          <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-white/35 via-white/12 to-transparent pointer-events-none z-0" />
          
          {/* Glass Left Edge Ambient Light Reflection */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/20 to-transparent pointer-events-none z-0" />

          {/* Quote & Author Details Container */}
          <div className="relative z-10 flex flex-col justify-between h-full my-auto">
            {/* Boxy Quotation Marks Icon */}
            <BoxyQuoteMark />

            {/* High-Impact Featured Quote in Uniform Font Light */}
            <h3 className="font-outfit text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light text-white leading-[1.15] tracking-tight drop-shadow-sm max-w-4xl">
              There has been a lot of talk surrounding what works in digital products now. The answer is EnactOn. Full Stop. EnactOn is the next generation of product engineering.
            </h3>

            {/* Author Info */}
            <div className="flex items-center gap-3.5 pt-6 sm:pt-8 md:pt-10">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="David Sterling"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/70 shadow-md"
              />
              <div className="flex flex-col">
                <span className="font-outfit text-sm sm:text-base font-semibold text-white tracking-wide drop-shadow-xs">
                  David Sterling
                </span>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/90 font-medium">
                  CEO OF MARA AI
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedTestimonial;
