import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';
import { environment } from '../../../environments/environment';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public tokenService: TokenService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.tokenService.getToken() &&
      request.url.indexOf(environment.api) !== -1
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.tokenService.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
