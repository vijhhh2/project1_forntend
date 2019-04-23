import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Logout } from 'src/app/auth/actions/auth.actions';
import { Observable } from 'rxjs';
import { selectFirstName } from 'src/app/auth/selectors/auth.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  name: Observable<string>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.name = this.store.pipe(select(selectFirstName));
  }

  navigateToSettings() {
    this.router.navigateByUrl('/dashboard/settings');
  }

  navigateToHome() {
    this.router.navigateByUrl('/dashboard')
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
