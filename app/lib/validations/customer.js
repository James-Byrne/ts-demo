import { validator } from 'ember-cp-validations';
import moment from 'moment';

export const firstName = [
  validator('presence', true),
];

export const lastName = [
  validator('presence', true),
];

export const email = [
  validator('presence', true),
  validator('format',  { type: 'email' })
];

export const phone = [
  validator('presence', true),
];

export const mobile = [
  validator('format', {
    allowBlank: true,
  }),
];

export const dob = [
  validator('date', {
    allowBlank: true,
    before: 'now',
    after: () => moment().subtract(120, 'years').format('YYYY-MM-DD'),
    format: 'YYYY-MM-DD',
    message(type, value /*, context */) {
      if (type === 'before') {
        return 'What\'s the future like?';
      }
      if (type === 'after') {
        return `Ah here now, your not ${moment().diff(value,'years')} years old`;
      }
    }
  }),
];

export default { firstName, lastName, email, phone, mobile, dob};
