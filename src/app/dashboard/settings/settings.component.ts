import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MustMatch } from 'src/app/utils/mustmatch.validator';
import { User } from 'src/app/models/user.model';
import { selectCurrentUser, selectLoading } from 'src/app/auth/selectors/auth.selector';
import { tap } from 'rxjs/operators';
import { SaveUserRequest } from '../../auth/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  saveUserForm: FormGroup;

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private as: AuthService
  ) {}

  ngOnInit() {
    this.saveUserForm = this.fb.group(
      {
        firstName: this.fb.control('', Validators.required),
        lastName: this.fb.control('', Validators.required),
        email: this.fb.control(
          '',
          [Validators.required, Validators.email],
        ),
        password: this.fb.control('', [
          Validators.minLength(8)
        ]),
        confirmPassword: this.fb.control('', [
          Validators.minLength(8)
        ])
      },
      {
        validators: MustMatch('password', 'confirmPassword')
      }
    );

    // select current user
    this.store.pipe(
      select(selectCurrentUser),
      tap(user => this.saveUserForm.patchValue(user))
      ).subscribe();
    // select loading state
    this.loading$ = this.store.pipe(
      select(selectLoading),
      );
  }

  onSubmit(form: FormGroup) {
    console.log(form);
    let updatedUser: User;

    this.store.pipe(
      select(selectCurrentUser),
      tap(user => {
         updatedUser = {
          id: user.id,
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          email: form.value.email,
          password: form.value.password
        };
         return user;
      })
      ).subscribe();

    // this.as.saveUserProfile(updatedUser).subscribe(
    //     (user) => console.log(user)
    //   );

    this.store.dispatch(new SaveUserRequest({ user: updatedUser }));
  }

}
