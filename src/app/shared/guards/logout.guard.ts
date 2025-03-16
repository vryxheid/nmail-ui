import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../api/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    }
    return true;
  }
}
