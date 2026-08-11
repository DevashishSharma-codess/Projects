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
      className="relative z-10 w-full min-h-screen flex flex-col justify-center bg-[#0c0a08] text-white py-12 sm:py-16 lg:py-14 pt-20 sm:pt-24 lg:pt-16 border-t border-white/10 select-none overflow-hidden"
    >
      {/* High-Tech Radial Glow Overlay matching Manifesto section */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none z-0" />

      <span id="process" className="absolute -top-24" aria-hidden="true" />

      <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 md:px-10 w-full flex flex-col justify-center h-full">
        
        {/* Header: Left Headline | Right Subtext + CTA */}
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
          className="w-full border border-white/15 bg-[#0c0a08] shadow-2xl overflow-hidden mb-12 sm:mb-16"
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

        {/* 6-Step Software Development Process Grid (Matching Screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full pt-8 sm:pt-12 border-t border-white/15"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-8 sm:gap-y-10">
            {PROCESS_STEPS.map((s, idx) => (
              <motion.div
                key={s.no}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex items-start gap-3.5 sm:gap-4 text-left"
              >
                {/* Checkmark Icon matching screenshot */}
                <div className="mt-0.5 shrink-0 text-[#84cc16]">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-outfit text-base sm:text-lg font-semibold text-white tracking-tight leading-snug mb-2">
                    <span className="font-normal text-white/90">{s.no}</span> — {s.title}
                  </h3>
                  <p className="font-outfit text-xs sm:text-sm font-light text-white/70 leading-relaxed max-w-xl">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HowWeWork;
