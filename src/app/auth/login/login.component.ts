import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { Login } from '../actions/auth.actions';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { noop, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  users: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form);
    this.authService
      .login(form.value.email, form.value.password)
      .pipe(
        tap(user => {
          this.store.dispatch(new Login({ user }));
          this.router.navigateByUrl('/dashboard');
        }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      )
      .subscribe();
  }
}
