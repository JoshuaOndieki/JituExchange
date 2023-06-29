import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInfoComponent } from './question-info.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';

describe('QuestionInfoComponent', () => {
  let component: QuestionInfoComponent;
  let fixture: ComponentFixture<QuestionInfoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [QuestionInfoComponent, HttpClientModule],
      providers: [{ provide: ActivatedRoute, useValue: {
        params: of({
          id: 'a1b3ew'
        })
      } },
      HttpClient,
      provideMockStore({initialState:{users:null}})
    ]
    });
    // const router = TestBed.inject(Router);
    // await router.navigate(['/questions', 'q', 'a1b3ew'])
    fixture = TestBed.createComponent(QuestionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
