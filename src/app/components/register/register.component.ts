import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BaseApiService } from '../../shared/base-api.service';
import { RegisterUserRequest } from '../../shared/model/user.model';
import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formGroup!: FormGroup;

  constructor(private baseApiService: BaseApiService, private router: Router) {}

  ngOnInit() {
    this.formGroup = new FormGroup(
      {
        name: new FormControl<string>('', Validators.required),
        phone: new FormControl<string>(''),
        email: new FormControl<string>('', Validators.required),
        password: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32),
        ]),
        repeatPassword: new FormControl<string>('', Validators.required),
      },
      { validators: this.passwordMatchValidator('password', 'repeatPassword') }
    );
  }

  submit() {
    this.formGroup.markAsDirty();
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)?.markAsDirty();
    });
    if (this.formGroup.valid) {
      console.log(this.formGroup);

      this.baseApiService
        .registerUser(this.formGroup.value as RegisterUserRequest)
        .pipe(tap(() => this.router.navigate(['/login'])))
        .subscribe();
    }
  }

  passwordMatchValidator(
    password: string,
    confirmPassword: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        return { passwordMismatch: true };
      } else {
        return null;
      }
    };
  }
}
