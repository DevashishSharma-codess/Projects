import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { PRODUCTS } from "../../data/products";

const FILTERS = [
  { id: "all", label: "All", count: PRODUCTS.length },
  { id: "Live", label: "Live", count: PRODUCTS.filter((p) => p.tag === "Live").length },
  { id: "Beta", label: "Beta", count: PRODUCTS.filter((p) => p.tag === "Beta").length },
];

/**
 * Shape A (Top-Left Reference Style): Light paper canvas with rounded-br-[4.5rem]
 */
function CardShapeA({ product, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={() => onClick && onClick(product)}
      className="group relative w-full min-h-[330px] rounded-[2.2rem] rounded-br-[4.5rem] bg-[#e6e4df] p-7 text-[#17130f] flex flex-col justify-between shadow-xl border border-white/20 cursor-pointer overflow-hidden transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-1 font-mono text-xs text-[#17130f]/40 font-light select-none">
            <span>+</span><span>+</span><span>+</span><span>+</span>
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#17130f] px-3 py-1 text-[11px] font-mono text-paper mb-2">
              <span className={`h-1.5 w-1.5 rounded-full ${product.tag === "Live" ? "bg-emerald-400" : "bg-amber-400"}`} />
              {product.category}
            </span>
            <h3 className="font-outfit text-2xl font-bold tracking-tight text-[#17130f] uppercase">
              {product.name}
            </h3>
            <p className="font-outfit text-xs font-semibold tracking-wider text-[#e63946] uppercase mt-0.5">
              UNBOUNDED v{product.version}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 font-mono text-[11px] select-none">
          <span className="h-2 w-2 rounded-full bg-[#17130f]" />
          <span className="h-2 w-2 rounded-full border border-[#17130f]" />
          <span className="h-2 w-2 rounded-full bg-[#e63946]" />
        </div>
      </div>

      <p className="font-outfit text-xs text-[#17130f]/80 line-clamp-3 leading-relaxed my-3 font-normal">
        {product.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-[#17130f]/15 font-mono text-[11px] text-[#17130f]/75">
        <span>{product.product}</span>
        <span className="font-semibold text-[#17130f]">{product.metric}</span>
      </div>
    </motion.div>
  );
}

/**
 * Shape B (Top-Right Reference Style): Grayscale Photo with rounded-bl-[4.5rem]
 */
function CardShapeB({ product, onClick }) {
  const Icon = product.icon || Layers;
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={() => onClick && onClick(product)}
      className="group relative w-full min-h-[330px] rounded-[2.2rem] rounded-bl-[4.5rem] overflow-hidden shadow-xl border border-white/20 cursor-pointer flex flex-col justify-between transition-all duration-300"
    >
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 h-full w-full object-cover grayscale brightness-90 contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

      <div className="relative z-10 p-6 flex items-start justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-xs font-mono text-paper border border-white/20">
          <span className={`h-1.5 w-1.5 rounded-full ${product.tag === "Live" ? "bg-emerald-400" : "bg-amber-400"}`} />
          {product.tag} v{product.version}
        </span>
        <span className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
          <Icon size={15} />
        </span>
      </div>

      <div className="relative z-10 p-6">
        <h3 className="font-outfit text-2xl font-bold tracking-tight text-white uppercase mb-1">
          {product.name}
        </h3>
        <p className="font-outfit text-xs text-white/80 line-clamp-2 leading-relaxed mb-4 font-light">
          {product.description}
        </p>
        <div className="flex items-center justify-between font-mono text-[11px] text-white/90 pt-3 border-t border-white/20">
          <span>{product.category}</span>
          <span className="font-semibold text-white">{product.metric}</span>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Shape C (Bottom-Left Reference Style): Monochrome Spotlight with rounded-tr-[4.5rem]
 */
function CardShapeC({ product, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={() => onClick && onClick(product)}
      className="group relative w-full min-h-[330px] rounded-[2.2rem] rounded-tr-[4.5rem] bg-[#12100d] p-7 text-paper flex flex-col justify-between shadow-xl border border-white/15 cursor-pointer overflow-hidden transition-all duration-300"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.22),transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
            Signature Gradient
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono text-paper border border-white/15">
            {product.tag} v{product.version}
          </span>
        </div>
        <h3 className="font-outfit text-2xl font-bold text-paper uppercase tracking-tight mb-2">
          {product.name} Engine
        </h3>
        <p className="font-outfit text-xs text-paper/70 line-clamp-3 leading-relaxed font-light">
          {product.description}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/15 font-mono text-[11px] text-paper/70">
        <span>{product.product}</span>
        <span className="font-semibold text-paper">{product.metric}</span>
      </div>
    </motion.div>
  );
}

/**
 * Shape D (Bottom-Right Reference Style): Light Editorial Paper with rounded-tl-[4.5rem]
 */
function CardShapeD({ product, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={() => onClick && onClick(product)}
      className="group relative w-full min-h-[330px] rounded-[2.2rem] rounded-tl-[4.5rem] bg-[#e6e4df] p-7 text-[#17130f] flex flex-col justify-between shadow-xl border border-white/20 cursor-pointer overflow-hidden transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#17130f]/50">
            Spec · {product.category}
          </span>
          <h3 className="font-outfit text-2xl font-bold tracking-tight text-[#17130f] uppercase">
            {product.name}
          </h3>
        </div>
        <div className="flex flex-col gap-1 font-mono text-xs text-[#17130f]/40 font-light select-none">
          <span>+</span><span>+</span><span>+</span><span>+</span><span>+</span>
        </div>
      </div>

      <p className="font-outfit text-xs text-[#17130f]/80 line-clamp-3 leading-relaxed my-2 font-normal">
        {product.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-[#17130f]/15 font-mono text-[11px] text-[#17130f]/75">
        <div className="flex items-center gap-1 select-none">
          <span className="h-2 w-2 rounded-full bg-[#e63946]" />
          <span className="h-2 w-2 rounded-full border border-[#17130f]" />
          <span className="h-2 w-2 rounded-full bg-[#17130f]" />
        </div>
        <div className="flex gap-3 text-right">
          <span>W: 292mm</span>
          <span>H: 207mm</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function GlassWindow({ onSelect }) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageIdx, setPageIdx] = useState(0);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesFilter = filter === "all" || p.tag === filter;
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cardsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);
  const currentBatch = filteredProducts.slice(
    pageIdx * cardsPerPage,
    (pageIdx + 1) * cardsPerPage
  );

  const handleNext = () => {
    setPageIdx((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setPageIdx((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const renderCardByShape = (product, index) => {
    const shapeType = index % 4;
    switch (shapeType) {
      case 0:
        return <CardShapeA key={product.id} product={product} onClick={onSelect} />;
      case 1:
        return <CardShapeB key={product.id} product={product} onClick={onSelect} />;
      case 2:
        return <CardShapeC key={product.id} product={product} onClick={onSelect} />;
      case 3:
      default:
        return <CardShapeD key={product.id} product={product} onClick={onSelect} />;
    }
  };

  return (
    <motion.div
      id="glass-window"
      data-testid="glass-window"
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="mx-auto w-full max-w-7xl"
    >
      {/* Folder Tab starting flush from the top-left edge */}
      <div className="flex">
        <div className="relative z-10 -mb-px inline-flex items-center gap-3 rounded-t-[22px] border border-b-0 border-white/20 bg-[#17130f]/85 px-7 pb-4 pt-3.5 backdrop-blur-2xl shadow-md text-paper">
          <Folder size={18} className="text-paper/80" />
          <span className="font-outfit text-base font-bold tracking-tight text-paper">
            All Products
          </span>
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-mono font-bold text-paper">
            {PRODUCTS.length}
          </span>
        </div>
      </div>

      {/* Folder Body Container — Blackish Transparent Glassmorphism */}
      <div className="rounded-[36px] rounded-tl-none border border-white/20 bg-[#17130f]/70 p-6 sm:p-9 md:p-10 shadow-[0_60px_130px_-20px_rgba(0,0,0,0.6)] backdrop-blur-3xl overflow-hidden">
        {/* Filter Buttons + Search Bar + Carousel Controls */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  data-testid={`filter-${f.id}`}
                  onClick={() => {
                    setFilter(f.id);
                    setPageIdx(0);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs md:text-sm font-outfit font-semibold transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-paper text-ink shadow-md"
                      : "bg-white/10 text-paper/80 hover:bg-white/20 hover:text-paper border border-white/15 backdrop-blur-md"
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={active ? "text-ink/60 font-mono text-[11px]" : "text-paper/50 font-mono text-[11px]"}>
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm text-paper/80 border border-white/15 backdrop-blur-md focus-within:bg-white/20 transition-colors">
              <Search size={15} className="text-paper/50" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageIdx(0);
                }}
                className="bg-transparent border-none outline-none font-outfit text-sm text-paper placeholder:text-paper/40 w-32 sm:w-48"
              />
            </div>

            {/* Prev / Next Arrows */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-paper/80 hover:bg-white/20 hover:text-paper border border-white/15 backdrop-blur-md transition-all cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-paper/80 hover:bg-white/20 hover:text-paper border border-white/15 backdrop-blur-md transition-all cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* -------------------------------------------------------------
            MULTIPLE INDIVIDUAL PRODUCT CARDS GRID
            Each product card rendered in one of the 4 reference shapes!
        ------------------------------------------------------------- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${pageIdx}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {currentBatch.map((product, idx) =>
              renderCardByShape(product, idx)
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
