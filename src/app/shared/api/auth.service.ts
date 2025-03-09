import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { LoginRequest } from './model/login-request.model';
import {
  LS_JWT_EXPIRES_AT,
  LS_JWT_TOKEN,
} from './model/local-storage-variables';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public login(loginRequest: LoginRequest): Observable<string> {
    const requestOptions: Object = {
      responseType: 'text',
      observe: 'response',
    };

    return this.httpClient
      .post<HttpResponse<string>>('/auth/login', loginRequest, requestOptions)
      .pipe(
        map((response) => {
          return response.body!;
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

  //   public isLoggedIn() {
  //     return new Date() < this.getExpiration();
  // }

  //   getExpiration() {
  //     const expiration = localStorage.getItem("expires_at");
  //     const expiresAt = JSON.parse(expiration);
  //     return moment(expiresAt);
  // }
}
