import React from "react";
import { useTranslation } from "react-i18next";
import { Input, Avatar } from "@shared/ui";
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
  const handleOwnerUpdate = (field: string, value: string) => {
    onUpdate({
      owner: {
        ...data.owner,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          {t("Owner Information")}
        </h1>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <Avatar
            src={data.owner.photo || undefined}
            initials={data.owner.name.charAt(0).toUpperCase() || "?"}
            size="xlarge"
            onClick={() => {
              // TODO: Implement photo upload
              console.log("Upload photo");
            }}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
          <p className="text-sm text-text-muted mt-2">
            {t("Click to add photo (optional)")}
          </p>
        </div>

        <Input
          label={t("Your Name")}
          placeholder={t("Your Name")}
          value={data.owner.name}
          required
          error={errors.ownerName}
          errorMessage={errors.ownerName ? t("Name is required") : undefined}
          onInput={(value) => handleOwnerUpdate("name", value)}
        />

        <Input
          label={t("Birth Date")}
          type="date"
          value={data.owner.birth_date || ""}
          helperText={t("Optional, but helps find company by age")}
          onInput={(value) => handleOwnerUpdate("birth_date", value)}
        />
      </div>
    </div>
  );
};