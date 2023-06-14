import { AbstractControl, ValidatorFn } from "@angular/forms";

export default function validTagValidator ():ValidatorFn {
    return (control: AbstractControl) => {
    const value = control.value
    
    const validity = /^[a-zA-Z0-9-]+$/.test(value)
    
    return validity || !value ? null : { validity:'A tag can only contain letters, hyphens, and numbers.' }
  }
}
  