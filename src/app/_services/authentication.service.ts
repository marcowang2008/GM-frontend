import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';
import { User } from '../_models/index';

@Injectable()
export class AuthenticationService extends BaseService {
  public token: string;
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {
    // set token if saved in local storage
    super();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    const url = this.BASE_URL + '/login';
    return this.http
      .post(url, JSON.stringify({ User: username, Password: password }), {headers: this.headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token = response.json() && response.json().sid;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  // login(username: string, password: string): Promise<User> {
  //   let url = this.BASE_URL + '/login';
  //   return this.http
  //     .post(url, JSON.stringify({ User: username, Password: password }), {headers: this.headers})
  //     .toPromise()
  //     .then(res => {
  //       let sid = res.json() && res.json().sid;
  //       console.log(sid);
  //       console.log(res.json());
  //       if(sid) { // login succeed
  //         alert('logged in');
  //       } else {
  //         alert('failed to log in');
  //       }
  //     })
  //     .catch(this.handleError);
  // }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
