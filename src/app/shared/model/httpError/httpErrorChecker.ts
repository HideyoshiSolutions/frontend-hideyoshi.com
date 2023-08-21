import { createCheckers } from "ts-interface-checker";
import HttpError from "./httpError.model-ti";

const HttpErrorChecker = createCheckers(HttpError)['HttpError'];
export default HttpErrorChecker;
