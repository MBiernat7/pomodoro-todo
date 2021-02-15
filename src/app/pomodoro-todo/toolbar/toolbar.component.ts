import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TimerService } from '../services/timer.service';
import { Timestamp } from '../interface/timestamp';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  timestamps: Timestamp[];
  @Output() updateView = new EventEmitter<any>();

  subscription: Subscription = new Subscription();

  constructor(private timerService: TimerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    const sub1 = this.timerService.getTimestamps().subscribe(
      (data: Timestamp[]) => {
        this.timestamps = data;
      }
    );
    this.subscription.add(sub1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openSettings(): any {
    let dialogRef = this.dialog.open(SettingsModalComponent, { data: this.timestamps, width: '450px', height: '410px' });

    dialogRef.afterClosed().subscribe((result: Timestamp[]) => {
      this.timerService.setTimestamps(result);
      this.updateView.emit(null);
    })
  }

}
