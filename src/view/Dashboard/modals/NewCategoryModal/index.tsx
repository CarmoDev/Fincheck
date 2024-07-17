import { Controller } from "react-hook-form";

import { Modal } from "../../../components/Modal";
import { Input } from "../../../components/Input";
import { useNewCategoryModalController } from "./useNewCategoryModalController";
import { Select } from "../../../components/Select";
import { IconsDropdownInput } from "../../../components/IconsDropdownInput";
import { Button } from "../../../components/Button";

export function NewCategoryModal() {
  const {
    closeNewCategoryModal,
    isNewCategoryModalOpen,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    watch,
  } = useNewCategoryModalController();

  const transactionType = watch("type");

  return (
    <Modal
      title="Nova Categoria"
      accessibilityTitle={"Adicionar nova categoria"}
      open={isNewCategoryModalOpen}
      onClose={closeNewCategoryModal}
    >
      <form onSubmit={handleSubmit}>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={"Nome da categoria"}
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="INCOME"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    value: "INCOME",
                    label: "Receita",
                  },
                  {
                    value: "EXPENSE",
                    label: "Despesa",
                  },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="icon"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <IconsDropdownInput
                error={errors.icon?.message}
                onChange={onChange}
                value={value}
                transactionType={transactionType}
              />
            )}
          />

          {/* <Controller
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
          /> */}
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
