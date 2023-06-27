import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { Istate } from 'src/app/interfaces';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
    constructor(private authSvc:AuthService, private router:Router, private store:Store<Istate>) {}

    ngOnInit(): void {
      this.store.select('users').subscribe(
        usersState => {          
          usersState.authUser ? '' : this.router.navigate(['/loading'])
        }
      )
    }
}
