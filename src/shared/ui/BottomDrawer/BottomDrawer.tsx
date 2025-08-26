import React, { useEffect, useState } from 'react';
import { DrawerHandleIcon } from '../icons';

export interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  const handleDrawerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isAnimating ? 'bg-black/30' : 'bg-black/0'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`fixed bottom-0 left-0 right-0 transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={handleDrawerClick}
      >
        <div className="w-full px-5 pt-2.5 pb-10 bg-zinc-100 rounded-tl-2xl rounded-tr-2xl flex flex-col justify-end items-center gap-6 overflow-hidden">
          <div className="self-stretch flex flex-col justify-start items-center gap-7">
            <DrawerHandleIcon />
            <div className="self-stretch flex flex-col justify-start items-start">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};