import {
  HTTP_INTERCEPTORS,
  type HttpErrorResponse,
  type HttpEvent,
  type HttpHandler,
  type HttpInterceptor,
  type HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, first, tap } from 'rxjs';
import { TokenStorageService } from '../services/tokenStorage.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenStorageService.getToken();
    if (token && token.accessToken) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token.accessToken}` },
      });
    }

    return next.handle(req).pipe(
      tap(
        () => {},
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.refreshToken().pipe(
              first(),
              tap(
                () => {
                  req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${
                        this.tokenStorageService.getToken()?.accessToken
                      }`,
                    },
                  });
                  return next.handle(req);
                },
                () => {
                  this.tokenStorageService.removeToken();
                  this.router.navigateByUrl('/login');
                }
              )
            );
          }
        }
      )
    );
  }
}

export const HttpInterceptorProviders = [
  { provede: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
