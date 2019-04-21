import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { UserSignup } from 'src/app/models/userSignup.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:5000/users/';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const user = {email, password};
    return this.http.post<User>(this.url + 'login', user);
  }

  signUp(userData: UserSignup) {
    const user = {
      firstName: userData.firstName,
      lastName:  userData.lastName,
      email: userData.email,
      password: userData.password
    };
    return this.http.post<User>(this.url + 'register', user);
  }

  checkEmailIsTaken(email: string) {
    console.log('auth service');
    const email1 = {email};
    return this.http.post<boolean>(this.url + 'validEmail', email1);
  }
}
