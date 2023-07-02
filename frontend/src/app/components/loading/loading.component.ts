import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Istate } from 'src/app/interfaces';
import { GET_AUTH_USER } from 'src/app/state/actions/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  constructor(private store:Store<Istate>, private router:Router) {
    
  }

  ngOnInit(): void {
    this.store.dispatch(GET_AUTH_USER())

    this.store.select('users').subscribe(
      usersState => {       
        const previousRoute = this.router.lastSuccessfulNavigation?.extras?.state?.['previousRoute'];
        if (usersState.authUser && previousRoute) {
          this.router.navigate([previousRoute])
        }
        usersState.asyncInitialized && !usersState.authUser ? this.router.navigate(['/welcome']) : ''
      }
    )
  }
}
