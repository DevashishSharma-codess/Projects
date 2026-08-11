import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { LogoMark } from "../../common/LogoMark";

export const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ08BaXRCtnGSSZM8qLs5VTV1lhd5j9wOkiBRFFAD8_93kF6yVHFyT8qgGORaV43Mzfm6CMr5Xmo?gv=true";

export function GoogleCalendarModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "unset";
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const modalElement = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden select-none">
        {/* Backdrop Overlay with Heavy Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-0"
        />

        {/* Modal Window Stage Container - Fully Responsive across Mobile, Laptops, & Monitors */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl h-[92dvh] sm:h-[88vh] max-h-[780px] bg-white rounded-xl min-[400px]:rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_32px_90px_rgba(0,0,0,0.85)] border border-black/15 flex flex-col my-auto"
        >
          {/* Header Bar */}
          <div className="px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-[#09090b] text-white flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <LogoMark size={18} className="text-white sm:w-[20px] sm:h-[20px]" />
              <h3 className="font-outfit text-xs sm:text-base font-semibold text-white tracking-tight leading-tight">
                EnactOn — Architecture Sprint Booking
              </h3>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href={GOOGLE_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-outfit text-[11px] sm:text-xs font-medium transition-colors"
                title="Open in new window"
              >
                <span>Full Screen</span>
                <ExternalLink size={12} />
              </a>

              <button
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close (ESC)"
              >
                <X size={15} className="sm:w-[16px] sm:h-[16px]" />
              </button>
            </div>
          </div>

          {/* Embedded Google Calendar Appointment iFrame */}
          <div className="flex-1 w-full h-full bg-white relative overflow-hidden">
            <iframe
              src={GOOGLE_CALENDAR_URL}
              title="Google Calendar Appointment Scheduling"
              className="w-full h-full border-none"
              style={{ border: 0 }}
              allow="fullscreen"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalElement, document.body);
}

export default GoogleCalendarModal;
