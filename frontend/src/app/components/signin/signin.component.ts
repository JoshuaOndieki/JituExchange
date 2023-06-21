import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm!:FormGroup
  constructor(private fb:FormBuilder, private router:Router, private authSvc:AuthService, private userSvc:UserService, private toastSvc:ToastService) {
  }

  ngOnInit(): void {
      this.signinForm = this.fb.group({
          id: ['', [Validators.required]],
          password: ['', [Validators.required]]
      })
  }

  get id() {
      return this.signinForm.controls['id']
  }

  get password() {
      return this.signinForm.controls['password']
  }

  showHidePassword () {
    // TO DO
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.userSvc.signin({identifier:this.id.value, password:this.password.value}).subscribe(
        (res) => {
          this.toastSvc.displayMessage({
            message: res.message,
            type: 'success',
            displayed:false
          })
          
          this.authSvc.signIn(res.token)
        },
        (error) => {
          this.toastSvc.displayMessage({
            message: error.error.message || 'An error occured',
            type: 'error',
            displayed: false
          })
        }
      )
    }
    // this.signinForm.valid ? this.router.navigate(['']) : ''
  }
}
