import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuestionsComponent } from './all-questions.component';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('AllQuestionsComponent', () => {
  let component: AllQuestionsComponent;
  let fixture: ComponentFixture<AllQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AllQuestionsComponent, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: {queryParams: of({ sortBy: 'some-sort-by' })} },
        provideMockStore({initialState:{questions: null, users:null}}),
        HttpClient
      ]
    });
    fixture = TestBed.createComponent(AllQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
