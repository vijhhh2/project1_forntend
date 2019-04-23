import { User } from 'src/app/models/user.model';
import { AuthActionTypes, AuthActions } from '../actions/auth.actions';


export interface AuthState {
isLogged: boolean;
user: User;
loading: boolean;
}

export const initialState: AuthState = {
  isLogged: false,
  user: null,
  loading: false
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.LoginAction:
      return {
        ...state,
        isLogged: true,
        loading: false,
        user: action.payload.user
      };

    case AuthActionTypes.LogoutAction:
      return {
        ...state,
        loading: false,
        isLogged: false,
        user: null
      };
    case AuthActionTypes.SignupRequest:
    return {
      ...state,
      loading: true
    };
    case AuthActionTypes.SignupSuccess:
    return {
      ...state,
      isLogged: true,
      user: action.payload.user,
      loading: false
    };
    case AuthActionTypes.SignupFailed:
    return {
      ...state,
      isLogged: false,
      user: null,
      loading: false
    };

    case AuthActionTypes.SaveUserRequest:
    return {
      ...state,
      loading: true
    };

    case AuthActionTypes.SaveUserSuccess:
    return {
      ...state,
      isLogged: true,
      loading: false,
      user: {
        ...state.user,
        firstName: action.payload.user.firstName,
        lastName: action.payload.user.lastName,
        email: action.payload.user.email,
      }
    };

    default:
      return state;
  }
}
