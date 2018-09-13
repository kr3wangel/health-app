import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/user';
import { UserService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth0Options = {
    theme: {
      primaryColor: '#000'
    },
    // additionalSignUpFields: [
    //   {
    //   name: 'first_name',
    //   placeholder: 'First Name',
    //   },
    //   {
    //   name: 'last_name',
    //   placeholder: 'Last Name'
    //   }
    // ],
    auth: {
      redirectUrl: environment.auth0.callbackUrl,
      responseType: 'token id_token',
      audience: `https://${environment.auth0.domain}/userinfo`,
      params: {
        scope: 'openid profile email'
      }
    },
    autoclose: true,
    oidcConformant: true,
  };

  lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.auth0Options
  );

  public _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private userService: UserService, private router: Router) {
    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }

        localStorage.setItem('token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));

        const auth0ProfileResult = JSON.parse(localStorage.getItem('profile'));
        const user = <User>({
          oAuthId: auth0ProfileResult.sub.split('|')[1],
          username: auth0ProfileResult.email
        });

        this.setUser(user);
      });
    });

    this.lock.on('authorization_error', error => {
      console.log('something went wrong', error);
    });
  }

  public login() {
    this.lock.show();
  }

  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._user.next(<User>({}));
    this.router.navigate(['/']);
  }

  public isAuthenticated() {
    return tokenNotExpired();
  }

  get user(): Observable<User> {
    return this._user.asObservable();
  }

  public setUser(oAuthUser: User) {
    // addUser will ether add or return a user based on oAuthId
    this.userService.addUser(oAuthUser)
      .subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user[0]));
        this._user.next(user);

        this.router.navigate(['/profile']);
      });
  }
}
