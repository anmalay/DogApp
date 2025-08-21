import React, { useState } from "react";
import { Tag, TagRadioGroup, TagCheckboxGroup } from "./index";

// Simple star icon for testing
const StarIcon = () => (
  <div className="w-4 h-4 relative">
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0l2.5 5.5L16 6l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L8 0z" />
    </svg>
  </div>
);

export const TagTest: React.FC = () => {
  const [radioValue, setRadioValue] = useState<string>("");
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);

  const radioOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "disabled", label: "Disabled", disabled: true },
  ];

  const checkboxOptions = [
    { value: "tag1", label: "Tag 1", icon: <StarIcon /> },
    { value: "tag2", label: "Tag 2", icon: <StarIcon /> },
    { value: "tag3", label: "Tag 3", icon: <StarIcon /> },
    { value: "tag4", label: "Tag 4", icon: <StarIcon /> },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-cool-dark mb-6">Tag Component Test</h1>
      
      <div className="space-y-8">
        {/* Individual Tags */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-4">Individual Tags</h3>
          <div className="flex flex-wrap gap-3">
            <Tag>Default Tag</Tag>
            <Tag selected>Selected Tag</Tag>
            <Tag disabled>Disabled Tag</Tag>
            <Tag variant="outline">Outline Tag</Tag>
            <Tag variant="accent" selected>Accent Tag</Tag>
          </div>
        </div>

        {/* Small Tags with Icons */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-4">Small Tags with Icons</h3>
          <div className="flex flex-wrap gap-3">
            <Tag size="small" icon={<StarIcon />}>Small Tag</Tag>
            <Tag size="small" icon={<StarIcon />} selected>Selected</Tag>
            <Tag size="small" icon={<StarIcon />} variant="accent" selected>Accent</Tag>
            <Tag size="small" icon={<StarIcon />} variant="outline">Outline</Tag>
            <Tag size="small" icon={<StarIcon />} disabled>Disabled</Tag>
          </div>
        </div>

        {/* Radio Group */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-4">
            Tag Radio Group (Single Selection)
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Selected: {radioValue || "None"}
          </p>
          <TagRadioGroup
            options={radioOptions}
            value={radioValue}
            onChange={setRadioValue}
            size="medium"
          />
        </div>

        {/* Checkbox Group */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-4">
            Tag Checkbox Group (Multiple Selection)
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Selected: {checkboxValues.length > 0 ? checkboxValues.join(", ") : "None"}
          </p>
          <TagCheckboxGroup
            options={checkboxOptions}
            values={checkboxValues}
            onChange={setCheckboxValues}
            size="small"
            variant="default"
          />
        </div>

        {/* Mixed Variants */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-4">Different Variants</h3>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-gray-600 self-center w-20">Default:</span>
              <TagRadioGroup
                options={[
                  { value: "a", label: "Tag A" },
                  { value: "b", label: "Tag B" },
                  { value: "c", label: "Tag C" },
                ]}
                value=""
                onChange={() => {}}
                variant="default"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-gray-600 self-center w-20">Accent:</span>
              <TagRadioGroup
                options={[
                  { value: "a", label: "Tag A" },
                  { value: "b", label: "Tag B" },
                  { value: "c", label: "Tag C" },
                ]}
                value="b"
                onChange={() => {}}
                variant="accent"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-gray-600 self-center w-20">Outline:</span>
              <TagRadioGroup
                options={[
                  { value: "a", label: "Tag A" },
                  { value: "b", label: "Tag B" },
                  { value: "c", label: "Tag C" },
                ]}
                value=""
                onChange={() => {}}
                variant="outline"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};