// Shadcn UI Dialog component

import * as React from "react";
import { X } from "lucide-react";
import "./dialog.css";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, title, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="shadcn-dialog-overlay" onClick={() => onOpenChange(false)}>
      <div className="shadcn-dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="shadcn-dialog-header">
          {title && <h2 className="shadcn-dialog-title">{title}</h2>}
          <button className="shadcn-dialog-close" onClick={() => onOpenChange(false)}>
            <X size={16} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
