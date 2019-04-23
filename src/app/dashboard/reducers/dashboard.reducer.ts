import { Action } from '@ngrx/store';


export interface DashboardState {

}

export const initialState: DashboardState = {

};

export function reducer(state = initialState, action: Action): DashboardState {
  switch (action.type) {

    default:
      return state;
  }
}
