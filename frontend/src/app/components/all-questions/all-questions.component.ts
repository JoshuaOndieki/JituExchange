import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from '../question/question.component';
import { QuestionService } from 'src/app/services/question.service';
import { Iquestion, Iuser } from 'src/app/interfaces';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-questions',
  standalone: true,
  imports: [CommonModule, QuestionComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})
export class AllQuestionsComponent implements OnInit {
  questions!:Iquestion[]
  searchForm!:FormGroup

  constructor(private questionSvc:QuestionService, private fb:FormBuilder, private router:Router) {
  }

  ngOnInit(): void {
    this.questions = this.questionSvc.allQuestions
    // this.questions = new Array(10).fill(question)

    this.searchForm = this.fb.group({
      query: [''],
    })
  }

  get query() {
      return this.searchForm.controls['query']
  }

  onSearch() {
    console.log(this.searchForm);
    
  }
}
