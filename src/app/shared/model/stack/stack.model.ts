import {type Static, Type} from '@sinclair/typebox'


export const Stack = Type.Object({
    name: Type.String(),
    image: Type.String(),
    description: Type.String()
});


export type Stack = Static<typeof Stack>;
