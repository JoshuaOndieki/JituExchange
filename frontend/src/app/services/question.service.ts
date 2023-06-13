import { Injectable } from '@angular/core';
import { Iquestion } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions:Iquestion[]

  constructor() {
    this.questions = [
      {
        id: 'a1b3ew',
        summary: 'How to create a Stack Overflow clone with Angular, Expressjs, and MSSQL',
        details: 'DETAILS\nHow to create a Stack Overflow clone with Angular, Expressjs, and MSSQL\nDETAILS',
        askedDate: '6/13/2023, 12:47:44 PM',
        editedDate: null,
        askedBy: 'JoshuaOndieki'
      }
    ]
  }

  get allQuestions() {
    return this.questions
  }
}
