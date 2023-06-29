// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';
import { IonicModule } from '@ionic/angular';
import { isDevMode, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './app/services/interceptor.service';
import { EffectsModule } from '@ngrx/effects';
import appEffects from './app/state/effects';
import stateReducers from './app/state';
import { Istate } from './app/interfaces';
import { GET_AUTH_USER } from './app/state/actions/user.actions';
import { Observable, map, takeWhile } from 'rxjs';
import { UserService } from './app/services/user.service';

// function loadData(store: Store<Istate>): Observable<boolean> {
//   console.log('App initializing...');
  
//   store.dispatch(GET_AUTH_USER());
//   return store.select('users').pipe(
//     map(usersState => usersState.asyncInitialized),
//     takeWhile(asyncInitialized => !asyncInitialized)
//   );
// }


bootstrapApplication(AppComponent, {
    providers: [
      appEffects,UserService,
      importProvidersFrom(
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        StoreModule.forRoot(stateReducers, {}), EffectsModule.forRoot(appEffects), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        IonicModule.forRoot()),
        {provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true}
      ]
    }
    ).catch(err => console.error(err));
