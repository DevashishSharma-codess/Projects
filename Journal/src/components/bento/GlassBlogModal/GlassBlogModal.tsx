/**
 * Glass Blog Article Modal Reader Component
 * Renders full-screen article view with magazine headers, typography, key takeaways, and reflection prompts.
 */

import React from "react";
import { X, CheckCircle2, Lightbulb } from "lucide-react";
import type { GlassBlogModalProps } from "../types/bento.types";
import "./GlassBlogModal.css";

export const GlassBlogModal: React.FC<GlassBlogModalProps> = ({ selectedBlog, onClose }) => {
    if (!selectedBlog) return null;

    return (
        <div className="glass-blog-modal-overlay" onClick={onClose}>
            <div className="glass-blog-modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Magazine Titlebar Header */}
                <div className="glass-blog-modal-header">
                    <span className="glass-blog-modal-magazine-tag">
                        DOGEAR MAGAZINE • {selectedBlog.category}
                    </span>
                    <button className="glass-blog-modal-close-btn" onClick={onClose}>
                        <X size={16} />
                    </button>
                </div>

                {/* Article Content Scroll Workspace */}
                <div className="glass-blog-modal-content">
                    <div className="glass-blog-modal-meta-row">
                        <span className="glass-blog-modal-date">
                            {selectedBlog.date} • {selectedBlog.readTime} read
                        </span>
                        <span className="glass-blog-modal-category-badge">
                            {selectedBlog.category}
                        </span>
                    </div>

                    <h2 className="glass-blog-modal-title">
                        {selectedBlog.title}
                    </h2>
                    
                    <span className="glass-blog-modal-author">
                        Written by {selectedBlog.author}
                    </span>

                    {/* Hero Feature Image */}
                    <div className="glass-blog-modal-image-wrapper">
                        <img
                            src={selectedBlog.imageUrl}
                            alt={selectedBlog.title}
                            className="glass-blog-modal-image"
                        />
                    </div>

                    {/* Article Intro Paragraph */}
                    <p className="glass-blog-modal-intro">
                        {selectedBlog.content.intro}
                    </p>

                    {/* Pull Quote Block */}
                    {selectedBlog.content.quote && (
                        <blockquote className="glass-blog-modal-quote">
                            <p className="glass-blog-modal-quote-text">
                                "{selectedBlog.content.quote}"
                            </p>
                        </blockquote>
                    )}

                    {/* Content Sections */}
                    {selectedBlog.content.sections.map((section, idx) => (
                        <div key={idx} className="glass-blog-modal-section">
                            <h3 className="glass-blog-modal-section-heading">
                                {section.heading}
                            </h3>
                            <p className="glass-blog-modal-section-body">
                                {section.body}
                            </p>
                        </div>
                    ))}

                    {/* Key Takeaways */}
                    {selectedBlog.content.takeaways && selectedBlog.content.takeaways.length > 0 && (
                        <div className="glass-blog-modal-takeaways-box">
                            <h4 className="glass-blog-modal-takeaways-heading">
                                <CheckCircle2 size={18} color="#10B981" /> Key Takeaways
                            </h4>
                            <ul className="glass-blog-modal-takeaways-list">
                                {selectedBlog.content.takeaways.map((item, i) => (
                                    <li key={i} className="glass-blog-modal-takeaway-item">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Reflection Prompt Box */}
                    {selectedBlog.content.reflectionPrompt && (
                        <div className="glass-blog-modal-prompt-box">
                            <h4 className="glass-blog-modal-prompt-heading">
                                <Lightbulb size={18} color="#F59E0B" /> Journaling Prompt
                            </h4>
                            <p className="glass-blog-modal-prompt-text">
                                "{selectedBlog.content.reflectionPrompt}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
