import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { LoginRequest } from './model/login-request.model';
import {
  LS_JWT_EXPIRES_AT,
  LS_JWT_TOKEN,
} from './model/local-storage-variables';
import { LoginResponse } from './model/login-response.model';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService
  ) {}

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const requestOptions: Object = {};

    return this.httpClient
      .post<LoginResponse>('/auth/login', loginRequest, requestOptions)
      .pipe(
        tap((response: LoginResponse) => {
          localStorage.setItem(LS_JWT_TOKEN, response.jwtToken);
          localStorage.setItem(
            LS_JWT_EXPIRES_AT,
            new Date(response.expiresAt).toISOString()
          );

          this.toastService.showToast({
            text: 'Logged in successfully',
            severity: 'success',
          });
        })
      );
  }

  public logout(): void {
    localStorage.removeItem(LS_JWT_TOKEN);
    localStorage.removeItem(LS_JWT_EXPIRES_AT);
  }

  public getJwtToken(): string {
    return localStorage.getItem(LS_JWT_TOKEN) as string;
  }

  public isLoggedIn() {
    const expiresAt = this.getExpiration();
    return expiresAt && new Date() < expiresAt;
  }

  getExpiration() {
    const expiresAtString = localStorage.getItem(LS_JWT_EXPIRES_AT);
    const expiresAt = expiresAtString ? new Date(expiresAtString) : null;
    return expiresAt;
  }
}
