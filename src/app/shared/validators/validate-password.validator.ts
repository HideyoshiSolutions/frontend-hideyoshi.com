import {AbstractControl} from '@angular/forms';

export function ValidatePasswordValidator(control: AbstractControl) {
    var password = control.value;
    var passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
    var passwordValid = passwordRegex.test(password);
    if (!passwordValid) {
        return { invalidPassword: true };
    }
    return null;
}
