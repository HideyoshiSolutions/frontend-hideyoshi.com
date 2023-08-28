import { Token } from "../token/token.model";

export interface User {
    id?: number,
    name?: string,
    email?: string,
    username: string,
    password?: string,
    profilePictureUrl?: string,
    accessToken?: Token,
    refreshToken?: Token,
    roles?: Array<string>,
    validateAccessToken?: () => Token | undefined;
};
