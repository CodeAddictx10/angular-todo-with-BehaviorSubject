import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { TodoInterface } from '../types/todo.interface';

@Injectable()
export class TodosService {
  todo$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addTodo(text: string) {
    const newTodo: TodoInterface = {
      id: Math.random().toString(16),
      text,
      isCompleted: false,
    };
    const updatedTodos = [...this.todo$.getValue(), newTodo];
    this.todo$.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todo$.getValue().map((todo) => {
      return { ...todo, isCompleted };
    });
    this.todo$.next(updatedTodos);
  }
  changeFilter(filter: FilterEnum): void {
    this.filter$.next(filter);
  }
  changeTodo(id: string, text: string): void {
    const updatedTodos = this.todo$.getValue().map((todo) => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
    this.todo$.next(updatedTodos);
  }
  toggleTodo(id: string): void {
    const updatedTodos = this.todo$.getValue().map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    this.todo$.next(updatedTodos);
  }
  removeTodo(id: string): void {
    const updatedTodos = this.todo$.getValue().filter((todo) => todo.id !== id);
    this.todo$.next(updatedTodos);
  }
}
