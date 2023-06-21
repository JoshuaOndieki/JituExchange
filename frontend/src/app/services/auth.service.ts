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

  signIn(token:string) {
    // this.authUser = user
    localStorage.setItem('JituExchange-token', token)
    // this.setAuthUser(user)
    this.router.navigate([''])
  }

  signOut() {
    this.authUser = null
    this.router.navigate(['/welcome'])
  }

  setAuthUser(user:Iuser) {
    this.authUser = user
  }

  getAuthUser() {
    return this.authUser
  }
  
}
