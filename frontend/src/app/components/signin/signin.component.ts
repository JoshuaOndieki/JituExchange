import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm!:FormGroup
  constructor(private fb:FormBuilder, private router:Router, private authSvc:AuthService) {
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
    this.signinForm.valid? this.authSvc.signIn(
      {
          firstname:"string",
          lastname:"string",
          id:"string",
          email:"string",
          username:this.id.value,
          location:"string",
          joinedDate:"string",
          website: "string",
          github:"string",
          avatar:"string",
          role: 'user'
      }      ) : ''

    // this.signinForm.valid ? this.router.navigate(['']) : ''
        
  }

  signAdmin() {
    this.authSvc.signIn(
      {
          firstname:"string",
          lastname:"string",
          id:"string",
          email:"string",
          username:"admin",
          location:"string",
          joinedDate:"string",
          website: "string",
          github:"string",
          avatar:"string",
          role: 'admin'
      }      )
  }
}
