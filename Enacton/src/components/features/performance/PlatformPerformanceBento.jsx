import { motion } from "framer-motion";

const TOP_SLIDE_DEALS = [
  {
    store: "Amazon Deals",
    discount: "Up to 40% off",
    cashback: "6.5% Cashback",
    status: "Verified",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
  },
  {
    store: "Nike Official",
    discount: "20% OFF Voucher",
    cashback: "8.0% Cashback",
    status: "Active",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
  },
  {
    store: "Apple Store",
    discount: "Student Special",
    cashback: "3.5% Cashback",
    status: "Tracked <5ms",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
  },
  {
    store: "Sephora Beauty",
    discount: "Buy 1 Get 1",
    cashback: "10.0% Cashback",
    status: "Verified",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80",
  },
];

const BOTTOM_SLIDE_DEALS = [
  {
    store: "Target Fashion",
    discount: "$15 Off Order",
    cashback: "5.0% Cashback",
    status: "Postback Logged",
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&q=80",
  },
  {
    store: "Walmart Tech",
    discount: "Flash Electronics",
    cashback: "7.5% Cashback",
    status: "Verified",
    img: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80",
  },
  {
    store: "Adidas Performance",
    discount: "25% Promo Code",
    cashback: "9.0% Cashback",
    status: "Instant Credit",
    img: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=400&q=80",
  },
  {
    store: "Best Buy Tech",
    discount: "Save $100",
    cashback: "4.0% Cashback",
    status: "Verified",
    img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80",
  },
];

const BACKGROUND_ART = "/table-bg-monet.jpg";

