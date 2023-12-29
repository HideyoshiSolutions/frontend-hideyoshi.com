import {type Static, Type} from '@sinclair/typebox'


export const Language = Type.Object({
    name: Type.String(),
    color: Type.String(),
    percentage: Type.Number(),
})

export const Project = Type.Object({
    name: Type.String(),
    description: Type.String(),
    link: Type.String(),

    license: Type.Optional(Type.String()),
    languages: Type.Optional(Type.Array(Language)),

    stars: Type.Number(),
    forks: Type.Number(),
    watchers: Type.Number(),
});


export type Language = Static<typeof Language>;
export type Project = Static<typeof Project>;
