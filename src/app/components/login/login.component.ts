import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { tap } from 'rxjs';

import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { BaseApiService } from '../../shared/api/base-api.service';
import { LS_JWT_TOKEN } from '../../shared/api/model/local-storage-variables';

@Component({
  selector: 'app-login',
  imports: [PrimeNgModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(private baseApiService: BaseApiService) {}

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
        .pipe(
          tap((jwtTocken: string) => {
            localStorage.setItem(LS_JWT_TOKEN, jwtTocken);
          })
        )
        .subscribe();
    }
  }
}
