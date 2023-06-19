import { Pipe, PipeTransform } from '@angular/core';
import { ItoastMessage } from '../interfaces';

@Pipe({
  name: 'filterMessages',
  standalone: true
})
export class FilterMessagesPipe implements PipeTransform {

  transform(messages: ItoastMessage[]): ItoastMessage[] {
    if (!messages) {
      return []
    }
    return messages.filter((message:ItoastMessage) => !message.displayed)
  }

}
