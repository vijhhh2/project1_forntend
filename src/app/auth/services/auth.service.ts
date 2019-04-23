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

    return this.http.post<boolean>(this.url + 'validEmail', {email});
  }
  saveUserProfile(user: User) {
    if (user.password.length > 0) {
      return this.http.post<{message: string, newUser: User}>(this.url + 'saveUserPassword', user);
    } else {
      const newUser: User = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
      console.log(newUser);
      return this.http.post<{message: string, newUser: User}>(this.url + 'saveUser', newUser);
    }
  }
}
