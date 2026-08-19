/**
 * Bento Grid Memory Vault Article Data
 * Curated article collection rendered inside the BentoArchive grid and GlassBlogModal reader.
 */

import type { MoodGlassBlog } from "../../types/journal";
export type { MoodGlassBlog };

/** Seed collection of Bento Box blog articles */
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
            intro: "Evening reflection transforms raw daily experiences into lasting personal wisdom. Taking ten quiet minutes to unwind releases cognitive tension.",
            quote: "“Peace is not the absence of noise, but the presence of quiet clarity within.”",
            sections: [
                {
                    heading: "1. Create a Sensory Transition Buffer",
                    body: "Dim overhead lighting 45 minutes before sleep and disconnect from bright screens to signal wind-down time.",
                },
                {
                    heading: "2. The 'Brain Dump' Release Technique",
                    body: "Write down lingering tomorrow to-dos without trying to solve them tonight.",
                },
            ],
            takeaways: [
                "Establish a dedicated 15-minute screen-free wind-down ritual.",
                "Externalize lingering worries onto paper to empty working memory before sleep.",
            ],
            reflectionPrompt: "What experience today challenged me, and what gentle wisdom can I take away from it?",
        },
    },
    {
        id: "resilience",
        category: "Resilience",
        moodLabel: "Steady & Strong",
        title: "Navigating High-Pressure Spikes Without Burnout",
        subtitle: "Tactical mindfulness strategies for maintaining clarity under stress",
        readTime: "6 min read",
        author: "Siddharth Mehta",
        date: "12 March 2026",
        imageUrl: "https://i.pinimg.com/736x/21/2e/0f/212e0f2f354921f00885e35e3ca44199.jpg",
        content: {
            intro: "Stress is an inevitable physical response to demanding goals. Learning to regulate your nervous system in real-time allows you to remain calm under pressure.",
            quote: "“Between stimulus and response there is a space. In that space is our power to choose our response.”",
            sections: [
                {
                    heading: "1. The Physiological Sigh",
                    body: "Take two quick inhales through the nose followed by a long, slow exhale through the mouth to immediately decrease heart rate.",
                },
                {
                    heading: "2. Separate Facts from Narrative",
                    body: "Differentiate between objective events and the catastrophizing stories your mind invents.",
                },
            ],
            takeaways: [
                "Use 1-minute physiological sigh breathing to calm immediate stress spikes.",
                "Write out objective facts versus speculative anxieties.",
            ],
            reflectionPrompt: "What is one aspect of this challenging situation that remains completely under my direct control?",
        },
    },
    {
        id: "vitality",
        category: "Vitality",
        moodLabel: "Energized & Motivated",
        title: "The Art of High-Energy Morning Routines",
        subtitle: "Kickstart your day with purpose, physical movement, and clear intentions",
        readTime: "4 min read",
        author: "Nora Chen",
        date: "10 March 2026",
        imageUrl: "https://i.pinimg.com/736x/8a/aa/d2/8aaad2a8a462eb118e7adcfd04c10c30.jpg",
        content: {
            intro: "Morning routines set the emotional and energetic trajectory for the entire day. Designing an intentional morning workflow builds momentum before noise enters.",
            quote: "“The morning hour has gold in its mouth.”",
            sections: [
                {
                    heading: "1. Hydrate Before Caffeine",
                    body: "Drink 500ml of water immediately upon waking to rehydrate cellular systems before consuming coffee.",
                },
                {
                    heading: "2. Early Natural Sunlight Exposure",
                    body: "Get 10 minutes of direct morning sunlight to anchor your circadian rhythm and boost daytime alertness.",
                },
            ],
            takeaways: [
                "Prioritize hydration and early sunlight before opening digital devices.",
                "Write down your single highest-priority task before checking messages.",
            ],
            reflectionPrompt: "What morning habit brings me the greatest sense of calm and daily momentum?",
        },
    },
];
