export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.4.x/shorthands/
    */

  this.namespace = 'api';
  this.timing = 300;

  this.get('customers', function({ customers }, { queryParams: { filterTerm } }) {
    // Costruct a regex for searching the customers model
    const filterRegex = new RegExp(filterTerm.toLowerCase());

    // Given all customers filter only those customers
    // who posses an attribute which is a string and
    // which passes the filterRegex
    return customers.all().filter(({attrs}) => (
      Object.keys(attrs).filter(a => (
        (typeof attrs[a] === 'string') && attrs[a].toLowerCase().match(filterRegex))
      ).length > 0
    ));
  });

  this.post('customers');
  this.patch('customers/:id');
}
