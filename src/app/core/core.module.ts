import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatMenuModule, MatSnackBarModule, MatExpansionModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HttpErrorInterceptor } from './services/http-error-interceptor.service';

@NgModule({
  declarations: [NavigationComponent, ActionButtonComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatSnackBarModule,
    MatButtonModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  providers: [
    TokenInterceptorService,
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true
    }
  ],
  exports: [NavigationComponent, ActionButtonComponent]
})
export class CoreModule { }
