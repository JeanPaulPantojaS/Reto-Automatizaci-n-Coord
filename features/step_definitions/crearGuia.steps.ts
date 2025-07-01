import { Given, When, Then } from '@cucumber/cucumber';
import { actor } from '../../src/actor';
import { CrearGuia } from '../../src/tasks/CrearGuia';
import { guiaBase } from '../../src/models/GuiaPayload';
import { LastResponse } from '@serenity-js/rest';
import { expect } from '@playwright/test';

let datos: any;

// ========== Givens ==========

// Datos completos y válidos
Given('que el usuario proporciona todos los campos obligatorios', () => {
  datos = { ...guiaBase };
});

// Límite inferior válido
Given('que el valor a recaudar es $1', () => {
  datos = { ...guiaBase, valorRecaudar: "1" };
});

// Límite superior válido
Given('que el valor a recaudar es $16.000.000', () => {
  datos = { ...guiaBase, valorRecaudar: "16000000" };
});

// Omite campo observaciones
Given('que el usuario omite el campo observaciones', () => {
  datos = { ...guiaBase };
  delete datos.observaciones;
});

// Caracteres especiales en referencia
Given('que la referencia de recaudo contiene caracteres especiales como %, $, #', () => {
  datos = { ...guiaBase, referenciaRecaudo: "ref%$#123" };
});

// Faltante: referencia
Given('que el campo "Referencia de recaudo" está vacío o no se envía', () => {
  datos = { ...guiaBase };
  delete datos.referenciaRecaudo;
});

// Faltante: valor
Given('que el campo "Valor a recaudar" está vacío o no se envía', () => {
  datos = { ...guiaBase };
  delete datos.valorRecaudar;
});

// Valor a recaudar inválido (menor a $1)
Given('que el valor a recaudar es 0', () => {
  datos = { ...guiaBase, valorRecaudar: "0" };
});

// Valor a recaudar mayor al permitido
Given('que el valor a recaudar es $20.000.000', () => {
  datos = { ...guiaBase, valorRecaudar: "20000000" };
});

// Referencia muy larga
Given('que la referencia supera el límite de 30 caracteres', () => {
  datos = { ...guiaBase, referenciaRecaudo: 'a'.repeat(31) };
});


// ========== When ==========

When('se envía la solicitud', async function () {
  await actor.attemptsTo(CrearGuia.conDatos(datos));
  this.status = await actor.answer(LastResponse.status());
  this.response = await actor.answer(LastResponse.body());
});

When('envía una solicitud de creación de guía con servicio Recaudo Contra Entrega', async function () {
  await actor.attemptsTo(CrearGuia.conDatos(datos));
  this.status = await actor.answer(LastResponse.status());
  this.response = await actor.answer(LastResponse.body());
});


// ========== Then: Casos exitosos ==========

Then('el sistema debe responder con estado 200', async function () {
  expect(this.status).toBe(200);
  console.log('✅ Estado 200 recibido.');
});

Then('debe almacenar la guía correctamente', function () {
  expect(this.response).toBeDefined();
  expect(this.response.data).toBeDefined();
  expect(this.response.data).toHaveProperty('codigo_remision');
  console.log('✅ Guía almacenada correctamente.');
});

Then('el sistema debe aceptar la guía', async function () {
  expect(this.status).toBe(200);
  console.log('✅ Guía aceptada. Status:', this.status);
});

Then('el sistema debe aceptar y almacenar correctamente la referencia', function () {
  expect(this.response).toBeDefined();
  expect(this.response.isError).toBe(false);
  expect(this.response.data).toBeDefined();
  expect(this.response.data).toHaveProperty('codigo_remision');
  console.log('✅ Referencia almacenada correctamente.');
});


// ========== Then: Casos de error general ==========

Then('el sistema debe rechazar la guía', async function () {
  expect([400, 422]).toContain(this.status);
  console.log('✅ Guía rechazada. Status:', this.status);
});

Then('el sistema debe rechazar la guía con un mensaje de error', async function () {
  expect([400, 422]).toContain(this.status);
  const body = this.response;
  expect(body).toBeDefined();
  expect(body.isError).toBe(true);
  expect(JSON.stringify(body)).toMatch(/error|obligatorio|inválido|requerido/i);
  console.log('✅ Guía rechazada con mensaje de error. Body:', body);
});


// ========== Then: Casos de validación específica ==========

Then('el sistema debe rechazar la guía porque el valor a recaudar es inválido', async function () {
  const status = this.status;
  const body = this.response;

  // Esperamos un código de error
  expect([400, 422]).toContain(status);

  // Cuerpo con error definido
  expect(body).toBeDefined();
  expect(body.isError).toBe(true);

  // Mensaje o causa específica
  expect(body.cause || JSON.stringify(body)).toMatch(
    /valor.*recaudar.*inválido|mayor.*permitido|menor.*permitido|valor.*fuera.*rango/i
  );

  console.log('✅ Guía rechazada por valor inválido. Body:', body);
});