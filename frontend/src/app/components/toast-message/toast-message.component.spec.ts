import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastMessageComponent } from './toast-message.component';
import { HttpClientModule } from '@angular/common/http';

describe('ToastMessageComponent', () => {
  let component: ToastMessageComponent;
  let fixture: ComponentFixture<ToastMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastMessageComponent, HttpClientModule]
    });
    fixture = TestBed.createComponent(ToastMessageComponent);
    component = fixture.componentInstance;
    component.toastMessage = {
      message: 'Test message',
      type: 'info',
      displayed: false
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
