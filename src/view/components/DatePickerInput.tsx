import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";
import { formatDate } from "../../app/utils/formatDate";
import { PopOver } from "./PopOver";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?(date: Date): void;
}

export function DatePickerInput({
  error,
  value,
  className,
  onChange,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <PopOver.Root>
      <PopOver.Trigger>
        <div>
          <button
            className={cn(
              "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative pt-4",
              error && "!border-red-900",
              className
            )}
            type="button"
          >
            <span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">
              Data
            </span>

            <span>{formatDate(selectedDate)}</span>
          </button>

          {error && (
            <div className="flex gap-2 items-center mt-2 text-red-900">
              <CrossCircledIcon />
              <span className="text-xs text-red-900">{error}</span>
            </div>
          )}
        </div>
      </PopOver.Trigger>

      <PopOver.Content>
        <DatePicker value={selectedDate} onChange={handleChangeDate} />
      </PopOver.Content>
    </PopOver.Root>
  );
}
