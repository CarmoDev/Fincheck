import { InputCurrency } from "../../../components/InputCurrency";
import { Modal } from "../../../components/Modal";
import { Input } from "../../../components/Input";
import { useEditTransactionsModalController } from "./useEditTransactionsModalController";
import { Select } from "../../../components/Select";
import { Button } from "../../../components/Button";
import { DatePickerInput } from "../../../components/DatePickerInput";
import { Controller } from "react-hook-form";
import { Transaction } from "../../../../app/entities/transaction";
import { ConfirmDeleteModal } from "../../../components/confirmDeleteModal";
import { TrashIcon } from "../../../components/icons/TrashIcon";

interface EditTransactionModalProps {
  open: boolean;
  onClose(): void;
  transaction: Transaction | null;
}

export function EditTransactionModal({
  transaction,
  open,
  onClose,
}: EditTransactionModalProps) {
  const {
    handleSubmit,
    register,
    errors,
    control,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    isLoadingDeleteMany,
    handleDeleteTransaction,
    handleDeleteManyTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteCategory,
    isloadingDelete,
  } = useEditTransactionsModalController(transaction, onClose);

  const isExpense = transaction?.type === "EXPENSE";

  const hasParcels = transaction!.qtyParcel > 1;

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        isLoadingMany={isLoadingDeleteMany}
        onConfirm={handleDeleteTransaction}
        onConfirmMany={handleDeleteManyTransaction}
        onClose={handleCloseDeleteModal}
        title={`Tem certeza que deseja excluir esta ${
          isExpense ? "despesa" : "receita"
        } ${hasParcels ? "recorrente" : ""}?`}
        hasParcels={hasParcels}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? "Editar despesa" : "Editar receita"}
      accessibilityTitle={"Editar transação"}
      open={open}
      onClose={onClose}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="text-red-900 w-6 h-6" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              control={control}
              name="value"
              defaultValue="0,00"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? "Nome da despesa" : "Nome da receita"}
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                placeholder="Tipo"
                error={errors.categoryId?.message}
                onDelete={handleDeleteCategory}
                isLoadingDelete={isloadingDelete}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />
          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                placeholder={isExpense ? "Pagar com" : "Receber com"}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
