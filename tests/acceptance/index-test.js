/* globals server */
import { module, test } from 'qunit';
import { visit, currentURL, find, fillIn, click, triggerKeyEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

const UP = 38;
const DOWN = 40;
const ENTER = 13;

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /', async function(assert) {
    assert.expect(1);
    await visit('/');
    assert.equal(currentURL(), '/');
  });

  test('the customer search component renders', async function(assert) {
    assert.expect(2);

    await visit('/');
    assert.equal(currentURL(), '/');

    assert.ok(find('[data-test-customer-search]'), 'the customer search component did not render');
  });

  test('the customer search will show it\'s dropdown when customers match the query', async function(assert) {
    assert.expect(2);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'Janeen');
    assert.ok(find('[data-test-customer="0"]'));
  });

  test('the customer search will show it\'s dropdown when customers match the query', async function(assert) {
    assert.expect(5);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'Janeen');
    assert.ok(find('[data-test-customer="0"]'));
    assert.ok(find('[data-test-customer-search-create]'), 'the create customer button is not rendered');

    await fillIn('[data-test-customer-search-input]', '');
    assert.notOk(find('[data-test-customer="0"]'));
    assert.ok(find('[data-test-customer-search-create]'), 'the create customer button is not rendered');
  });

  test('the customer search will show a no matching customers message when no customers match the query', async function(assert) {
    assert.expect(2);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'xxxxxxxx');
    assert.ok(find('[data-test-customer-search-no-customers-found]'));
  });

  test('the customer search will show only the customers that match the query', async function(assert) {
    assert.expect(3);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'Janeen');
    assert.ok(find('[data-test-customer="0"]'), 'customer was not rendered');
    assert.notOk(find('[data-test-customer="1"]'), 'customers were not filtered');
  });

  test('the customer search will show all customers', async function(assert) {
    assert.expect(2);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'a');
    assert.ok(find('[data-test-customer="4"]'), 'not all customers were rendered');
  });

  test('clicking on a customer will set the edit btn value to the customer name', async function(assert) {
    assert.expect(3);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'Janeen');
    assert.ok(find('[data-test-customer="0"]'), 'customer was not rendered');

    await click('[data-test-customer="0"]');
    assert.equal(find('[data-test-customer-search-edit-btn]').innerText, 'Stroup, Janeen');
  });

  test('the user can navigate the list with the arrow keys', async function(assert) {
    assert.expect(8);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'a');
    assert.ok(find('[data-test-customer="0"]'), 'customer was not rendered');
    assert.ok(find('[data-test-customer="1"]'), 'the second customer was not rendered');

    await triggerKeyEvent('[data-test-customer-search]', 'keydown', DOWN);
    assert.ok(find('[data-test-customer="0"]').classList.contains('selected'), 'the first customer should be highlighted');

    await triggerKeyEvent('[data-test-customer-search]', 'keydown', DOWN);
    assert.ok(find('[data-test-customer="1"]').classList.contains('selected'), 'the second customer was not highlighted');
    assert.notOk(find('[data-test-customer="0"]').classList.contains('selected'), 'the first customer should not be highlighted');

    await triggerKeyEvent('[data-test-customer-search]', 'keydown', UP);
    assert.ok(find('[data-test-customer="0"]').classList.contains('selected'), 'the first customer should be highlighted');
    assert.notOk(find('[data-test-customer="1"]').classList.contains('selected'), 'the first customer should not be highlighted');
  });

  test('the user can select a user with the arrow keys and "enter"', async function(assert) {
    assert.expect(5);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'a');
    assert.ok(find('[data-test-customer="0"]'), 'customer was not rendered');
    assert.ok(find('[data-test-customer="1"]'), 'the second customer was not rendered');

    await triggerKeyEvent('[data-test-customer-search]', 'keydown', DOWN);
    assert.ok(find('[data-test-customer="0"]').classList.contains('selected'), 'the first customer should be highlighted');

    await triggerKeyEvent('[data-test-customer-search]', 'keydown', ENTER);
    assert.equal(find('[data-test-customer-search-edit-btn]').innerText, 'Stroup, Janeen');
  });

  test('clicking on a customer will set the edit button value to the customer name and close the dropdown', async function(assert) {
    assert.expect(4);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'Janeen');
    assert.ok(find('[data-test-customer="0"]'), 'customer was not rendered');

    await click('[data-test-customer="0"]');
    assert.equal(find('[data-test-customer-search-edit-btn]').innerText, 'Stroup, Janeen');
    assert.notOk(find('[data-test-customer="0"]'), 'customer should not be rendered anymore');
  });

  test('clicking the clear button will clear the user selection', async function(assert) {
    assert.expect(4);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'Janeen');
    assert.ok(find('[data-test-customer="0"]'), 'customer was not rendered');

    await click('[data-test-customer="0"]');
    assert.equal(find('[data-test-customer-search-edit-btn]').innerText, 'Stroup, Janeen');

    await click('[data-test-customer-search-clear]');
    assert.equal(find('[data-test-customer-search-input]').value, '');
  });

  test('clicking on the customer name, once selected, will open the customer edit form', async function(assert) {
    assert.expect(5);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'Janeen');
    assert.ok(find('[data-test-customer="0"]'), 'customer was not rendered');

    await click('[data-test-customer="0"]');
    assert.equal(find('[data-test-customer-search-edit-btn]').innerText, 'Stroup, Janeen');

    assert.notOk(find('[data-test-customer-form]'), 'the form should not be rendered');
    await click('[data-test-customer-search-edit-btn]');
    assert.ok(find('[data-test-customer-form]'), 'the customer form should be rendered');
  });

  test('opening the customer edit form with a customer will show their details', async function(assert) {
    assert.expect(6);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'Janeen');
    assert.ok(find('[data-test-customer="0"]'), 'customer was not rendered');

    await click('[data-test-customer="0"]');
    assert.equal(find('[data-test-customer-search-edit-btn]').innerText, 'Stroup, Janeen');

    assert.notOk(find('[data-test-customer-form]'), 'the form should not be rendered');
    await click('[data-test-customer-search-edit-btn]');
    assert.ok(find('[data-test-customer-form]'), 'the customer form should be rendered');
    assert.equal(find('input[name="firstname"]').value, 'Janeen');
  });

  test('editing a customer will change their details in the customer search list', async function(assert) {
    assert.expect(7);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'Janeen');
    assert.ok(find('[data-test-customer="0"]'), 'customer was not rendered');

    await click('[data-test-customer="0"]');
    assert.equal(find('[data-test-customer-search-edit-btn]').innerText, 'Stroup, Janeen');

    assert.notOk(find('[data-test-customer-form]'), 'the form should not be rendered');
    await click('[data-test-customer-search-edit-btn]');
    assert.ok(find('[data-test-customer-form]'), 'the customer form should be rendered');

    await fillIn('input[name="firstname"]', 'Testing');
    await click('[data-test-customer-details-submit]');

    assert.notOk(find('[data-test-customer-form]'), 'the form should not be rendered');
    assert.equal(find('[data-test-customer-search-edit-btn]').innerText, 'Stroup, Testing');
  });

  test('the save customer details button should be disabled while input is invalid', async function(assert) {
    assert.expect(9);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', 'Janeen');
    assert.ok(find('[data-test-customer="0"]'), 'customer was not rendered');

    await click('[data-test-customer="0"]');
    assert.equal(find('[data-test-customer-search-edit-btn]').innerText, 'Stroup, Janeen');

    assert.notOk(find('[data-test-customer-form]'), 'the form should not be rendered');
    await click('[data-test-customer-search-edit-btn]');
    assert.ok(find('[data-test-customer-form]'), 'the customer form should be rendered');

    await fillIn('input[name="firstname"]', '');
    assert.ok(find('[data-test-customer-details-submit]').disabled, 'the submit button should be disabled');

    await fillIn('input[name="firstname"]', 'Testing');
    assert.notOk(find('[data-test-customer-details-submit]').disabled, 'the submit button should be enabled');

    await click('[data-test-customer-details-submit]');
    assert.notOk(find('[data-test-customer-form]'), 'the form should not be rendered');
    assert.equal(find('[data-test-customer-search-edit-btn]').innerText, 'Stroup, Testing');
  });

  test('the save customer details button should be enabled when the required details are filled', async function(assert) {
    assert.expect(6);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', '');
    assert.ok(find('[data-test-customer-search-create]'), 'the create customer button is not rendered');

    await click('[data-test-customer-search-create]');
    assert.ok(find('[data-test-customer-form]'), 'the customer form should be rendered');
    assert.ok(find('[data-test-customer-details-submit]').disabled, 'the submit button should be disabled');

    await fillIn('input[name="firstname"]', 'James');
    await fillIn('input[name="lastname"]', 'Byrne');
    await fillIn('input[name="phone"]', '087 777 7777');
    await fillIn('input[name="email"]', 'test@test.com');
    assert.notOk(find('[data-test-customer-details-submit]').disabled, 'the submit button should be enabled');

    await click('[data-test-customer-details-submit]');
    assert.notOk(find('[data-test-customer-form]'), 'the form should not be rendered');
  });

  test('the test should populate the edit customer button with a new user', async function(assert) {
    assert.expect(7);

    await visit('/');
    assert.equal(currentURL(), '/');

    await fillIn('[data-test-customer-search-input]', '');
    assert.ok(find('[data-test-customer-search-create]'), 'the create customer button is not rendered');

    await click('[data-test-customer-search-create]');
    assert.ok(find('[data-test-customer-form]'), 'the customer form should be rendered');
    assert.ok(find('[data-test-customer-details-submit]').disabled, 'the submit button should be disabled');

    await fillIn('input[name="firstname"]', 'James');
    await fillIn('input[name="lastname"]', 'Byrne');
    await fillIn('input[name="phone"]', '087 777 7777');
    await fillIn('input[name="email"]', 'test@test.com');
    assert.notOk(find('[data-test-customer-details-submit]').disabled, 'the submit button should be enabled');

    await click('[data-test-customer-details-submit]');
    assert.notOk(find('[data-test-customer-form]'), 'the form should not be rendered');
    assert.equal(find('[data-test-customer-search-edit-btn]').innerText, 'Byrne, James');
  });
});
