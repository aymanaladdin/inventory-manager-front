import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventory-manager-front';
  currentUser: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser
      .subscribe((user) => {
        this.currentUser = user;
        console.log(this.currentUser);
      });
  }
}
