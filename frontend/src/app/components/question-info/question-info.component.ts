import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Iquestion } from 'src/app/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, NgForm, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-question-info',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, IonicModule, FormsModule],
  templateUrl: './question-info.component.html',
  styleUrls: ['./question-info.component.css']
})
export class QuestionInfoComponent implements OnInit{
  question!:Iquestion | undefined
  // @ViewChild('newAnswerForm') newAnswerForm!: NgForm
  newAnswerData = {
    newAnswer: ''
  }

  commentForm!:FormGroup

  constructor(private route:ActivatedRoute, private questionSvc:QuestionService, private fb:FormBuilder) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.question = this.questionSvc.allQuestions.find(q => q.id === params['id']))

    this.commentForm = this.fb.group({
      comment: [''],
    })
  }

  // get newAnswer() {
  //   return this.newAnswerForm.controls['newAnswer']
  // }

  postAnswer(form:any) {
    console.log(form, this.newAnswerData);
    
  }

  get comment() {
    return this.commentForm.controls['comment']
  }

  addComment(id:string) {
    console.log(this.commentForm);
    
  }
  
}

  
