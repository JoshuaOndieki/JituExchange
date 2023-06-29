import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import passwordMatchValidator from 'src/app/validators/confirm.password.validator';
import passwordStrengthValidator from 'src/app/validators/password.strength.validator';
import { PasswordStrengthErrorsKeysPipe } from 'src/app/pipes/password-strength-errors-keys.pipe';
import noSpacesValidator from 'src/app/validators/no.spaces.validator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { Store } from '@ngrx/store';
import { Istate } from 'src/app/interfaces';
import { SIGN_UP } from 'src/app/state/actions/user.actions';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordStrengthErrorsKeysPipe],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signupForm!:FormGroup
    loading:Boolean = false
    constructor(private fb:FormBuilder, private router:Router, private userSvc:UserService, private toastSvc:ToastService, private store:Store<Istate>) {
    }

    ngOnInit(): void {
        this.signupForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(2), noSpacesValidator()]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, passwordStrengthValidator(6)]],
            confirmPassword: ['', [Validators.required, passwordMatchValidator(), passwordStrengthValidator(6)]]
        })

        this.store.select('users').subscribe(
            usersState => {
              this.loading = usersState.errors.signup ? false : this.loading
              usersState.authUser ? this.router.navigate(['']) : ''
            }
          )
    }

    get username() {
        return this.signupForm.controls['username']
    }

    get email() {
        return this.signupForm.controls['email']
    }

    get password() {
        return this.signupForm.controls['password']
    }

    get confirmPassword() {
        return this.signupForm.controls['confirmPassword']
    }

    showHidePassword () {
        // TO DO
      }

    onSubmit() {        
        if (this.signupForm.valid) {
            this.loading = true
            this.store.dispatch(SIGN_UP(this.signupForm.value))
        }
        
    }
}
