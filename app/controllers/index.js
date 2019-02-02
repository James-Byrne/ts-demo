import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { openModal, closeModal } from '../lib/utils';

const CUSTOMER_DETAILS_MODAL = 'CustomerDetailsModal';

export default Controller.extend({
  store: service(),

  openModal,
  closeModal,

  saveCustomer: task(function * (customer) {
    try {
      yield customer.save();
      this.closeModal(CUSTOMER_DETAILS_MODAL);
    } catch(e) {
      // show an error message
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
      const newCustomer = this.store.createRecord('customer');
      this.set('customer', newCustomer);
      this.openModal(CUSTOMER_DETAILS_MODAL);
    },
  }
});
