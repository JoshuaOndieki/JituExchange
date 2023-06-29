import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsersComponent } from './all-users.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AllUsersComponent', () => {
  let component: AllUsersComponent;
  let fixture: ComponentFixture<AllUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AllUsersComponent, HttpClientModule],
      providers: [provideMockStore({initialState:{mockValue: null}}), HttpClient]
    });
    fixture = TestBed.createComponent(AllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
