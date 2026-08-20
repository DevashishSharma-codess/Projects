// Shadcn UI Input component

import * as React from "react";
import "./input.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`shadcn-input ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
