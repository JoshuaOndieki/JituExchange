import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Iquestion, Istate, Iuser } from 'src/app/interfaces';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { DELETE_QUESTION } from 'src/app/state/actions/question.actions';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  @Input() question!:Iquestion
  authUser: Iuser | null = null

  constructor(private store:Store<Istate>) {}

  ngOnInit(): void {
    this.store.select('users').subscribe(
      usersState => {
        this.authUser = usersState.authUser
      }
    )
  }

  deleteQuestion() {
    this.store.dispatch(DELETE_QUESTION({id:this.question.id}))
  }
}