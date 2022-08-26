/* eslint-disable @typescript-eslint/naming-convention */

import { AuthService } from 'src/app/services/auth.service';
import { EStorage } from '../enum/all.enum';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders, HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { of } from 'rxjs';
import { mergeMap, delay, retryWhen } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  token = '';

  constructor(
    private storage: Storage,
    private http: HttpClient
  ) { }

  async apiPost(route: string, body: unknown) {

    try {
      this.token = (await this.storage.get(EStorage.LOGIN)).token;
    } catch (error) {
      this.token = ''
    }

    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
        }
      )
    };

    console.log('Posting to: ', environment.apiUrl + route);
    const request = await this.http.post(environment.apiUrl + route, body, httpOptions).toPromise();

    return request;
  }


  async apiGet(route: string) {

    try {
      this.token = (await this.storage.get(EStorage.LOGIN)).token;
    } catch (error) {
      this.token = ''
    }

    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
        }
      )
    };

    console.log('Getting to: ', environment.apiUrl + route);
    const request = await this.http.get(environment.apiUrl + route, httpOptions).toPromise();

    return request;
  }
}


@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.auth.getAuthToken())
      .pipe(
        switchMap((token: string) => {
          const headers = request.headers
            .set('Authorization', 'Bearer ' + token)
          const authReq = request.clone({ headers });
          return next.handle(authReq)
        })
      )
  }
}



export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen((error) => {
        return error.pipe(
          mergeMap((error, index) => {
            if (index < maxRetries && error.status <= 500) {
              return of(error).pipe(delay(delayMs));
            }

            throw error;
          })
        )
      })
    )
  }
}
