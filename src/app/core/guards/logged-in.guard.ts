import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenService.isToken()) {
      return true;
    } else {
      this.router.navigate(['/auth']);
    }
    return false;
  }
}
