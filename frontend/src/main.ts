// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';
import { IonicModule } from '@ionic/angular';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './app/services/interceptor.service';
import { EffectsModule } from '@ngrx/effects';
import appEffects from './app/state/effects';
import stateReducers from './app/state';


bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, HttpClientModule, AppRoutingModule, StoreModule.forRoot(stateReducers, {}), EffectsModule.forRoot(appEffects), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }), IonicModule.forRoot()), {provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true}]
})
  .catch(err => console.error(err));
