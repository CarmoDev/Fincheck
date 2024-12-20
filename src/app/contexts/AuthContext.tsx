import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { localStorageKeys } from "../config/localstorageKeys";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/usersService";
import toast from "react-hot-toast";
import { LaunchScreen } from "../../view/components/LaunchScreen";
import { User } from "../entities/User";

interface AuthContextValue {
    signedIn: boolean;
    user: User | undefined;
    signin(accessToken: string): void;
    signout(): void;
    isPremium: boolean;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [signedIn, setSignedIn] = useState<boolean>(() => {
        const storedAccessToken = localStorage.getItem(
            localStorageKeys.ACCESS_TOKEN
        );

        return !!storedAccessToken;
    });

    const { isError, isFetching, isSuccess, remove, data } = useQuery({
        queryKey: ["users", "me"],
        queryFn: () => usersService.me(),
        enabled: signedIn,
        staleTime: Infinity,
    });

    const isPremium = useMemo(() => data?.role !== "FREE", [data]);

    const signin = useCallback((accessToken: string) => {
        localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

        setSignedIn(true);
    }, []);

    const signout = useCallback(() => {
        localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
        remove();

        setSignedIn(false);
    }, [remove]);

    useEffect(() => {
        if (isError) {
            toast.error("Sua sessão expirou!");
            signout();
        }
    }, [isError, signout]);

    return (
        <AuthContext.Provider
            value={{
                user: data,
                signedIn: isSuccess && signedIn,
                signin,
                signout,
                isPremium,
            }}
        >
            <LaunchScreen isLoading={isFetching} />

            {!isFetching && children}
        </AuthContext.Provider>
    );
}
