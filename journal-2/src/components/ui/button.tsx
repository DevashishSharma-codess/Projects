/**
 * button.tsx - Reusable Button UI Component
 */

import React from 'react';
import './button.css';

/**
 * Props for customizing the Button appearance and behavior.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function Button({
  className = '',
  variant = 'default',
  size = 'default',
  children,
  ...props
}: ButtonProps) {
  // Map size prop to corresponding CSS class
  const sizeClass = size === 'default' ? 'shadcn-btn-default-size' : `shadcn-btn-${size}`;

  return (
    <button
      className={`shadcn-btn shadcn-btn-${variant} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
