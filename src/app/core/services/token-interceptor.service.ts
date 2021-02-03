import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AlertService } from './alert.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  apiUrl = environment.apiUrl;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
  ) { }

  private refreshToken(refreshToken: string) {
    const headers: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${refreshToken}` });

    return this.httpClient.get<any>(`${this.apiUrl}/api/auth/refresh-token`, { headers })
      .pipe(
        map(resp => {
          const { accessToken, refreshToken } = resp;

          if (accessToken && refreshToken) {
            this.authService.setTokens({ accessToken, refreshToken });
            this.authService.setUser(accessToken);
          }

          return accessToken;
        }),
        catchError(err => throwError(err))
      );
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes(environment.apiUrl) && !request.url.includes('login')) {
      const accessToken = this.authService.getAccessToken();

      if (!accessToken) return next.handle(request);

      if (this.authService.jwtHelper.isTokenExpired(accessToken)) {
        const refreshToken = this.authService.getRefreshToken();

        if (!refreshToken) return next.handle(request);

        return this.refreshToken(refreshToken)
          .pipe(
            switchMap(newToken => {
              request = request.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });

              return next.handle(request);
            })
          );
      }

      else {
        request = request.clone({ setHeaders: { 'Authorization': `Bearer ${accessToken}` } });
        return next.handle(request);
      }
    }

    // pass through any requests not handled above
    return next.handle(request);
  }
}



