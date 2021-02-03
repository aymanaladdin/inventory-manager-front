import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  saveUser(token: any) {
    throw new Error('Method not implemented.');
  }
  getUser() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = environment.apiUrl;
  jwtHelper: JwtHelperService;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
    this.currentUser = this.currentUserSubject.asObservable();
    this.jwtHelper = new JwtHelperService();
  }

  public getCurrentUser(): any {
    try {
      const res: string | null = localStorage.getItem('user');

      if (!res) throw new Error('Error parsing user');

      const user = JSON.parse(res);

      return user;
    }
    catch (err) {
      this.clearLoginSession();

      return undefined;
    }
  }

  public clearLoginSession(): void {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('user');

    this.currentUserSubject.next(null);
  }

  public setUser(accessToken: string) {
    const decoded: any = this.jwtHelper.decodeToken(accessToken);
    const { user } = decoded;

    if (!user) throw new Error('No user found!');

    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public getAccessToken() {
    const accessToken: string | null = localStorage.getItem('access-token');

    if (!accessToken) return undefined;

    return accessToken
  }

  public getRefreshToken() {
    const refreshToken: string | null = localStorage.getItem('refresh-token');

    if (!refreshToken || this.jwtHelper.isTokenExpired(refreshToken)) return undefined;

    return refreshToken;
  }

  public setTokens({ accessToken, refreshToken }: { accessToken: string, refreshToken: string }) {
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
  }

  public login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/api/auth/login`, { username, password })
      .pipe(map(resp => {
        const { accessToken, refreshToken } = resp;

        if (accessToken && refreshToken) {
          this.setTokens({ accessToken, refreshToken });
          this.setUser(accessToken);
        }

        return resp;
      }));
  }

  public logout() {
    this.http.post<any>(`${this.baseUrl}/api/auth/logout`, {})
      .toPromise()
      .then(res => {
        this.clearLoginSession();
        this.router.navigate(['/auth/login']);
      })
      .catch(err => {
        console.log('Failed while logging user out!', err);
      });
  }
}
