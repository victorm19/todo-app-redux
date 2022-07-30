import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import { Todo } from '../models/todo.model';
import * as actionsTodo from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo = new Todo('');
  @ViewChild('inputFisico', {static: false}) txtInputFisico: ElementRef<HTMLInputElement>;

  chkCompletado: FormControl = new FormControl();
  textInput: FormControl = new FormControl();

  editando: boolean;

  constructor(private store: Store<AppState>) { 
    this.editando = false;
    this.txtInputFisico = {} as ElementRef<HTMLInputElement>;
  }

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado)
    this.textInput = new FormControl(this.todo.texto, Validators.required)
    this.chkCompletado.valueChanges
      .subscribe(valor => {
        console.log(valor)
        this.store.dispatch(actionsTodo.toggle({id: this.todo.id}));
      })
  }

  editar() {
    this.editando = true;

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;
  
    if(this.textInput.invalid) return;
    if(this.textInput.value === this.todo.texto) return;

    this.store.dispatch(actionsTodo.ediar({id: this.todo.id, texto: this.textInput.value }))
  }

  borrar() {
    this.store.dispatch(actionsTodo.borrar({ id: this.todo.id }));
  }

}
