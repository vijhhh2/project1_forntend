import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  Login,
  AuthActionTypes,
  Logout,
  SignupRequest,
  SignupSuccess,
  SignupFailed,
  SaveUserSuccess
} from '../actions/auth.actions';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthService } from '../services/auth.service';
import { SaveUserRequest } from '../../auth/actions/auth.actions';
import { User } from 'src/app/models/user.model';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action =>
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    )
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(action => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    })
  );

  @Effect()
  signup$ = this.actions$.pipe(
    ofType<SignupRequest>(AuthActionTypes.SignupRequest),
    mergeMap(action => {
      return this.authService.signUp(action.payload.user).pipe(
        tap(user => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
          }
        }),
        map(user => new SignupSuccess({ user })),
        tap(user => {
          this.router.navigateByUrl('/dashboard');
          return user;
        }),
        catchError(err => {
          console.log('signup error', err);
          return of(new SignupFailed());
        })
      );
    })
  );

  @Effect()
  saveUser$ = this.actions$.pipe(
    ofType<SaveUserRequest>(AuthActionTypes.SaveUserRequest),
    mergeMap(action => {
      return this.authService.saveUserProfile(action.payload.user)
      .pipe(
        catchError(err => throwError(err))
      );
    }),
    map(data => {
      console.log(data);
      const oldUserData: User = JSON.parse(localStorage.getItem('user'));
      const newUserData: User = {
        ...oldUserData,
        firstName: data.newUser.firstName,
        lastName: data.newUser.lastName,
        email: data.newUser.email
      };
      localStorage.setItem('user', JSON.stringify(newUserData));
      return data.newUser;
    }),
    map(user => new SaveUserSuccess({user}))

  );

  @Effect()
  init$ = defer(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return this.store.dispatch(new Login({ user }));
    } else {
      return this.store.dispatch(new Logout());
    }
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}
}
