import { ComponentFixture, TestBed } from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing'
import { SigninComponent } from './signin.component';
import { HttpClientModule } from '@angular/common/http';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  const initialState = {mockValue: null}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SigninComponent, HttpClientModule],
      providers: [provideMockStore({initialState})]
    });
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
