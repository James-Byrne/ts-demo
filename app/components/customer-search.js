import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  searchForCustomers: task(function * (searchTerm) {
    // Check that the term is not empty
    if (searchTerm === '' || searchTerm === undefined) return;

    // Delay the request by 300 milliseconds
    // incase the user is still typing
    yield timeout(300);

    try {
      const result = yield this.store.query('customer', {filterTerm: searchTerm});
      this.set('customers', result);
    } catch(e) {
      console.log(e);
      // TODO: show a error message
    }
  }).restartable(),
});
