import { useState } from "react";
import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import Chroma from "chroma-js";

import { cn } from "../../app/utils/cn";
import { DropdownMenu } from "./DropdownMenu";
import { ColorIcon } from "./icons/ColorsIcon";

interface ColorsDropdownInputProps {
  error?: string;
  className?: string;
  value?: string;
  onChange?(value: string): void;
}

type Color = {
  color: string;
  bg: string;
};

const colors = [
  { color: "#868E96", bg: "#F8F9FA" },
  { color: "#FA5252", bg: "#FFF5F5" },
  { color: "#E64980", bg: "#FFF0F6" },
  { color: "#BE4BDB", bg: "#F8F0FC" },
  { color: "#7950F2", bg: "#F3F0FF" },
  { color: "#4C6EF5", bg: "#EDF2FF" },
  { color: "#228BE6", bg: "#E7F5FF" },
  { color: "#15AABF", bg: "#E3FAFC" },
  { color: "#12B886", bg: "#E6FCF5" },
  { color: "#40C057", bg: "#EBFBEE" },
  { color: "#82C91E", bg: "#F4FCE3" },
  { color: "#FAB005", bg: "#FFF9DB" },
];

export function ColorsDropdownInput({
  error,
  className,
  onChange,
  value,
}: ColorsDropdownInputProps) {
  const [selectedColor, setSelectedColor] = useState<null | Color>(() => {
    if (!value) {
      return null;
    }

    return colors.find((c) => c.color === value) ?? null;
  });
  const [colorToAdd, setColorToAdd] = useState<string>("#");
  const [colorError, setColorError] = useState<string | null>(null);

  const regex = /#[0-9A-Fa-f]{6}/g;

  function generateBackgroundColor(foregroundColor: string): string {
    const foregroundColorChroma = Chroma(foregroundColor);

    const backgroundColorChroma = foregroundColorChroma.luminance(0.9);

    const backgroundColor = backgroundColorChroma.hex();

    return backgroundColor;
  }

  function handleSelect(color: Color) {
    setSelectedColor(color);
    onChange?.(color.color);
  }

  function handleColorToAdd(color: string) {
    setColorToAdd(color);

    const isValidHexCode = regex.test(color);

    if (!isValidHexCode) {
      setColorError("Insira uma cor válida");
      return;
    }

    onChange?.(color);
    setSelectedColor({ color, bg: generateBackgroundColor(color) });
    setColorError(null);
    return;
  }

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button
            className={cn(
              "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative",
              error && "!border-red-900",
              className
            )}
          >
            Cor
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {!selectedColor && (
                <ChevronDownIcon className="w-6 h-6 text-gray-800" />
              )}

              {selectedColor && (
                <ColorIcon color={selectedColor.color} bg={selectedColor.bg} />
              )}
            </div>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content side="bottom" className="grid grid-cols-4">
          {colors.map((color) => (
            <DropdownMenu.Item
              key={color.color}
              onSelect={() => handleSelect(color)}
              className="flex items-center justify-center"
            >
              <ColorIcon color={color.color} bg={color.bg} />
            </DropdownMenu.Item>
          ))}

          <div className="relative h-9 col-span-full rounded-xl border border-gray-500 pr-9">
            <ColorIcon
              color={selectedColor?.color ?? "#10b981"}
              bg={generateBackgroundColor(selectedColor?.color ?? "#10b981")}
              classname="absolute right-1"
            />

            <input
              type="text"
              className="w-full h-full rounded-xl pl-5 outline-none"
              placeholder="#000000"
              onChange={(text) => handleColorToAdd(text.currentTarget.value)}
              value={colorToAdd}
              minLength={7}
              maxLength={7}
            />
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {error ||
        (colorError && (
          <div className="flex gap-2 items-center mt-2 text-red-900">
            <CrossCircledIcon />
            <span className="text-xs text-red-900">{error || colorError}</span>
          </div>
        ))}
    </div>
  );
}
