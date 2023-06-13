import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskComponent } from './ask.component';

describe('AskComponent', () => {
  let component: AskComponent;
  let fixture: ComponentFixture<AskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AskComponent]
    });
    fixture = TestBed.createComponent(AskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
