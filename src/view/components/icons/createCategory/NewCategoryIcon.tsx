import { ICategoriesIcons } from "../../../../app/entities/CategoriesIcons";
import { TransactionsIcon } from "../TransactionsIcon";

export default function NewCategoryIcon({ color, bg, icon }: ICategoriesIcons) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="42" height="42" rx="21" fill={bg || "#EBFBEE"} />
      {icon || <TransactionsIcon color={color || "#212529"} x={10} y={10} />}
      <rect
        x="1"
        y="1"
        width="42"
        height="42"
        rx="21"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}
