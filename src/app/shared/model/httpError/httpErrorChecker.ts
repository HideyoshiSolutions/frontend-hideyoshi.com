import { createCheckers } from "ts-interface-checker";
import HttpErrorTI from "./httpError.model-ti";

const HttpErrorChecker = createCheckers(HttpErrorTI)['HttpError'];
export default HttpErrorChecker;