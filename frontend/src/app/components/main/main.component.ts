import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { Istate, Iuser } from 'src/app/interfaces';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  authUser: Iuser | null = null
    constructor(private authSvc:AuthService, private router:Router, private store:Store<Istate>, private route:ActivatedRoute) {}

    ngOnInit(): void {
      this.store.select('users').subscribe(
        usersState => {        
          // console.log(usersState.authUser);
          this.authUser = usersState.authUser
          // console.log(usersState.authUser, usersState.asyncInitialized);
          
          // (usersState.authUser || usersState.asyncInitialized) && this.router.url !== '/loading' ? '' : this.router.navigate(['/loading'], { state: { previousRoute:this.router.url } })

          // usersState.authUser == null && usersState.asyncInitialized ? this.router.navigate(['/welcome']) : ''

          // !usersState.asyncInitialized ? this.router.navigate(['/loading'], { state: { previousRoute:this.router.url } }) : ''
        }
      )
    }
}
