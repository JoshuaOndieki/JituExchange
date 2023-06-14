import { AbstractControl, ValidatorFn } from "@angular/forms";

export default function noSpacesValidator():ValidatorFn {
    return (control: AbstractControl) => {
        const value = control.value
        const hasSpaces = /\s/.test(value)
        return hasSpaces ? { spaces: true } : null
      }
}