import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, crear, ediar, limpiarCompletados, toggle, toggleAll } from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo('Todo incial'),
  new Todo('Todo secundario'),
  new Todo('Todo tercero'),
  new Todo('Todo ultimo'),
];

export const todoReducer = createReducer(
    estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  
  on(toggle, (state, { id }) => {
    return state.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
      
    });
  }),

  on(ediar, (state, { id, texto }) => {
    return state.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          texto: texto
        }
      } else {
        return todo;
      }
      
    });
  }),
  on(borrar, (state, { id }) => state.filter(x => x.id !== id)),

  on(toggleAll, (state, { completado }) => {
    return state.map(todo => {
        return {
          ...todo,
          completado: completado
        }
    });
  }),
  on(limpiarCompletados, (state) => {
    return state.filter(todo => !todo.completado);
  }),
);