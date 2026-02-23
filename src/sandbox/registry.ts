import type { ComponentType } from "react";
import { SampleButton } from "../components/SampleButton";

export interface PropControl {
  type: "text" | "number" | "boolean" | "select";
  label: string;
  defaultValue: string | number | boolean;
  options?: string[];
}

export interface ComponentEntry {
  name: string;
  description?: string;
  component: ComponentType<Record<string, unknown>>;
  defaults: Record<string, unknown>;
  controls: Record<string, PropControl>;
}

export const registry: ComponentEntry[] = [
  {
    name: "SampleButton",
    description: "A basic button with variants",
    component: SampleButton as ComponentType<Record<string, unknown>>,
    defaults: {
      label: "Click me",
      variant: "primary",
      disabled: false,
    },
    controls: {
      label: {
        type: "text",
        label: "Label",
        defaultValue: "Click me",
      },
      variant: {
        type: "select",
        label: "Variant",
        defaultValue: "primary",
        options: ["primary", "secondary", "ghost"],
      },
      disabled: {
        type: "boolean",
        label: "Disabled",
        defaultValue: false,
      },
    },
  },
];
