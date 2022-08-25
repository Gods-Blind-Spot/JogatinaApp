import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Promise<Storage>;

  constructor(
    private storage: Storage
  ) {
    this.init();
   }

   public async set(key: string, value: any) {
     (await this._storage).set(key, value);
     return { key, value };
   }

   public async get(key: string) {
     return (await this._storage).get(key);
   }

   public async remove(key: string) {
    (await this._storage).remove(key);
   }

   async init() {
    const storage = this.storage.create();
    this._storage = storage;
  }
}
