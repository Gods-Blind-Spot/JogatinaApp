import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService
  ) {

  }

  canActivate(): boolean {
    return this.authService.isAuthenticated().value;
  }

}
