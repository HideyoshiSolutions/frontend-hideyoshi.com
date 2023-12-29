import { Type, type Static } from '@sinclair/typebox'

import { Token } from '../token/token.model';


export const User = Type.Object({
    id: Type.Optional(Type.Number()),
    name: Type.Optional(Type.String()),
    email: Type.Optional(Type.String()),
    username: Type.String(),
    password: Type.Optional(Type.String()),
    profilePictureUrl: Type.Optional(Type.String()),
    accessToken: Type.Optional(Token),
    refreshToken: Type.Optional(Token),
    roles: Type.Optional(Type.Array(Type.String())),
    validateAccessToken: Type.Optional(Type.Function([],Type.Optional(Token)))
});


export type User = Static<typeof User>;
