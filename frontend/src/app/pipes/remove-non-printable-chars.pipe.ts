import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeNonPrintableChars',
  standalone: true
})
export class RemoveNonPrintableCharsPipe implements PipeTransform {

  transform(value: string): string {
    value = value.replace(/[^\x20-\x7E]/gi, '');
    // return value.split('')[0].length > 30 ? value.
    return value
  }

}
