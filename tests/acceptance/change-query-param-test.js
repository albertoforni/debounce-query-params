import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';

var application;

module('Acceptance | change query param', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('it modifies the search query param', function(assert) {
  var search = 'del piero';

  visit('/');

  var timeBeforeEdit = Date.now();

  fillIn('#search', search);

  andThen(function() {
    var timeAfterAsync = Date.now();

    assert.ok(timeAfterAsync - timeBeforeEdit > 500);
    assert.equal(currentURL(), `/?search=${encodeURI(search)}`);
  });
});

test('it sets only the last value', function(assert) {
  var delPiero = 'del piero';
  var tevez = 'carlos tevez';

  visit('/');

  fillIn('#search', delPiero);
  fillIn('#search', tevez);

  andThen(function() {
    assert.equal(currentURL(), `/?search=${encodeURI(tevez)}`);
  });
});

test('it sets the debouce variable to the url value', function(assert) {
  var search = 'juventus';
  visit(`/?search=${search}`);

  var applicationCtrl = application.__container__.lookup('controller:application');

  andThen(function() {
    assert.equal(applicationCtrl.get('search'), search);
    assert.equal(applicationCtrl.get('debounce_search'), search);
  });
});

test('it continue to update filters', function(assert) {
  var search = 'juventus';
  var filter = 'soccer';

  visit(`/?search=${search}&filter=${filter}`);

  var applicationCtrl = application.__container__.lookup('controller:application');

  filter = 'basket';
  fillIn('#filter', filter);

  andThen(function() {
    assert.equal(applicationCtrl.get('filter'), filter);
  });
});
