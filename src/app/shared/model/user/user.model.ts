import { Token } from "../token/token.model";

export interface User {
    id?: number,
    name?: string,
    email?: string,
    username: string,
    password?: string,
    accessToken?: Token,
    refreshToken?: Token,
    authorities?: Array<{authority: string}>,
    validateAccessToken?: () => Token | undefined;
};