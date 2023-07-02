import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IquestionWithDetails, Istate, Iuser } from 'src/app/interfaces';
import { ReactiveFormsModule, NgForm, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as QuestionActions from '../../state/actions/question.actions'

@Component({
  selector: 'app-question-info',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, IonicModule, FormsModule, DatePipe],
  templateUrl: './question-info.component.html',
  styleUrls: ['./question-info.component.css']
})
export class QuestionInfoComponent implements OnInit{
  question:IquestionWithDetails | null = null
  newAnswerData = {
    newAnswer: ''
  }

  authUser: Iuser | null = null

  constructor(private route:ActivatedRoute, private store:Store<Istate>) {}

  ngOnInit(): void {
    this.question = null
    this.route.params.subscribe(params => {
      this.question = null
      this.store.dispatch(QuestionActions.CLEAR_QUESTION())
      this.store.dispatch(QuestionActions.GET_QUESTION({id:params['id']}))
      this.store.select('questions').subscribe(
        questionState => {
          this.question = questionState.question          
        }
      )

      this.store.select('users').subscribe(
        usersState => {
          this.authUser = usersState.authUser          
        }
      )
    })

  }

  postAnswer(form:any) {
    if (form.valid) {
      this.store.dispatch(QuestionActions.POST_ANSWER({details: form.value.newAnswer, questionID:this.question!.id}))
    }

    form.reset()
  }

  addComment(event:any, target: 'question' | 'answer', commentFor:string) {
    if (event.target.comment.value) {
      this.store.dispatch(QuestionActions.ADD_COMMENT({details:event.target.comment.value, commentFor, target}))
      event.target.comment.value = ''
    }
  }

  vote(target: 'question' | 'answer', voteFor:string, positive:boolean) {
    this.store.dispatch(QuestionActions.VOTE({target, voteFor, positive}))
    
  }

  acceptAnswer(answerID:string) {
    this.store.dispatch(QuestionActions.ACCEPT_ANSWER({answerID}))
  }
  
}

