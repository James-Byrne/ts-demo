import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | customer', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('customer', {
      firstName: 'James',
      lastName: 'Byrne',
      email: 'james@byrnecodes.com',
      dob: '15/08/1992',
      phone: '(+353)871111111',
      mobile: '(+353)871111111',
    });
    assert.ok(model);
  });
});
