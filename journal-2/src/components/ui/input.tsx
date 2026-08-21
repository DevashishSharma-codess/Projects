/**
 * input.tsx - Form Input UI Component
 * 
 * Renders a styled HTML text input with rounded borders, focus states,
 * and adaptive color variables for both dark and light modes.
 */

import React from 'react';
import './input.css';

/**
 * Props for Input component extending standard HTML input attributes.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input Component
 * 
 * Simple, accessible text input element for titles, search, and form entries.
 * 
 * @param className - Optional additional CSS class names
 * @param type - Input type (e.g. 'text', 'password', 'search'), defaults to 'text'
 */
export function Input({ className = '', type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={`shadcn-input ${className}`.trim()}
      {...props}
    />
  );
}
