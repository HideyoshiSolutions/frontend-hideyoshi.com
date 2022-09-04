import { createCheckers } from "ts-interface-checker";
import TokenTI from "../token/token.model-ti";
import UserTI from "./user.model-ti";

const UserChecker = createCheckers(UserTI, TokenTI)['User'];
export default UserChecker;