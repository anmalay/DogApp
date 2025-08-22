import React from "react";
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
          Информация о хозяине
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
            Нажмите, чтобы добавить фото (необязательно)
          </p>
        </div>

        <Input
          label="Ваше имя"
          placeholder="Ваше имя"
          value={data.owner.name}
          required
          error={errors.ownerName}
          errorMessage={errors.ownerName ? "Имя обязательно для заполнения" : undefined}
          onInput={(value) => handleOwnerUpdate("name", value)}
        />

        <Input
          label="Дата рождения"
          type="date"
          value={data.owner.birth_date || ""}
          helperText="Необязательно, но поможет найти компанию по возрасту"
          onInput={(value) => handleOwnerUpdate("birth_date", value)}
        />
      </div>
    </div>
  );
};