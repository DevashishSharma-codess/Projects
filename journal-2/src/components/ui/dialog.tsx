import React from "react";
import { X } from "lucide-react";
import "./dialog.css";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

export function Dialog(props: DialogProps) {

  // Get values from props
  const open = props.open;
  const onOpenChange = props.onOpenChange;
  const title = props.title;
  const children = props.children;

  // Don't show the dialog if open is false
  if (open === false) {
    return null;
  }

  // Function to close the dialog
  function closeDialog() {
    onOpenChange(false);
  }

  // Prevent click inside dialog from reaching the overlay
  function handleDialogClick(event: React.MouseEvent) {
    event.stopPropagation();
  }

  return (
    <div
      className="shadcn-dialog-overlay"
      onClick={closeDialog}
    >

      <div
        className="shadcn-dialog-content"
        onClick={handleDialogClick}
      >

        <div className="shadcn-dialog-header">

          {title ? (
            <h2 className="shadcn-dialog-title">
              {title}
            </h2>
          ) : null}

          <button
            type="button"
            className="shadcn-dialog-close"
            onClick={closeDialog}
          >
            <X size={16} />
          </button>

        </div>

        <div>
          {children}
        </div>

      </div>

    </div>
  );
}