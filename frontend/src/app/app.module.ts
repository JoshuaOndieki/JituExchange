import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockdbService } from './services/mockdb.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    StoreModule.forRoot({}, {}),
    InMemoryWebApiModule.forRoot(MockdbService),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
