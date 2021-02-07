import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
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
  isActive: number = 1;

  //
  subscription: Subscription = new Subscription();
  timestamps: Timestamp[];
  flag: boolean = false;
  value: any;

  // Countdown Timer
  nowTime = new Date().getTime();
  endTime = new Date().getTime();
  counter = 0;
  interval = 1000;

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
        this.activate2();
        this.value = this.counter;
      }
    } else {
      if (value <= 0) {
        this.activate1();
        this.value = this.counter;
      }
    }
  }

  activate1(): void {
    this.flag = false;
    this.timerService.setTimestamp(this.timestamps[0])
    this.counter = (this.endTime + this.timerService.timestampSource$.value.timestamp * 60) - this.nowTime;
    this.isActive = 1;
  }

  activate2(): void {
    this.flag = false;
    this.timerService.setTimestamp(this.timestamps[1]);
    this.counter = (this.endTime + this.timerService.timestampSource$.value.timestamp * 60) - this.nowTime;
    this.isActive = 2;
  }

  activate3(): void {
    this.flag = false;
    this.timerService.setTimestamp(this.timestamps[2]);
    this.counter = (this.endTime + this.timerService.timestampSource$.value.timestamp * 60) - this.nowTime;
    this.isActive = 3;
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
