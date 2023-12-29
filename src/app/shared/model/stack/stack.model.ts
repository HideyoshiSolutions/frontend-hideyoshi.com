import { Type, type Static } from '@sinclair/typebox'


export const Stack = Type.Object({
    name: Type.String(),
    image: Type.String(),
    description: Type.String()
});


export type Stack = Static<typeof Stack>;
