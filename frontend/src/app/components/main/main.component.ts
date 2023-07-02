import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { Store } from '@ngrx/store';
import { Istate, Iuser } from 'src/app/interfaces';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  authUser: Iuser | null = null
    constructor(private store:Store<Istate>) {}

    ngOnInit(): void {
      this.store.select('users').subscribe(
        usersState => {        
          this.authUser = usersState.authUser
        }
      )
    }
}
