import React, { FC, useState, useRef } from "react";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonIcon,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonModal,
} from "@ionic/react";
import {
  calendarOutline,
  timeOutline,
  locationOutline,
  peopleOutline,
  pricetagOutline,
  cameraOutline,
  callOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { AppLayout } from "@widgets/layout";
import { Button } from "@shared/ui/Button/Button";
import { CATEGORIES } from "@shared/config/categories";
import { usePostActivitiesCreate } from "@shared/api/generated/activities/activities";
import { platformUtils } from "@shared/hooks";

interface CreateActivityForm {
  title: string;
  description: string;
  categoryIds: number[];
  startDate: string;
  endDate: string;
  address: string;
  maxParticipants?: number;
  minAge?: number;
  maxAge?: number;
  price: number;
  isFree: boolean;
  contactType: number;
  contactValue: string;
}

const CreateActivityPage: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isStartDateModalOpen, setIsStartDateModalOpen] = useState(false);
  const [isEndDateModalOpen, setIsEndDateModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createActivityMutation = usePostActivitiesCreate();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateActivityForm>({
    defaultValues: {
      title: "",
      description: "",
      categoryIds: [],
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      address: "",
      maxParticipants: undefined,
      minAge: undefined,
      maxAge: undefined,
      price: 0,
      isFree: true,
      contactType: 1,
      contactValue: "",
    },
  });

  const watchIsFree = watch("isFree");
  const watchStartDate = watch("startDate");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const onSubmit = async (data: CreateActivityForm) => {
    try {
      const command = {
        ...data,
        organizerId: "user-id-placeholder",
        price: data.isFree ? 0 : data.price,
        contacts: [{ type: data.contactType, value: data.contactValue }],
      };

      await createActivityMutation.mutateAsync({ data: command });
      platformUtils.haptic.notification("success");
      await platformUtils.showAlert(t("Activity created successfully"));
      history.push("/activities");
    } catch (error) {
      platformUtils.haptic.notification("error");
      await platformUtils.showAlert(t("Failed to create activity"));
    }
  };

  return (
    <AppLayout
      showBackButton
      showCreateButton={false}
      headerTitle={t("Create Activity")}
      showFooter
    >
      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-gray-50 min-h-full">
            {/* Image Upload */}
            <div className="px-6 pt-6">
              <div className="relative h-56 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl bg-white shadow-sm transition-all hover:border-indigo-400 hover:shadow-md">
                {selectedImage ? (
                  <div className="w-full h-full relative">
                    <img
                      src={selectedImage}
                      alt="Activity Preview"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <IonButton
                      fill="solid"
                      size="small"
                      className="absolute bottom-2 right-2 activity-button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {t("Change")}
                    </IonButton>
                  </div>
                ) : (
                  <div className="text-center">
                    <IonIcon
                      icon={cameraOutline}
                      className="text-4xl text-gray-400 mb-2"
                    />
                    <p className="text-sm text-gray-500 mb-2">
                      {t("Add Photo")}
                    </p>
                    <IonButton
                      fill="solid"
                      onClick={() => fileInputRef.current?.click()}
                      className="activity-button"
                    >
                      {t("Upload")}
                    </IonButton>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="glass rounded-t-3xl -mt-6 pt-6">
              {/* Title */}
              <div className="px-6 mb-4">
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: t("Title is required") }}
                  render={({ field }) => (
                    <IonItem
                      lines="none"
                      className="border border-gray-300 rounded-xl p-1 bg-white"
                    >
                      <IonIcon
                        icon={informationCircleOutline}
                        slot="start"
                        className="text-gray-400 mr-3 text-xl"
                      />
                      <IonInput
                        {...field}
                        label={t("Activity Title")}
                        labelPlacement="floating"
                        className="ml-1"
                      />
                    </IonItem>
                  )}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="px-6 mb-4">
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: t("Description is required") }}
                  render={({ field }) => (
                    <IonItem
                      lines="none"
                      className="border border-gray-300 rounded-xl p-1 bg-white"
                    >
                      <IonTextarea
                        {...field}
                        label={t("Describe your activity...")}
                        rows={4}
                        className="min-h-[100px] ml-1"
                        labelPlacement="floating"
                      />
                    </IonItem>
                  )}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Categories */}
              <div className="px-6 mb-4">
                <Controller
                  name="categoryIds"
                  control={control}
                  render={({ field }) => (
                    <IonItem
                      lines="none"
                      className="border border-gray-300 rounded-xl p-1 bg-white"
                    >
                      <IonSelect
                        {...field}
                        multiple
                        className="custom-select ml-1"
                        labelPlacement="floating"
                        fill="outline"
                        label={t("Categories")}
                      >
                        {CATEGORIES.map((category, index) => (
                          <IonSelectOption key={category.id} value={index}>
                            {t(category.name)}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </IonItem>
                  )}
                />
              </div>

              {/* Date and Time */}
              <div className="px-6 mb-4 space-y-4">
                {/* Start Date */}
                <IonItem
                  lines="none"
                  className="border border-gray-300 rounded-xl p-1 bg-white cursor-pointer"
                  button
                  onClick={() => setIsStartDateModalOpen(true)}
                >
                  <IonIcon
                    icon={calendarOutline}
                    slot="start"
                    className="text-gray-400 mr-3 text-xl"
                  />
                  <IonLabel className="ml-1">
                    <h3 className="text-sm font-medium text-gray-700">
                      {t("Start Date and Time")}
                    </h3>
                    <p className="text-base text-gray-900 mt-1">
                      {formatDateTime(watchStartDate)}
                    </p>
                  </IonLabel>
                </IonItem>

                {/* End Date */}
                <IonItem
                  lines="none"
                  className="border border-gray-300 rounded-xl p-1 bg-white cursor-pointer"
                  button
                  onClick={() => setIsEndDateModalOpen(true)}
                >
                  <IonIcon
                    icon={timeOutline}
                    slot="start"
                    className="text-gray-400 mr-3 text-xl"
                  />
                  <IonLabel className="ml-1">
                    <h3 className="text-sm font-medium text-gray-700">
                      {t("End Time")}
                    </h3>
                    <p className="text-base text-gray-900 mt-1">
                      {formatTime(watch("endDate"))}
                    </p>
                  </IonLabel>
                </IonItem>
              </div>

              {/* Start Date Modal */}
              <IonModal
                isOpen={isStartDateModalOpen}
                onDidDismiss={() => setIsStartDateModalOpen(false)}
                initialBreakpoint={0.8}
                breakpoints={[0, 0.8]}
              >
                <div className="h-full bg-gray-50 rounded-t-3xl">
                  {/* Header */}
                  <div className="bg-white px-6 py-5 border-b border-gray-100 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">
                        {t("Select Start Date & Time")}
                      </h2>
                      <IonButton
                        fill="clear"
                        size="small"
                        onClick={() => setIsStartDateModalOpen(false)}
                        className="text-gray-400 text-2xl"
                      >
                        ×
                      </IonButton>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 px-6 py-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                          <IonDatetime
                            presentation="date-time"
                            value={field.value}
                            onIonChange={(e) => field.onChange(e.detail.value)}
                            className="w-full datetime-custom"
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-white px-6 py-5 border-t border-gray-100">
                    <div className="flex gap-4">
                      <IonButton
                        expand="block"
                        fill="outline"
                        onClick={() => setIsStartDateModalOpen(false)}
                        className="flex-1 modal-button-outline"
                      >
                        {t("Cancel")}
                      </IonButton>
                      <IonButton
                        expand="block"
                        onClick={() => setIsStartDateModalOpen(false)}
                        className="flex-1 modal-button-primary"
                      >
                        {t("Confirm")}
                      </IonButton>
                    </div>
                  </div>
                </div>
              </IonModal>

              {/* End Date Modal */}
              <IonModal
                isOpen={isEndDateModalOpen}
                onDidDismiss={() => setIsEndDateModalOpen(false)}
                initialBreakpoint={0.8}
                breakpoints={[0, 0.8]}
              >
                <div className="h-full bg-gray-50 rounded-t-3xl">
                  {/* Header */}
                  <div className="bg-white px-6 py-5 border-b border-gray-100 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">
                        {t("Select End Date & Time")}
                      </h2>
                      <IonButton
                        fill="clear"
                        size="small"
                        onClick={() => setIsEndDateModalOpen(false)}
                        className="text-gray-400 text-2xl"
                      >
                        ×
                      </IonButton>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 px-6 py-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                          <IonDatetime
                            presentation="date-time"
                            value={field.value}
                            onIonChange={(e) => {
                              if (e.detail.value) {
                                field.onChange(e.detail.value);
                              }
                            }}
                            className="w-full datetime-custom"
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-white px-6 py-5 border-t border-gray-100">
                    <div className="flex gap-4">
                      <IonButton
                        expand="block"
                        fill="outline"
                        onClick={() => setIsEndDateModalOpen(false)}
                        className="flex-1 modal-button-outline"
                      >
                        {t("Cancel")}
                      </IonButton>
                      <IonButton
                        expand="block"
                        onClick={() => setIsEndDateModalOpen(false)}
                        className="flex-1 modal-button-primary"
                      >
                        {t("Confirm")}
                      </IonButton>
                    </div>
                  </div>
                </div>
              </IonModal>

              {/* Location */}
              <div className="px-6 mb-4">
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: t("Address is required") }}
                  render={({ field }) => (
                    <IonItem
                      lines="none"
                      className="border border-gray-300 rounded-xl p-1 bg-white"
                    >
                      <IonIcon
                        icon={locationOutline}
                        slot="start"
                        className="text-gray-400 mr-3 text-xl"
                      />
                      <IonInput
                        {...field}
                        label={t("Activity location")}
                        labelPlacement="floating"
                        className="ml-1"
                      />
                    </IonItem>
                  )}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Participants */}
              <div className="px-6 mb-4">
                <Controller
                  name="maxParticipants"
                  control={control}
                  render={({ field }) => (
                    <IonItem
                      lines="none"
                      className="border border-gray-300 rounded-xl p-1 bg-white"
                    >
                      <IonIcon
                        icon={peopleOutline}
                        slot="start"
                        className="text-gray-400 mr-3 text-xl"
                      />
                      <IonInput
                        {...field}
                        type="number"
                        label={t("Max participants (optional)")}
                        value={field.value || ""}
                        labelPlacement="floating"
                        className="ml-1"
                      />
                    </IonItem>
                  )}
                />
              </div>

              {/* Age Restrictions */}
              <div className="px-6 mb-4 space-y-4">
                <Controller
                  name="minAge"
                  control={control}
                  render={({ field }) => (
                    <IonItem
                      lines="none"
                      className="border border-gray-300 rounded-xl p-1 bg-white"
                    >
                      <IonInput
                        {...field}
                        type="number"
                        label={t("Min age")}
                        value={field.value || ""}
                        labelPlacement="floating"
                        className="ml-1"
                      />
                    </IonItem>
                  )}
                />
                <Controller
                  name="maxAge"
                  control={control}
                  render={({ field }) => (
                    <IonItem
                      lines="none"
                      className="border border-gray-300 rounded-xl p-1 bg-white"
                    >
                      <IonInput
                        {...field}
                        type="number"
                        label={t("Max age")}
                        value={field.value || ""}
                        labelPlacement="floating"
                        className="ml-1"
                      />
                    </IonItem>
                  )}
                />
              </div>

              {/* Price */}
              <div className="px-6 mb-4">
                <IonItem
                  lines="none"
                  className="border border-gray-300 rounded-xl p-1 bg-white"
                >
                  <IonLabel className="ml-1">{t("Free Activity")}</IonLabel>
                  <Controller
                    name="isFree"
                    control={control}
                    render={({ field }) => (
                      <IonToggle
                        {...field}
                        checked={field.value}
                        onIonChange={(e) => {
                          field.onChange(e.detail.checked);
                          if (e.detail.checked) setValue("price", 0);
                        }}
                      />
                    )}
                  />
                </IonItem>
                {!watchIsFree && (
                  <div className="mt-4">
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <IonItem
                          lines="none"
                          className="border border-gray-300 rounded-xl p-1 bg-white"
                        >
                          <IonIcon
                            icon={pricetagOutline}
                            slot="start"
                            className="text-gray-400 mr-3 text-xl"
                          />
                          <IonInput
                            {...field}
                            type="number"
                            label={t("Price")}
                            value={field.value}
                            labelPlacement="floating"
                            className="ml-1"
                          />
                        </IonItem>
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Contact */}
              <div className="px-6 mb-6 space-y-4">
                <Controller
                  name="contactType"
                  control={control}
                  render={({ field }) => (
                    <IonItem
                      lines="none"
                      className="border border-gray-300 rounded-xl p-1 bg-white"
                    >
                      <IonSelect
                        {...field}
                        interface="popover"
                        value={field.value}
                        labelPlacement="floating"
                        fill="outline"
                        label={t("Contact Method")}
                        className="ml-1"
                      >
                        <IonSelectOption value={0}>
                          {t("Phone")}
                        </IonSelectOption>
                        <IonSelectOption value={1}>
                          {t("Telegram")}
                        </IonSelectOption>
                        <IonSelectOption value={2}>
                          {t("WhatsApp")}
                        </IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  )}
                />
                <Controller
                  name="contactValue"
                  control={control}
                  rules={{ required: t("Contact information is required") }}
                  render={({ field }) => (
                    <IonItem
                      lines="none"
                      className="border border-gray-300 rounded-xl p-1 bg-white"
                    >
                      <IonIcon
                        icon={callOutline}
                        slot="start"
                        className="text-gray-400 mr-3 text-xl"
                      />
                      <IonInput
                        {...field}
                        label={t("Contact information")}
                        labelPlacement="floating"
                        className="ml-1"
                      />
                    </IonItem>
                  )}
                />
                {errors.contactValue && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {errors.contactValue.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="px-6 pb-6">
                <Button
                  variant="primary"
                  expand="block"
                  size="large"
                  disabled={!isValid || createActivityMutation.isPending}
                  loading={createActivityMutation.isPending}
                  className="activity-button-primary min-h-[44px]"
                >
                  {t("Create Activity")}
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Custom Styles */}
        <style>{`
          .glass {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .activity-button {
            --background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
            --color: #ffffff;
            --border-radius: 12px;
            font-weight: 600;
          }

          .activity-button-primary {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
            color: #ffffff;
            border-radius: 12px;
            box-shadow: none;
            font-weight: 600;
          }

          .modal-button-outline {
            --border-color: #E5E7EB;
            --color: #6B7280;
            --border-radius: 16px;
            height: 52px;
            font-weight: 600;
          }

          .modal-button-primary {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
            color: #ffffff;
            --border-radius: 16px;
            height: 52px;
            font-weight: 600;
          }

          .datetime-custom {
            --background: white;
            --color: #374151;
            --highlight-color-focused: var(--color-primary);
            --highlight-color-valid: var(--color-primary);
          }

          .text-xl {
            font-size: 1.25rem;
          }
        `}</style>
      </IonContent>
    </AppLayout>
  );
};

export default CreateActivityPage;
