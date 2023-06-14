import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUser:Iuser | null

  constructor(private router:Router) {
    this.authUser = null
  }

  signIn(user:Iuser) {
    this.authUser = user
    this.router.navigate([''])
  }

  signOut() {
    this.authUser = null
    this.router.navigate(['/welcome'])
  }
  

}
