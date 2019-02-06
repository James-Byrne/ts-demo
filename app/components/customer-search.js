import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

// Helpers for keeping track of the
// keyboard events
const UP = 38;
const DOWN = 40;
const ENTER = 13;

export default Component.extend({
  focusElement: -1,
  customers: null,

  store: service(),
  notify: service('notification-messages'),

  didInsertElement() {
    this._super(...arguments);

    // Get a reference to both the customer search component
    const customerSearch = document.querySelector('#customer-search');

    customerSearch.addEventListener('mouseleave', () => {
      // Get a reference to the customerInput, we need to do this here
      // incase it has ever been hidden which would break our reference
      const customerInput = document.querySelector('#customer-search-input');

      // If the mouse leaves the customer search component and the
      // customer search input is not focused then hide the dropdown
      if (customerInput != document.activeElement) this.set('showDropdown', false);
    });
  },

  // Extend the keyDown event on our component
  // Here we want to allow the user to navigate the
  // dropdown menu with the up and down arrows.
  //
  // We also want to trigger the setSelectedCustomer
  // action when the user has selected a customer and
  // presses the enter key
  keyDown(e) {
    this._super(...arguments);

    if (this.showDropdown) {
      switch(e.keyCode) {
        case UP:
          if (this.focusElement > 0) this.decrementProperty('focusElement');
          break;
        case DOWN:
          if (this.customers && (this.focusElement + 1) < this.customers.length) {
            this.incrementProperty('focusElement');
          }
          break;
        case ENTER:
          if (this.focusElement >= 0) {
            this.setSelectedCustomer(this.customers.objectAt(this.focusElement));
          }
          break;
        default:
            return
      }
    }
  },

  searchForCustomers: task(function * (searchTerm) {
    // Delay the request by 300 milliseconds
    // incase the user is still typing
    yield timeout(300);

    try {
      const result = yield this.store.query('customer', {filterTerm: searchTerm});
      this.set('customers', result);
    } catch(e) {
      this.notify.error('Something went wrong while looking for customers');
    }
  }).restartable(),

  setSelectedCustomer(customer) {
    this.set('selectedCustomer', customer);
    this.set('showDropdown', false);
  },

  actions: {
    setSelectedCustomer(customer) {
      this.setSelectedCustomer(customer);
    },

    onInput(searchTerm) {
      // Update the searchTerm so we can use it
      // elsewhere in the component
      this.set('searchTerm', searchTerm);

      // Check that the term is not empty
      if (searchTerm === '' || searchTerm === undefined) {
        return
      } else {
        this.set('showDropdown', true);
        this.searchForCustomers.perform(searchTerm);
      }
    },

    clearCustomer() {
      this.set('selectedCustomer', null);
      this.set('searchTerm', '');
    }
  },
});
