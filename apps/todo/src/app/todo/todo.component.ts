import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CreateTodoItem, TodoItem, UpdateTodoDone } from '@sae-nx-workspace/api-interfaces';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'sae-nx-workspace-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() todoItems: TodoItem[] | null = [];
  @Output() addItem = new EventEmitter<CreateTodoItem>();
  @Output() deleteItem = new EventEmitter<string>();
  @Output() updateItemDone = new EventEmitter<UpdateTodoDone>();

  createItemTitle = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  onAddItem() {
    this.addItem.emit({
      title: this.createItemTitle
    });
    this.createItemTitle = '';
  }

  onDeleteItem(item: TodoItem) {
    this.deleteItem.emit(item.id);
  }

  onUpdateItemDone(change: MatCheckboxChange, item: TodoItem) {
    this.updateItemDone.emit({
      id: item.id,
      done: change.checked
    });
  }
}
