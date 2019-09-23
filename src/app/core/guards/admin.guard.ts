import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenService.getDecodedToken().Permissions === 'Admin') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
