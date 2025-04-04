import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { tap } from 'rxjs';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { BaseApiService } from '../../shared/api/base-api.service';
import { RegisterUserRequest } from '../../model/user.model';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, PrimeNgModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public formGroup!: FormGroup;

  constructor(
    private baseApiService: BaseApiService,
    private router: Router,
    private toastService: ToastService
  ) {}

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

  public submit() {
    this.formGroup.markAsDirty();
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)?.markAsDirty();
    });
    if (this.formGroup.valid) {
      const { email, name, phone, password } = this.formGroup.value;
      const user: RegisterUserRequest = {
        email: email,
        name: name.length > 0 ? name : null,
        phone: phone.length > 0 ? phone : null,
        id: 0,
        password: password,
        lastLogIn: null,
        superAdmin: false,
      };
      this.baseApiService
        .registerUser(user)
        .pipe(
          tap(() => {
            this.toastService.showToast({
              text: 'User registered successfully',
              severity: 'success',
            });
            this.router.navigate(['/login']);
          })
        )
        .subscribe();
    }
  }

  private passwordMatchValidator(
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

  onSignInClick() {
    this.router.navigate(['/login']);
  }
}
