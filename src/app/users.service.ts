import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>('https://reqres.in/api/login', {
      email: email,
      password: password
    });
  }

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }

  public editUser(user: User) {
    this.http.post(`${this.baseUrl}/users/update`, user)
      .subscribe(editedUser => {
        localStorage.setItem('user', JSON.stringify(editedUser));
        console.log(`successfully updated`);
      });
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  public deleteUser(userId: number) {
    this.http.delete(`${this.baseUrl}/users/${userId}`)
      .subscribe(x => {
        console.log(`${userId} successfully deleted`);
      });
  }
}
