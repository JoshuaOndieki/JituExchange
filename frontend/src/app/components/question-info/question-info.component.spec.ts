import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInfoComponent } from './question-info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionInfoComponent', () => {
  let component: QuestionInfoComponent;
  let fixture: ComponentFixture<QuestionInfoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [QuestionInfoComponent],
      providers: [{ provide: ActivatedRoute, useValue: {
        params: of({
          id: 'a1b3ew'
        })
      } }]
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
