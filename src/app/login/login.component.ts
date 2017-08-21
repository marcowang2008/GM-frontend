import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MdSnackBar} from '@angular/material';

import { AuthenticationService } from '../_services/index';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public snackBar: MdSnackBar,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login(username: string, password: string) {
    // this.authenticationService.login(username, password).then(res => {
    //   let sid = res.json() && res.json().sid;
    //   console.log(sid);
    //   console.log(res.json());
    //   if(sid) { // login succeed
    //     alert('logged in');
    //   } else {
    //     alert('failed to log in');
    //   }
    // });

    this.authenticationService.login(username, password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['home']);
        } else {
          this.snackBar.open('failed to login', 'password error', {
            duration: 2000
          });
        }
      });


  }

}
