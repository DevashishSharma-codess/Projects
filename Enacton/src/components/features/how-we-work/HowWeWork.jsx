import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import howWeWorkStack from "../../../assets/how-we-work/how-we-work-stack-nobg.png";

const PROCESS_STEPS = [
  {
    no: "Step 01",
    title: "Discovery Call",
    body: "We start with a conversation, not a form. In 45–60 minutes, we understand your business, your users, your goals, and your constraints. This call is free. It’s also the most important investment you’ll make in the project.",
  },
  {
    no: "Step 02",
    title: "Solution Design",
    body: "We translate your business goals into a structured solution document, wireframes, user flows, technical architecture, and a detailed Software Requirements Specification (SRS). You approve everything before development begins. No surprises.",
  },
  {
    no: "Step 03",
    title: "Technology Stack Selection",
    body: "We recommend the right technology for your specific product, not the one we’re most comfortable with. We explain the tradeoffs. We factor in your team’s future ability to maintain and scale the system independently.",
  },
  {
    no: "Step 04",
    title: "Agile Development with Full Transparency",
    body: "Development runs in structured sprints. You get access to our CRM for async project management throughout. Our project managers speak technology & business, not just jargon.",
  },
  {
    no: "Step 05",
    title: "QA, Security & Deployment",
    body: "Every product goes through structured QA cycles. We run security audits, performance testing, and deployment checks before go-live. We handle cloud infrastructure, CI/CD pipelines, and launch readiness.",
  },
  {
    no: "Step 06",
    title: "Post-Launch Support & Growth",
    body: "We don’t disappear after launch. We provide structured post-launch support, monitor performance, and help you plan the next phase of growth whether that’s a new feature set, AI integration, or scaling your infrastructure.",
  },
];

