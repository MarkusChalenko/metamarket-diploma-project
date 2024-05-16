export interface IAuthResponse extends ITokens {}

export interface IInitialState {
  user: ITokens | null;
  isLoading: boolean;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export interface IRegisterData {
  email: string;
  full_name: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
