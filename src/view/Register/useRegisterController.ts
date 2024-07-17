import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../app/services/authService";
import { SignupParams } from "../../app/services/authService/signUp";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../../app/hooks/useAuth";

const schema = z.object({
  name: z.string().trim().nonempty("Nome é obrigatório"),
  email: z
    .string()
    .trim()
    .nonempty("E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "A senha deve conter pelo menos 8 digitos"),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signUp(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch {
      toast.error("Ocorreu um erro ao criar sua conta!");
    }
  });

  return { register, errors, handleSubmit, isLoading };
}
