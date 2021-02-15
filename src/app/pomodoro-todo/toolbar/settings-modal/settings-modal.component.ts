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

  timestamps: Timestamp[];
  pomodoro: Timestamp = this.data[0];
  shortBreak: Timestamp = this.data[1];
  longBreak: Timestamp = this.data[2];

  settingsForm = new FormGroup({
    editPomodoro: new FormControl('', [Validators.required, Validators.min(1), Validators.max(60)]),
    editShortBreak: new FormControl('', [Validators.required, Validators.min(1), Validators.max(60)]),
    editLongBreak: new FormControl('', [Validators.required, Validators.min(1), Validators.max(60)]),
  });

  constructor(public dialogRef: MatDialogRef<SettingsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Timestamp[]) { }

  ngOnInit(): void {
    this.timestamps = [
      { name: 'pomodoro', timestamp: this.data[0].timestamp },
      { name: 'shortBreak', timestamp: this.data[1].timestamp },
      { name: 'longBreak', timestamp: this.data[2].timestamp }
    ]
  }

  onCancel() {
    this.dialogRef.close(this.timestamps);
  }

}
