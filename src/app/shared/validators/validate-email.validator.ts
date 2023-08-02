import {AbstractControl} from "@angular/forms";

export function ValidateEmailValidator(control: AbstractControl) {
    const email = control.value;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailValid = emailRegex.test(email);
    if (!emailValid) {
        return { invalidEmail: true };
    }
    return null;
}
