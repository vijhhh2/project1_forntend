import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export enum DashboardActionTypes {
  SaveUserRequest = '[Settings] Save User Action',
}

export class SaveUserRequest implements Action {
  readonly type = DashboardActionTypes.SaveUserRequest;

  constructor(public payload: {user: User}) {}
}


export type DashboardActions = SaveUserRequest;
