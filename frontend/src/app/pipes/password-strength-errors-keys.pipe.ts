import { Pipe, PipeTransform } from '@angular/core';
import { IpasswordStrengthErrors } from '../interfaces';

@Pipe({
  name: 'passwordStrengthErrorsKeys',
  standalone: true
})
export class PasswordStrengthErrorsKeysPipe implements PipeTransform {

  transform(value:any, ...args: any[]): any {
    let keys = []    
    for (const key in value) {
      if (typeof value[key] === 'object') {
        try {          
          keys.push(`Your password has ${value[key]['received']} characters; it should be at least ${value[key]['expected']}`)
        } catch (error) {
          console.log(error);
        }
        continue
      }
      keys.push(value[key])
    }        
    return keys
  }

}
