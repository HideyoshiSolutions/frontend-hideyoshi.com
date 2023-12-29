import {type Static, Type} from '@sinclair/typebox'


export const HttpError = Type.Object({
    title: Type.String(),
    status: Type.Number(),
    details: Type.String(),
    developerMessage: Type.String(),
    timestamp: Type.String()
});

export type HttpError = Static<typeof HttpError>;
