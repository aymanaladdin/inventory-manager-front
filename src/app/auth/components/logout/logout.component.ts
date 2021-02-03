import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  }

  confirm() {
    this.authService.logout();
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
