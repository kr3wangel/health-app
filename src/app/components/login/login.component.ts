import { Component, OnInit } from '@angular/core';
import { UserService } from '../../users.service';
import { Router } from '@angular/router';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(private userService: UserService, private account: AccountService, private router: Router) {
  }

  ngOnInit() {
  }


  tryLogin() {
    this.userService.login(
      this.username,
      this.password
    )
      .subscribe(r => {
        if (r.token) {
          this.account.setToken(r.token);
          this.router.navigateByUrl('/dashboard');
        }
      },
        r => {
          alert(r.error.error);
        });
  }

}