export const PlatformPerformanceBento = () => {
  return (
    <section className="relative z-10 w-full py-12 sm:py-16 px-4 sm:px-8 lg:px-12 select-none overflow-hidden flex items-center justify-center">
      {/* Outer Impressionist Painting Background Frame */}
      <img
        src={BACKGROUND_ART}
        alt="Artistic background texture"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Subtle Vignette Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />

      {/* Single Compact Seamless Dark Table Container (Matching Screenshot Exactly) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto bg-[#141416] border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.85)] rounded-none md:rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          {/* =========================================================
              COLUMN 1: CORRECTNESS (Left Column - Built with Code)
             ========================================================= */}
          <div className="p-6 sm:p-7 flex flex-col justify-between h-[380px] sm:h-[420px] bg-[#141416] text-left">
            {/* Top Visual Area */}
            <div className="relative h-[220px] sm:h-[240px] w-full rounded-md bg-[#0a0a0c] border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
              {/* Green HUD Grid Dot Background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(rgba(132, 204, 22, 0.4) 1px, transparent 1px)`,
                  backgroundSize: "14px 14px",
                }}
              />

              {/* "with EnactOn" HUD Box (Top Left) */}
              <div className="relative z-10 w-fit">
                <div className="border border-[#84cc16]/50 bg-[#09090b]/95 backdrop-blur-md px-3 py-1.5 rounded border-l-2 border-l-[#84cc16]">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/60 block mb-0.5">
                    with EnactOn
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#84cc16] tracking-tight">
                    84%~92%
                  </span>
                </div>
              </div>

              {/* "before" HUD Box (Middle Left) */}
              <div className="relative z-10 w-fit mt-1">
                <div className="bg-[#1c1c20]/90 border border-white/15 px-2.5 py-1 rounded shadow">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/40 block mb-0.5">
                    before
                  </span>
                  <span className="font-mono text-xs font-semibold text-white/90">
                    67%~71%
                  </span>
                </div>
              </div>

              {/* SVG Multi-Line Chart Code */}
              <div className="absolute inset-x-0 bottom-6 h-28 px-2 pointer-events-none">
                <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                  {/* Lower Red Line */}
                  <path
                    d="M 10 80 Q 90 75, 160 65 T 290 50"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                  {/* Mid Blue Line */}
                  <path
                    d="M 10 80 Q 90 70, 170 45 T 290 32"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  {/* Mid Yellow Line */}
                  <path
                    d="M 10 80 Q 80 60, 160 35 T 290 22"
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="2"
                  />
                  {/* Top Green Scaling Curve Line */}
                  <path
                    d="M 10 80 Q 75 65, 135 35 T 290 10"
                    fill="none"
                    stroke="#84cc16"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="290" cy="10" r="4" fill="#84cc16" />
                </svg>
              </div>

              {/* Bottom Phase Labels */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[9px] text-white/40 tracking-wider">
                <span>phase 1</span>
                <span>phase 10</span>
              </div>
            </div>

            {/* Bottom Text Area */}
            <div className="pt-4">
              <h3 className="font-outfit text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1.5">
                Correctness
              </h3>
              <p className="font-mono text-xs sm:text-[13px] font-normal text-white/70 leading-snug">
                Automatically helps your coding agents improve.
              </p>
            </div>
          </div>


          {/* =========================================================
              COLUMN 2: EVIDENCE (Middle Column - 2 Opposite Sliding Rows)
             ========================================================= */}
          <div className="p-6 sm:p-7 flex flex-col justify-between h-[380px] sm:h-[420px] bg-[#141416] text-left">
            {/* Top Visual Area: 2 Sliding Image Marquee Rows */}
            <div className="relative h-[220px] sm:h-[240px] w-full rounded-md bg-[#0a0a0c] border border-white/10 overflow-hidden flex flex-col justify-center gap-2.5 py-2">
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#0a0a0c] to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#0a0a0c] to-transparent z-20 pointer-events-none" />

              {/* Row 1: Animating Right */}
              <div className="flex overflow-hidden w-full relative z-10">
                <motion.div
                  animate={{ x: [0, -350] }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  className="flex items-center gap-2 shrink-0"
                >
                  {[...TOP_SLIDE_DEALS, ...TOP_SLIDE_DEALS].map((deal, idx) => (
                    <div
                      key={idx}
                      className="w-44 bg-[#1a1a1e] border border-white/10 rounded p-2 flex items-center gap-2 shrink-0"
                    >
                      <img
                        src={deal.img}
                        alt={deal.store}
                        className="w-8 h-8 rounded object-cover border border-white/10 shrink-0"
                      />
                      <div className="font-outfit min-w-0 flex-1">
                        <span className="font-semibold text-[11px] text-white truncate block">
                          {deal.store}
                        </span>
                        <span className="text-[9px] text-[#84cc16] font-mono block">
                          {deal.cashback}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Row 2: Animating Left */}
              <div className="flex overflow-hidden w-full relative z-10">
                <motion.div
                  animate={{ x: [-350, 0] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="flex items-center gap-2 shrink-0"
                >
                  {[...BOTTOM_SLIDE_DEALS, ...BOTTOM_SLIDE_DEALS].map((deal, idx) => (
                    <div
                      key={idx}
                      className="w-44 bg-[#1a1a1e] border border-white/10 rounded p-2 flex items-center gap-2 shrink-0"
                    >
                      <img
                        src={deal.img}
                        alt={deal.store}
                        className="w-8 h-8 rounded object-cover border border-white/10 shrink-0"
                      />
                      <div className="font-outfit min-w-0 flex-1">
                        <span className="font-semibold text-[11px] text-white truncate block">
                          {deal.store}
                        </span>
                        <span className="text-[9px] text-[#38bdf8] font-mono block">
                          {deal.cashback}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Bottom Text Area */}
            <div className="pt-4">
              <h3 className="font-outfit text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1.5">
                Evidence
              </h3>
              <p className="font-mono text-xs sm:text-[13px] font-normal text-white/70 leading-snug">
                Bugs flagged before they reached production.
              </p>
            </div>
          </div>


          {/* =========================================================
              COLUMN 3: INTEGRATIONS (Right Column - User's Uploaded Image)
             ========================================================= */}
          <div className="p-6 sm:p-7 flex flex-col justify-between h-[380px] sm:h-[420px] bg-[#141416] text-left">
            {/* Top Visual Area: Uploaded Integration Image */}
            <div className="relative h-[220px] sm:h-[240px] w-full rounded-md bg-[#0a0a0c] border border-white/10 overflow-hidden">
              <img
                src="/integrations-grid.jpg"
                alt="Integrations grid with cursor"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141416]/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bottom Text Area */}
            <div className="pt-4">
              <h3 className="font-outfit text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1.5">
                Integrations
              </h3>
              <p className="font-mono text-xs sm:text-[13px] font-normal text-white/70 leading-snug">
                Reads your designs, code & tickets – integrates with the tools you already use.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlatformPerformanceBento;
