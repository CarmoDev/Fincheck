import { httpClient } from "../httpClient";

export interface SigninParams {
    email: string;
    password: string;
}

interface signinResponse {
    accessToken: string;
}

export async function signIn(params: SigninParams) {
    const { data } = await httpClient.post<signinResponse>(
        "/auth/signin",
        params
    );

    return data;
}
