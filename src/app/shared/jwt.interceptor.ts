import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { selectCurrentUser } from '../auth/selectors/auth.selector';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

  currentUser: User;

  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('jwt interceptor');
    this.store.pipe(select(selectCurrentUser))
    .subscribe(user => this.currentUser = user);

    if (this.currentUser && this.currentUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.currentUser.token}`
        }
      });
    }

    return next.handle(req);
  }
}
