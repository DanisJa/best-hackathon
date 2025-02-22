import * as SwitchPrimitive from "@radix-ui/react-switch";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Switch = ({ checked, onCheckedChange }: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      className="w-10 h-6 bg-gray-600 rounded-full relative data-[state=checked]:bg-green-500 transition-all"
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <SwitchPrimitive.Thumb className="block w-4 h-4 bg-white rounded-full transform translate-x-1 data-[state=checked]:translate-x-5 transition-all" />
    </SwitchPrimitive.Root>
  );
};

export default Switch;
