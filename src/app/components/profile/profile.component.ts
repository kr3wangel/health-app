import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { User } from '../../models/user';
import { UserService } from '../../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.authService.user
      .subscribe(profile => {
        this.user = profile;
      });

  }

  public save() {
    debugger;
    this.userService.editUser(this.user);
  }

}
