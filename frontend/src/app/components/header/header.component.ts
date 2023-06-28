import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NavigationComponent } from '../navigation/navigation.component';
import { AuthService } from 'src/app/services/auth.service';
import { Istate, Iuser } from 'src/app/interfaces';
import { Store } from '@ngrx/store';
import { SIGN_OUT } from 'src/app/state/actions/user.actions';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, IonicModule, NavigationComponent],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isMenuOpen: boolean = false
    currentNavigation!: 'home' | 'questions' | 'tags' | 'users'
    authUser!: Iuser | null

    constructor(public authSvc:AuthService, private store:Store<Istate>, private router:Router) {
          
    }

    ngOnInit(): void {
        this.store.select('users').subscribe(
          usersState => {        
            console.log(usersState.authUser)
            this.authUser = usersState.authUser
            // console.log(this.router.url);
            
            // console.log(usersState.authUser, usersState.asyncInitialized);
            
            // (usersState.authUser || usersState.asyncInitialized) && this.router.url === '/loading' ? '' : this.router.navigate(['/loading'], { state: { previousRoute:this.router.url } })
            if (this.authUser && this.router.url == '/loading') {
              this.router.navigate(['..'])
            }
            usersState.authUser == null && usersState.asyncInitialized ? this.router.navigate(['/welcome']) : ''
  
            // !usersState.asyncInitialized ? this.router.navigate(['/loading']) : ''
          }
        )
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen
    }
  
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
      const menuElement = document.querySelector('#menu');
      const menuIcon = document.querySelector('#menu-icon');
  
      if ( menuElement && menuIcon && !menuElement.contains(event.target as Node) && !menuIcon.contains(event.target as Node)) {
        this.isMenuOpen = false
      }
    }

    signOut() {
        this.store.dispatch(SIGN_OUT())
    }

}
