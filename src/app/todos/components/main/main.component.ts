import { TodosService } from './../../services/todos.service';
import { TodoInterface } from './../../types/todo.interface';
import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, combineLatestWith } from 'rxjs/operators';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  visibleTodos$: Observable<TodoInterface[]>;
  nodoTodoClass$: Observable<boolean>;
  isAllTodoSelected$: Observable<boolean>;
  editingId: string | null = null;
  constructor(private todosService: TodosService) {
    //for older rxjs version.
    // this.visibleTodos$ = combineLatest(
    //   this.todosService.todo$,
    //   this.todosService.filter$
    // ).pipe(
    //   map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
    //     console.log('combine', todos, filter);
    //     return [];
    //   })
    // );
    this.nodoTodoClass$ = this.todosService.todo$.pipe(
      map((todos) => todos.length === 0)
    );

    this.isAllTodoSelected$ = this.todosService.todo$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
    this.visibleTodos$ = this.todosService.todo$.pipe(
      combineLatestWith(this.todosService.filter$),
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  toggleAllTodo(event: Event) {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  ngOnInit(): void {}
}
