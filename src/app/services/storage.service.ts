import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage;

  constructor(
    private storage: Storage
  ) {
    this.init();
   }

   public async set(key: string, value: any) {
     this._storage.set(key, value);
     return { key, value };
   }

   public async get(key: string) {
     return this._storage.get(key);
   }

   public async remove(key: string) {
    this._storage.remove(key);
   }

   async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }


}
