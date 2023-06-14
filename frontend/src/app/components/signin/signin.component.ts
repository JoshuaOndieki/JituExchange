import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm!:FormGroup
  constructor(private fb:FormBuilder, private router:Router) {
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
    this.signinForm.valid ? this.router.navigate(['']) : ''
        
  }
}
