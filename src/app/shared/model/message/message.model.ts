import {type Static, Type} from '@sinclair/typebox'

export const Message = Type.Object({
    subject: Type.String(),
    message: Type.String(),
    timestamp: Type.Number(),
});


export type Message = Static<typeof Message>;
