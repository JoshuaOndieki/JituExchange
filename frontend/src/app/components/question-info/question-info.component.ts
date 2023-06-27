import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Iquestion, IquestionWithDetails, Istate } from 'src/app/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, NgForm, FormsModule } from '@angular/forms';
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
  question!:IquestionWithDetails | null
  // @ViewChild('newAnswerForm') newAnswerForm!: NgForm
  newAnswerData = {
    newAnswer: ''
  }

  // commentForm!:FormGroup

  constructor(private route:ActivatedRoute, private questionSvc:QuestionService, private fb:FormBuilder, private store:Store<Istate>) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(QuestionActions.GET_QUESTION({id:params['id']}))
      this.store.select('questions').subscribe(
        questionState => {
          this.question = questionState.question
        }
      )
    })

    // this.commentForm = this.fb.group({
    //   comment: [''],
    // })
  }

  // get newAnswer() {
  //   return this.newAnswerForm.controls['newAnswer']
  // }

  postAnswer(form:any) {
    if (form.valid) {
      this.store.dispatch(QuestionActions.POST_ANSWER({details: form.value.newAnswer, questionID:this.question!.id}))
    }

    form.reset()
  }

  // get comment() {
  //   return this.commentForm.controls['comment']
  // }

  addComment(event:any, target: 'question' | 'answer', commentFor:string) {
    if (event.target.comment.value) {
      this.store.dispatch(QuestionActions.ADD_COMMENT({details:event.target.comment.value, commentFor, target}))
      event.target.comment.value = ''
    }
  }

  vote(target: 'question' | 'answer', voteFor:string, positive:boolean) {
    this.store.dispatch(QuestionActions.VOTE({target, voteFor, positive}))
    
  }
  
}

