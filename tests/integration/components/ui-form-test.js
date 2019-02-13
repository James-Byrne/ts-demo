import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders an input', async function(assert) {
    this.set('onSubmit', () => {});

    await render(hbs`
      {{#ui-form onSubmit=(action onSubmit) as |f|}}
        {{f.input id="test-input"}}
      {{/ui-form}}
    `);

    assert.dom('#test-input').exists({count: 1});
  });

  test('it renders a button', async function(assert) {
    this.set('onSubmit', () => {});

    await render(hbs`
      {{#ui-form onSubmit=(action onSubmit) as |f|}}
        {{f.button id="test-button"}}
      {{/ui-form}}
    `);

    assert.dom('#test-button').exists({count: 1});
  });


  test('it yields test passed to the button', async function(assert) {
    this.set('onSubmit', () => {});

    await render(hbs`
      {{#ui-form onSubmit=(action onSubmit) as |f|}}
        {{#f.button id="test-button"}}
          save
        {{/f.button}}
      {{/ui-form}}
    `);

    assert.dom('#test-button').exists({count: 1});
    assert.dom('#test-button').hasText('save');
  });

  test('it renders an input and a button', async function(assert) {
    this.set('onSubmit', () => {});

    await render(hbs`
      {{#ui-form onSubmit=(action onSubmit) as |f|}}
        {{f.input id="test-input"}}
        {{#f.button id="test-button"}}
          save
        {{/f.button}}
      {{/ui-form}}
    `);

    assert.dom('#test-input').exists({count: 1});
    assert.dom('#test-button').exists({count: 1});
    assert.dom('#test-button').hasText('save');
  });

  test('clicking the button calls an action', async function(assert) {
    assert.expect(3);

    this.set('onSubmit', () => assert.ok(true));

    await render(hbs`
      {{#ui-form onSubmit=(action onSubmit) as |f|}}
        {{#f.button btnId="test-button" type="submit"}}
          save
        {{/f.button}}
      {{/ui-form}}
    `);

    assert.dom('#test-button').exists({count: 1});
    assert.dom('#test-button').hasText('save');

    await click('[data-test-customer-details-submit]')
  });
});
