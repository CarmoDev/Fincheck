import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../components/DropdownMenu";

import { CategoryIcon } from "../../../components/icons/categories/CategoryIcon";
import { BankAccount } from "../../../components/icons/BankAccountIcon";
import { useDashboard } from "../../DashboardContext/useDashboardContext";
import CategoriesIcon from "../../../components/icons/CategoriesIcon";

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal, openNewCategoryModal } =
    useDashboard();

  return (
    <div className="fixed right-6 bottom-4 z-[99]">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className=" text-white w-12 h-12 bg-teal-900 rounded-full flex items-center justify-center">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content align="end">
          <DropdownMenu.Item
            className="gap-2 hover:bg-gray-50"
            onSelect={openNewCategoryModal}
          >
            <CategoriesIcon /> Nova Categoria
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="gap-2 hover:bg-gray-50"
            onSelect={() => openNewTransactionModal("EXPENSE")}
          >
            <CategoryIcon type="expense" /> Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="gap-2 hover:bg-gray-50"
            onSelect={() => openNewTransactionModal("INCOME")}
          >
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={openNewAccountModal}
            className="gap-2 hover:bg-gray-50"
          >
            <BankAccount />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
