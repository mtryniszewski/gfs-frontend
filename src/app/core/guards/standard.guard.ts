import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';

@Injectable()
export class StandardGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenService.getDecodedToken().Permissions === 'Standard') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
