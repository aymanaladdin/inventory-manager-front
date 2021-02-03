import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean | undefined;
  returnUrl: string;
  hidePassword = true;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';

  }

  ngOnInit() {
    if (this.authService.getCurrentUser()) {
      this.router.navigate(['products']);
    }
  }

  onSubmit() {
    this.loading = true;
    const loginForm = this.loginForm.value;
    this.authService.login(loginForm.username, loginForm.password)
      .pipe(first())
      .toPromise()
      .then((resp) => {
        this.router.navigate([this.returnUrl]);
        this.loading = false;
      })
      .catch((error: { status: any; statusText: any; }) => {

        this.alertService.snackbar(`Failed to login. Error ${error.status} - ${error.statusText}`, null, 3000);
        this.loading = false;
      });
  }

}
