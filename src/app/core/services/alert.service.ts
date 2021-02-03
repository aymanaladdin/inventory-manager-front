import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  constructor(
    public snackBar: MatSnackBar
  ) { }

  snackbar(message: string, action?: string | null | undefined, duration?: number | undefined): void {
    this.snackBar.open(message, action ? action : 'Dismiss', duration ? { duration } : undefined);
  }
}
