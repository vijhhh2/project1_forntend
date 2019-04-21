import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/utils/mustmatch.validator';
import { UserSignup } from 'src/app/models/userSignup.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { SignupRequest } from '../actions/auth.actions';
import { Observable } from 'rxjs';
import { EmailNotTaken } from '../../utils/emailValidation.validator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signUpErrorMsg: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        firstName: this.fb.control('', Validators.required),
        lastName: this.fb.control('', Validators.required),
        email: this.fb.control(
          '',
          [Validators.required, Validators.email],
          EmailNotTaken.createValidator(this.authService)
        ),
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        confirmPassword: this.fb.control('', [
          Validators.required,
          Validators.minLength(8)
        ])
      },
      {
        validators: MustMatch('password', 'confirmPassword')
      }
    );
  }

  onSubmit(form: FormGroup) {
    console.log(form);
    const user: UserSignup = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      password: form.value.password
    };

    this.store.dispatch(new SignupRequest({ user }));
  }
}
