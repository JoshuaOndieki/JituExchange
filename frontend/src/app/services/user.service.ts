import { Injectable } from '@angular/core';
import { InewUserData, Iqueries, Iuser, Iusers } from '../interfaces';
import dummyUsers from '../helpers/users.dummy';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:Iuser[] = []

  constructor(private client:HttpClient, private authSvc:AuthService) {
    this.users = dummyUsers
  }

  signup(newUserData:InewUserData):Observable<{message:string}> {
    return this.client.post<{message:string}>(environment.apiUrl + 'users', newUserData)
  }

  signin(data:{identifier:string, password:string}):Observable<{message:string, token:string}> {
    return this.client.post<{message:string, token:string}>(environment.apiUrl + 'users/signin', data)
  }

  signout():Observable<{message:string}> {
    // TO DO hit signout endpoint to revoke token
    this.authSvc.signOut()
    return of({message: 'signed out.'})
  }

  getSignedInUser():Observable<Iuser> {
    return this.client.get<Iuser>(environment.apiUrl + 'users/auth')
  }

  getUsers(queries:Iqueries):Observable<Iusers> {
    // console.log(Object.keys(queries).map((key:string) => `${key}=${queries[key]}`).join('&'));
    const q = Object.keys(queries).length ? '?' + Object.keys(queries).map((key:string) => `${key}=${queries[key]}`).join('&') : ''
    return this.client.get<Iusers>(environment.apiUrl + 'users' + q)
  }
}
