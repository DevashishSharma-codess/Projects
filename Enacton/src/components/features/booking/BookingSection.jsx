import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { LogoMark } from "../../common/LogoMark";
import { GoogleCalendarModal } from "./GoogleCalendarBooking";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TIME_SLOTS = [
  "09:30 AM", "11:00 AM", "01:30 PM", "03:30 PM", "05:00 PM"
];

const SLIDER_STEPS = [20, 50, 100, 150, 200];

// ALL CALENDAR EVENTS WITH ASSIGNED STEP DENSITY THRESHOLDS (Valley Reference)
const ALL_EVENTS = [
  { day: 15, title: "EnactOn Demo", type: "blue", minStep: 1 },
  { day: 31, title: "Monthly Review", type: "yellow", minStep: 1 },

  { day: 1, title: "Discovery Call", type: "orange", minStep: 2 },
  { day: 8, title: "Demo Call", type: "orange", minStep: 2 },
  { day: 22, title: "Folk Demo", type: "orange", minStep: 2 },

  { day: 2, title: "Architecture Sync", type: "yellow", minStep: 3 },
  { day: 4, title: "Tech Stack Audit", type: "blue", minStep: 3 },
  { day: 11, title: "AI Agent Demo", type: "orange", minStep: 3 },
  { day: 14, title: "Kashiv Demo", type: "orange", minStep: 3 },
  { day: 17, title: "Close / Outline", type: "yellow", minStep: 3 },
  { day: 19, title: "OpenAI RAG Intro", type: "blue", minStep: 3 },
  { day: 24, title: "Product Sprint", type: "yellow", minStep: 3 },
  { day: 25, title: "Growth Team", type: "yellow", minStep: 3 },
  { day: 29, title: "Native Mobile App", type: "blue", minStep: 3 },

  { day: 5, title: "Intro / OpenAI", type: "orange", minStep: 4 },
  { day: 8, title: "Close / Outline", type: "yellow", minStep: 4 },
  { day: 11, title: "Cloud Scale Sync", type: "blue", minStep: 4 },
  { day: 14, title: "Discovery Call", type: "blue", minStep: 4 },
  { day: 19, title: "EnactOn Demo", type: "blue", minStep: 4 },
  { day: 24, title: "Demo Call", type: "blue", minStep: 4 },
  { day: 29, title: "Zaydi / Demo", type: "pink", minStep: 4 },

  { day: 1, title: "Kastor CEO", type: "blue", minStep: 5 },
  { day: 2, title: "Liam / Followup", type: "yellow", minStep: 5 },
  { day: 4, title: "Liam / Followup", type: "yellow", minStep: 5 },
  { day: 20, title: "Jessica / Intro", type: "orange", minStep: 5 },
  { day: 27, title: "Liam / Followup", type: "yellow", minStep: 5 },
  { day: 27, title: "Demo Call", type: "blue", minStep: 5 },
];

