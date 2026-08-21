/**
 * QuoteCard.tsx - Daily Inspirational Reflection Card Component
 * 
 * Responsibilities:
 * - Asynchronously loads the daily motivational quote via fetchDailyQuote service.
 * - Displays a loading spinner (Loader) while data is being retrieved.
 * - Renders a stylized quote block with author attribution and aesthetic quote mark SVG.
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Loader } from '../../components/Loader';
import { fetchDailyQuote } from '../../services/quotes';
import type { Quote } from '../../types';
import './QuoteCard.css';

/**
 * BoxyQuoteMark Component
 * 
 * SVG icon representing quotation marks for the quote card header.
 */
const BoxyQuoteMark: React.FC = () => (
  <svg
    viewBox="0 0 64 64"
    fill="currentColor"
    className="boxy-quote-icon"
    aria-hidden="true"
  >
    <path d="M8 12h18v22H18v14H8V34h10V12H8z" />
    <path d="M38 12h18v22H48v14H38V34h10V12H38z" />
  </svg>
);

/**
 * QuoteCard Component
 * 
 * Fetches and displays the daily quote.
 */
export const QuoteCard: React.FC = () => {
  // State for fetched quote data
  const [quoteData, setQuoteData] = useState<Quote | null>(null);
  // State for quote loading status
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Effect: Fetch quote once upon component mounting.
   */
  useEffect(() => {
    async function loadQuote() {
      setLoading(true);
      const data = await fetchDailyQuote();
      setQuoteData(data);
      setLoading(false);
    }

    loadQuote();
  }, []);

  // Show loading spinner while fetching
  if (loading) {
    return (
      <Card className="quote-card">
        <Loader />
      </Card>
    );
  }

  // Render populated quote card
  return (
    <Card className="quote-card">
      <div className="quote-card-glow" />
      <div className="quote-content">
        <BoxyQuoteMark />
        <h3 className="quote-text">{quoteData?.quote}</h3>

        {/* Author information row */}
        <div className="quote-author-row">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt={quoteData?.author || 'Author'}
            className="quote-author-avatar"
          />
          <div className="quote-author-info">
            <span className="quote-author-name">{quoteData?.author}</span>
            <span className="quote-author-role">Daily Reflection</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