export const HowWeWork = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <section
      id="how-we-work"
      data-testid="how-we-work-section"
      className="relative z-10 w-full flex flex-col justify-center bg-[#0c0a08] text-white py-8 sm:py-12 lg:py-14 pt-16 sm:pt-20 lg:pt-14 border-t border-white/10 select-none overflow-hidden"
    >
      {/* High-Tech Radial Glow Overlay matching Manifesto section */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none z-0" />

      <span id="process" className="absolute -top-24" aria-hidden="true" />

      <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 md:px-10 w-full flex flex-col justify-center h-full">
        
        {/* Header: Single-line Title | Cool Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-end mb-6 sm:mb-8 lg:mb-8">
          
          {/* Left Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light tracking-tight text-white leading-[1.05]">
              Execution <span className="text-[#c7e099] font-normal">Engine</span>
            </h2>
          </motion.div>

          {/* Right Cool Description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col gap-2.5 sm:gap-3.5 items-start"
          >
            <p className="font-outfit text-xs sm:text-sm font-light text-white/75 leading-relaxed">
              Our battle-tested software engineering methodology translates ambitious technical vision into high-scale, production-ready digital products through structured sprints and deterministic execution.
            </p>
          </motion.div>

        </div>

        {/* 3D Funnel Engine Container (Placed First at the Top of How We Work Section) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full py-8 sm:py-12 relative overflow-hidden border border-white/15 bg-[#0c0a08] shadow-2xl p-4 sm:p-8 lg:p-12"
        >
          {/* Top Corner Metadata */}
          <div className="flex items-center justify-between font-mono text-[9px] sm:text-xs text-white/40 uppercase tracking-widest pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c7e099" strokeWidth="2.5">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <span className="text-white/80 font-medium">[ DEVELOPMENT_ROADMAP ]</span>
            </div>
            <div className="flex items-center gap-4">
              <span>6 STAGES</span>
              <span>STRUCTURED METHODOLOGY</span>
            </div>
          </div>

          {/* 3-Column Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column (5 Cols on lg): Main Headline & Process Subtext */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left pr-0 lg:pr-4">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-[1.08] mb-6"
              >
                Structured Execution <br />
                <span className="text-[#c7e099] font-normal">Methodology &amp; Process</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-outfit text-xs sm:text-sm font-light text-white/70 leading-relaxed max-w-md"
              >
                EnactOn translates business goals into high-scale software through structured sprints, transparent SRS specifications, deterministic technology selection, and rigorous security verification.
              </motion.p>
            </div>

            {/* Middle Column (4 Cols on lg): 3D Tapered Lime Green Funnel Graphics */}
            <div className="lg:col-span-4 flex items-center justify-center relative min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]">
              <svg
                className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[400px] h-auto overflow-visible z-10 mx-auto"
                viewBox="0 0 500 520"
                fill="none"
              >
                <defs>
                  {/* Layer 1 Brand Green Top Gradient */}
                  <linearGradient id="funnelGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e2f2c4" />
                    <stop offset="100%" stopColor="#c7e099" />
                  </linearGradient>

                  {/* Layer 2 Mid Green Gradient */}
                  <linearGradient id="funnelGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c7e099" />
                    <stop offset="100%" stopColor="#a3c470" />
                  </linearGradient>

                  {/* Layer 3 Darker Green Gradient */}
                  <linearGradient id="funnelGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a3c470" />
                    <stop offset="100%" stopColor="#7da245" />
                  </linearGradient>

                  {/* Layer 4 Base Cylinder Gradient */}
                  <linearGradient id="funnelGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#5a7c2e" />
                    <stop offset="100%" stopColor="#2d4013" />
                  </linearGradient>

                  <filter id="funnelGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#c7e099" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* --- LEVEL 1 (DISCOVERY & SRS DESIGN) --- */}
                <g filter="url(#funnelGlow)">
                  {/* Bottom Lip Oval */}
                  <ellipse cx="250" cy="130" rx="145" ry="24" fill="#a3c470" />
                  {/* Tapered Body */}
                  <path d="M 50 40 L 450 40 L 395 130 L 105 130 Z" fill="url(#funnelGrad1)" />
                  {/* Top Inner Oval */}
                  <ellipse cx="250" cy="40" rx="200" ry="32" fill="#eff8db" />
                  <ellipse cx="250" cy="40" rx="194" ry="30" fill="url(#funnelGrad1)" />

                  {/* Layer 1 Title Text & Icon (Perfectly Centered) */}
                  <g transform="translate(250, 78)">
                    <svg x="-92" y="-3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0c0a08" strokeWidth="2.2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    <text x="-68" y="12" fill="#0c0a08" fontSize="14.5" fontWeight="600" fontFamily="Outfit, sans-serif">
                      Discovery &amp; SRS Design
                    </text>
                  </g>
                </g>

                {/* --- LEVEL 2 (TECH STACK SELECTION) --- */}
                <g transform="translate(0, 105)">
                  <ellipse cx="250" cy="130" rx="110" ry="18" fill="#7da245" />
                  <path d="M 110 40 L 390 40 L 360 130 L 140 130 Z" fill="url(#funnelGrad2)" />
                  <ellipse cx="250" cy="40" rx="140" ry="22" fill="#d4e8af" opacity="0.9" />
                  <ellipse cx="250" cy="40" rx="136" ry="20" fill="url(#funnelGrad2)" />

                  {/* Layer 2 Title Text & Icon (Perfectly Centered) */}
                  <g transform="translate(250, 78)">
                    <svg x="-82" y="-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0c0a08" strokeWidth="2">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                    <text x="-60" y="11" fill="#0c0a08" fontSize="13.5" fontWeight="600" fontFamily="Outfit, sans-serif">
                      Tech Stack Selection
                    </text>
                  </g>
                </g>

                {/* --- LEVEL 3 (AGILE SPRINT EXECUTION) --- */}
                <g transform="translate(0, 205)">
                  <ellipse cx="250" cy="130" rx="85" ry="14" fill="#2d4013" />
                  <path d="M 145 40 L 355 40 L 335 130 L 165 130 Z" fill="url(#funnelGrad3)" />
                  <ellipse cx="250" cy="40" rx="105" ry="16" fill="#c7e099" opacity="0.85" />
                  <ellipse cx="250" cy="40" rx="101" ry="14" fill="url(#funnelGrad3)" />

                  {/* Layer 3 Title Text & Icon (Centered) */}
                  <g transform="translate(250, 78)">
                    <svg x="-74" y="-2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0c0a08" strokeWidth="2">
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                    <text x="-56" y="10" fill="#0c0a08" fontSize="12" fontWeight="600" fontFamily="Outfit, sans-serif">
                      Agile Sprint Execution
                    </text>
                  </g>
                </g>

                {/* --- LEVEL 4 (QA, SECURITY & LAUNCH - Straight Base Cylinder, Matching Design) --- */}
                <g transform="translate(0, 310)">
                  {/* Straight Cylinder Body (rx=85 Base) */}
                  <path d="M 165 35 L 335 35 L 335 130 L 165 130 Z" fill="url(#funnelGrad4)" />
                  <ellipse cx="250" cy="130" rx="85" ry="14" fill="#1b280a" stroke="#5a7c2e" strokeWidth="1.5" />
                  <ellipse cx="250" cy="35" rx="85" ry="14" fill="#7da245" opacity="0.9" />
                  <ellipse cx="250" cy="35" rx="81" ry="12" fill="url(#funnelGrad4)" />

                  {/* Layer 4 Title Text & Icon (Neatly Fitted Inside Cylinder) */}
                  <g transform="translate(250, 78)">
                    <svg x="-68" y="-2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0c0a08" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <text x="-50" y="10" fill="#0c0a08" fontSize="11.5" fontWeight="600" fontFamily="Outfit, sans-serif">
                      QA, Security &amp; Launch
                    </text>
                  </g>
                </g>

                {/* --- L-SHAPED POINTER GUIDELINES CONNECTING LAYERS TO RIGHT CALLOUTS --- */}
                <path d="M 390 85 H 480" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <path d="M 355 190 H 480" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <path d="M 320 290 H 480" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <path d="M 320 395 H 480" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              </svg>
            </div>

            {/* Right Column (3 Cols on lg): 4 Callout Rows (Process Steps Details) */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-6 sm:gap-8 text-left py-2">
              
              {/* Callout 1 (Discovery & Solution Design - Steps 01 & 02) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-start gap-3 sm:gap-4 border-b border-white/10 pb-4"
              >
                <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-semibold text-[#c7e099] tracking-tight shrink-0">
                  01–02
                </span>
                <div className="pt-0.5">
                  <p className="font-outfit text-xs font-light text-white/80 leading-relaxed">
                    45–60 min discovery call, wireframes &amp; detailed SRS specifications approved before coding.
                  </p>
                </div>
              </motion.div>

              {/* Callout 2 (Tech Stack Selection - Step 03) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-start gap-3 sm:gap-4 border-b border-white/10 pb-4"
              >
                <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-semibold text-[#c7e099] tracking-tight shrink-0">
                  03
                </span>
                <div className="pt-0.5">
                  <p className="font-outfit text-xs font-light text-white/80 leading-relaxed">
                    Zero-bloat tech stack selection tailored for scale, maintainability &amp; sub-50ms execution SLAs.
                  </p>
                </div>
              </motion.div>

              {/* Callout 3 (Agile Sprints - Step 04) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-start gap-3 sm:gap-4 border-b border-white/10 pb-4"
              >
                <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-semibold text-[#c7e099] tracking-tight shrink-0">
                  04
                </span>
                <div className="pt-0.5">
                  <p className="font-outfit text-xs font-light text-white/80 leading-relaxed">
                    Structured sprints with async CRM access, continuous feedback &amp; full development transparency.
                  </p>
                </div>
              </motion.div>

              {/* Callout 4 (QA, Security & Post-Launch Support - Steps 05 & 06) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-start gap-3 sm:gap-4 pb-1"
              >
                <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-semibold text-[#c7e099] tracking-tight shrink-0">
                  05–06
                </span>
                <div className="pt-0.5">
                  <p className="font-outfit text-xs font-light text-white/80 leading-relaxed">
                    Structured QA, security audits, cloud edge deployment &amp; continuous post-launch growth support.
                  </p>
                </div>
              </motion.div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const ArchitectureGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section className="relative z-10 w-full bg-[#0c0a08] text-white py-8 sm:py-12 lg:py-14 select-none overflow-hidden border-t border-white/10">
      <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 md:px-10 w-full">
        
        {/* Header Row: Powered by EnactOn's Engineering Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-end mb-6 sm:mb-8 lg:mb-8">
          
          {/* Left Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light tracking-tight text-white leading-[1.05]">
              Powered by EnactOn's <br />
              <span className="text-[#c7e099] font-normal">Engineering Engine</span>
            </h2>
          </motion.div>

          {/* Right Subtext Paragraph + CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-3.5 items-start lg:items-start"
          >
            <p className="font-outfit text-xs sm:text-sm font-light text-white/70 leading-relaxed">
              Most traditional agencies using slow, bloated development cycles deliver sub-par software with high maintenance costs.
            </p>
            <p className="font-outfit text-xs sm:text-sm font-light text-white/70 leading-relaxed">
              With EnactOn, you get high-scale, AI-native web and mobile applications delivered in weeks at a fraction of the cost.
            </p>
            <div className="pt-1">
              <button
                onClick={() => navigate("/contact", { state: { backgroundLocation: location } })}
                className="inline-flex items-center gap-2 rounded-none border border-white bg-white hover:bg-neutral-200 text-black px-5 py-2 sm:py-2.5 font-outfit text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shadow-sm cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Architectural 3-Column Table Grid Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full border border-white/15 bg-[#0c0a08] shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/15">
            
            {/* Left Column (4 Cols on lg): 2 Stacked Table Cells */}
            <div className="lg:col-span-4 flex flex-col divide-y divide-white/15">
              
              {/* Cell 1: SYSTEM ARCHITECTURE */}
              <div className="p-5 sm:p-6 lg:p-8 flex flex-col justify-center min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] hover:bg-white/[0.015] transition-colors">
                <div className="text-white/40 mb-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M12 4v16M4 12h16M6.34 6.34l11.32 11.32M6.34 17.66L17.66 6.34" />
                  </svg>
                </div>
                
                <h3 className="font-outfit text-sm sm:text-base font-bold tracking-wider text-white uppercase mb-1.5">
                  SYSTEM ARCHITECTURE
                </h3>
                <p className="font-outfit text-xs sm:text-sm font-light text-white/70 leading-relaxed">
                  We map clean database schemas, edge API contracts, and zero-friction user workflows before writing a single line of production code.
                </p>
              </div>

              {/* Cell 2: DETERMINISTIC STACK */}
              <div className="p-5 sm:p-6 lg:p-8 flex flex-col justify-center min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] hover:bg-white/[0.015] transition-colors">
                <div className="text-white/40 mb-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>

                <h3 className="font-outfit text-sm sm:text-base font-bold tracking-wider text-white uppercase mb-1.5">
                  DETERMINISTIC STACK
                </h3>
                <p className="font-outfit text-xs sm:text-sm font-light text-white/70 leading-relaxed">
                  Engineered on zero-bloat modern stacks — Next.js, React, Node, Rust, and custom Python LLM pipelines built for sub-50ms execution SLAs.
                </p>
              </div>

            </div>

            {/* Middle Column (4 Cols on lg): 5-Layer Isometric Stack Graphic with Dotted Projection Lines */}
            <div className="lg:col-span-4 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative bg-transparent min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] xl:min-h-[400px]">
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid meet" fill="none">
                <line x1="200" y1="40" x2="200" y2="440" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="130" y1="80" x2="130" y2="400" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="270" y1="80" x2="270" y2="400" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              <img
                src={howWeWorkStack}
                alt="5-layer isometric tech hardware architecture stack"
                className="w-full max-w-[240px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[380px] xl:max-w-[420px] max-h-[260px] sm:max-h-[340px] lg:max-h-[380px] xl:max-h-[420px] h-auto object-contain z-10 mx-auto"
              />
            </div>

            {/* Right Column (4 Cols on lg): 2 Stacked Table Cells */}
            <div className="lg:col-span-4 flex flex-col divide-y divide-white/15">
              
              {/* Cell 1: AUTONOMOUS AI AGENTS */}
              <div className="p-5 sm:p-6 lg:p-8 flex flex-col justify-center min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] hover:bg-white/[0.015] transition-colors">
                <div className="text-white/40 mb-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4c0 4-2 7-5 8" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4c0 4-2 7-5 8" />
                  </svg>
                </div>

                <h3 className="font-outfit text-sm sm:text-base font-bold tracking-wider text-white uppercase mb-1.5">
                  AUTONOMOUS AI AGENTS
                </h3>
                <p className="font-outfit text-xs sm:text-sm font-light text-white/70 leading-relaxed">
                  Seamlessly embed autonomous intelligent agents, RAG vector retrieval, and real-time LLM inference directly into your core product.
                </p>
              </div>

              {/* Cell 2: ENTERPRISE SECURITY & DEPLOYMENT */}
              <div className="p-5 sm:p-6 lg:p-8 flex flex-col justify-center min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] hover:bg-white/[0.015] transition-colors">
                <div className="text-white/40 mb-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>

                <h3 className="font-outfit text-sm sm:text-base font-bold tracking-wider text-white uppercase mb-1.5">
                  ENTERPRISE SECURITY
                </h3>
                <p className="font-outfit text-xs sm:text-sm font-light text-white/70 leading-relaxed">
                  Bank-grade SOC2 compliance, multi-tenant role-based access control, and continuous edge CDN deployment with 99.99% uptime.
                </p>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeWork;
