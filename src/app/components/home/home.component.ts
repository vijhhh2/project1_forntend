import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Logout } from 'src/app/auth/actions/auth.actions';
import { selectFirstName } from 'src/app/auth/selectors/auth.selector';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  firstName: Observable<string>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.firstName = this.store.pipe(
      select(selectFirstName)
    );
  }

  logOut() {
    this.store.dispatch(new Logout());
  }

}
