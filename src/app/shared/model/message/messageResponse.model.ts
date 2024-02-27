import {type Static, Type} from '@sinclair/typebox'

export const MessageResponse = Type.Object({
    status: Type.String(),
    message: Type.String(),
});


export type MessageResponse = Static<typeof MessageResponse>;
