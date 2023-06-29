import { Injectable } from '@angular/core';
import { ItoastMessage } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messages:ItoastMessage[] = []

  constructor() { }

  getMessages() {
    return this.messages
  }

  displayMessage (message:ItoastMessage) {
    this.messages.push(message)
      setTimeout(() => {
        this.messages.shift()
      }, 5000);
  }
}
