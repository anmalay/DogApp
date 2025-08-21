import React from "react";
import { Button } from "./Button";

// Simple icon components for testing
const PlusIcon = () => (
  <div className="w-6 h-6 relative overflow-hidden">
    <div className="w-0 h-3.5 left-[12px] top-[5px] absolute outline outline-2 outline-offset-[-1px] outline-current" />
    <div className="w-3.5 h-0 left-[5px] top-[12px] absolute outline outline-2 outline-offset-[-1px] outline-current" />
  </div>
);

const ArrowIcon = () => (
  <div className="w-6 h-6 relative overflow-hidden">
    <div className="w-1.5 h-3 left-[10px] top-[6px] absolute outline outline-2 outline-offset-[-1px] outline-current" />
  </div>
);

export const ButtonTest: React.FC = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-cool-dark mb-6">Button Component Test</h1>
      
      <div className="space-y-8">
        {/* Default Buttons */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-4">Default Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="disabled">Disabled Button</Button>
          </div>
        </div>

        {/* Default Buttons with Icons */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-4">Default Buttons with Icons</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" icon={<PlusIcon />}>
              Add Item
            </Button>
            <Button variant="secondary" icon={<PlusIcon />}>
              Add Item
            </Button>
            <Button variant="outline" icon={<PlusIcon />}>
              Add Item
            </Button>
          </div>
        </div>

        {/* Round Buttons */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-4">Round Buttons</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button shape="round" variant="primary" icon={<ArrowIcon />} />
            <Button shape="round" variant="secondary" icon={<ArrowIcon />} />
            <Button shape="round" variant="outline" icon={<ArrowIcon />} />
            <Button shape="round" variant="disabled" icon={<ArrowIcon />} />
          </div>
        </div>

        {/* Different Sizes */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-4">Different Sizes</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
        </div>

        {/* Round Button Sizes */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-4">Round Button Sizes</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button shape="round" size="small" variant="secondary" icon={<ArrowIcon />} />
            <Button shape="round" size="medium" variant="secondary" icon={<ArrowIcon />} />
            <Button shape="round" size="large" variant="secondary" icon={<ArrowIcon />} />
          </div>
        </div>

        {/* Full Width */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-4">Full Width</h3>
          <div className="max-w-sm">
            <Button fullWidth variant="primary">
              Full Width Button
            </Button>
          </div>
        </div>

        {/* Loading State */}
        <div>
          <h3 className="text-lg font-semibold text-cool-dark mb-4">Loading State</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button loading variant="primary">
              Loading
            </Button>
            <Button shape="round" loading variant="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};