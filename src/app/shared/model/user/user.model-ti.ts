/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from "ts-interface-checker";
// tslint:disable:object-literal-key-quotes

export const User = t.iface([], {
    "id": t.opt("number"),
    "name": t.opt("string"),
    "email": t.opt("string"),
    "username": "string",
    "password": t.opt("string"),
    "profilePictureUrl": t.opt("string"),
    "accessToken": t.opt("Token"),
    "refreshToken": t.opt("Token"),
    "roles": t.opt(t.array("string")),
});

const exportedTypeSuite: t.ITypeSuite = {
    User,
};
export default exportedTypeSuite;
