import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Iuser } from 'src/app/interfaces';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, IonicModule, NavigationComponent],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    user!:Iuser
    isMenuOpen: boolean = false
    currentNavigation!: 'home' | 'questions' | 'tags' | 'users'

    constructor() {
        this.user =
        {
            firstname:"string",
            lastname:"string",
            id:"string",
            email:"string",
            username:"string",
            location:"string",
            joinedDate:"string",
            website: "string",
            github:"string",
            avatar:"string",
            role: 'admin'
        }        
    }

    ngOnInit(): void {
        
        
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
}
