import { InputCurrency } from "../../../components/InputCurrency";
import { Modal } from "../../../components/Modal";
import { Input } from "../../../components/Input";

import { useTransactionsModalController } from "./useNewTransactionsModalController";
import { Select } from "../../../components/Select";
import { Button } from "../../../components/Button";
import { DatePickerInput } from "../../../components/DatePickerInput";
import { Controller } from "react-hook-form";

export function NewTransactionModal() {
    const {
        closeNewTransactionModal,
        isNewTransactionModalOpen,
        newTransactionType,
        handleSubmit,
        register,
        errors,
        control,
        accounts,
        categories,
        isLoadingCreateOne,
        isLoadingCreateMany,
        watch,
    } = useTransactionsModalController();

    const isExpense = newTransactionType === "EXPENSE";
    const parcels = parseInt(watch("qtyParcel"));
    const qtyParcels: number[] = [];

    for (let parcel = 1; parcel <= 60; parcel++) {
        qtyParcels.push(parcel);
    }

    if (Array.isArray(errors)) {
        return;
    }

    return (
        <Modal
            title={isExpense ? "Nova despesa" : "Nova receita"}
            accessibilityTitle={"Criar nova transação"}
            open={isNewTransactionModalOpen}
            onClose={closeNewTransactionModal}
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <span className="text-gray-600 tracking-[-0.5px] text-xs">
                        Valor {isExpense ? "da despesa" : "da receita"}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">
                            R$
                        </span>

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
                        placeholder={
                            isExpense ? "Nome da despesa" : "Nome da receita"
                        }
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
                                options={categories.map((category) => ({
                                    value: category.id,
                                    label: category.name,
                                }))}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="qtyParcel"
                        defaultValue={"0"}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                onChange={onChange}
                                value={value}
                                placeholder="Parcelas"
                                error={errors.qtyParcel?.message}
                                options={qtyParcels.map((parcel) => ({
                                    value: `${parcel}`,
                                    label: `${
                                        parcel !== 1 ? parcel : "A Vista"
                                    }`,
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
                                placeholder={
                                    isExpense ? "Pagar com" : "Receber com"
                                }
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

                <Button
                    type="submit"
                    isLoading={
                        parcels === 1 ? isLoadingCreateOne : isLoadingCreateMany
                    }
                    className="w-full mt-6"
                >
                    Salvar
                </Button>
            </form>
        </Modal>
    );
}
