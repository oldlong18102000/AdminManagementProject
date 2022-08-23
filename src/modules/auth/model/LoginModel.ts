export interface ILoginParams {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface ILoginValidation {
    email: string;
    password: string;
}

export interface Props {
    onLogin(values: ILoginParams): void;
    loading: boolean;
    errorMessage: string;
}