import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskComponent } from './ask.component';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('AskComponent', () => {
  let component: AskComponent;
  let fixture: ComponentFixture<AskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AskComponent, HttpClientModule],
      providers: [{ provide: ActivatedRoute, useValue: {params: of({ id: 'some-id' })} }, provideMockStore({initialState:{questions: null, users:null}}), HttpClient]
    });
    fixture = TestBed.createComponent(AskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
