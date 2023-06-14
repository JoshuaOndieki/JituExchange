import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuestionComponent } from '../question/question.component';
import { QuestionService } from 'src/app/services/question.service';
import { Iquestion } from 'src/app/interfaces';

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
  questions!:Iquestion[]
  constructor(private router:Router, public route:ActivatedRoute, private questionSvc:QuestionService) {
    
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.filter = params['filter'] ? params['filter'] : 'all-time'
      })
      const question = this.questionSvc.allQuestions[0]
      this.questions = new Array(10).fill(question)
  }

  onFilter(filter:Tfilter) {
    this.router.navigate([''], {queryParams:{filter}})
  }

}