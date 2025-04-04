import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { LoginRequest } from './model/login-request.model';
import {
  LS_JWT_EXPIRES_AT,
  LS_JWT_TOKEN,
  LS_USER_ID,
} from './model/local-storage-variables';
import { LoginResponse } from './model/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    this.logout();
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
          localStorage.setItem(LS_USER_ID, response.userId.toString());
        })
      );
  }

  public logout(): void {
    localStorage.removeItem(LS_JWT_TOKEN);
    localStorage.removeItem(LS_JWT_EXPIRES_AT);
    localStorage.removeItem(LS_USER_ID);
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
