import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTodoItem, TodoItem } from '@sae-nx-workspace/api-interfaces';

@Controller('todos')
export class AppController {
  todos: Record<string, TodoItem> = {
    '1': {
      id: '1',
      title: 'Item 1',
      done: false
    },
    '2': {
      id: '2',
      title: 'Item 2',
      done: false
    },
    '3': {
      id: '3',
      title: 'Item 3',
      done: false
    }
  };

  // GET /api/todos
  @Get()
  getTodos(): TodoItem[] {
    return Object.values(this.todos);
  }

  // GET /api/todos/21321321
  @Get(':id')
  getTodo(@Param('id') id: string): TodoItem {
    return this.todos[id];
  }

  // GET /api/todos
  @Post()
  createTodo(@Body() {title}: CreateTodoItem): TodoItem {
    const id = '' + Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
    this.todos[id] = {
      id,
      title,
      done: false
    };
    return this.todos[id];
  }

  // POST /api/todos/1619990885576140
  @Post(':id')
  updateTodo(@Param('id') id: string, @Body() updateTodoItem: Partial<TodoItem>): TodoItem {
    this.todos[id] = {
      ...this.todos[id],
      ...updateTodoItem,
      id
    };
    return this.todos[id];
  }

  // DELETE /api/todos/21321321
  @Delete(':id')
  deleteTodo(@Param('id') id: string): void {
    delete this.todos[id];
  }
}
