import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsersComponent } from './all-users.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AllUsersComponent', () => {
  let component: AllUsersComponent;
  let fixture: ComponentFixture<AllUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AllUsersComponent, HttpClientModule],
      providers: [
        provideMockStore({initialState:{users: null}}),
        HttpClient,
        {provide:ActivatedRoute, useValue:{params: of({sortBy:'some sort'})}}
      ]
    });
    fixture = TestBed.createComponent(AllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
