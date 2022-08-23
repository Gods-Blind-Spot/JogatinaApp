import { EStorage } from './../enum/storate.enum';
import { StorageService } from './storage.service';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private storage: StorageService,
    private http: HttpClient
  ) { }

  async login(email: string, password: string) {
    const data = await this.http.post<{ token: string }>(environment.apiUrl + 'auth/login', { email, password }).toPromise();
    return this._setSession(data.token);
  }

  logout() {
    this.storage.remove(EStorage.LOGIN);
  }

  async isLoggedIn() {
    return await this._getExpiration() < Date.now();
  }

  //#region private methods

  private _setSession(token: string) {

    const tokenDec = JSON.parse(atob((token.split('.')[1])));
    this.storage.set(EStorage.LOGIN, { id: tokenDec.id, token, expireAt: tokenDec.exp });
    return true;
  }


  private async _getExpiration() {
    const expiresAt: number = (await this.storage.get(EStorage.LOGIN) as LoginData).expireAt;

    return expiresAt;
  }

  //#endregion
}
