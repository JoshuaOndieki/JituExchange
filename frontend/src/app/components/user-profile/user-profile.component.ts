import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Istate, Iuser } from 'src/app/interfaces';
import { Store } from '@ngrx/store';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GET_USER_PROFILE } from 'src/app/state/actions/user.actions';


type Ttoggle = 'questions' | 'answers' | 'comments'

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  user:Iuser | null = null
  authUser: Iuser | null = null
  toggle: Ttoggle = 'questions'

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
  }

  onToggle(toggle:Ttoggle) {

  }

}
