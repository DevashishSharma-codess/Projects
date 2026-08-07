import React, { useState, useRef } from "react";
import { Sparkles, X, ArrowRight, CheckCircle2, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";

export interface MoodGlassBlog {
    id: string;
    category: string;
    moodLabel: string;
    title: string;
    subtitle: string;
    readTime: string;
    author: string;
    date: string;
    imageUrl: string;
    content: {
        intro: string;
        quote: string;
        sections: { heading: string; body: string }[];
        takeaways: string[];
        reflectionPrompt: string;
    };
}

const GLASS_BLOGS: MoodGlassBlog[] = [
    {
        id: "radiant-joy",
        category: "Radiant Joy",
        moodLabel: "Joyful & Inspired",
        title: "Hope Dies Last: Sustaining Optimism in Trying Times",
        subtitle: "Cultivating genuine delight to transform how you view daily challenges",
        readTime: "4 min read",
        author: "Dr. Elena Rostova",
        date: "16 March 2026",
        imageUrl: "https://i.pinimg.com/736x/8a/aa/d2/8aaad2a8a462eb118e7adcfd04c10c30.jpg",
        content: {
            intro: "Joy is not merely a passive emotion—it is an active cognitive practice that expands working memory, heightens creative synthesis, and builds long-term psychological resilience.",
            quote: "“Happiness is not a state to arrive at, but a manner of traveling through every ordinary moment.”",
            sections: [
                {
                    heading: "1. Capture Peak Energy in Real-Time",
                    body: "Don't let your golden hours slip by unrecorded. When you feel a surge of optimism, immediately log the exact environmental and cognitive triggers.",
                },
                {
                    heading: "2. Channel Drive into High-Friction Tasks",
                    body: "High positive affect temporarily widens your attentional scope. Use this state to tackle intimidating strategic projects.",
                },
                {
                    heading: "3. Practice Generous Social Amplification",
                    body: "Emotional resonance multiplies when shared. Express genuine appreciation to teammates or loved ones.",
                },
            ],
            takeaways: [
                "Document peak positive moments to map your personal happiness triggers.",
                "Direct peak drive toward intimidating strategic goals.",
                "Amplify joy by offering unexpected, genuine praise to others.",
            ],
            reflectionPrompt: "What single breakthrough project can I initiate right now while my energy is at its absolute peak?",
        },
    },
    {
        id: "deep-flow",
        category: "Deep Flow",
        moodLabel: "Focused & Clear",
        title: "Don't Close Your Eyes: The Architecture of Deep Focus",
        subtitle: "Designing personal workflows that withstand high cognitive loads",
        readTime: "5 min read",
        author: "Marcus Vance",
        date: "15 March 2026",
        imageUrl: "https://i.pinimg.com/1200x/1a/3f/cc/1a3fccc012899b4eed42d340f5617b89.jpg",
        content: {
            intro: "Deep flow is the state where time disappears, focus turns effortless, and complex problem-solving feels like second nature.",
            quote: "“Focus is a muscle built not by forcing attention, but by systematically removing distractions.”",
            sections: [
                {
                    heading: "1. Eliminate Context Switching",
                    body: "Every notification or app switch carries a cognitive penalty. Research shows it takes up to 22 minutes to regain full focus after an interruption.",
                },
                {
                    heading: "2. Establish Challenge-Skill Balance",
                    body: "Flow states occur in the precise corridor between anxiety and boredom. Break large tasks into 20-minute micro-milestones.",
                },
                {
                    heading: "3. Implement Ritualized Shutdown Ceremonies",
                    body: "End deep work blocks with an explicit log of where you left off. Externalize incomplete tasks onto paper.",
                },
            ],
            takeaways: [
                "Guard 90-minute uninterrupted focus blocks daily.",
                "Balance challenge difficulty with immediate 20-minute micro-milestones.",
            ],
            reflectionPrompt: "What is the single biggest distraction I need to eliminate right now?",
        },
    },
    {
        id: "serenity",
        category: "Serenity",
        moodLabel: "Peaceful & Calm",
        title: "The Best Art Museums of Mindful Evening Calm",
        subtitle: "How to process daily experiences with gentle mindfulness before rest",
        readTime: "3 min read",
        author: "Aria Sterling",
        date: "14 March 2026",
        imageUrl: "https://i.pinimg.com/736x/f3/0b/0b/f30b0b4acd7ba76e5cce8321fcced02b.jpg",
        content: {
            intro: "Serenity is not the absence of busyness, but the presence of internal clarity amidst life's demands. Evening reflection helps process emotions.",
            quote: "“Peace comes from within. Do not seek it without when your own breath holds the answer.”",
            sections: [
                {
                    heading: "1. The 3-Item Gratitude Anchor",
                    body: "Before closing your day, write down three specific moments that brought peace—a warm cup of tea or a quiet walk.",
                },
                {
                    heading: "2. Unpack Mental Clutter",
                    body: "Write an uncensored brain dump on paper to signal to your brain that it no longer needs to hold onto worries overnight.",
                },
            ],
            takeaways: [
                "Practice 3 specific gratitude logs before sleep.",
                "Externalize worries through evening brain-dumps.",
            ],
            reflectionPrompt: "What is one small quiet moment from today that I am truly grateful for?",
        },
    },
    {
        id: "high-drive",
        category: "High Drive",
        moodLabel: "Energetic & Driven",
        title: "The Devil is in the Details: Channeling Raw Motivation",
        subtitle: "Turning raw motivation into long-term strategic breakthroughs",
        readTime: "4 min read",
        author: "Kaito Tanaka",
        date: "12 March 2026",
        imageUrl: "https://i.pinimg.com/1200x/d9/66/d7/d966d70f1103931ae53480b7379c1e94.jpg",
        content: {
            intro: "High energy is a powerful force. Directed with precision, it powers monumental breakthroughs and rapid skill growth.",
            quote: "“Drive gets you started; disciplined systems keep you moving when excitement wears off.”",
            sections: [
                {
                    heading: "1. Harness Burst Sprinting",
                    body: "When motivation is surging, execute high-intensity 45-minute sprints. Focus on tangible execution without second-guessing.",
                },
                {
                    heading: "2. Filter New Commitments",
                    body: "Filter new ideas through your top 3 quarterly priorities before taking on new responsibilities.",
                },
            ],
            takeaways: [
                "Execute focused 45-minute output sprints.",
                "Filter new ideas through core priorities.",
            ],
            reflectionPrompt: "Which primary project will receive 100% of my high energy today?",
        },
    },
    {
        id: "self-grace",
        category: "Self Grace",
        moodLabel: "Rest & Recovery",
        title: "An Indestructible Hope: Navigating Low Energy Days",
        subtitle: "Giving yourself permission to rest is the fastest path back to strength",
        readTime: "5 min read",
        author: "David Chen",
        date: "10 March 2026",
        imageUrl: "https://i.pinimg.com/1200x/a3/7c/25/a37c25f5d0bc95dca22b09e53c235f43.jpg",
        content: {
            intro: "Having low energy or a down mood is not a personal failure—it is your body and mind signalling a vital need for rest.",
            quote: "“Rest is not a reward for work completed; it is a fundamental requirement for life.”",
            sections: [
                {
                    heading: "1. Drop Self-Judgment",
                    body: "Accept today as a low-tide day. Tides naturally recede before flowing back in. Release guilt about reduced output.",
                },
                {
                    heading: "2. Practice Micro-Actions of Comfort",
                    body: "Set the bar low. Hydrate with warm water, sit in natural sunlight for 10 minutes, or take a short gentle stroll.",
                },
            ],
            takeaways: [
                "Release secondary guilt and accept low energy as a natural rest cycle.",
                "Prioritize small physical comforts.",
            ],
            reflectionPrompt: "How can I give myself permission to rest today without feeling guilty?",
        },
    },
    {
        id: "calm-mind",
        category: "Calm Mind",
        moodLabel: "Stress Relief",
        title: "De-escalating Stress & High-Pressure Resilience",
        subtitle: "5 rapid grounding techniques to soothe your nervous system under demand",
        readTime: "4 min read",
        author: "Sarah Jenkins",
        date: "08 March 2026",
        imageUrl: "https://i.pinimg.com/736x/0d/68/b9/0d68b943c517e6d06a8b64846383928a.jpg",
        content: {
            intro: "Stress is your body's natural response to perceived demands exceeding current capacity. Effective tools soothe your nervous system.",
            quote: "“You don't have to control your thoughts; you just have to stop letting them control you.”",
            sections: [
                {
                    heading: "1. The Physiological Sigh",
                    body: "Take two quick sniffs through your nose, followed by a long exhale through your mouth.",
                },
                {
                    heading: "2. Shrink Your Horizon",
                    body: "Focus strictly on the absolute next 5-minute action, ignoring everything else.",
                },
            ],
            takeaways: [
                "Use physiological sighs to calm your body in seconds.",
                "Focus on the next 5-minute action.",
            ],
            reflectionPrompt: "What is one task I can safely delegate or drop today?",
        },
    },
    {
        id: "inner-stillness",
        category: "Inner Stillness",
        moodLabel: "Daily Reflection",
        title: "Daily Journaling Canvas & Mental Clarity",
        subtitle: "How daily written reflection reduces cognitive load and sharpens focus",
        readTime: "4 min read",
        author: "Aria Sterling",
        date: "06 March 2026",
        imageUrl: "https://i.pinimg.com/1200x/27/19/75/2719756e4f518acf5f3ad1c27e605c6b.jpg",
        content: {
            intro: "Journaling is a cognitive mirror. Externalizing thoughts clarifies emotion and creates room for inspired action.",
            quote: "“The unexamined life leaves wisdom on the table; writing brings it to light.”",
            sections: [
                {
                    heading: "1. Morning Stream of Consciousness",
                    body: "Write 3 unedited pages to dump morning mental static before checking email or notifications.",
                },
            ],
            takeaways: ["Dump morning mental static to lock in focus."],
            reflectionPrompt: "What emotion is asking for my attention right now?",
        },
    },
];

import { useJournal } from "../context/JournalContext";

export default function BentoArchive() {
    const {
        bentoActiveIndex: activeIndex,
        setBentoActiveIndex: setActiveIndex,
        selectedBlog,
        setSelectedBlog,
    } = useJournal();

    const [winWidth, setWinWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
    const containerRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleResize = () => setWinWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const activeBlog = GLASS_BLOGS[activeIndex] || GLASS_BLOGS[2];

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % GLASS_BLOGS.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + GLASS_BLOGS.length) % GLASS_BLOGS.length);
    };


    const isMobile = winWidth < 640;

    return (
        <section
            id="bento-archive"
            style={{
                position: "relative",
                background: "transparent",
                padding: isMobile ? "60px 16px 80px 16px" : "90px 24px 110px 24px",
                width: "100%",
                margin: 0,
                overflow: "hidden",
                color: "#0F172A",
            }}
        >
            <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
                
                {/* 3D CIRCULAR DOME ARCH CAROUSEL */}
                <div
                    ref={containerRef}
                    style={{
                        position: "relative",
                        height: isMobile ? 320 : 440,
                        width: "100%",
                        maxWidth: 1140,
                        margin: "0 auto 20px auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* Floating Glass Prev / Next Controls */}
                    <button
                        onClick={handlePrev}
                        style={{
                            position: "absolute",
                            left: isMobile ? 4 : 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 130,
                            border: "1px solid rgba(255, 255, 255, 0.8)",
                            background: "rgba(255, 255, 255, 0.75)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            color: "#0F172A",
                            width: isMobile ? 40 : 50,
                            height: isMobile ? 40 : 50,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
                            transition: "transform 0.2s ease",
                        }}
                        title="Previous Drop Card"
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.08)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
                    >
                        <ChevronLeft size={isMobile ? 20 : 24} />
                    </button>

                    <button
                        onClick={handleNext}
                        style={{
                            position: "absolute",
                            right: isMobile ? 4 : 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 130,
                            border: "1px solid rgba(255, 255, 255, 0.8)",
                            background: "rgba(255, 255, 255, 0.75)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            color: "#0F172A",
                            width: isMobile ? 40 : 50,
                            height: isMobile ? 40 : 50,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
                            transition: "transform 0.2s ease",
                        }}
                        title="Next Drop Card"
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.08)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
                    >
                        <ChevronRight size={isMobile ? 20 : 24} />
                    </button>

                    {/* ROTATIONAL CIRCULAR DOME ARCH TRACK */}
                    {GLASS_BLOGS.map((blog, idx) => {
                        const total = GLASS_BLOGS.length;
                        let offset = idx - activeIndex;

                        if (offset > total / 2) offset -= total;
                        if (offset < -total / 2) offset += total;

                        const isCenter = offset === 0;

                        const angleStep = isMobile ? 26 : 20;
                        const angleDeg = offset * angleStep;
                        const angleRad = (angleDeg * Math.PI) / 180;

                        const radiusX = Math.min(460, Math.max(120, (winWidth - 80) * 0.36));
                        const radiusY = Math.min(170, Math.max(70, (winWidth - 80) * 0.12));

                        const posX = Math.sin(angleRad) * radiusX;
                        const posY = (1 - Math.cos(angleRad)) * radiusY;

                        const rotation = angleDeg;
                        const scale = isCenter ? 1.2 : Math.max(0.78, 1.08 - Math.abs(offset) * 0.08);
                        const opacity = Math.abs(offset) > 2 ? 0 : Math.max(0.5, 1 - Math.abs(offset) * 0.16);
                        const zIndex = 100 - Math.abs(offset) * 10;

                        const cardWidth = isCenter ? (isMobile ? 155 : 215) : (isMobile ? 125 : 175);
                        const cardHeight = isCenter ? (isMobile ? 215 : 285) : (isMobile ? 170 : 235);

                        return (
                            <div
                                key={blog.id}
                                onClick={() => {
                                    setActiveIndex(idx);
                                    if (isCenter) setSelectedBlog(blog);
                                }}
                                style={{
                                    position: "absolute",
                                    width: cardWidth,
                                    height: cardHeight,
                                    borderRadius: 32,
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    transform: `translate3d(${posX}px, ${posY}px, 0px) rotate(${rotation}deg) scale(${scale})`,
                                    opacity: opacity,
                                    zIndex: zIndex,
                                    boxShadow: isCenter
                                        ? "0 30px 70px rgba(15, 23, 42, 0.25)"
                                        : "0 14px 35px rgba(15, 23, 42, 0.12)",
                                    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                                    border: isCenter ? "4px solid #FFFFFF" : "2px solid rgba(255, 255, 255, 0.75)",
                                    pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                                }}
                            >
                                {/* Full Cover Pinterest Image */}
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.category}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        transform: isCenter ? "scale(1.06)" : "scale(1)",
                                        transition: "transform 0.4s ease",
                                    }}
                                />

                                {/* Dark Gradient Overlay */}
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, transparent 60%)" }} />

                                {/* Category Name Glass Pill Tag */}
                                <div style={{ position: "absolute", bottom: 18, left: 12, right: 12, textAlign: "center" }}>
                                    <span
                                        style={{
                                            fontSize: isCenter ? 12 : 10.5,
                                            fontWeight: 800,
                                            color: "#FFFFFF",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                            fontFamily: "'Outfit', sans-serif",
                                            background: "rgba(15, 23, 42, 0.55)",
                                            backdropFilter: "blur(12px)",
                                            WebkitBackdropFilter: "blur(12px)",
                                            padding: "6px 14px",
                                            borderRadius: 999,
                                            border: "1px solid rgba(255, 255, 255, 0.45)",
                                            display: "inline-block",
                                            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.3)",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "100%",
                                        }}
                                    >
                                        {blog.category}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* MAIN ELEGANT HEADLINE CENTERED BELOW THE ARCH */}
                <div style={{ position: "relative", zIndex: 110, marginTop: 10 }}>
                    <h2
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(38px, 5.5vw, 62px)",
                            lineHeight: 1.08,
                            color: "#0F172A",
                            letterSpacing: "-0.03em",
                            maxWidth: 820,
                            margin: "0 auto 12px auto",
                        }}
                    >
                        Explore Mindset &{" "}
                        <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "#0F172A" }}>
                            Mood Collections.
                        </span>
                    </h2>

                    <p
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            color: "#475569",
                            fontSize: "clamp(14px, 1.5vw, 17px)",
                            maxWidth: 600,
                            margin: "0 auto 26px auto",
                            lineHeight: 1.5,
                            fontWeight: 500,
                        }}
                    >
                        Transform your daily reflection with curated wisdom and mood-driven guidance.
                    </p>

                    {/* Start Reading Action Pill Button */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
                        <button
                            onClick={() => setSelectedBlog(activeBlog)}
                            style={{
                                border: "none",
                                background: "#0F172A",
                                color: "#FFFFFF",
                                fontSize: 14.5,
                                fontWeight: 700,
                                padding: "13px 32px",
                                borderRadius: 999,
                                cursor: "pointer",
                                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.2)",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                transition: "transform 0.2s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            <span>Read {activeBlog.category} Article</span>
                            <ArrowRight size={17} />
                        </button>
                    </div>

                    {/* Active Mood Category Indicator */}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255, 255, 255, 0.7)", padding: "7px 18px", borderRadius: 999, border: "1px solid rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10px)" }}>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            Selected Drop • {activeBlog.category} ({activeBlog.moodLabel})
                        </span>
                    </div>
                </div>
            </div>

            {/* FYRRE MAGAZINE EDITORIAL READER MODAL WINDOW WITH SUBTLE SKY-BLUE TINT */}
            {selectedBlog && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        background: "rgba(15, 23, 42, 0.75)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "24px",
                    }}
                    onClick={() => setSelectedBlog(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: "100%",
                            maxWidth: 880,
                            maxHeight: "90vh",
                            background: "linear-gradient(180deg, #EBF5FE 0%, #F0F7FF 40%, #F8FAFC 100%)", // Subtle sky-blue tinted light background!
                            borderRadius: 28,
                            border: "2px solid #0F172A",
                            boxShadow: "0 30px 90px rgba(15, 23, 42, 0.35)",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            animation: "modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        {/* Header Bar with Sky-Blue Tint */}
                        <div
                            style={{
                                padding: "20px 36px",
                                borderBottom: "2px solid #0F172A",
                                background: "linear-gradient(135deg, #BAE6FD 0%, #E0F2FE 100%)", // Signature sky-blue header tint!
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <span style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0F172A" }}>
                                DOGEAR MAGAZINE • {selectedBlog.category}
                            </span>
                            <button
                                onClick={() => setSelectedBlog(null)}
                                style={{
                                    border: "1.5px solid #0F172A",
                                    background: "#0F172A",
                                    color: "#FFFFFF",
                                    width: 34,
                                    height: 34,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Article Scroll Body */}
                        <div style={{ padding: "40px 48px", overflowY: "auto", flex: 1, color: "#0F172A" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                <span style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "#475569" }}>
                                    {selectedBlog.date} • {selectedBlog.readTime} read
                                </span>
                                <span style={{ border: "1px solid #0F172A", background: "#E0F2FE", color: "#0F172A", padding: "3px 12px", borderRadius: 999, fontSize: 11, fontWeight: 800, textTransform: "uppercase" }}>
                                    {selectedBlog.category}
                                </span>
                            </div>

                            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 900, margin: "0 0 14px 0", lineHeight: 1.15, letterSpacing: "-0.03em" }}>
                                {selectedBlog.title}
                            </h2>
                            
                            <span style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 28, color: "#334155" }}>
                                Written by {selectedBlog.author}
                            </span>

                            {/* B&W Hero Fine Art Image */}
                            <div style={{ width: "100%", height: 340, borderRadius: 16, overflow: "hidden", marginBottom: 32, border: "2px solid #0F172A" }}>
                                <img
                                    src={selectedBlog.imageUrl}
                                    alt={selectedBlog.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        filter: "grayscale(100%) contrast(115%)",
                                    }}
                                />
                            </div>

                            {/* Quote Box with Sky-Blue Accent */}
                            <div style={{ borderLeft: "4px solid #2563EB", background: "rgba(224, 242, 254, 0.6)", padding: "18px 24px", borderRadius: "0 16px 16px 0", marginBottom: 32 }}>
                                <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 23, margin: 0, color: "#0F172A", lineHeight: 1.4 }}>
                                    {selectedBlog.content.quote}
                                </p>
                            </div>

                            {/* Intro */}
                            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16.5, lineHeight: 1.8, color: "#334155", marginBottom: 36 }}>
                                {selectedBlog.content.intro}
                            </p>

                            {/* Article Sections */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 28, marginBottom: 36 }}>
                                {selectedBlog.content.sections.map((sec, idx) => (
                                    <div key={idx} style={{ borderTop: "1px solid #CBD5E1", paddingTop: 22 }}>
                                        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 21, fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                                            {sec.heading}
                                        </h3>
                                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15.5, lineHeight: 1.75, color: "#334155", margin: 0 }}>
                                            {sec.body}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Key Takeaways Box in Sky-Blue Light Tint */}
                            <div style={{ background: "#F0F9FF", border: "1.5px solid #0F172A", borderRadius: 20, padding: "28px", marginBottom: 30 }}>
                                <span style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 14, color: "#2563EB" }}>
                                    Key Mindset Takeaways
                                </span>
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    {selectedBlog.content.takeaways.map((point, pIdx) => (
                                        <div key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                            <CheckCircle2 size={17} color="#2563EB" style={{ marginTop: 2, flexShrink: 0 }} />
                                            <span style={{ fontSize: 15, color: "#0F172A", fontWeight: 700 }}>{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reflection Prompt in Deep Navy */}
                            <div style={{ background: "#0F172A", color: "#F0F9FF", borderRadius: 20, padding: "26px 30px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <Lightbulb size={18} color="#38BDF8" />
                                    <span style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#38BDF8" }}>
                                        Journal Reflection Prompt
                                    </span>
                                </div>
                                <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 21, margin: 0, lineHeight: 1.4 }}>
                                    "{selectedBlog.content.reflectionPrompt}"
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer Bar */}
                        <div style={{ padding: "18px 36px", borderTop: "2px solid #0F172A", background: "linear-gradient(135deg, #BAE6FD 0%, #E0F2FE 100%)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>
                                Dogear Editorial • Issue 2026
                            </span>
                            <button
                                onClick={() => setSelectedBlog(null)}
                                style={{
                                    border: "none",
                                    background: "#0F172A",
                                    color: "#FFFFFF",
                                    fontSize: 13,
                                    fontWeight: 800,
                                    padding: "9px 24px",
                                    borderRadius: 999,
                                    cursor: "pointer",
                                }}
                            >
                                Close Article
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
