import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { UserService } from '../_services/index';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService) { }

  navItems = [
    {name: 'User', route: '/user'},
    {name: 'Role', route: '/role'},
    {name: 'Waf Node', route: '/node'},
    {name: 'Group', route: '/group'}
  ];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe(users => {
    //     this.users = users;
    //   });
  }

}