export const BookingSection = () => {
  // Real working calendar state starting at July 2026 reference
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1));
  const [selectedDay, setSelectedDay] = useState(15);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("02:00 PM");
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Step index 2 = 100 commits (Valley default)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isGCalOpen, setIsGCalOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // CONTINUOUS STEP-BY-STEP AUTOMATIC MOVING LOOP
  useEffect(() => {
    if (!isAutoPlaying) return;

    let forward = true;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev >= SLIDER_STEPS.length - 1) {
          forward = false;
          return SLIDER_STEPS.length - 2;
        }
        if (prev <= 0) {
          forward = true;
          return 1;
        }
        return forward ? prev + 1 : prev - 1;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentVal = SLIDER_STEPS[activeStepIndex];
  const percent = (activeStepIndex / (SLIDER_STEPS.length - 1)) * 100;
  const rotationAngle = activeStepIndex * 180; // Smooth 180° rotation per step

  // Calculate calendar grid metrics dynamically
  const { daysInMonth, startingDayOfWeek, prevMonthDaysCount } = useMemo(() => {
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    return {
      daysInMonth: daysInCurrentMonth,
      startingDayOfWeek: firstDayOfWeek,
      prevMonthDaysCount: daysInPrevMonth,
    };
  }, [year, month]);

  // Filter active events dynamically based on current step index (1-based)
  const activeStepNum = activeStepIndex + 1;
  const visibleEventsByDay = useMemo(() => {
    const map = {};
    ALL_EVENTS.forEach((evt) => {
      if (evt.minStep <= activeStepNum) {
        if (!map[evt.day]) map[evt.day] = [];
        map[evt.day].push(evt);
      }
    });
    return map;
  }, [activeStepNum]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(1);
  };

  const navigate = useNavigate();

  const handleBookingClick = () => {
    // setIsGCalOpen(true); // Commented meeting modal for now
  };

  return (
    <section
      id="booking"
      data-testid="booking-section"
      className="relative z-10 w-full min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-center bg-paper text-ink py-6 sm:py-8 lg:py-4 pt-16 sm:pt-20 lg:pt-14 border-t border-ink/10 select-none overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(#17130f 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Google Calendar Appointment Scheduling Modal (Commented out for now) */}
      {/* <GoogleCalendarModal
        isOpen={isGCalOpen}
        onClose={() => setIsGCalOpen(false)}
      /> */}

      <div className="max-w-[1480px] mx-auto px-3 sm:px-6 md:px-10 w-full flex flex-col justify-center h-full max-h-full">
        
        {/* Sharp White Rectangular Header Box Tight Wrapper */}
        <div className="flex justify-center mb-2 sm:mb-3.5 shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-fit bg-white border border-black/15 shadow-lg rounded-none px-4 sm:px-8 py-2 sm:py-2.5 flex flex-col items-center text-center max-w-2xl"
          >
            <h2 className="font-outfit text-base sm:text-2xl lg:text-3xl font-normal tracking-tight text-black leading-tight">
              Reserve Your Architecture Sprint
            </h2>
            <p className="mt-0.5 font-outfit text-black/75 text-[9.5px] sm:text-xs font-normal leading-relaxed">
              Reserve a 1-on-1 technical discovery session with our lead software architects.
            </p>
          </motion.div>
        </div>

        {/* 2-Column Split Box Container matching reference screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full border border-black/15 bg-white shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 lg:max-h-[calc(100vh-140px)]"
        >
          
          {/* Left Column (5 Cols): Dark Pitch Black Box (Valley Reference) */}
          <div className="lg:col-span-5 bg-[#09090b] text-white p-4 sm:p-6 lg:p-7 flex flex-col justify-between relative overflow-hidden space-y-4 lg:space-y-0">
            
            {/* Top Content */}
            <div>
              <div className="inline-block border border-white/20 bg-white/5 px-2 py-0.5 text-[8px] sm:text-[9.5px] font-mono font-semibold uppercase tracking-widest text-white/80 mb-3 sm:mb-4">
                YOUR CALENDAR, 30 DAYS FROM NOW
              </div>

              {/* Main Headline */}
              <h3 className="font-outfit text-xl sm:text-3xl lg:text-3xl xl:text-[36px] font-light tracking-tight text-white leading-[1.1] mb-3 sm:mb-5">
                See what EnactOn fills your calendar with.
              </h3>

              {/* Interactive Stepped Progress Bar (Valley Style) */}
              <div className="mb-4 sm:mb-6">
                <div className="font-outfit text-xs sm:text-sm text-white/90 font-light mb-2 sm:mb-3 flex items-center gap-1.5">
                  <span>EnactOn ships</span>
                  <strong className="font-semibold text-white text-xs sm:text-base">{currentVal}</strong>
                  <span>commits & outbounds a day</span>
                </div>

                {/* Range Line Slider with Discrete Step Dots */}
                <div className="relative w-full h-2 bg-white/10 rounded-full flex items-center my-3 sm:my-5">
                  {/* Multi-Color Gradient Active Progress Track Line */}
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#d8f28c] via-[#74c0fc] to-[#ff922b] rounded-full"
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Discrete Step Nodes (5 White Dots) */}
                  {SLIDER_STEPS.map((step, idx) => {
                    const nodePercent = (idx / (SLIDER_STEPS.length - 1)) * 100;
                    return (
                      <button
                        key={step}
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setActiveStepIndex(idx);
                        }}
                        className="absolute w-2 h-2 rounded-full bg-white/90 -ml-1 transition-transform hover:scale-150 cursor-pointer z-10"
                        style={{ left: `${nodePercent}%` }}
                        title={`${step} commits/day`}
                      />
                    );
                  })}

                  {/* Moving Sharp White Square Knob with Transparent Outline (No Glow) */}
                  <motion.div
                    className="absolute w-6 h-6 sm:w-7 sm:h-7 rounded-none bg-white border border-black/20 outline outline-3 outline-white/15 flex items-center justify-center -ml-3 sm:-ml-3.5 z-20 cursor-grab active:scale-110"
                    animate={{
                      left: `${percent}%`,
                      rotate: rotationAngle,
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <LogoMark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black shrink-0" />
                  </motion.div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleBookingClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-none bg-white hover:bg-white/90 text-black px-4 sm:px-5 py-2 sm:py-2.5 font-outfit text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md cursor-pointer mb-3 sm:mb-4"
              >
                <span>Reserve Architecture Call</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Bottom Subtext Paragraph */}
            <p className="font-outfit text-[9.5px] sm:text-xs text-white/60 font-light leading-relaxed border-t border-white/10 pt-2.5 sm:pt-3">
              Most teams using traditional agencies wait 6+ months for a v1. With EnactOn, you ship high-scale AI-native software in 30 days.
            </p>

          </div>

          {/* Right Column (7 Cols): Crisp White Working Calendar (Valley Reference) */}
          <div className="lg:col-span-7 bg-white p-3 sm:p-5 lg:p-6 flex flex-col justify-between overflow-x-hidden">
            
            <div>
              {/* Working Calendar Header with Live Month Navigation */}
              <div className="flex items-center justify-between pb-2 sm:pb-2.5 mb-2 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <h4 className="font-outfit text-lg sm:text-2xl font-normal text-black tracking-tight">
                    {MONTH_NAMES[month]} {year}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-black">
                  <button
                    onClick={handlePrevMonth}
                    title="Previous Month"
                    className="p-1 hover:bg-black/5 border border-black/10 rounded-full transition-colors cursor-pointer active:scale-95 text-black/70"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    title="Next Month"
                    className="p-1 hover:bg-black/5 border border-black/10 rounded-full transition-colors cursor-pointer active:scale-95 text-black/70"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 text-center font-mono text-[8.5px] sm:text-[10.5px] font-semibold text-black/40 uppercase mb-1 sm:mb-1.5">
                {DAYS_OF_WEEK.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              {/* Month Days Dynamic Grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-xs">
                {/* Trailing days from previous month */}
                {Array.from({ length: startingDayOfWeek }).map((_, i) => {
                  const prevDayNum = prevMonthDaysCount - startingDayOfWeek + i + 1;
                  return (
                    <div
                      key={`prev-${i}`}
                      className="p-0.5 sm:p-1 min-h-[34px] sm:min-h-[46px] lg:min-h-[50px] xl:min-h-[54px] border border-black/5 bg-black/[0.01] opacity-35 select-none"
                    >
                      <span className="font-mono text-[8px] sm:text-[9.5px] text-black/40">{prevDayNum}</span>
                    </div>
                  );
                })}

                {/* Days of current active month */}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                  const events = visibleEventsByDay[day] || [];
                  const isSelected = selectedDay === day;

                  return (
                    <div
                      key={day}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setSelectedDay(day);
                      }}
                      className={`p-0.5 sm:p-1 min-h-[34px] sm:min-h-[46px] lg:min-h-[50px] xl:min-h-[54px] border transition-all duration-200 cursor-pointer flex flex-col justify-start overflow-hidden relative ${
                        isSelected
                          ? "border-black bg-black/[0.04] shadow-xs ring-1 sm:ring-2 ring-black/10"
                          : "border-black/10 hover:border-black/40 hover:bg-black/[0.02]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span
                          className={`font-mono text-[8px] sm:text-[10px] font-medium block ${
                            isSelected ? "text-black font-bold" : "text-black/60"
                          }`}
                        >
                          {day}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                        )}
                      </div>

                      {/* Event Pills: Pop in as Knob Advances Across Steps */}
                      <div className="flex flex-col gap-0.5 overflow-hidden max-h-[22px] sm:max-h-[32px] lg:max-h-[36px]">
                        <AnimatePresence>
                          {events.map((evt, idx) => (
                            <motion.div
                              key={evt.title + idx}
                              initial={{ opacity: 0, scale: 0.85, y: -2 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.85 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className={`px-0.5 sm:px-1 py-0.2 sm:py-0.5 rounded-xs text-[6px] sm:text-[7.5px] lg:text-[8.5px] font-semibold truncate leading-tight ${
                                evt.type === "orange"
                                  ? "bg-[#ffe8d6] text-[#c75200]"
                                  : evt.type === "yellow"
                                  ? "bg-[#fff3bf] text-[#8c6d00]"
                                  : evt.type === "pink"
                                  ? "bg-[#ffdeeb] text-[#a61e4d]"
                                  : "bg-[#d0ebff] text-[#1864ab]"
                              }`}
                            >
                              {evt.title}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Time Slots Selector Row */}
              <div className="mt-2 pt-2 border-t border-black/10">
                <span className="block font-outfit text-[9.5px] sm:text-[10.5px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                  Select Time Slot for {MONTH_NAMES[month]} {selectedDay}:
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => {
                        setSelectedTimeSlot(slot);
                        setIsGCalOpen(true);
                      }}
                      className={`px-2 sm:px-2.5 py-0.5 sm:py-1 font-outfit text-[9.5px] sm:text-[10.5px] rounded-md border transition-all cursor-pointer ${
                        selectedTimeSlot === slot
                          ? "bg-black text-white border-black font-medium shadow-xs"
                          : "bg-white text-black/80 border-black/15 hover:border-black/40"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Date & Time Booking Footer */}
            <div className="mt-2 pt-2 border-t border-black/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-outfit">
                <Clock size={13} className="text-black/60 shrink-0" />
                <span className="font-light text-black/70 text-[9.5px] sm:text-xs">
                  Selected: <strong className="font-semibold text-black">{MONTH_NAMES[month]} {selectedDay}, {year} at {selectedTimeSlot}</strong>
                </span>
              </div>
              <button
                onClick={handleBookingClick}
                className="w-full sm:w-auto bg-black hover:bg-black/85 text-white font-outfit text-xs font-semibold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Confirm Time & Book</span>
                <ArrowRight size={13} />
              </button>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default BookingSection;
