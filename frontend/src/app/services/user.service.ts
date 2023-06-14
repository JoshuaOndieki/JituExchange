import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces';
import dummyUsers from '../helpers/users.dummy';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:Iuser[] = []

  constructor() {
    this.users = dummyUsers
  }
}
