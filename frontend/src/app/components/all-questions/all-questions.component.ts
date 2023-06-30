import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from '../question/question.component';
import { QuestionService } from 'src/app/services/question.service';
import { Iquestion, Istate } from 'src/app/interfaces';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as QuestionActions from '../../state/actions/question.actions'

@Component({
  selector: 'app-all-questions',
  standalone: true,
  imports: [CommonModule, QuestionComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})
export class AllQuestionsComponent implements OnInit {
  questions:Iquestion[] = []
  searchForm!:FormGroup
  sortBy = 'newest'
  loading:boolean = true
  error:string | null = null

  constructor(private questionSvc:QuestionService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute, private store:Store<Istate>) {
  }


  ngOnInit(): void {
    this.questions = this.questionSvc.allQuestions
    // this.questions = new Array(10).fill(question)

    this.searchForm = this.fb.group({
      query: [''],
    })

    this.route.queryParams.subscribe(params => {
      this.sortBy = params['sortBy'] ? params['sortBy'] : 'newest'
    })
    this.store.dispatch(QuestionActions.GET_TOP_QUESTIONS())
    this.store.select('questions').subscribe(
      questions => {
        this.questions = questions.topQuestions
        this.loading = false
        this.error = questions.errors.topQuestions
      }
    )
  }

  get query() {
      return this.searchForm.controls['query']
  }

  onSearch() {
    console.log(this.searchForm);
    
  }

  onFilter(filter:string) {
    this.router.navigate(['/questions'], {queryParams:{filter}})
  }
}
