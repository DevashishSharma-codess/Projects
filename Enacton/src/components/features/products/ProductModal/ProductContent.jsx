import { ArrowUpRight, Sparkles, Quote } from "lucide-react";

export const ProductContent = ({
  product,
  currentIndex = 1,
  totalCount = 12,
}) => {
  if (!product) return null;

  const productName = product.name || "Enterprise Product";
  const productSub = product.product || "Sub-Second High-Scale Infrastructure";
  const category = product.category || "InsurTech Platform";
  const description =
    product.description ||
    "Unified insurance API gateway connecting POSP agents, aggregators, and underwriters for instant quote generation and policy issuance.";

  return (
    <div className="w-full flex flex-col select-text space-y-5 sm:space-y-6">
      {/* Editorial Top Header */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#84cc16] rounded-full animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#84cc16] font-bold">
              {category}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase text-white/40 tracking-widest hidden sm:inline-block">
            ENACTON SPEC
          </span>
        </div>

        {/* Poppy Magazine Title */}
        <h1 className="font-outfit font-black text-3xl sm:text-5xl lg:text-[44px] uppercase tracking-tight text-white leading-[1.05] drop-shadow-md">
          {productName}
        </h1>

        <p className="font-outfit text-sm sm:text-lg text-white/80 font-medium italic tracking-wide">
          {productSub}
        </p>

        {/* Magazine Dotted Divider with Glass Badge '01' */}
        <div className="relative w-full border-t border-dashed border-white/20 my-3 flex items-center justify-center">
          <span className="absolute bg-white/10 backdrop-blur-md border border-white/30 px-3.5 py-0.5 rounded-full text-xs font-mono text-white/90 font-bold shadow-sm">
            01
          </span>
        </div>
      </div>

      {/* Pull Quote Editorial Callout Box */}
      <div className="bg-white/[0.06] backdrop-blur-md border-l-4 border-[#84cc16] p-3.5 sm:p-4 rounded-r-2xl shadow-inner my-1">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <Quote size={18} className="text-[#84cc16] flex-shrink-0 mt-0.5" />
          <p className="font-outfit text-xs sm:text-sm italic font-semibold text-white/95 leading-relaxed">
            "Engineered as a high-throughput digital backbone, abstracting legacy complexity into deterministic microservices with sub-50ms SLA targets."
          </p>
        </div>
      </div>

      {/* MULTI-COLUMN MAGAZINE EDITORIAL TEXT LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-white/80 text-xs sm:text-sm">
        {/* Left Magazine Column */}
        <div className="space-y-4 sm:space-y-5">
          {/* Section 1 */}
          <div className="space-y-2 bg-white/[0.03] p-3.5 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="font-mono text-xs font-bold text-[#84cc16] block uppercase tracking-wider">
              [ 01 // OVERVIEW ]
            </span>
            <h2 className="font-outfit text-sm sm:text-base font-bold text-white uppercase tracking-wide">
              Executive System Overview
            </h2>
            <p className="font-outfit text-xs sm:text-sm font-normal text-white/80 leading-relaxed">
              {description} Unified architecture designed for zero-friction transaction processing across distributed enterprise client endpoints worldwide.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2 bg-white/[0.03] p-3.5 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="font-mono text-xs font-bold text-cyan-400 block uppercase tracking-wider">
              [ 02 // PERFORMANCE ]
            </span>
            <h2 className="font-outfit text-sm sm:text-base font-bold text-white uppercase tracking-wide">
              Capabilities & SLAs
            </h2>
            <p className="font-outfit text-xs sm:text-sm font-normal text-white/80 leading-relaxed">
              Operating with guaranteed sub-second latency targets (&lt;50ms SLA), incorporating distributed in-memory caching and parallelized rate calculations.
            </p>
          </div>
        </div>

        {/* Right Magazine Column */}
        <div className="space-y-4 sm:space-y-5">
          {/* Section 3 */}
          <div className="space-y-2 bg-white/[0.03] p-3.5 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="font-mono text-xs font-bold text-amber-400 block uppercase tracking-wider">
              [ 03 // ARCHITECTURE ]
            </span>
            <h2 className="font-outfit text-sm sm:text-base font-bold text-white uppercase tracking-wide">
              API Interface Mesh
            </h2>
            <p className="font-outfit text-xs sm:text-sm font-normal text-white/80 leading-relaxed">
              Event-driven microservices exposing RESTful endpoints, GraphQL schemas, and WebSockets optimized with Protocol Buffers serialization.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2 bg-white/[0.03] p-3.5 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="font-mono text-xs font-bold text-emerald-400 block uppercase tracking-wider">
              [ 04 // SECURITY ]
            </span>
            <h2 className="font-outfit text-sm sm:text-base font-bold text-white uppercase tracking-wide">
              Compliance & Auditability
            </h2>
            <p className="font-outfit text-xs sm:text-sm font-normal text-white/80 leading-relaxed">
              SOC2 Type II certified, zero-trust token authentication, and end-to-end AES-256 encryption ensuring complete tenant data isolation.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metric Highlights Grid */}
      <div className="pt-1 grid grid-cols-2 gap-2.5 sm:gap-3 font-mono text-xs">
        <div className="bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/15 shadow-sm">
          <span className="text-white/40 uppercase block text-[9px] sm:text-[10px] mb-0.5 sm:mb-1 font-bold">Integration Scale</span>
          <span className="text-white font-bold text-xs sm:text-sm">{product.metric || "100+ Integrations"}</span>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/15 shadow-sm">
          <span className="text-white/40 uppercase block text-[9px] sm:text-[10px] mb-0.5 sm:mb-1 font-bold">Latency SLA</span>
          <span className="text-white font-bold text-xs sm:text-sm">&lt; 50ms Target</span>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/15 shadow-sm">
          <span className="text-white/40 uppercase block text-[9px] sm:text-[10px] mb-0.5 sm:mb-1 font-bold">Release</span>
          <span className="text-white font-bold text-xs sm:text-sm">v{product.version || "3.2"} Production</span>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/15 shadow-sm">
          <span className="text-white/40 uppercase block text-[9px] sm:text-[10px] mb-0.5 sm:mb-1 font-bold">Compliance</span>
          <span className="text-white font-bold text-xs sm:text-sm">SOC2 Type II</span>
        </div>
      </div>

      {/* Bottom Counter & Spec Request Button */}
      <div className="pt-3 pb-2 border-t border-white/20 flex items-center justify-between">
        <div className="font-outfit text-xl sm:text-3xl font-black text-white tracking-tight">
          {String(currentIndex).padStart(2, "0")}
          <span className="text-white/40 font-normal text-sm sm:text-lg">/{String(totalCount).padStart(2, "0")}</span>
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white text-slate-900 font-outfit text-xs font-extrabold uppercase tracking-wider hover:bg-[#84cc16] hover:text-black transition-all shadow-xl group cursor-pointer"
        >
          <span>Request Spec Doc</span>
          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default ProductContent;
