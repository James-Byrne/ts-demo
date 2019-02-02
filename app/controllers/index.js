import Controller from '@ember/controller';
import { openModal, closeModal } from '../lib/utils';

export default Controller.extend({
  openModal,
  closeModal,

  actions: {
    openModal,
    closeModal,

    editCustomer(customer) {
      this.set('customer', customer);
      this.openModal('CustomerDetailsModal');
    },

    createCustomer() {
      const newCustomer = this.store.createRecord('customer');
      this.set('customer', newCustomer);
      this.openModal('CustomerDetailsModal');
    },
  }
});
