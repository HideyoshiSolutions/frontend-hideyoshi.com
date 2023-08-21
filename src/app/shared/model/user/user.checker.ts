import { createCheckers } from "ts-interface-checker";
import User from "./user.model-ti";
import Token from "../token/token.model-ti";

const UserChecker = createCheckers(User, Token)['User'];
export default UserChecker;
