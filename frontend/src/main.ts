// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';
import { IonicModule } from '@ionic/angular';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MockdbService } from './app/services/mockdb.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './app/services/user.service';


bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, HttpClientModule, AppRoutingModule, StoreModule.forRoot({}, {}), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }), IonicModule.forRoot())]
})
  .catch(err => console.error(err));
