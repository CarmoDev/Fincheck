import { SvgIcon } from "@mui/material";
import { iconsMap, newIconsMap } from "./iconsMap";

import NewCategoryIcon from "../createCategory/NewCategoryIcon";

interface CategoryIconProps {
  type: "income" | "expense";
  category?: string;
}

export function CategoryIcon({ type, category }: CategoryIconProps) {
  const isExpense = type === "expense";

  if (category === undefined) {
    const Icon = iconsMap[type].default;

    return <Icon />;
  }

  const isNewIcon = category in newIconsMap;

  if (isNewIcon) {
    const Icon = (newIconsMap as { [key: string]: React.ComponentType })[
      category
    ];

    return (
      <NewCategoryIcon
        icon={
          <SvgIcon
            x={10}
            width={24}
            sx={{
              color: isExpense ? "#FA5252" : "#10b981",
            }}
          >
            <Icon />
          </SvgIcon>
        }
        bg={isExpense ? "#FFF5F5" : "#EBFBEE"}
      />
    );
  }

  const Icon =
    iconsMap[type][
      (category as keyof (typeof iconsMap.expense | typeof iconsMap.income)) ??
        "default"
    ] ?? iconsMap[type].default;

  return <Icon />;
}
