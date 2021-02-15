import { Component, DoCheck, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { Timestamp } from '../interface/timestamp';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer-display',
  templateUrl: './timer-display.component.html',
  styleUrls: ['./timer-display.component.scss']
})
export class TimerDisplayComponent implements OnInit, OnDestroy, DoCheck {

  // Progress spinner
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  valueSpinner = 100;

  // Active timestamp
  isActive: number = 0;

  //
  subscription: Subscription = new Subscription();
  timestamps: Timestamp[];
  flag: boolean = false;
  value: any = this.timerService.timestampSource$.value.timestamp;

  // Countdown Timer
  nowTime = new Date().getTime();
  endTime = new Date().getTime();
  counter = this.timerService.timestampSource$.value.timestamp;
  interval = 1000;
  @Output() updatePCount = new EventEmitter<any>();

  constructor(private timerService: TimerService) { }

  ngOnInit(): void {
    const sub1 = this.timerService.getTimestamps().subscribe(
      (data: Timestamp[]) => {
        this.timestamps = data;
      }
    );
    this.timerService.setTimestamp(this.timestamps[0]);
    this.counter = (this.endTime + this.timerService.timestampSource$.value.timestamp * 60) - this.nowTime;
    this.subscription.add(sub1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngDoCheck(): void {
    this.isFinished(this.value);
  }

  isFinished(value: number) {
    if (this.timerService.timestampSource$.value.timestamp === this.timestamps[0].timestamp) {
      if (value <= 0) {
        this.isActive = 1;
        this.activate();
        this.value = this.counter;
        this.updatePCount.emit(null);
      }
    } else {
      if (value <= 0) {
        this.isActive = 0;
        this.activate();
        this.value = this.counter;
      }
    }
  }

  activate(): void {
    this.flag = false;
    this.timerService.setTimestamp(this.timestamps[this.isActive])
    this.counter = (this.endTime + this.timerService.timestampSource$.value.timestamp * 60) - this.nowTime;
  }

  startTimer() {
    this.value = this.counter;
    this.flag = true;
  }

  stopTimer() {
    this.counter = this.value;
    this.flag = false;
  }

}
