import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timestamp } from '../../interface/timestamp';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  settingsForm = new FormGroup({
    editPomodoro: new FormControl('', [Validators.required, Validators.min(1)]),
    editShortBreak: new FormControl('', [Validators.required, Validators.min(1)]),
    editLongBreak: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(public dialogRef: MatDialogRef<SettingsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Timestamp[]) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
  }

}
