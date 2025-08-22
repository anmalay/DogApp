import React, { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Card,
  Avatar,
  Badge,
  RadioGroup,
  RadioOption,
} from "@shared/ui";

interface ProfileFormData {
  name: string;
  email: string;
  bio: string;
  age: string;
  gender: string;
  avatar: string;
}

interface ProfileEditFormProps {
  initialData?: Partial<ProfileFormData>;
  onSave: (data: ProfileFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  initialData = {},
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    bio: "",
    age: "",
    gender: "",
    avatar: "",
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const genderOptions: RadioOption[] = [
    { value: "male", label: "Мужской" },
    { value: "female", label: "Женский" },
    { value: "other", label: "Другой" },
  ];

  const updateField = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};

    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Card
      title="Редактировать профиль"
      variant="elevated"
      className="max-w-md mx-auto"
    >
      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="text-center">
          <Avatar
            src={formData.avatar || undefined}
            initials={formData.name.charAt(0).toUpperCase() || "?"}
            size="xlarge"
            onClick={() => console.log("Upload avatar")}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
          <p className="text-[14px] text-text-muted mt-2">
            Нажмите, чтобы изменить аватар
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Input
            label="Имя"
            placeholder="Введите ваше имя"
            value={formData.name}
            required
            error={errors.name}
            errorMessage="Имя обязательно для заполнения"
            onInput={(value) => updateField("name", value)}
          />

          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            required
            error={errors.email}
            errorMessage="Email обязателен для заполнения"
            onInput={(value) => updateField("email", value)}
          />

          <Input
            label="Возраст"
            type="number"
            placeholder="25"
            value={formData.age}
            helperText="Поможет найти компанию по интересам"
            onInput={(value) => updateField("age", value)}
          />

          <div className="space-y-2">
            <label className="block text-[14px] font-medium text-text-primary">
              Пол
            </label>
            <RadioGroup
              options={genderOptions}
              value={formData.gender}
              onChange={(value) => updateField("gender", value)}
            />
          </div>

          <Textarea
            label="О себе"
            placeholder="Расскажите немного о себе..."
            value={formData.bio}
            maxLength={500}
            showCharCount
            helperText="Поделитесь своими интересами и увлечениями"
            onInput={(value) => updateField("bio", value)}
          />
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge variant="success">
            ✓ Профиль заполнен на{" "}
            {Math.round(
              (Object.values(formData).filter((v) => v).length / 6) * 100
            )}
            %
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            variant="outline"
            fullWidth
            onClick={onCancel}
            disabled={isLoading}
          >
            Отмена
          </Button>

          <Button
            variant="primary"
            fullWidth
            onClick={handleSubmit}
            loading={isLoading}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </Card>
  );
};
