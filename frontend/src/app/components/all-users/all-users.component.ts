import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Iuser, Istate, Iqueries } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { DELETE_USER, GET_USERS } from 'src/app/state/actions/user.actions';

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
  queries!:Iqueries
  error: string | null = null

  constructor(private fb:FormBuilder, public authSvc:AuthService, private store:Store<Istate>) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: [''],
    })

    this.queries = {
      limit: 10
    }

    this.store.dispatch(GET_USERS(this.queries))
    this.store.select('users').subscribe(
      usersState => {
        this.users = usersState.users ? usersState.users.users : []
        this.authUser = usersState.authUser
        this.error = usersState.errors.users
        this.queries = usersState.users ? usersState.users.metadata.queries : {}
      }
    )
  }

  get query() {
      return this.searchForm.controls['query']
  }

  onSearch() {
    console.log(this.searchForm);
    
  }

  deleteUser(id:string) {
    this.store.dispatch(DELETE_USER({id}))
  }

  changePage(number:number) {
    this.queries = {...this.queries, page:number}
    this.store.dispatch(GET_USERS(this.queries))
  }

  changeLimit(number:number) {
    this.queries = {...this.queries, limit:number}
    this.store.dispatch(GET_USERS(this.queries))
  }

}
