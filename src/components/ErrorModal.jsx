import { createPortal } from "react-dom";
import MainButton from "./MainButton";
function ErrorModal({ onClose, children }) {
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-[100vh] z-50">
      <div
        className="absolute top-0 left-0 z-50 w-full h-full bg-stone-900/90"
        onClick={onClose}
      />
      <dialog open className="absolute z-50 top-1/2 left-1/2 -translate-1/2 rounded-md p-4 shadow-md">
        {children}
        <form method="dialog" className="text-right mt-8">
          <MainButton onClick={onClose}>Close</MainButton>
        </form>
      </dialog>
    </div>,
    document.getElementById("modal-root")
  );
}
export default ErrorModal;
