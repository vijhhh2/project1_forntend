import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectFirstName = createSelector(
  selectAuthState,
  authState => {
    if(authState.user !== null) {
      return authState.user.firstName;
    }
  }
);

export const selectIsLogged = createSelector(
  selectAuthState,
  authState => authState.isLogged
);
