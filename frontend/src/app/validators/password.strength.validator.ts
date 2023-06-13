import { AbstractControl, ValidatorFn } from "@angular/forms";
import { IpasswordStrengthErrors } from "../interfaces";

export default function passwordStrengthValidator (minLength=6):ValidatorFn {
    return (control: AbstractControl) => {
    const value = control.value
    const errors:IpasswordStrengthErrors  = {}
    
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumeric = /[0-9]/.test(value)
    const hasSpecial = /[^a-zA-Z0-9]/.test(value)

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && value.length >= minLength
    
    value.length >= minLength ? '' : errors.minLength = {
        received:value.length,
        expected:minLength
    }
    hasUpperCase ? '' : errors.upperCase = 'At least one uppercase letter is required.'
    hasLowerCase ? '' : errors.lowerCase = 'At least one lowercase letter is required.'
    hasNumeric ? '' : errors.numeric = 'At least one number is required.'
    hasSpecial ? '' : errors.special = 'At least one special character is required.'

    return !passwordValid ? { passwordStrength: errors } : null;
  }
}
  