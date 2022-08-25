import { EStorage } from '../enum/all.enum';
import { Storage } from '@ionic/storage-angular';
import { ApiError } from './../interfaces/api-error';
import { UserDetails } from './../interfaces/user-details';
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
          Authorization: `Bearer ${this.token}`,
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
          Authorization: `Bearer ${this.token}`,
        }
      )
    };

    console.log('Getting to: ', environment.apiUrl + route);
    const request = await this.http.get(environment.apiUrl + route, httpOptions).toPromise();

    return request;
  }
}
