import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  dob: attr('string'),
  phone: attr('string'),
  mobile: attr('string'),
});
