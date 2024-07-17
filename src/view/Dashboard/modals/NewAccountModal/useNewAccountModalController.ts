import { z } from "zod";
import { useDashboard } from "../../DashboardContext/useDashboardContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../app/services/bankAccountService";
import { currencyStringToNumber } from "../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  initialBalance: z.string().nonempty("Saldo inicial é obrigatório"),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
  color: z
    .string()
    .nonempty("Cor é obrigatória")
    .regex(/#[0-9A-Fa-f]{6}/g, "Insira uma cor válida"),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { closeNewAccountModal, isNewAccountModalOpen } = useDashboard();

  const {
    control,
    register,
    reset,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(bankAccountService.create);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta cadastrada com sucesso!");
      closeNewAccountModal();
      reset();
    } catch {
      toast.error("Erro ao cadastrar a conta!");
    }
  });

  return {
    closeNewAccountModal,
    isNewAccountModalOpen,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
  };
}
