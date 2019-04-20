import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AuthActionTypes, AuthActions } from '../actions/auth.actions';


export interface AuthState {
isLogged: boolean;
user: User;
}

export const initialState: AuthState = {
  isLogged: false,
  user: null
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.LoginAction:
      return {
        ...state,
        isLogged: true,
        user: action.payload.user
      };

    case AuthActionTypes.LogoutAction:
      return {
        ...state,
        isLogged: false,
        user: null
      };

    default:
      return state;
  }
}
