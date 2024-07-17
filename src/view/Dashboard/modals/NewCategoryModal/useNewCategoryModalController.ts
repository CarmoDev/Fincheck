import { z } from "zod";
import { useDashboard } from "../../DashboardContext/useDashboardContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categoriesService } from "../../../../app/services/categoriesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().nonempty("Informe o valor"),
  icon: z.string().nonempty("Selecione o icone"),
  type: z.enum(["INCOME", "EXPENSE"]),
});

type FormData = z.infer<typeof schema>;

export function useNewCategoryModalController() {
  const { closeNewCategoryModal, isNewCategoryModalOpen } = useDashboard();

  const {
    reset,
    control,
    register,
    watch,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(categoriesService.create);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria cadastrada com sucesso!");
      closeNewCategoryModal();
      reset();
    } catch {
      toast.error("Erro ao cadastrar a categoria!");
    }
  });

  return {
    closeNewCategoryModal,
    isNewCategoryModalOpen,
    handleSubmit,
    register,
    errors,
    control,
    isLoading,
    watch,
  };
}
