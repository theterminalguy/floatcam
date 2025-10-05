import { AlertCircle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ isOpen, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <div className="confirm-dialog-icon">
          <AlertCircle size={48} strokeWidth={1.5} />
        </div>
        <h2 className="confirm-dialog-title">Exit Floatcam?</h2>
        <p className="confirm-dialog-message">
          Are you sure you want to close Floatcam? All windows will be closed.
        </p>
        <div className="confirm-dialog-buttons">
          <button className="confirm-dialog-button cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-dialog-button confirm" onClick={onConfirm}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
