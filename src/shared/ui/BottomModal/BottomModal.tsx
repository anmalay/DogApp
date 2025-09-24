import React, { useRef, useState } from "react";
import { IonModal } from "@ionic/react";
import "./BottomModal.module.css";

export interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  buttons?: React.ReactNode;
  showHandle?: boolean;
  className?: string;
}

export const BottomModal: React.FC<BottomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  buttons,
  showHandle = true,
  className = "",
}) => {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = endY - startY;
    
    if (deltaY > 50) {
      onClose();
    }
  };

  return (
    <IonModal
      ref={modalRef}
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={[0, 1]}
      initialBreakpoint={1}
      showBackdrop={true}
      backdropDismiss={true}
      handle={false}
      className={`bottom-modal ${className}`}
    >
      <div className="w-full px-5 pt-2.5 pb-10 bg-zinc-100 rounded-tl-2xl rounded-tr-2xl flex flex-col items-center gap-6" style={{borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}>
        <div className="self-stretch flex flex-col justify-start items-center gap-7">
          {showHandle && (
            <div 
              className="cursor-pointer"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <svg width="58" height="4" viewBox="0 0 58 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" width="57" height="4" rx="2" fill="#E4E5E9"/>
              </svg>
            </div>
          )}
          
          <div className="Content self-stretch flex flex-col justify-start items-start gap-6">
            {title && (
              <div className="Top self-stretch inline-flex justify-start items-start gap-2.5">
                <div className="Text flex-1 inline-flex flex-col justify-start items-start gap-[5px]">
                  <div className="self-stretch justify-start text-gray-700 text-2xl font-bold font-['Golos_Text'] leading-relaxed">
                    {title}
                  </div>
                </div>
              </div>
            )}
            
            {children}
          </div>
        </div>
        
        {buttons && (
          <div className="Buttons self-stretch inline-flex justify-center items-start gap-2.5">
            {buttons}
          </div>
        )}
      </div>
    </IonModal>
  );
};