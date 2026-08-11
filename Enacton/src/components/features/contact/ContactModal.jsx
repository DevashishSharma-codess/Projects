import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { LogoMark } from "../../common/LogoMark";

export const ContactModal = ({ isOpen: propIsOpen, onClose: propOnClose, bookingDetails: propBookingDetails }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isContactRoute = location.pathname === "/contact";
  const isOpen = propIsOpen || isContactRoute;
  const bookingDetails = propBookingDetails || location.state || null;

  const handleClose = () => {
    if (propOnClose) {
      propOnClose();
    }
    if (isContactRoute) {
      if (location.state && location.state.backgroundLocation) {
        navigate(-1);
      } else if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web & Mobile Product",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const savedScrollY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      savedScrollY.current = window.scrollY;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
        setIsSubmitted(false);
        const y = savedScrollY.current;
        window.scrollTo(0, y);
      };
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!isOpen || typeof document === "undefined") return null;

  const modalElement = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 overflow-hidden">
        {/* Backdrop Overlay with Heavy Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-2xl z-0"
        />

        {/* Modal Stage Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full h-full max-h-[calc(100dvh-2.5rem)] sm:max-h-[calc(100vh-3.5rem)] flex items-center justify-center my-auto"
        >
          {/* Realistic iPhone 16 Pro Frame Container - Fluid Responsive for all displays including small laptops */}
          <div className="relative w-auto max-w-[min(410px,calc(100vw-2rem))] h-full max-h-[min(760px,calc(100dvh-3.5rem))] aspect-[410/810] rounded-[36px] min-[400px]:rounded-[44px] sm:rounded-[50px] bg-[#1a1a1e] p-[8px] min-[400px]:p-[10px] sm:p-[12px] shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.2)] border-[3px] min-[400px]:border-4 border-[#2d2d34] flex flex-col shrink-0 select-none">
            
            {/* iPhone Side Hardware Buttons */}
            <div className="absolute -left-[10px] min-[400px]:-left-[14px] sm:-left-[16px] top-[18%] w-[3px] sm:w-[4px] h-[3.8%] bg-[#2d2d34] rounded-l-md" />
            <div className="absolute -left-[10px] min-[400px]:-left-[14px] sm:-left-[16px] top-[23.5%] w-[3px] sm:w-[4px] h-[6.8%] bg-[#2d2d34] rounded-l-md" />
            <div className="absolute -left-[10px] min-[400px]:-left-[14px] sm:-left-[16px] top-[31.5%] w-[3px] sm:w-[4px] h-[6.8%] bg-[#2d2d34] rounded-l-md" />
            <div className="absolute -right-[10px] min-[400px]:-right-[14px] sm:-right-[16px] top-[25%] w-[3px] sm:w-[4px] h-[10%] bg-[#2d2d34] rounded-r-md" />

            {/* Inner Phone Display Screen */}
            <div className="relative w-full h-full rounded-[28px] min-[400px]:rounded-[34px] sm:rounded-[42px] overflow-hidden bg-gradient-to-b from-[#f5d0be] via-[#e1e6f5] to-[#c7e4f5] flex flex-col select-none">
              
              {/* iPhone Status Bar Header */}
              <div className="w-full pt-2 sm:pt-3 px-4 sm:px-7 flex items-center justify-between z-30 font-sans text-[10px] sm:text-xs text-black/80 font-semibold tracking-tight shrink-0">
                <span>11:44</span>
                {/* Dynamic Island Notch */}
                <div className="w-16 sm:w-24 h-3.5 sm:h-5 bg-black rounded-full flex items-center justify-end px-1.5 sm:px-2 gap-1 sm:gap-1.5 shadow-xs">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-black/80">
                  <span>5G</span>
                  <div className="w-4 sm:w-5 h-2 sm:h-2.5 border border-black/80 rounded-xs p-0.5 flex items-center">
                    <div className="w-full h-full bg-black/80 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Close Button Top Right */}
              <button
                onClick={handleClose}
                className="absolute top-7 sm:top-9 right-3.5 sm:right-5 z-40 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-md flex items-center justify-center text-black/80 transition-colors"
              >
                <X size={14} className="sm:w-[16px] sm:h-[16px]" />
              </button>

              {/* Phone Content Screen Scrollable Container */}
              <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-5 py-2 sm:py-4 flex flex-col scrollbar-none">
                
                {/* Glassmorphic Form Card floating inside Phone Screen matching reference screenshot */}
                <div className="w-full my-auto rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/90 p-3.5 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] text-ink">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-2.5">
                      {/* Top Form Header */}
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <LogoMark size={16} className="text-black sm:w-[18px] sm:h-[18px]" />
                          <span className="font-outfit text-[11px] sm:text-xs font-bold tracking-tight text-black">EnactOn</span>
                        </div>
                        <span className="font-mono text-[8px] sm:text-[9px] font-semibold text-black/40 uppercase tracking-widest">Inquiry</span>
                      </div>

                      <div>
                        <h3 className="font-outfit text-base sm:text-lg font-bold text-black tracking-tight leading-tight">
                          {bookingDetails ? "Confirm Session" : "Start a Project"}
                        </h3>
                        {bookingDetails ? (
                          <div className="mt-1 bg-black/5 border border-black/10 rounded-lg p-1.5 sm:p-2 font-outfit text-[10px] sm:text-[11px] text-black font-medium">
                            🗓️ {bookingDetails.date} at {bookingDetails.time}
                          </div>
                        ) : (
                          <p className="font-outfit text-[10px] sm:text-[11px] text-black/60 font-light mt-0.5">
                            Let's build something exceptional together.
                          </p>
                        )}
                      </div>

                      {/* Input: Name */}
                      <div>
                        <label className="block font-outfit text-[9px] sm:text-[10px] font-bold text-black/70 uppercase tracking-wider mb-0.5 sm:mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Keshav Malpani"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/70 border border-black/10 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 font-outfit text-[11px] sm:text-xs text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-colors"
                        />
                      </div>

                      {/* Input: Email */}
                      <div>
                        <label className="block font-outfit text-[9px] sm:text-[10px] font-bold text-black/70 uppercase tracking-wider mb-0.5 sm:mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="keshav@wealthwisdom.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/70 border border-black/10 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 font-outfit text-[11px] sm:text-xs text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-colors"
                        />
                      </div>

                      {/* Input: Phone Number */}
                      <div>
                        <label className="block font-outfit text-[9px] sm:text-[10px] font-bold text-black/70 uppercase tracking-wider mb-0.5 sm:mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/70 border border-black/10 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 font-outfit text-xs text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-colors"
                        />
                      </div>

                      {/* Selector: Service */}
                      <div>
                        <label className="block font-outfit text-[9px] sm:text-[10px] font-bold text-black/70 uppercase tracking-wider mb-0.5 sm:mb-1">
                          Service Needed
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-white/70 border border-black/10 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 font-outfit text-[11px] sm:text-xs text-black focus:outline-none focus:border-black/40 transition-colors"
                        >
                          <option>Web Platform / App</option>
                          <option>Native Mobile App (iOS/Android)</option>
                          <option>Autonomous AI Agent Engine</option>
                          <option>Full Product & Infrastructure</option>
                        </select>
                      </div>

                      {/* Input: Message */}
                      <div>
                        <label className="block font-outfit text-[9px] sm:text-[10px] font-bold text-black/70 uppercase tracking-wider mb-0.5 sm:mb-1">
                          Project Brief
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Tell us about your goal or stack..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-white/70 border border-black/10 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 font-outfit text-[11px] sm:text-xs text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-colors resize-none"
                        />
                      </div>

                      {/* Sleek Black Submit Button */}
                      <button
                        type="submit"
                        className="w-full mt-1 bg-black hover:bg-black/90 text-white font-outfit text-xs font-semibold py-2 sm:py-2.5 px-4 rounded-full shadow-lg transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Send Proposal Request</span>
                        <ArrowRight size={14} />
                      </button>
                    </form>
                  ) : (
                    /* Success Screen */
                    <div className="py-4 sm:py-6 flex flex-col items-center text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-2 sm:mb-3">
                        <Check size={20} className="sm:w-[24px] sm:h-[24px]" strokeWidth={2.5} />
                      </div>
                      <h4 className="font-outfit text-sm sm:text-base font-bold text-black mb-1">
                        Request Received!
                      </h4>
                      <p className="font-outfit text-[11px] sm:text-xs text-black/65 font-light leading-relaxed mb-3 sm:mb-4">
                        Thank you, <strong className="font-semibold text-black">{formData.name}</strong>. Our lead architect will review your project brief and respond within 2 hours.
                      </p>
                      <button
                        onClick={handleClose}
                        className="bg-black text-white font-outfit text-xs font-semibold py-2 sm:py-2.5 px-5 sm:px-6 rounded-full hover:bg-black/80 transition-colors cursor-pointer"
                      >
                        Back to Website
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* iPhone Home Bar Indicator */}
              <div className="w-full pb-1.5 sm:pb-2 flex justify-center shrink-0">
                <div className="w-24 sm:w-32 h-1 bg-black/40 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalElement, document.body);
};

export default ContactModal;
