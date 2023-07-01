import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from '../question/question.component';
import { QuestionService } from 'src/app/services/question.service';
import { Imetadata, Iqueries, Iquestion, Istate } from 'src/app/interfaces';
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
  queries!:Iqueries
  recordsInDB!:number

  constructor(private questionSvc:QuestionService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute, private store:Store<Istate>) {
  }


  ngOnInit(): void {
    this.queries = {
      limit: 10
    }
    this.searchForm = this.fb.group({
      query: [''],
    })

    this.route.queryParams.subscribe(params => {
      this.sortBy = params['sortBy'] ? params['sortBy'] : 'newest'
    })
    this.store.dispatch(QuestionActions.GET_QUESTIONS(this.queries))
    this.store.select('questions').subscribe(
      questions => {
        this.questions = questions.allQuestions ? questions.allQuestions.questions : []
        this.loading = false
        this.error = questions.errors.allQuestions
        console.log(this.queries);
        
        if (questions.allQuestions) {
          this.queries = questions.allQuestions.metadata.queries
          this.recordsInDB = questions.allQuestions.metadata.recordsInDb
        }
      }
    )
  }

  get query() {
      return this.searchForm.controls['query']
  }

  // onSearch() {
  //   console.log(this.searchForm);
    
  // }

  onFilter(filter:string) {
    this.router.navigate(['/questions'], {queryParams:{filter}})
  }
  
  changePage(number:number) {
    this.queries = {...this.queries, page:number}
    const {askedBy, ...queries} = this.queries
    this.store.dispatch(QuestionActions.GET_QUESTIONS(queries))
  }

  changeLimit(number:number) {
    this.queries = {...this.queries, limit:number}
    const {askedBy, ...queries} = this.queries
    this.store.dispatch(QuestionActions.GET_QUESTIONS(queries))
  }

  onSearch() {
    if (this.query.value) {
      this.queries = {...this.queries, searchQuery:this.query.value}
      }
      const {askedBy, ...queries} = this.queries
    this.store.dispatch(QuestionActions.GET_QUESTIONS(queries))
  }
}
