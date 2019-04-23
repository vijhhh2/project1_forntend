import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UserSignup } from 'src/app/models/userSignup.model';

export enum AuthActionTypes {
  LoginAction = '[Login] Action',
  LogoutAction = '[Logout] Action',
  SignupRequest = '[Signup] Signup Request',
  SignupSuccess = '[Signup] Signup Success',
  SignupFailed = '[Signup] Signup Failed',
  SaveUserRequest = '[Settings] Save User Request Action',
  SaveUserSuccess = '[Settings] Save User Success Action',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: {user: User}) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export class SignupRequest implements Action {
  readonly type = AuthActionTypes.SignupRequest;

  constructor(public payload: {user: UserSignup}) {}
}

export class SignupSuccess implements Action {
  readonly type = AuthActionTypes.SignupSuccess;

  constructor(public payload: {user: User}) {}
}

export class SignupFailed implements Action {
  readonly type = AuthActionTypes.SignupFailed;
}

export class SaveUserRequest implements Action {
  readonly type = AuthActionTypes.SaveUserRequest;

  constructor(public payload: {user: User}) {}
}

export class SaveUserSuccess implements Action {
  readonly type = AuthActionTypes.SaveUserSuccess;

  constructor(public payload: {user: User}) {}
}


export type AuthActions =
| Login
| Logout
| SignupRequest
| SignupSuccess
| SignupFailed
| SaveUserRequest
| SaveUserSuccess;
