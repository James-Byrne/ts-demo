import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { buildValidations } from 'ember-cp-validations';
import { firstName, lastName, email, dob, phone, mobile } from '../lib/validations/customer';

const Validations = buildValidations({
  firstName,
  lastName,
  email,
  dob,
  phone,
  mobile,
});

export default Model.extend(Validations, {
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  dob: attr('string'),
  phone: attr('string'),
  mobile: attr('string'),
  randomId: attr('string'),
});
