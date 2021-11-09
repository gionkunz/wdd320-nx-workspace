import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateTodoItem, TodoItem, UpdateTodoDone } from '@sae-nx-workspace/api-interfaces';

@Component({
  selector: 'sae-nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todoItems$ = this.http.get<TodoItem[]>('/api/todos');
  constructor(private http: HttpClient) {}

  onAddItem(createTodoItem: CreateTodoItem) {
    this.http.post<TodoItem>('/api/todos', createTodoItem).subscribe(createdItem => {
      this.todoItems$ = this.http.get<TodoItem[]>('/api/todos');
    });
  }

  onDeleteItem(itemId: string) {
    this.http.delete(`/api/todos/${itemId}`).subscribe(() => {
      this.todoItems$ = this.http.get<TodoItem[]>('/api/todos');
    });
  }

  onUpdateItemDone(update: UpdateTodoDone) {
    this.http.put(`/api/todos/${update.id}`, {done: update.done}).subscribe(() => {
      this.todoItems$ = this.http.get<TodoItem[]>('/api/todos');
    });
  }
}
