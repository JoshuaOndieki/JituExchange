import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Iuser, Istate } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { GET_USERS } from 'src/app/state/actions/user.actions';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, IonicModule],
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  users:Iuser[] = []
  searchForm!:FormGroup
  authUser:Iuser | null = null

  constructor(private userSvc:UserService, private fb:FormBuilder, private router:Router, public authSvc:AuthService, private store:Store<Istate>) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: [''],
    })

    this.store.dispatch(GET_USERS({}))
    this.store.select('users').subscribe(
      usersState => {
        this.users = usersState.users ? usersState.users.users : []
        this.authUser = usersState.authUser
      }
    )
  }

  get query() {
      return this.searchForm.controls['query']
  }

  onSearch() {
    console.log(this.searchForm);
    
  }

}
