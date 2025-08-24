import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      document.body.appendChild(root);
    }
    setModalRoot(root);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div className="modal-wrapper" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
