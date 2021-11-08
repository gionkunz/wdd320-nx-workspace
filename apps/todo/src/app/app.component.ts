import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from '@sae-nx-workspace/api-interfaces';

@Component({
  selector: 'sae-nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todoItems$ = this.http.get<TodoItem[]>('/api/todos');
  constructor(private http: HttpClient) {}
}
