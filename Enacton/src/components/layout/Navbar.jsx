import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown, Calendar } from "lucide-react";
import { LogoMark } from "../common/LogoMark";
import { PRODUCTS } from "../../data/products";
import { scrollToElement } from "../../utils/scroll";

const LINKS = [
  { label: "What We Do", to: "/#what-we-do" },
  { label: "Products", to: "/#products", hasDropdown: true },
  { label: "How We Work", to: "/how-we-work" },
  { label: "Reserve Sprint", to: "/#booking" },
  { label: "Testimonials", to: "/#testimonials" },
];

export const Navbar = ({ isDarkPage = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnterProducts = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setProductsDropdownOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 200);
  };

  const handleSelectProduct = (productId) => {
    setProductsDropdownOpen(false);
    setMobileMenuOpen(false);
    const targetPath = `/products/${productId}`;
    if (location.pathname === targetPath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(targetPath);
      window.scrollTo(0, 0);
    }
  };

  const handleLinkClick = (to) => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);

    if (to.startsWith("/#")) {
      const targetHash = to.replace("/", "");
      const targetId = targetHash.replace("#", "");

      if (location.pathname !== "/") {
        navigate("/" + targetHash);
      } else {
        if (location.hash !== targetHash) {
          navigate("/" + targetHash);
        }
        scrollToElement(targetId);
      }
    } else {
      if (location.pathname === to && (!location.hash || location.hash === "")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(to);
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <>
      <motion.header
        data-testid="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 z-[150] w-full transition-[background-color,backdrop-filter,border-color,padding] duration-500 ${
          scrolled
            ? isDarkPage
              ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 py-3"
              : "bg-white/80 backdrop-blur-2xl border-b border-black/5 py-3"
            : "bg-transparent border-b border-transparent py-4 sm:py-6"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex items-center justify-between">
          {/* Logo Mark */}
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("/");
            }}
            data-testid="nav-logo"
            className={`font-outfit text-lg sm:text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2 sm:gap-2.5 shrink-0 ${
              isDarkPage ? "text-white" : "text-ink"
            }`}
          >
            <LogoMark size={20} className={isDarkPage ? "text-white" : "text-ink"} />
            <span>EnactOn</span>
          </Link>

          {/* Desktop Navigation Links - Visible on Large Screens (lg: 1024px+) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8 relative">
            {LINKS.map((l) => {
              if (l.hasDropdown) {
                return (
                  <div
                    key={l.label}
                    className="relative"
                    onMouseEnter={handleMouseEnterProducts}
                    onMouseLeave={handleMouseLeaveProducts}
                  >
                    <button
                      onClick={() => handleLinkClick(l.to)}
                      className={`group relative font-outfit text-xs xl:text-sm transition-colors duration-300 cursor-pointer flex items-center gap-1 py-1 ${
                        isDarkPage
                          ? "text-white/75 hover:text-white"
                          : "text-ink/75 hover:text-ink"
                      }`}
                    >
                      <span>{l.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          productsDropdownOpen ? "rotate-180 text-ink" : "opacity-60"
                        }`}
                      />
                      <span
                        className={`absolute -bottom-1 left-0 h-px w-0 transition-[width] duration-300 group-hover:w-full ${
                          isDarkPage ? "bg-white" : "bg-ink"
                        }`}
                      />
                    </button>

                    {/* Minimal Modern Products Dropdown Menu */}
                    <AnimatePresence>
                      {productsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full -left-10 sm:-left-16 pt-2 z-[200] w-[320px] sm:w-[380px] lg:w-[420px] pointer-events-auto"
                        >
                          <div className="rounded-2xl bg-white/95 text-ink border border-black/10 shadow-xl p-3 backdrop-blur-2xl overflow-hidden">
                            <div className="flex items-center justify-between pb-2 mb-1 border-b border-black/5 px-2">
                              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 font-semibold">
                                / PRODUCTS
                              </span>
                              <span className="font-mono text-[10px] text-ink/40">
                                12 Layers
                              </span>
                            </div>

                            {/* Minimal 2-Column Product List */}
                            <div className="grid grid-cols-2 gap-1 max-h-[340px] overflow-y-auto pr-0.5">
                              {PRODUCTS.map((prod) => (
                                <button
                                  key={prod.id}
                                  onClick={() => handleSelectProduct(prod.id)}
                                  className="p-2 rounded-lg hover:bg-black/5 transition-all text-left group cursor-pointer"
                                >
                                  <div className="font-outfit text-xs font-medium text-ink group-hover:text-black transition-colors truncate">
                                    {prod.name}
                                  </div>
                                  <div className="font-mono text-[9px] text-ink/40 font-light truncate">
                                    {prod.category}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={l.label}
                  onClick={() => handleLinkClick(l.to)}
                  data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`group relative font-outfit text-xs xl:text-sm transition-colors duration-300 cursor-pointer ${
                    isDarkPage
                      ? "text-white/75 hover:text-white"
                      : "text-ink/75 hover:text-ink"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-0 transition-[width] duration-300 group-hover:w-full ${
                      isDarkPage ? "bg-white" : "bg-ink"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Dual CTA Buttons & Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Book a Session CTA */}
            <button
              onClick={() => handleLinkClick("/#booking")}
              data-testid="nav-cta-booking"
              className={`hidden sm:inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-2 lg:px-5 lg:py-2.5 font-outfit text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-[1.03] shadow-xs group cursor-pointer ${
                isDarkPage
                  ? "border-white/20 bg-white/10 text-white hover:bg-white hover:text-black"
                  : "border-ink/20 bg-white/40 backdrop-blur-md text-ink hover:bg-ink hover:text-paper"
              }`}
            >
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Book a Session</span>
            </button>

            {/* Start a Project CTA */}
            <button
              onClick={() => navigate("/contact", { state: { backgroundLocation: location } })}
              data-testid="nav-cta-start"
              className={`hidden sm:inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 lg:px-5 lg:py-2.5 font-outfit text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-[1.03] shadow-xs cursor-pointer ${
                isDarkPage ? "bg-white text-black hover:bg-white/90" : "bg-ink text-paper"
              }`}
            >
              <span className="relative z-10">Start a Project</span>
            </button>

            {/* Mobile / Tablet Hamburger Toggle Button (lg:hidden) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex lg:hidden h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border backdrop-blur-md transition-colors active:scale-95 ${
                isDarkPage
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-ink/15 bg-white/60 text-ink"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} className="sm:w-5 sm:h-5" /> : <Menu size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile & Tablet Full-Screen Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed inset-0 z-[140] flex flex-col justify-between backdrop-blur-3xl pt-20 sm:pt-24 pb-8 px-5 sm:px-8 lg:hidden overflow-y-auto ${
              isDarkPage ? "bg-black/95 text-white" : "bg-paper/95 text-ink"
            }`}
          >
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold opacity-40 mb-1">
                / NAVIGATION
              </div>

              {LINKS.map((l) => {
                if (l.hasDropdown) {
                  return (
                    <div key={l.label} className="flex flex-col">
                      <button
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className="font-outfit text-2xl sm:text-3xl font-medium tracking-tight text-left hover:opacity-70 transition-opacity cursor-pointer flex items-center justify-between py-1"
                      >
                        <span>{l.label}</span>
                        <ChevronDown
                          className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
                            mobileProductsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile Products Expandable List */}
                      {mobileProductsOpen && (
                        <div className="mt-2 pl-3 border-l-2 border-current/20 flex flex-col space-y-2 max-h-[240px] overflow-y-auto">
                          {PRODUCTS.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => handleSelectProduct(p.id)}
                              className="text-left font-outfit text-sm sm:text-base font-medium opacity-80 hover:opacity-100 py-1 cursor-pointer flex items-center justify-between"
                            >
                              <span>{p.name}</span>
                              <span className="font-mono text-[10px] opacity-50">
                                {p.category}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={l.label}
                    onClick={() => handleLinkClick(l.to)}
                    className="font-outfit text-2xl sm:text-3xl font-medium tracking-tight text-left hover:opacity-70 transition-opacity cursor-pointer py-1"
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-5 border-t border-current/10 flex flex-col space-y-3 mt-6">
              <button
                onClick={() => handleLinkClick("/#booking")}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-full border py-3 font-outfit text-sm font-semibold shadow-xs cursor-pointer ${
                  isDarkPage
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-ink/20 bg-white/40 text-ink"
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Book a Session</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/contact", { state: { backgroundLocation: location } });
                }}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-3 font-outfit text-sm font-semibold shadow-md cursor-pointer ${
                  isDarkPage ? "bg-white text-black" : "bg-ink text-paper"
                }`}
              >
                <span>Start a Project</span>
              </button>
              <p className="text-center font-mono text-xs opacity-40 pt-1">
                hello@enacton.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
