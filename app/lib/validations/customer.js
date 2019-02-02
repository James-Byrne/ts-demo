import { validator } from 'ember-cp-validations';

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
  validator('presence', true),
];

export const dob = [
  validator('date', {
    before: 'now',
    format: 'M/D/YYYY',
    message(type, value) {
      if (type === 'before') {
        return 'Are you from the future?';
      }
    }
  }),
];

export default { firstName, lastName, email, phone, mobile, dob};
