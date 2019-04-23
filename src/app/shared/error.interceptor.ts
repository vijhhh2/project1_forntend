import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('error interceptor');
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          this.snackBar.open(err.error.message, 'ok', {duration: 5000});
        }
        if (err.statusText === 'Unauthorized') {
          this.snackBar.open('Please login', 'ok', {duration: 5000});
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }

}
