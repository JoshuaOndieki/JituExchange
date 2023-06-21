import { Component, OnInit } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { ItoastMessage } from './interfaces';
import { CommonModule } from '@angular/common';
import { ToastService } from './services/toast.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet, FooterComponent, ToastMessageComponent, CommonModule]
})
export class AppComponent implements OnInit {
  title = 'JituExchange';
  messages!:ItoastMessage[]

  constructor(public toastSvc:ToastService) {}

  ngOnInit(): void {
    this.messages = this.toastSvc.getMessages()
  }

  closeMessage(index:number) {
    this.messages[index].displayed = true
    console.log(this.toastSvc.getMessages());
    
  }
}
