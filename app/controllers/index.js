import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { openModal, closeModal } from '../lib/utils';
import { faker } from 'ember-cli-mirage';

const CUSTOMER_DETAILS_MODAL = 'CustomerDetailsModal';

export default Controller.extend({
  store: service(),
  notify: service('notification-messages'),

  openModal,
  closeModal,

  saveCustomer: task(function * (customer) {
    try {
      yield customer.save();
      this.closeModal(CUSTOMER_DETAILS_MODAL);
      this.set('newCustomer', customer);
    } catch(e) {
      this.notify.error('There was an issue saving the customer details, please try again');
    }
  }),

  actions: {
    closeModal(modal) {
      this.closeModal(modal);
      this.customer.rollbackAttributes();
    },

    editCustomer(customer) {
      this.set('customer', customer);
      this.openModal(CUSTOMER_DETAILS_MODAL);
    },

    createCustomer() {
      const newCustomer = this.store.createRecord('customer', { randomId: faker.random.uuid() });
      this.set('customer', newCustomer);
      this.openModal(CUSTOMER_DETAILS_MODAL);
    },
  }
});
