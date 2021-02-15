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

  task: Task;
  taskId = this.data.id;
  taskName = this.data.name;
  taskPCount = this.data.pCount;
  taskPCurrent = this.data.pCurrent;
  taskInProgress = this.data.inProgress;
  taskDone = this.data.done;

  editForm = new FormGroup({
    editName: new FormControl('', [Validators.minLength(5), Validators.required]),
    editPomodoros: new FormControl('', [Validators.required, Validators.min(1)]),
  });


  constructor(public dialogRef: MatDialogRef<EditModalComponent>, @Inject(MAT_DIALOG_DATA) public data: Task) { }

  ngOnInit(): void {
    this.task = { id: this.data.id, name: this.data.name, pCount: this.data.pCount, pCurrent: this.data.pCurrent, inProgress: this.data.inProgress, done: this.data.done };
  }

  onCancel(): void {
    this.dialogRef.close(this.data);
  }


}
