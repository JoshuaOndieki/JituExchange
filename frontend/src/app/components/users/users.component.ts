import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iuser } from 'src/app/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, IonicModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users!:Iuser[]
  searchForm!:FormGroup

  constructor(private userSvc:UserService, private fb:FormBuilder, private router:Router, public authSvc:AuthService) {
  }

  ngOnInit(): void {
    this.users = this.userSvc.users

    this.searchForm = this.fb.group({
      query: [''],
    })
  }

  get query() {
      return this.searchForm.controls['query']
  }

  onSearch() {
    console.log(this.searchForm);
    
  }
}
