
interface SliderArgs {
  max?: number;
  min?: number;
  step?: number | null;
  marks?: { value: number; label: string }[];
}

export interface SliderProps {
  args?: SliderArgs;
  value?: number;
  defaultValue?: number;
  markLabel?: boolean;
  onChange: (value: number) => void;

  getAriaValueText?(value: number, index: number): string;
}

export interface ToggleProps {
  defaultChecked?: boolean;
  onChange: (checked: boolean) => void;
}
