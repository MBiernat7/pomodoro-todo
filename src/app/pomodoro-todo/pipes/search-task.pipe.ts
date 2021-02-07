import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTask'
})
export class SearchTaskPipe implements PipeTransform {

  transform(tasks: any, term: string): any {
    if (!tasks) return [];
    if (!term) return tasks;
    return tasks.filter(e => {
      return e.name.toLocaleLowerCase().match(term.toLocaleLowerCase());
    })
  }

}
