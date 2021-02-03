import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogoutComponent } from 'src/app/auth/components/logout/logout.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Input() currentUser: any;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.currentUser.name);

  }

  logout() {
    this.dialog.open(LogoutComponent, {
      width: '500px',
    });
  }
}
