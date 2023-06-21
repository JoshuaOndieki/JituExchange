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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordStrengthErrorsKeysPipe],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signupForm!:FormGroup
    constructor(private fb:FormBuilder, private router:Router, private userSvc:UserService, private toastSvc:ToastService) {
    }

    ngOnInit(): void {
        this.signupForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(2), noSpacesValidator()]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, passwordStrengthValidator(6)]],
            confirmPassword: ['', [Validators.required, passwordMatchValidator(), passwordStrengthValidator(6)]]
        })
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
            this.userSvc.signup({username:this.username.value, email:this.email.value, password:this.password.value}).subscribe(
                (res) => {
                    console.log(res);
                    
                    this.toastSvc.displayMessage({
                        message: res.message,
                        type: 'success',
                        displayed: false
                    })
                    this.router.navigate(['/signin'])
                },
                (error) => {
                    console.log(error)
                    this.toastSvc.displayMessage({
                        message: error.error.message || 'An error occured',
                        type: 'error',
                        displayed: false
                    })
                }
            )
        }
        
    }
}
