import { FilterEnum } from './../../types/filter.enum';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  noTodoClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemLeftText$: Observable<string>;
  filter$: Observable<string>;
  filterEnum = FilterEnum;
  constructor(private todosService: TodosService) {
    this.activeCount$ = this.todosService.todo$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.itemLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );
    this.noTodoClass$ = this.todosService.todo$.pipe(
      map((todos) => todos.length === 0)
    );

    this.filter$ = this.todosService.filter$;
  }

  changeFilter(event: Event, filter: FilterEnum) {
    event.preventDefault();
    this.todosService.changeFilter(filter);
  }

  ngOnInit(): void {}
}
