import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import passwordMatchValidator from 'src/app/validators/confirm.password.validator';
import passwordStrengthValidator from 'src/app/validators/password.strength.validator';
import { PasswordStrengthErrorsKeysPipe } from 'src/app/pipes/password-strength-errors-keys.pipe';
import noSpacesValidator from 'src/app/validators/no.spaces.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordStrengthErrorsKeysPipe],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signupForm!:FormGroup
    constructor(private fb:FormBuilder, private router:Router) {
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
        this.signupForm.valid ? this.router.navigate(['/signin']) : ''
        
    }
}
