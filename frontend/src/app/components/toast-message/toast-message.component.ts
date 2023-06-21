
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItoastMessage } from 'src/app/interfaces';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css']
})
export class ToastMessageComponent {
  @Input() toastMessage!:ItoastMessage
  @Output() close = new EventEmitter<void>()

  onClose() {
    this.close.emit()
  }

}
