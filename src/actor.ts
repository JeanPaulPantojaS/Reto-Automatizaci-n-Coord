import { Actor, Cast, actorCalled } from '@serenity-js/core';
import { CallAnApi } from '@serenity-js/rest';

class UsuarioCast implements Cast {
  prepare(actor: Actor): Actor {
    return actor.whoCan(
      CallAnApi.at('https://apiv2-test.coordinadora.com'),
    );
  }
}

export const actor = actorCalled('Usuario').whoCan(
  CallAnApi.at('https://apiv2-test.coordinadora.com')
);