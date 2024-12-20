import { Link } from "react-router-dom";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useLoginController } from "./useLoginController";

export default function Login() {
    const { register, handleSubmit, errors, isLoading } = useLoginController();

    return (
        <>
            <header className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 tracking-[-0.1px]">
                    Entre em sua conta
                </h1>

                <p className="space-x-2">
                    <span className="text-gray-700 tracking-[-0.5px]">
                        Novo por aqui?
                    </span>
                    <Link
                        to="/register"
                        className="tracking-[-0.5px] font-medium text-teal-800"
                    >
                        Crie uma conta
                    </Link>
                </p>
            </header>

            <form
                onSubmit={handleSubmit}
                className="mt-[60px] flex flex-col gap-4"
            >
                <Input
                    placeholder="E-mail"
                    {...register("email")}
                    error={errors.email?.message}
                />

                <Input
                    type="password"
                    placeholder="Senha"
                    {...register("password")}
                    error={errors.password?.message}
                    id="isPassword"
                />

                <Button isLoading={isLoading} className="mt-2">
                    Entrar
                </Button>
            </form>
        </>
    );
}
