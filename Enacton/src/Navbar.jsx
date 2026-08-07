import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoMark } from "./components/LogoMark";

const LINKS = [
  { label: "What We Do", href: "#what-we-do" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        data-testid="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 z-[150] w-full transition-[background-color,backdrop-filter,border-color,padding] duration-500 ${
          scrolled
            ? "bg-white/70 backdrop-blur-2xl border-b border-white/50 py-3.5"
            : "bg-transparent border-b border-transparent py-5 sm:py-6"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          <a
            href="#top"
            data-testid="nav-logo"
            className="font-outfit text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2.5 text-ink"
          >
            <LogoMark size={22} className="text-ink" />
            <span>EnactON</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative font-outfit text-sm text-ink/75 hover:text-ink transition-colors duration-300"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-[width] duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA & Mobile Menu Toggle Button */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              data-testid="nav-cta"
              className="hidden sm:inline-flex group relative overflow-hidden rounded-full bg-ink px-5 py-2.5 font-outfit text-xs sm:text-sm font-medium text-paper transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10">Start a Project</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/60 backdrop-blur-md text-ink transition-colors hover:bg-white active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Full-Screen Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[140] flex flex-col justify-between bg-paper/95 backdrop-blur-3xl pt-28 pb-12 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-ink/40 mb-2">
                / NAVIGATION
              </div>
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-outfit text-3xl font-medium tracking-tight text-ink hover:text-[#C2612B] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-ink/10 flex flex-col space-y-4">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-full bg-ink py-3.5 font-outfit text-sm font-semibold text-paper shadow-md"
              >
                Start a Project
              </a>
              <p className="text-center font-mono text-xs text-ink/40">
                hello@enacton.studio
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
