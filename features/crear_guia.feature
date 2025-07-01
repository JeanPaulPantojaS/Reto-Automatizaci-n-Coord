Feature: Crear guía con servicio de Recaudo Contra Entrega

  Como usuario del sistema de generación de guías
  Quiero poder crear una guía con el servicio de Recaudo Contra Entrega
  Para que se almacenen correctamente el servicio, referencia y valor a recaudar

  Scenario: Crear guía con datos obligatorios correctamente diligenciados
    Given que el usuario proporciona todos los campos obligatorios
    When envía una solicitud de creación de guía con servicio Recaudo Contra Entrega
    Then el sistema debe responder con estado 200
    And debe almacenar la guía correctamente

  Scenario: Crear guía con valor a recaudar en el límite inferior ($1)
    Given que el valor a recaudar es $1
    When se envía la solicitud
    Then el sistema debe aceptar la guía

  Scenario: Crear guía con valor a recaudar en el límite superior ($16.000.000)
    Given que el valor a recaudar es $16.000.000
    When se envía la solicitud
    Then el sistema debe aceptar la guía

  Scenario: Crear guía sin campo "observaciones"
    Given que el usuario omite el campo observaciones
    When se envía la solicitud
    Then el sistema debe aceptar la guía

  Scenario: Crear guía con caracteres especiales en la referencia
    Given que la referencia de recaudo contiene caracteres especiales como %, $, #
    When se envía la solicitud
    Then el sistema debe aceptar y almacenar correctamente la referencia

  Scenario: Omitir el campo "Referencia de recaudo"
    Given que el campo "Referencia de recaudo" está vacío o no se envía
    When se envía la solicitud
    Then el sistema debe rechazar la guía con un mensaje de error

  Scenario: Omitir el campo "Valor a recaudar"
    Given que el campo "Valor a recaudar" está vacío o no se envía
    When se envía la solicitud
    Then el sistema debe rechazar la guía con un mensaje de error

  Scenario: Ingresar un valor a recaudar menor a $1
    Given que el valor a recaudar es 0
    When se envía la solicitud
    Then el sistema debe rechazar la guía porque el valor a recaudar es inválido

  Scenario: Ingresar un valor a recaudar mayor a $20.000.000
    Given que el valor a recaudar es $20.000.000
    When se envía la solicitud
    Then el sistema debe rechazar la guía

  Scenario: Ingresar una referencia de recaudo demasiado larga
    Given que la referencia supera el límite de 30 caracteres
    When se envía la solicitud
    Then el sistema debe rechazar la guía
