import { useState } from "react";
import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import {
  WaterDrop,
  FlashOnOutlined,
  WaterfallChartOutlined,
  AccountTreeOutlined,
  PetsOutlined,
  HeartBroken,
  SpaOutlined,
  FitnessCenter,
  RedeemOutlined,
  CreditCardOutlined,
  PixOutlined,
  SellOutlined,
  SavingsOutlined,
  CurrencyBitcoin,
  AnalyticsOutlined,
  FavoriteBorderOutlined,
  ClassOutlined,
  Interests,
  NotInterestedOutlined,
  LocalTaxiOutlined,
} from "@mui/icons-material";
import { SvgIcon, SvgIconTypeMap } from "@mui/material";

import { cn } from "../../app/utils/cn";
import { DropdownMenu } from "./DropdownMenu";
import NewCategoryIcon from "./icons/createCategory/NewCategoryIcon";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface IconsDropdownInputProps {
  error?: string;
  className?: string;
  value?: string;
  onChange?(value: string): void;
  transactionType: "INCOME" | "EXPENSE";
}

type Icon = {
  name: string;
  component: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
};

const iconsToAdd = [
  { name: "WaterDrop", component: WaterDrop },
  { name: "FlashOnOutlined", component: FlashOnOutlined },
  { name: "WaterfallChartOutlined", component: WaterfallChartOutlined },
  { name: "AccountTreeOutlined", component: AccountTreeOutlined },
  { name: "PetsOutlined", component: PetsOutlined },
  { name: "HeartBroken", component: HeartBroken },
  { name: "SpaOutlined", component: SpaOutlined },
  { name: "FitnessCenter", component: FitnessCenter },
  { name: "RedeemOutlined", component: RedeemOutlined },
  { name: "CreditCardOutlined", component: CreditCardOutlined },
  { name: "PixOutlined", component: PixOutlined },
  { name: "SellOutlined", component: SellOutlined },
  { name: "SavingsOutlined", component: SavingsOutlined },
  { name: "CurrencyBitcoin", component: CurrencyBitcoin },
  { name: "AnalyticsOutlined", component: AnalyticsOutlined },
  { name: "FavoriteBorderOutlined", component: FavoriteBorderOutlined },
  { name: "ClassOutlined", component: ClassOutlined },
  { name: "Interests", component: Interests },
  { name: "NotInterestedOutlined", component: NotInterestedOutlined },
  { name: "LocalTaxiOutlined", component: LocalTaxiOutlined },
];

export function IconsDropdownInput({
  error,
  className,
  onChange,
  transactionType,
  value,
}: IconsDropdownInputProps) {
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(() => {
    if (!value) {
      return null;
    }

    return iconsToAdd.find((icon) => icon.name === value) ?? null;
  });

  const isExpense = transactionType === "EXPENSE";

  function handleSelectIcon(icon: Icon) {
    setSelectedIcon(icon);
    onChange?.(icon!.name);
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
            Icone
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {!selectedIcon && (
                <ChevronDownIcon className="w-6 h-6 text-gray-800" />
              )}

              {selectedIcon && (
                <NewCategoryIcon
                  icon={
                    <SvgIcon
                      x={10}
                      width={24}
                      sx={{
                        color: isExpense ? "#FA5252" : "#10b981",
                      }}
                    >
                      <selectedIcon.component />
                    </SvgIcon>
                  }
                  bg={isExpense ? "#FFF5F5" : "#EBFBEE"}
                />
              )}
            </div>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content side="bottom" className="grid grid-cols-4">
          {iconsToAdd.map((Icon) => (
            <DropdownMenu.Item
              key={window.crypto.randomUUID()}
              className="flex items-center justify-center"
              onSelect={() => handleSelectIcon(Icon)}
            >
              <NewCategoryIcon
                icon={
                  <SvgIcon
                    x={10}
                    width={24}
                    sx={{
                      color: isExpense ? "#FA5252" : "#10b981",
                    }}
                  >
                    <Icon.component />
                  </SvgIcon>
                }
                bg={isExpense ? "#FFF5F5" : "#EBFBEE"}
              />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs text-red-900">{error}</span>
        </div>
      )}
    </div>
  );
}
