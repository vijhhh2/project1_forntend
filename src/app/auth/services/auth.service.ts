import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:5000/users/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const user = {email, password};
    return this.http.post<User>(this.url, user);
  }
}
