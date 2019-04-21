import { AbstractControl } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { map } from 'rxjs/operators';

export class EmailNotTaken {
  static createValidator(authService: AuthService) {
    return (control: AbstractControl) => {
      return authService.checkEmailIsTaken(control.value)
      .pipe(
        map(res => {
          console.log(res);
          return res ? {emailTaken: true} : null;
        })
      );
    };
  }
}
