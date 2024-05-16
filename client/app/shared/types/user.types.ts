export interface IUser {
  id: string;
  name: string;
  email: string;
  role: IRole[];
}

export interface IRole {
  id: number;
  name: string;
  // permissions: IPermissions[];
}

export interface IPermissions {
  id: number;
  name: string;
}
