import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { IonImg, IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { Input, BottomModal, DatePicker, Text, Button } from "@shared/ui";
import { CameraIcon } from "@shared/ui/icons";
import { DogProfileData, StepErrors } from "../../model/types";

interface OwnerInfoStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const OwnerInfoStep: React.FC<OwnerInfoStepProps> = ({
  data,
  errors,
  onUpdate,
}) => {
  const { t } = useTranslation();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const getInitialDate = () => {
    if (data.owner.birth_date) {
      const date = new Date(data.owner.birth_date);
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
    }
    // Default to today's date
    const today = new Date();
    return {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };
  };

  const [selectedDate, setSelectedDate] = useState(getInitialDate());

  const handleOwnerUpdate = (field: string, value: string) => {
    onUpdate({
      owner: {
        ...data.owner,
        [field]: value,
      },
    });
  };

  const handleImageCapture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      });

      if (image.dataUrl) {
        handleOwnerUpdate("photo", image.dataUrl);
      }
    } catch (error) {
      // Silently fail if camera not available
    }
  };

  const handleDeletePhoto = () => {
    handleOwnerUpdate("photo", "");
  };

  const handleDateChange = (date: {
    day: number;
    month: number;
    year: number;
  }) => {
    setSelectedDate(date);
  };

  const handleDateSave = () => {
    const dateString = `${selectedDate.year}-${selectedDate.month
      .toString()
      .padStart(2, "0")}-${selectedDate.day.toString().padStart(2, "0")}`;
    handleOwnerUpdate("birth_date", dateString);
    setIsDatePickerOpen(false);
  };

  const handleDateCancel = () => {
    setIsDatePickerOpen(false);
  };

  const openDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return t("Birth Date");
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="Frame237759 self-stretch inline-flex flex-col justify-start items-start gap-8 w-full">
        <Text variant="bold-24" tag="h1" className="mb-2 text-start">
          {t("About the owner")}
        </Text>
        <div className="Content self-stretch flex-1 pb-5 flex flex-col justify-start items-center gap-14 w-full">
          <div className="Container self-stretch flex-1 flex flex-col justify-start items-start gap-8 w-full">
            {/* Photo Upload */}
            <div className="InputCover self-stretch flex flex-col justify-start items-start gap-5 w-[174px]">
              <div className="Pictures self-stretch inline-flex justify-start items-start gap-1">
                {!data.owner.photo ? (
                  <div
                    className="UploadPicture w-full aspect-square px-5 py-6 bg-white rounded-3xl inline-flex flex-col justify-center items-center gap-5 overflow-hidden cursor-pointer"
                    onClick={handleImageCapture}
                  >
                    <CameraIcon />
                  </div>
                ) : (
                  <div className="Picture w-full aspect-square relative rounded-3xl overflow-hidden">
                    <IonImg
                      className="w-full h-full absolute rounded-3xl object-cover"
                      src={data.owner.photo}
                      alt="Owner photo"
                    />
                    <IonButton
                      fill="clear"
                      className="p-2 right-2 top-2 absolute bg-white/60 rounded-full"
                      onClick={handleDeletePhoto}
                    >
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </div>
                )}
              </div>
            </div>

            {/* Owner Name */}
            <div className="InputCover self-stretch flex flex-col justify-start items-center gap-3.5">
              <Text variant="medium-16" className="self-stretch text-start">
                {t("Owner name")}
              </Text>
              <Input
                placeholder={t("Your name")}
                value={data.owner.name}
                required
                error={errors.ownerName}
                onInput={(value) => handleOwnerUpdate("name", value)}
                className="border-0 bg-transparent p-0 h-auto"
              />
            </div>

            {/* Owner Birth Date */}
            <div className="InputCover self-stretch flex flex-col justify-start items-center gap-3.5">
              <Text variant="medium-16" className="self-stretch text-start">
                {t("Owner birth date")}
              </Text>
              <div
                className="Input self-stretch h-16 p-5 bg-white rounded-2xl flex flex-col justify-center items-center gap-5 overflow-hidden cursor-pointer"
                onClick={openDatePicker}
              >
                <div className="Text self-stretch inline-flex justify-between items-center">
                  <Text color="muted" className="flex-1 text-start">
                    {formatDisplayDate(data.owner.birth_date || "")}
                  </Text>
                  <div className="IconCover flex justify-end items-center gap-2.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Picker Modal */}
      <BottomModal
        isOpen={isDatePickerOpen}
        onClose={handleDateCancel}
        title={t("Owner birth date")}
        className="date-picker-modal"
        buttons={
          <div className="Buttons self-stretch inline-flex justify-center items-start gap-2.5 w-full">
            <Button
              variant="secondary"
              onClick={handleDateCancel}
              className="flex-1"
            >
              {t("Cancel")}
            </Button>
            <Button
              variant="primary"
              onClick={handleDateSave}
              className="flex-1"
            >
              {t("Save")}
            </Button>
          </div>
        }
      >
        <div className="Carusel self-stretch h-72 relative flex flex-col justify-start items-center overflow-hidden">
          <DatePicker value={selectedDate} onChange={handleDateChange} />
        </div>
      </BottomModal>
    </>
  );
};
