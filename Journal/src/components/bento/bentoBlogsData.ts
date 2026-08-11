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

export const GLASS_BLOGS: MoodGlassBlog[] = [
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
