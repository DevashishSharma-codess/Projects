// Shadcn UI Badge component

import * as React from "react";
import "./badge.css";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  return (
    <div className={`shadcn-badge shadcn-badge-${variant} ${className}`} {...props} />
  );
}
