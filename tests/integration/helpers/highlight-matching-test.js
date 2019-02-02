import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | highlight-matching', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('term', 'bb');
    this.set('text', 'abba');

    await render(hbs`{{highlight-matching term text}}`);

    assert.equal(this.element.textContent.trim(), 'abba');
  });
});
