import { Component, OnInit } from '@angular/core';
import { UserService } from '../../users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser(10);
  }

  public register() {
    const user = <User>({
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
    });
    this.userService.addUser(user);
  }

}
