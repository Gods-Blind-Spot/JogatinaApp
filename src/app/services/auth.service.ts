import { EStorage } from 'src/app/enum/all.enum';
import { StorageService } from './storage.service';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, from, Observable, throwError, } from 'rxjs';
import { LoginData } from '../interfaces/login-data';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private platform: Platform,
    private storage: StorageService,
    private http: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  async login(email: string, password: string) {
    const data = await this.http.post<{ token: string }>(environment.apiUrl + 'auth/login', { email, password }).toPromise();
    console.log(data);

    if (data.token) {
      await this._setSession(data.token).then(()=>this._isLoggedIn.next(true));
    }
  }

  logout() {
    this.storage.remove(EStorage.LOGIN).then(
      () => this._isLoggedIn.next(false)
    );
  }

  async reset(email: string) {
    return await this.http.post(environment.apiUrl + 'auth/reset', { email }).toPromise().then(
      (res: any) => res.password
    );
  }

  isAuthenticated() {
    return this._isLoggedIn;
  }

  async getAuthToken() {
    const data = (await this.storage.get(EStorage.LOGIN));

    if (data) {
      return data.token;
    }

    return null
  }

  //#region private methods

  private async ifLoggedIn() {
    const expiration = await this._getExpiration() < Date.now();
    console.log(expiration);

    if (expiration) {
      this._isLoggedIn.next(true);
    }
  }

  private async _setSession(token: string) {
    const tokenDec = JSON.parse(atob((token.split('.')[1])));
    await this.storage.set(EStorage.LOGIN, { id: tokenDec.id, token, expireAt: tokenDec.exp });
    return true;
  }


  private async _getExpiration() {
    const data = await this.storage.get(EStorage.LOGIN);

    if (data) {
      const expiresAt: number = data.expireAt;
      return expiresAt;
    }

    return NaN;
  }
  //#endregion
}
