import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataUtilsService {

  static toBoolean(str: string) {
    if (str.toLowerCase() === 'true') {
      return true;
    }

    return false;
  }
}
