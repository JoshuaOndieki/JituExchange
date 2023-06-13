import { AbstractControl, ValidatorFn } from "@angular/forms";

export default function passwordMatchValidator():ValidatorFn {
    return (control: AbstractControl) => {
        return control.parent?.get ('password')?.value === control.parent?.get ('confirmPassword')?.value ? null : {'mismatch': true};
    }
}