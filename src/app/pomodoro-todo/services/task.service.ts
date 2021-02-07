import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TASKS } from '../data/taskData';
import { Task } from '../interface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  searchTermSource$ = new Subject<string>();

  constructor() { }

  getTasks(): Task[] {
    return TASKS;
  }

}
