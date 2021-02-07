import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../interface/task';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  task: Task = { id: new Date().getTime(), name: '', pCount: 0, pCurrent: 0, done: false };
  tasks: Task[] = [];

  // Drag and Drop
  draggedItem: any = null;
  draggedItemI: number = 0;
  draggedOnItem: any = null;
  draggedOnItemI: number = 0;

  selectedItem: any;
  taskAddition: boolean = false;

  searchTerm: string;

  taskForm = new FormGroup({
    taskName: new FormControl('', [Validators.minLength(5), Validators.required]),
    taskPomodoros: new FormControl('', [Validators.min(1), Validators.required]),
  });


  constructor(private taskService: TaskService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.taskService.getTasks();
    this.taskService.searchTermSource$.subscribe((searchTerm: string) => this.searchTerm = searchTerm)
  }

  openTA(target: HTMLElement): any {
    this.taskAddition = true;
    setTimeout(() => { target.scrollIntoView({ behavior: 'smooth' }); }, 0)
  }

  addTask(): any {
    if (this.tasks.find(e => e.name === this.task.name)) {
      this.task = { id: new Date().getTime(), name: '', pCount: 0, pCurrent: 0, done: false };
      return alert('Please enter different task name');
    };
    this.tasks.push(this.task);
    this.task = { id: new Date().getTime(), name: '', pCount: 0, pCurrent: 0, done: false };
    this.taskAddition = false;
  }

  editTask(task: Task): void {
    let dialogRef = this.dialog.open(EditModalComponent, { data: { name: task.name, pCount: task.pCount }, width: '450px', height: '350px' });

    dialogRef.afterClosed().subscribe(result => {
      task.name = result[0];
      task.pCount = result[1];
    })
  }

  removeTask(task: Task): any {
    this.tasks = this.tasks.filter(e => e !== task);
  }

  markAsDone(task: Task) {
    task.done = !task.done;
  }

  search(term: string) {
    this.taskService.searchTermSource$.next(term);
  }

  activate(item: any): any {
    this.selectedItem = item;
  }

  clearAll(): any {
    this.tasks = [];
  }

  clearFinished(): any {
    this.tasks = this.tasks.filter(e => { return e.done === false })
  }

  // DRAG AND DROP

  dragStart(e, item, i): any {
    this.draggedItem = item;
    this.draggedItemI = i;
    setTimeout(() => { e.target.style.opacity = '0'; e.target.style.transition = 'ease-in-out .5s' }, 0)
  }

  dragOver(e, item, i) {
    e.preventDefault();
    this.draggedOnItem = item;
    this.draggedOnItemI = i;
  }

  dragEnter(e) {
    e.preventDefault();
  }

  dragEnd(e) {
    e.target.style.opacity = '1';
    e.target.style.transition = 'ease-in-out .5s'
  }

  drop(e) {
    e.preventDefault();
    this.tasks.splice(this.draggedOnItemI, 1, this.draggedItem);
    this.tasks.splice(this.draggedItemI, 1, this.draggedOnItem);
  }
}
