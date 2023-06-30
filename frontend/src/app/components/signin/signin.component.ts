import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { Store } from '@ngrx/store';
import { Istate } from 'src/app/interfaces';
import { SIGN_IN } from 'src/app/state/actions/user.actions';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm!:FormGroup
  loading:Boolean = false
  error:string | null = null

  constructor(private fb:FormBuilder, private router:Router, private authSvc:AuthService, private userSvc:UserService, private toastSvc:ToastService, private store:Store<Istate>) {
  }

  ngOnInit(): void {
      this.signinForm = this.fb.group({
          identifier: ['', [Validators.required]],
          password: ['', [Validators.required]]
      })

      this.store.select('users').subscribe(
        usersState => {
          this.loading = usersState.errors.signin ? false : this.loading
          usersState.authUser ? this.router.navigate(['']) : ''
          this.error = usersState.errors.signin
        }
      )
  }

  get identifier() {
      return this.signinForm.controls['identifier']
  }

  get password() {
      return this.signinForm.controls['password']
  }

  showHidePassword () {
    // TO DO
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.loading = true
      this.store.dispatch(SIGN_IN({...this.signinForm.value}))
    }
  }
}
