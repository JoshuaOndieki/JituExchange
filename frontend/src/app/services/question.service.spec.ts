import { TestBed } from '@angular/core/testing';

import { QuestionService } from './question.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
