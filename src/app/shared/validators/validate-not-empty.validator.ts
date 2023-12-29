import {AbstractControl} from '@angular/forms';

export function ValidateNotEmptyValidator(control: AbstractControl) {
    const value = control.value;
    if (!value || value.length === 0) {
        return { invalidNotEmpty: true };
    }
    return null;
}
