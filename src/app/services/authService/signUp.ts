import { sleep } from "../../utils/sleep";
import { httpClient } from "../httpClient";

export interface SignupParams {
    name: string;
    email: string;
    password: string;
}

interface signUpResponse {
    accessToken: string;
}

export async function signUp(params: SignupParams) {
    await sleep(1500);

    const { data } = await httpClient.post<signUpResponse>(
        "/auth/signup",
        params
    );

    return data;
}
