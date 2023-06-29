import { Component, OnInit } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { Istate, ItoastMessage } from './interfaces';
import { CommonModule } from '@angular/common';
import { ToastService } from './services/toast.service';
import { Store } from '@ngrx/store';


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

  constructor(public toastSvc:ToastService, private store:Store<Istate>, private router:Router) {}

  ngOnInit(): void {
    this.store.select('users').subscribe(
      usersState => {        
        // if (!usersState.asyncInitialized) {
        //   this.router.navigate(['/loading'], { state: { previousRoute:this.router.url }})
        // }
      }
    )
    this.messages = this.toastSvc.getMessages()
  }

  closeMessage(index:number) {
    this.messages[index].displayed = true
    console.log(this.toastSvc.getMessages());
    
  }
}
