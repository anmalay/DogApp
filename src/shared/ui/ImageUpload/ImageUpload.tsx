import React, { useState, useRef } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useTranslation } from "react-i18next";
import { CameraIcon, MenuDotsIcon, PawIcon, TrashIcon } from "../icons";
import { BottomDrawer } from "../BottomDrawer";

export interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

interface ImageActionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onSetAsMain: () => void;
}

const ImageActionDrawer: React.FC<ImageActionDrawerProps> = ({
  isOpen,
  onClose,
  onDelete,
  onSetAsMain,
}) => {
  const { t } = useTranslation();

  return (
    <BottomDrawer isOpen={isOpen} onClose={onClose}>
      <div
        className="self-stretch py-3.5 inline-flex justify-start items-center gap-5 cursor-pointer"
        onClick={onSetAsMain}
      >
        <PawIcon />
        <div className="flex-1 justify-start text-gray-700 text-base font-medium font-['Golos_Text']">
          {t("Сделать главным фото профиля")}
        </div>
      </div>
      <div
        className="self-stretch py-3.5 inline-flex justify-start items-center gap-5 cursor-pointer"
        onClick={onDelete}
      >
        <TrashIcon />
        <div className="flex-1 justify-start text-rose-500 text-base font-medium font-['Golos_Text']">
          {t("Удалить фото")}
        </div>
      </div>
    </BottomDrawer>
  );
};

export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onChange,
  maxImages = 4,
}) => {
  const { t } = useTranslation();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = async () => {
    try {
      // Try to use Capacitor camera first (for mobile)
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      });

      if (image.dataUrl) {
        const newImages = [...images, image.dataUrl];
        onChange(newImages);
      }
    } catch (error) {
      console.error(
        "Capacitor camera not available, falling back to file input:",
        error
      );
      // Fallback to file input for web
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          const newImages = [...images, result];
          onChange(newImages);
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset the input so the same file can be selected again
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleImageMenu = (index: number) => {
    setSelectedImageIndex(index);
    setIsDrawerOpen(true);
  };

  const handleDeleteImage = () => {
    if (selectedImageIndex !== null) {
      const newImages = images.filter(
        (_, index) => index !== selectedImageIndex
      );
      onChange(newImages);
    }
    setIsDrawerOpen(false);
    setSelectedImageIndex(null);
  };

  const handleSetAsMain = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      const newImages = [...images];
      const [mainImage] = newImages.splice(selectedImageIndex, 1);
      newImages.unshift(mainImage);
      onChange(newImages);
    }
    setIsDrawerOpen(false);
    setSelectedImageIndex(null);
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="InputCover self-stretch inline-flex flex-col justify-start items-start gap-9">
      <div className="self-stretch justify-start text-gray-700 text-2xl font-bold font-['Golos_Text'] leading-relaxed">
        {t("Добавьте фото собаки")}
      </div>

      {images.length === 0 && canAddMore ? (
        <div
          className="UploadPicture w-80 h-80 px-5 py-6 bg-white rounded-3xl flex flex-col justify-center items-center gap-5 overflow-hidden cursor-pointer"
          onClick={handleImageCapture}
        >
          <CameraIcon />
        </div>
      ) : (
        <div className="Pictures self-stretch rounded-3xl inline-flex justify-start items-start gap-1 flex-wrap content-start">
          {canAddMore && (
            <div
              className="UploadPicture w-44 h-44 px-5 py-6 bg-white rounded-3xl inline-flex flex-col justify-center items-center gap-5 overflow-hidden cursor-pointer"
              onClick={handleImageCapture}
            >
              <CameraIcon />
            </div>
          )}

          {images.map((image, index) => (
            <div
              key={index}
              className="Picture w-44 h-44 relative rounded-3xl overflow-hidden"
            >
              <img
                className="w-44 h-44 left-0 top-0 absolute rounded-3xl object-cover"
                src={image}
                alt={`Dog photo ${index + 1}`}
              />
              <div
                className="BtnRound p-2 left-[131px] top-[68.02px] absolute origin-top-left -rotate-90 bg-white/60 rounded-full inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden cursor-pointer"
                onClick={() => handleImageMenu(index)}
              >
                <MenuDotsIcon />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hidden file input for web fallback */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />

      <ImageActionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onDelete={handleDeleteImage}
        onSetAsMain={handleSetAsMain}
      />
    </div>
  );
};
