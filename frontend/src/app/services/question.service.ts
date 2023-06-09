import { Injectable } from '@angular/core';
import { InewAnswerData, InewCommentData, InewQuestionData, InewVoteData, Iqueries, Iquestion, IquestionWithDetails, Iquestions } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private client:HttpClient) {
  }

  get allQuestions() {
    return []
  }

  getTopQuestions ():Observable<Iquestions> {
    return this.client.get<Iquestions>(environment.apiUrl + 'questions')
  }

  getQuestions (queries:Iqueries):Observable<Iquestions> {
    const q = Object.keys(queries).length ? '?' + Object.keys(queries).map((key:string) => `${key}=${queries[key]}`).join('&') : ''
    return this.client.get<Iquestions>(environment.apiUrl + 'questions' + q)
  }

  getQuestion(id:string):Observable<IquestionWithDetails> {    
    return this.client.get<IquestionWithDetails>(environment.apiUrl + 'questions/q/' + id)
  }

  postAnswer(newAnswerData:InewAnswerData):Observable<{message:string}> {
    return this.client.post<{message:string}>(environment.apiUrl + 'answers/' + newAnswerData.questionID, {details:newAnswerData.details})
  }

  askQuestion(data:InewQuestionData):Observable<{message:string, id:string}> {
    return this.client.post<{message:string, id:string}>(environment.apiUrl + 'questions', data)
  }

  updateQuestion(id:string,data:InewQuestionData):Observable<{message:string}> {
    return this.client.put<{message:string}>(environment.apiUrl + 'questions/q/' +id, data)
  }

  addComment(data:InewCommentData):Observable<{message:string}> {
    return this.client.post<{message:string}>(environment.apiUrl + 'comments', data)
  }

  vote(data:InewVoteData):Observable<{message:string}> {
    return this.client.post<{message:string}>(environment.apiUrl + 'votes', data)
  }

  deleteQuestion(id:string):Observable<{message:string}> {
    return this.client.delete<{message:string}>(environment.apiUrl + 'questions/q/' + id)
  }

  acceptAnswer(answerID:string):Observable<{message:string}> {
    return this.client.patch<{message:string}>(environment.apiUrl + 'answers/accept/' + answerID, {})
  }
}
