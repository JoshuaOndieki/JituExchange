import { Injectable } from '@angular/core';
import { InewUserData, Iuser } from '../interfaces';
import dummyUsers from '../helpers/users.dummy';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:Iuser[] = []

  constructor(private api:HttpClient) {
    this.users = dummyUsers
  }

  signup(newUserData:InewUserData):Observable<{message:string}> {
    return this.api.post<{message:string}>(environment.apiUrl + 'users', newUserData)
  }

  signin(data:{identifier:string, password:string}):Observable<{message:string, token:string}> {
    return this.api.post<{message:string, token:string}>(environment.apiUrl + 'users/signin', data)
  }

  getSignedInUser():Observable<Iuser> {
    return this.api.get<Iuser>(environment.apiUrl + 'users/auth')
  }
}
