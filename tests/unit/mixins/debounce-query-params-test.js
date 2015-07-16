import Ember from 'ember';
import DebounceQueryParamsMixin from 'debounce-query-params/mixins/debounce-query-params';
import { module, test } from 'qunit';
import sinon from 'sinon';

module('Unit | Mixin | debounce query params');

test('it throws an exception if debouceQueryParams isn\'t in queryParams', function(assert) {
  var DebounceQueryParamsObject = Ember.Object.extend(DebounceQueryParamsMixin, {
    queryParams: [],
    debounceQueryParams: {
      search: 400
    }
  });

  assert.throws(DebounceQueryParamsObject.create, 'it throws an exception');
});

test('it sets debounce_search to search value', function(assert) {
  var DebounceQueryParamsObject = Ember.Object.extend(DebounceQueryParamsMixin, {
    queryParams: ['search'],
    search: 'hello+world',
    debounceQueryParams: {
      search: 400
    }
  });

  var subject;
  Ember.run(function() {
    subject = DebounceQueryParamsObject.create();
  });

  assert.equal(subject.get('debounce_search'), subject.get('search'));
});

test('it calles Ember.run.debounce when update delay_search', function(assert) {
  var DebounceQueryParamsObject = Ember.Object.extend(DebounceQueryParamsMixin, {
    queryParams: ['search'],
    search: 'hello+world',
    debounceQueryParams: {
      search: 400
    }
  });

  var subject;
  Ember.run(function() {
    subject = DebounceQueryParamsObject.create();
  });

  Ember.run.debounce = sinon.spy();

  assert.expect(2);

  subject.set('debounce_search', 'juve');
  subject.set('debounce_search', 'juventus');
  assert.equal(subject.get('search'), 'hello+world');

  sinon.assert.calledTwice(Ember.run.debounce);
});
