import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './pomodoro-todo/toolbar/toolbar.component';
import { TimerDisplayComponent } from './pomodoro-todo/timer-display/timer-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './pomodoro-todo/materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounterDirective } from './pomodoro-todo/directives/counter.directive';
import { TaskListComponent } from './pomodoro-todo/task-list/task-list.component';
import { EditModalComponent } from './pomodoro-todo/task-list/edit-modal/edit-modal.component';
import { SearchTaskPipe } from './pomodoro-todo/pipes/search-task.pipe';
import { SettingsModalComponent } from './pomodoro-todo/toolbar/settings-modal/settings-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TimerDisplayComponent,
    CounterDirective,
    TaskListComponent,
    EditModalComponent,
    SearchTaskPipe,
    SettingsModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
