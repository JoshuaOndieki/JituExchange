import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Iquestion } from 'src/app/interfaces';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-question-info',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, IonicModule],
  templateUrl: './question-info.component.html',
  styleUrls: ['./question-info.component.css']
})
export class QuestionInfoComponent implements OnInit{
  question!:Iquestion | undefined
  // @ViewChild('newAnswerForm') newAnswerForm!: NgForm
  newAnswerData = {
    newAnswer: ''
  }

  constructor(private route:ActivatedRoute, private questionSvc:QuestionService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.question = this.questionSvc.allQuestions.find(q => q.id === params['id']))
  }

  // get newAnswer() {
  //   return this.newAnswerForm.controls['newAnswer']
  // }

  postAnswer(form:any) {
    console.log(form, this.newAnswerData);
    
  }
}
