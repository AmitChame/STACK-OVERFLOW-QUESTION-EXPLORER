import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function Toast({ toast, onDismiss }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="toast-icon-svg success" />,
    error: <AlertCircle size={18} className="toast-icon-svg error" />,
    info: <Info size={18} className="toast-icon-svg info" />
  };

  return (
    <div className={`toast-notification ${toast.type || "info"}`} role="status">
      {icons[toast.type] || icons.info}
      <span className="toast-message-text">{toast.message}</span>
      <button
        type="button"
        className="toast-dismiss-btn"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        <X size={15} />
      </button>
    </div>
  );
}

export default Toast;
