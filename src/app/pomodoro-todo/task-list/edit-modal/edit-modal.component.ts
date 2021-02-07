import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../interface/task';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  task: Task = { id: new Date().getTime(), name: '', pCount: 0, pCurrent: 0, done: false };

  editForm = new FormGroup({
    editName: new FormControl('', [Validators.minLength(5), Validators.required]),
    editPomodoros: new FormControl('', [Validators.required, Validators.min(1)]),
  });


  constructor(public dialogRef: MatDialogRef<EditModalComponent>, @Inject(MAT_DIALOG_DATA) public data: Task) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
