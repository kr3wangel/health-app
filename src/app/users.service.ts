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

  public getUser(userId: number) {
    this.http.get<User>(`${this.baseUrl}/users/${userId}`)
      .subscribe(user => {
        console.log(`${user.firstName} was successfully retrieved`);
      });
  }

  public editUser(user: User) {
    this.http.post(`${this.baseUrl}/users`, user)
      .subscribe(x => {
        console.log(`${user.userId} successfully updated`);
      });
  }

  public addUser(user: User) {
    this.http.post(`${this.baseUrl}/users`, user)
      .subscribe(x => {
        console.log(`${user.username} was created successfully`);
      });
  }

  public deleteUser(userId: number) {
    this.http.delete(`${this.baseUrl}/users/${userId}`)
      .subscribe(x => {
        console.log(`${userId} successfully deleted`);
      });
  }
}
