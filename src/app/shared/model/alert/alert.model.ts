import {type Static, Type} from '@sinclair/typebox'


export enum AlertType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
}

export const Alert = Type.Object({
    type: Type.Enum(AlertType),
    title: Type.String(),
    message: Type.String(),
});


export type Alert = Static<typeof Alert>;
