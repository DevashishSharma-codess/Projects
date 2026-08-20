// Daily Inspirational Quote component with EnactOn-inspired glassmorphism.

import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Loader } from '../../components/Loader';
import { fetchDailyQuote } from '../../services/quotes';
import type { Quote } from '../../types';
import './QuoteCard.css';

// Sharp Boxy Double Quote Mark Icon (EnactOn inspo)
const BoxyQuoteMark: React.FC = () => (
  <svg
    viewBox="0 0 64 64"
    fill="currentColor"
    className="boxy-quote-icon"
  >
    <path d="M8 12h18v22H18v14H8V34h10V12H8z" />
    <path d="M38 12h18v22H48v14H38V34h10V12H38z" />
  </svg>
);

export const QuoteCard: React.FC = () => {
  const [quoteData, setQuoteData] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadQuote() {
      setLoading(true);
      const data = await fetchDailyQuote();
      setQuoteData(data);
      setLoading(false);
    }

    loadQuote();
  }, []);

  if (loading) {
    return (
      <Card className="quote-card">
        <Loader />
      </Card>
    );
  }

  return (
    <Card className="quote-card">
      <div className="quote-card-glow" />
      <div className="quote-content">
        <BoxyQuoteMark />
        <h3 className="quote-text">{quoteData?.quote}</h3>

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
