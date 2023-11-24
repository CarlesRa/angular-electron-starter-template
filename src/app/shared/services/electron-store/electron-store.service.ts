import { Injectable } from '@angular/core';
import * as ElectronStore from 'electron-store';

@Injectable({
  providedIn: 'root'
})
export class ElectronStoreService {
  private store!: ElectronStore;
  constructor() {
    this.setStore();
  }

  private setStore(): void {
    if (window.require) {
      try {
        const storeClass = window.require('electron-store');
        this.store = new storeClass();
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('electron-store was not loaded');
    }
  }

  get<T>(key: string): T {
    return this.store.get(key) as T;
  }

  set<T>(key: string, value: T): void {
    this.store.set(key, value);
  }
}
