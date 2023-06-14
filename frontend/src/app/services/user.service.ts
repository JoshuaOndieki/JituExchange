import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:Iuser[] = []
  
  constructor() { }
}
