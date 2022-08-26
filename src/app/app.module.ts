import { AuthGuard } from './services/auth.guard';

import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { CommonModule } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpAuthInterceptor, HttpErrorInterceptor } from './services/database.service';

const INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
]
const GUARDS = [
  AuthGuard
]


@NgModule({
  declarations: [AppComponent],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    INTERCEPTORS,
    GUARDS,
    Storage
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
