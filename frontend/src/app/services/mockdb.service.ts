import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api'
import { Ianswer, Iquestion, Itag, Iuser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MockdbService implements InMemoryDbService{

  constructor() { }

  createDb() {
    let users:Iuser[] = [

    ]

    let sessions

    let questions:Iquestion[] = [

    ]

    let answers:Ianswer[] = [

    ]

    let tags:Itag[] = [

    ]

    return {users, questions, answers, tags}
  }
}
