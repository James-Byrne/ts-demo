import Component from '@ember/component';
import { not, notEmpty, and, or, readOnly, alias } from '@ember/object/computed';
import { defineProperty } from '@ember/object';

export default Component.extend({
  validation: null,
  showValidations: false,
  didValidate: false,

  hasContent: notEmpty('value').readOnly(),

  shouldDisplayValidations: or(
    'showValidations',
    'didValidate',
    'hasContent'
  ).readOnly(),

  showErrorMessage: and(
    'shouldDisplayValidations',
    'validation.isInvalid'
  ).readOnly(),

  init() {
    this._super(...arguments);
    // Set the value and validation props
    // These are set dynamically so need to
    // be setup here in the init method rather
    // than passed to the input
    defineProperty(this, 'validation', readOnly(`model.validations.attrs.${this.valuePath}`));
    defineProperty(this, 'value', alias(`model.${this.valuePath}`));
  },

  focusOut() {
    this._super(...arguments);
    this.set('showValidations', true);
  }
});
