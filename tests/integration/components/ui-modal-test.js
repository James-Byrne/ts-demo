import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-modal', function(hooks) {
  setupRenderingTest(hooks);

   test('it exists on the page', async function(assert) {
     await render(hbs`{{ui-modal}}`);

     const modalWrapper = document.querySelector('.ember-modal-wrapper');
     assert.ok(modalWrapper);
   });
});
