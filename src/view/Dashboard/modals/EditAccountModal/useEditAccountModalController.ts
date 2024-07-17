import { z } from "zod";
import { useDashboard } from "../../DashboardContext/useDashboardContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../app/services/bankAccountService";
import { currencyStringToNumber } from "../../../../app/utils/currencyStringToNumber";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo inicial é obrigatório"),
    z.number(),
  ]),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { closeEditAccountModal, isEditAccountModalOpen, accountBeingEdited } =
    useDashboard();

  const {
    control,
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: updateAccount } = useMutation(
    bankAccountService.update
  );
  const { isLoading: isloadingDelete, mutateAsync: removeAccount } =
    useMutation(bankAccountService.remove);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta editada com sucesso!");
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao salvar as alterações");
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta deletada com sucesso!");
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao deletar conta!");
    }
  }

  return {
    closeEditAccountModal,
    isEditAccountModalOpen,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    handleDeleteAccount,
    isloadingDelete,
  };
}
