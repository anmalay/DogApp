import React from "react";
import { ImageUpload } from "../../../../shared/ui";
import { DogProfileData, StepErrors } from "../../model/types";

interface DogPhotosStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const DogPhotosStep: React.FC<DogPhotosStepProps> = ({
  data,
  onUpdate,
}) => {
  const handlePhotosChange = (photos: string[]) => {
    onUpdate({ photos });
  };

  return (
    <div className="space-y-6">
      <ImageUpload
        images={data.photos}
        onChange={handlePhotosChange}
        maxImages={4}
      />
    </div>
  );
};