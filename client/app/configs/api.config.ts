export const API_URL = process.env.API_URL;

export const getAuthUrl = (string: string) => `/auth/${string}`;
export const getUsersUrl = (string: string) => `/user/${string}`;
export const getRolesUrl = (string: string) => `/roles/${string}`;
export const getPermissionsUrl = (string: string) => `/permissions/${string}`;
export const getItemUrl = (string: string) => `/items/${string}`;
export const getFileUrl = (string: string) => `/image/${string}`;
export const getCategoryUrl = (string: string) => `/categories/${string}`;
export const getOrderUrl = (string: string) => `/order/${string}`;
export const getCartUrl = (string: string) => `/cart/${string}`;
export const getProductUrl = (string: string) => `/products/${string}`;
