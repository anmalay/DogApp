import React, { useState } from "react";
import { Input } from "./Input";
import { Textarea } from "../Textarea/Textarea";

export const InputTest: React.FC = () => {
  const [values, setValues] = useState({
    default: "",
    required: "",
    error: "invalid input",
    filled: "filled value",
    small: "",
    textarea: "",
    textareaError: "error text"
  });

  const updateValue = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-cool-dark mb-6">Input Component Test</h1>
      
      <div className="space-y-6">
        {/* Default State */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-2">Default State</h3>
          <Input
            placeholder="Default input"
            value={values.default}
            onInput={(value) => updateValue("default", value)}
          />
        </div>

        {/* Required State */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-2">Required State</h3>
          <Input
            label="Required Field"
            placeholder="This field is required"
            value={values.required}
            required
            onInput={(value) => updateValue("required", value)}
          />
        </div>

        {/* Error State */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-2">Error State</h3>
          <Input
            label="Error Field"
            placeholder="Input with error"
            value={values.error}
            error
            errorMessage="This field has an error"
            onInput={(value) => updateValue("error", value)}
          />
        </div>

        {/* Filled State */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-2">Filled State</h3>
          <Input
            label="Filled Field"
            placeholder="This field has value"
            value={values.filled}
            onInput={(value) => updateValue("filled", value)}
          />
        </div>

        {/* Small Size */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-2">Small Size</h3>
          <Input
            placeholder="Small input"
            value={values.small}
            size="small"
            onInput={(value) => updateValue("small", value)}
          />
        </div>

        {/* Textarea Default */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-2">Textarea</h3>
          <Textarea
            label="Comment"
            placeholder="Enter your comment here"
            value={values.textarea}
            maxLength={200}
            showCharCount
            helperText="Share your thoughts"
            onInput={(value) => updateValue("textarea", value)}
          />
        </div>

        {/* Textarea Error */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-2">Textarea with Error</h3>
          <Textarea
            label="Error Comment"
            placeholder="This has an error"
            value={values.textareaError}
            error
            errorMessage="This textarea has an error"
            onInput={(value) => updateValue("textareaError", value)}
          />
        </div>
      </div>
    </div>
  );
};