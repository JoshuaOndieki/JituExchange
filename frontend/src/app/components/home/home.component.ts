import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuestionComponent } from '../question/question.component';
import { QuestionService } from 'src/app/services/question.service';
import { Iquestion, Istate } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import * as QuestionActions from '../../state/actions/question.actions'

type Tfilter = 'all-time' | 'this-week' | 'this-month'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, QuestionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  filter:Tfilter = 'all-time'
  questions:Iquestion[] = []
  loading:boolean = true
  error:string | null = null
  constructor(private router:Router, public route:ActivatedRoute, private questionSvc:QuestionService, private authSvc:AuthService, private store:Store<Istate>) {
    
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.filter = params['filter'] ? params['filter'] : 'all-time'
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

  onFilter(filter:Tfilter) {
    this.router.navigate([''], {queryParams:{filter}})
  }

}
