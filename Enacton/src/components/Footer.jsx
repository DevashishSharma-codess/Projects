import { motion } from "framer-motion";
import { Logo3DCanvas } from "./Logo3DCanvas";

const MOUNTAIN_IMG =
  "https://static.prod-images.emergentagent.com/jobs/aaff03bd-13eb-4784-a3f9-c2ad7e7acf3a/images/7c1aafe5306058007c7c92a2a22e1fb606d2e6c48cbf50c3a393af8c07c0079a.jpeg";

const PRODUCT_LINKS = [
  "Products Overview",
  "Models Overview",
  "Search & Query",
  "AI Copilots",
  "Pricing & Plans",
];

const DEV_LINKS = [
  "Sample Apps",
  "Developer Hub",
  "API Docs & SDKs",
  "System Status",
  "Enterprise Security",
];

const COMPANY_LINKS = [
  "Capabilities",
  "High Scale Platforms",
  "Native Apps",
  "About Studio",
  "Careers & Hiring",
];

const LEGAL_LINKS = [
  "Terms of Use",
  "Privacy Policy",
  "Trust Center",
  "Acceptable Use",
  "Patents & IP",
];

const SOCIAL_LINKS = ["LinkedIn", "Twitter / X", "GitHub", "Dribbble"];

export const Footer = () => {
  return (
    <footer
      id="contact"
      data-testid="footer"
      className="relative z-10 w-full max-w-full bg-[#f5f7f2] pt-12 md:pt-16 pb-8 border-t border-black/10 text-ink overflow-hidden select-none"
    >
      <span id="blog" className="absolute -top-24" aria-hidden="true" />

      {/* Darker High-Contrast Black & White Mountain & Clouds Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={MOUNTAIN_IMG}
          alt="Surreal mountains and clouds background"
          className="w-full h-full object-cover grayscale brightness-65 contrast-125 opacity-60 mix-blend-multiply scale-105"
        />
        {/* Soft Lime-Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#d9f99d]/40 via-[#f5f7f2]/65 to-[#ffffff]/75" />
      </div>

      {/* Soft Aurora Radial Glow at Bottom-Left */}
      <div className="absolute -bottom-24 -left-24 w-[24rem] sm:w-[32rem] h-[24rem] sm:h-[32rem] bg-[#d9f99d]/60 rounded-full blur-3xl pointer-events-none z-0 opacity-80" />

      {/* Main Full-Width Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Top 4-Column Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pb-10 md:pb-12 border-b border-black/10 text-xs sm:text-sm">
          {/* Column 1: Product & Social */}
          <div className="space-y-4">
            <div>
              <h4 className="font-outfit font-semibold text-ink mb-2">Product</h4>
              <ul className="space-y-1.5 text-ink/65 font-light">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#top" className="hover:text-ink transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-1">
              <h4 className="font-outfit font-semibold text-ink mb-2">Social</h4>
              <ul className="space-y-1.5 text-ink/65 font-light">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s}>
                    <a href="#top" className="hover:text-ink transition-colors">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: For Developers */}
          <div className="space-y-4">
            <div>
              <h4 className="font-outfit font-semibold text-ink mb-2">For Developers</h4>
              <ul className="space-y-1.5 text-ink/65 font-light">
                {DEV_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#top" className="hover:text-ink transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Solutions & Company */}
          <div className="space-y-4">
            <div>
              <h4 className="font-outfit font-semibold text-ink mb-2">Solutions</h4>
              <ul className="space-y-1.5 text-ink/65 font-light">
                {COMPANY_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#top" className="hover:text-ink transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Legal & Security Seal */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="font-outfit font-semibold text-ink mb-2">Legal</h4>
              <ul className="space-y-1.5 text-ink/65 font-light">
                {LEGAL_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#top" className="hover:text-ink transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* AICPA SOC Certified Security Seal */}
            <div className="pt-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-black/5 font-mono text-[9px] font-bold uppercase text-ink/70 text-center shadow-xs backdrop-blur-xs">
                AICPA SOC
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Brand Section: Centered 3D Logo Canvas + Single Font EnactON Title Below */}
        <div className="pt-6 md:pt-8 pb-2 flex flex-col items-center justify-center text-center">
          {/* Centered 3D Logo Canvas */}
          <div className="shrink-0 -mb-4 sm:-mb-6">
            <Logo3DCanvas />
          </div>

          {/* Single Font Brand Title Below Logo */}
          <h2 className="w-full text-center font-outfit font-black uppercase text-ink tracking-tighter leading-none select-none text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem]">
            EnactON
          </h2>
        </div>

        {/* Sub-Footer Copyright Statement */}
        <div className="mt-4 text-center font-mono text-[10px] sm:text-xs text-ink/45">
          © 2021 – {new Date().getFullYear()} EnactON Studio, Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
