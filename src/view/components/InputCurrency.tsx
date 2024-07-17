import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";
import { cn } from "../../app/utils/cn";

interface InputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
}

export function InputCurrency({ error, onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        decimalScale={2}
        fixedDecimalScale
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          "text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full",
          error && "text-red-900"
        )}
        // defaultValue={"000"}
        placeholder="0,00"
      />

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs text-red-900">{error}</span>
        </div>
      )}
    </div>
  );
}
