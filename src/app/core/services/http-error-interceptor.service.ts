import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse): Observable<any> => {
          if (request.url.includes(environment.apiUrl) && (error.status === 401 || error.status === 403)) {

            this.authService.logout();

            return throwError(error);
          }

          return throwError(error);;
        })
      );
  }
}
