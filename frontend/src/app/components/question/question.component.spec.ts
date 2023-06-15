import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { ActivatedRoute } from '@angular/router';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuestionComponent],
      providers: [{provide: ActivatedRoute, useValue:{}}]
    });
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    component.question = {
      id: 'a1b3ew',
      summary: 'How to create a Stack Overflow clone with Angular, Expressjs, and MSSQL',
      details: `
      RouterLinkActive if used with queryParams needs to be an exact match, So the above solution will not work. There was a proposal to make routeLinkActiveOptions but was dropped by Angular team.

      You can define your own method to identify active.

      Here in the below snippet I am defining a method is link active will return true if the path url minus any query params matches the routerlink path passed from template.

      import {Router} from '@angular/router';

      constructor(private router: Router){
      
      }

      isLinkActive(link) {
        const url = this.router.url;
        return link.id === url.substring(1, url.indexOf('?'));
      }
      From the template assign class="active" if the method isLinkActive returns true

      <li *ngFor="let link of links" [class.active]="isLinkActive(link)">
        <a [routerLink]="'/'+link.id" [queryParams]="{ activeOnly: false }">{{link.name}}</a>
      </li>
      Stackblitz : https://stackblitz.com/edit/angular-8f7jk8
      `,
      askedDate: '6/13/2023, 12:47:44 PM',
      editedDate: null,
      askedBy: 'JoshuaOndieki'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
