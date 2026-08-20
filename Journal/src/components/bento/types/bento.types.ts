/**
 * Bento Component Type Definitions
 * Type contracts for Bento Grid components, cards, and modal props.
 */

import type { MoodGlassBlog } from "../data/bentoBlogsData";

/** Props for the GlassBlogModal reader dialog */
export interface GlassBlogModalProps {
    /** Target blog object selected for reading */
    selectedBlog: MoodGlassBlog | null;
    /** Close modal handler */
    onClose: () => void;
}
