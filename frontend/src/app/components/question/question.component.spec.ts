import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuestionComponent],
      providers: [{provide: ActivatedRoute, useValue:{}}, provideMockStore({initialState:{mockValue: null}})]
    });
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    component.question = {
      "id": "324b350e-8523-4d37-8ce5-18f2f7171a07",
      "summary": "Executing code after dispatch is completed while using ngrx",
      "details": "In my sample Angular 2 application , I am using ngrx/store and ngrx/effects for state management.\n\nBelow is one of the function in a component to add a new item.\n\naddAuthor() {\n    \n    this.store.dispatch(addAuthorAction(this.fg.value));\n    console.log('2')        \n} \nIn the above code this.store.dispatch(addAuthorAction(this.fg.value)); takes care of making an AJAX call to server and adding a new author to database, which is working fine.\n\nAnd because this.store.dispatch(addAuthorAction(this.fg.value)); is an async action , console.log(\"2\") statement gets executed even before the AJAX call is completed.\n\nMy question is , what needs to be modified so that console.log gets executed after store.dispatch is done.",
      "askedBy": "0ff54b88-16ec-4103-a5fd-255a7f1e2f96",
      "askedDate": "2023-06-27T22:13:10.945Z",
      "editedDate": null,
      "views": 3,
      "username": "oj",
      "upvotes": 0,
      "downvotes": 0,
      "userVote": null,
      "answersCount": 0,
      "tags": [
        "ngrx",
        "ngrx-effects",
        "redux",
        "angular"
      ],
      "comments": [],
      "answers": []
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
