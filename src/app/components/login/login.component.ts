import { Component, OnInit } from '@angular/core';
import { UserService } from '../../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }


}
