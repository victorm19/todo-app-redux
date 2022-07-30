import { createReducer, on } from "@ngrx/store";
import { filtrosValidos, setFiltro } from "./filtro.actions";

export const estadoInicial: filtrosValidos = 'Todos' as filtrosValidos;

export const filtroReducer = createReducer(
    estadoInicial,
  on(setFiltro, (state, { filtro }) => filtro ),
);