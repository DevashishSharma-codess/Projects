// Shadcn UI Button component

import * as React from "react";
import "./button.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const sizeClass = size === "default" ? "shadcn-btn-default-size" : `shadcn-btn-${size}`;
    const classNames = `shadcn-btn shadcn-btn-${variant} ${sizeClass} ${className}`;
    return <button className={classNames} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";
