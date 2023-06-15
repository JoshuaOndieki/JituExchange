import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInfoComponent } from './question-info.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('QuestionInfoComponent', () => {
  let component: QuestionInfoComponent;
  let fixture: ComponentFixture<QuestionInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuestionInfoComponent],
      providers: [{ provide: ActivatedRoute, useValue: {
        params: of({
          id: 'a1b3ew'
        })
      } }]
    });
    fixture = TestBed.createComponent(QuestionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
