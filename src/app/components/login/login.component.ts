import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { tap } from 'rxjs';

import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { BaseApiService } from '../../shared/api/base-api.service';
import { LoginResponse } from '../../shared/api/model/login-response.model';

@Component({
  selector: 'app-login',
  imports: [PrimeNgModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(private baseApiService: BaseApiService, private router: Router) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }

  public submit() {
    this.formGroup.markAsDirty();
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)?.markAsDirty();
    });
    if (this.formGroup.valid) {
      this.baseApiService
        .login(this.formGroup.value)
        .pipe(tap(() => this.router.navigate(['/inbox'])))
        .subscribe();
    }
  }

  public onRegisterClick() {
    this.router.navigate(['/register']);
  }
}
