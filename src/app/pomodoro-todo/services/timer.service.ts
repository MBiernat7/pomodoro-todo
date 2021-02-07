import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Timestamp } from '../interface/timestamp';
import { TIMESTAMPS } from '../data/timestampData';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timestampSource$ = new BehaviorSubject<Timestamp>({ name: 'pomodoro', timestamp: 25 });
  timestampsSource$ = new BehaviorSubject<Timestamp[]>(TIMESTAMPS);

  getTimestamps(): Observable<Timestamp[]> {
    return this.timestampsSource$;
  }

  setTimestamp(value: Timestamp) {
    this.timestampSource$.next(value);
  }

  setTimestamps(value: Timestamp[]) {
    this.timestampsSource$.next(value);
  }

  constructor() { }
}
