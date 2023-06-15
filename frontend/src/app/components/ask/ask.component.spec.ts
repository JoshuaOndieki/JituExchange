import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskComponent } from './ask.component';
import { ActivatedRoute } from '@angular/router';

describe('AskComponent', () => {
  let component: AskComponent;
  let fixture: ComponentFixture<AskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AskComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    });
    fixture = TestBed.createComponent(AskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
