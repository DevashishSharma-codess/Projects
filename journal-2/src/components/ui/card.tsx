/**
 * card.tsx - Composite Card UI Component System
 */

import React from 'react';
import './card.css';


export interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

/**
 * Card Component
 * 
 * Primary glassmorphic container for content blocks across the application.
 */
export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`shadcn-card ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

/**
 * CardHeader Component
 * 
 * Top header row for card titles, badges, and action buttons.
 */
export function CardHeader({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`shadcn-card-header ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

/**
 * CardTitle Component
 * 
 * Standardized typography wrapper for the main card heading.
 */
export function CardTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`shadcn-card-title ${className}`.trim()} {...props}>
      {children}
    </h3>
  );
}

/**
 * CardDescription Component
 * 
 * Secondary subdued text for captions, dates, or card descriptions.
 */
export function CardDescription({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`shadcn-card-description ${className}`.trim()} {...props}>
      {children}
    </p>
  );
}

/**
 * CardContent Component
 * 
 * Container for the inner content and interactive elements within a Card.
 */
export function CardContent({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`shadcn-card-content ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
