import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ianswer, Icomment, Iquestion, Istate, Iuser, IuserProfile } from 'src/app/interfaces';
import { Store } from '@ngrx/store';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CLEAR_USER_PROFILE, GET_USER_PROFILE_INFO, GET_USER_PROFILE_QUESTIONS } from 'src/app/state/actions/user.actions';
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
  userProfile:IuserProfile | null = null
  authUser: Iuser | null = null
  toggle: Ttoggle = 'questions'
  questionsFetchDispatched:boolean = false
  loading:boolean = true
  error:string | null = null

  constructor(private store:Store<Istate>, private route:ActivatedRoute) {}

  ngOnInit(): void {
    const username = this.route.snapshot.params['username']
    this.store.dispatch(CLEAR_USER_PROFILE())
    this.store.dispatch(GET_USER_PROFILE_INFO({by:'username', identifier:username}))
    
    this.store.select('users').subscribe(
      usersState => {
        this.userProfile = usersState.userProfile
        this.authUser = usersState.authUser

        if (this.userProfile?.info?.id && !this.questionsFetchDispatched) {
          this.store.dispatch(GET_USER_PROFILE_QUESTIONS({askedBy:this.userProfile.info.id}))
          this.questionsFetchDispatched = true
        }

        if (this.userProfile.questions) {
          this.loading = false
        }

        this.error = usersState.errors.userProfile
      }
    )
  }

  onToggle(toggle:Ttoggle) {

  }

}
