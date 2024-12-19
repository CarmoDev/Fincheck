import { Controller } from "react-hook-form";

import { InputCurrency } from "../../../components/InputCurrency";
import { Modal } from "../../../components/Modal";
import { Input } from "../../../components/Input";
import { useNewAccountModalController } from "./useNewAccountModalController";
import { Select } from "../../../components/Select";
import { ColorsDropdownInput } from "../../../components/ColorsDropdownInput";
import { Button } from "../../../components/Button";

export function NewAccountModal() {
    const {
        closeNewAccountModal,
        isNewAccountModalOpen,
        register,
        errors,
        handleSubmit,
        control,
        isLoading,
    } = useNewAccountModalController();

    return (
        <Modal
            title="Nova Conta"
            accessibilityTitle={"Adicionar nova conta bancária"}
            open={isNewAccountModalOpen}
            onClose={closeNewAccountModal}
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <span className="text-gray-600 tracking-[-0.5px] text-xs">
                        Saldo inicial
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">
                            R$
                        </span>
                        <Controller
                            control={control}
                            name="initialBalance"
                            defaultValue="0,00"
                            render={({ field: { onChange, value } }) => (
                                <InputCurrency
                                    error={errors.initialBalance?.message}
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
                        placeholder="Nome da conta"
                        error={errors.name?.message}
                        {...register("name")}
                    />

                    <Controller
                        control={control}
                        name="type"
                        defaultValue="CHECKING"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                placeholder="Tipo"
                                error={errors.type?.message}
                                onChange={onChange}
                                value={value}
                                options={[
                                    {
                                        value: "CHECKING",
                                        label: "Conta corrente",
                                    },
                                    {
                                        value: "INVESTMENT",
                                        label: "Investimentos",
                                    },
                                    {
                                        value: "CASH",
                                        label: "Dinheiro físico",
                                    },
                                ]}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="color"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <ColorsDropdownInput
                                error={errors.color?.message}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full mt-6"
                    isLoading={isLoading}
                >
                    Criar
                </Button>
            </form>
        </Modal>
    );
}
