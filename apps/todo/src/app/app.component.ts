import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateTodoItem, TodoItem, UpdateTodoDone } from '@sae-nx-workspace/api-interfaces';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sae-nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todoItems$ = new BehaviorSubject<TodoItem[]>([]);

  constructor(private http: HttpClient) {
    this.getItemsFromServer();
  }

  getItemsFromServer() {
    this.http.get<TodoItem[]>('/api/todos').subscribe(items => this.todoItems$.next(items));
  }

  onAddItem(createTodoItem: CreateTodoItem) {
    this.http.post<TodoItem>('/api/todos', createTodoItem)
      .subscribe(() => this.getItemsFromServer());
  }

  onDeleteItem(itemId: string) {
    this.http.delete(`/api/todos/${itemId}`)
      .subscribe(() => this.getItemsFromServer());
  }

  onUpdateItemDone(update: UpdateTodoDone) {
    this.http.put(`/api/todos/${update.id}`, {done: update.done})
      .subscribe(() => this.getItemsFromServer());
  }
}
