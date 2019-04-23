import { AbstractControl } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { map, filter, debounceTime, delay, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
    // let value: string;
    // return (control: AbstractControl) => {
    //   control.valueChanges.pipe(
    //     filter(val => val.length > 2),
    //     debounceTime(500)
    //   ).subscribe(val => value = val);
    //   return authService.checkEmailIsTaken(value)
    //   .pipe(
    //     map(res => {
    //       console.log(res);
    //       return res ? {emailTaken: true} : null;
    //     })
    //   );
    // };
