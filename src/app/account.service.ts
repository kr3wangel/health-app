import { Injectable } from '@angular/core';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  public isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }
}
