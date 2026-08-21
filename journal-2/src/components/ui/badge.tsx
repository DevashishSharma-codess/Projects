
import React from 'react';
import './badge.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant style */
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function Badge({ className = '', variant = 'default', children, ...props }: BadgeProps) {
  return (
    <div className={`shadcn-badge shadcn-badge-${variant} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
