import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ianswer, Icomment, Iquestion, Istate, Iuser } from 'src/app/interfaces';
import { Store } from '@ngrx/store';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GET_USER_PROFILE } from 'src/app/state/actions/user.actions';
import { GET_TOP_QUESTIONS } from 'src/app/state/actions/question.actions';
import { QuestionComponent } from '../question/question.component';


type Ttoggle = 'questions' | 'answers' | 'comments'

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, QuestionComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  user:Iuser | null = null
  authUser: Iuser | null = null
  toggle: Ttoggle = 'questions'
  questions:Iquestion[] = []
  loading:boolean = true
  error:string | null = null

  constructor(private store:Store<Istate>, private route:ActivatedRoute) {}

  ngOnInit(): void {
    const username = this.route.snapshot.params['username']
    this.store.dispatch(GET_USER_PROFILE({by:'username', identifier:username}))
    this.store.select('users').subscribe(
      usersState => {
        this.user = usersState.userProfile
        this.authUser = usersState.authUser
      }
    )

    this.store.dispatch(GET_TOP_QUESTIONS())
    this.store.select('questions').subscribe(
      questions => {
        this.questions = questions.topQuestions
        this.loading = false
        this.error = questions.errors.topQuestions
      }
    )
  }

  onToggle(toggle:Ttoggle) {

  }

}
