import { Task } from '@serenity-js/core';
import { PostRequest, Send } from '@serenity-js/rest';
import { Endpoints } from '../config/apiConfig';

/**
 * Tarea que permite crear una guía con datos proporcionados
 */
export const CrearGuia = {
  conDatos: (datos: object): Task =>
    Task.where(
      'el actor crea una guía con los datos proporcionados',
      Send.a(
        PostRequest.to(Endpoints.CrearGuia).with(datos)
      )
    )
};