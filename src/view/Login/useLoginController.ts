import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "../../app/services/authService";
import { SigninParams } from "../../app/services/authService/signIn";
import { useAuth } from "../../app/hooks/useAuth";

const schema = z.object({
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

export function useLoginController() {
    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { isLoading, mutateAsync } = useMutation({
        mutationFn: async (data: SigninParams) => {
            return authService.signIn(data);
        },
    });

    const { signin } = useAuth();

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const { accessToken } = await mutateAsync(data);

            signin(accessToken);
        } catch {
            toast.error("Credencias inválidas!");
        }
    });

    return { register, handleSubmit, errors, isLoading };
}
