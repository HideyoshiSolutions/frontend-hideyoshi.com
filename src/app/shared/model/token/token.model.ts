import {type Static, Type} from '@sinclair/typebox'


export const Token = Type.Object({
    token: Type.String(),
    expirationDate: Type.Union([Type.String(), Type.Number()])
});

export type Token = Static<typeof Token>;
