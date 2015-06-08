# Debounce Query Parameters

[![Build Status](https://travis-ci.org/albertodotcom/debounce-query-params.svg)](https://travis-ci.org/albertodotcom/debounce-query-params)

This addon allows for updating queryParams with a defined debounce.
It has been specifically designed to solve the following issue:
1 - You have a model you want to update when a query param changes;
2 - You don't want to update the history if the users is changing the param in a certain time interval;

A good example for this is a search input field, when you would like to update the results after
the users have finished typing.

## Installation

If you're using ember-cli > 0.2.3, you can just run `ember install debounce-query-params`, otherwise `npm install --save debounce-query-params`.

## Usage
In your route-driven controller include the mixin and add the the `debounceQueryParams` object, like in the following example

`controller.js`
```javascript
import Ember from 'ember';
import DebounceQueryParams from '../mixins/debounce-query-params';

export default Ember.Controller.extend(DebounceQueryParams, {
  search: null,

  filter: null,

  queryParams: ['search', 'filter'],

  debounceQueryParams: {
    search: 500
  }
});
```

If you want to update the model the underneath model when the search param changes:

`route.js`
```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    },
    filter: {
      replace: true
    }
  },

  model: function() {
    // retrieve your model here
  }
});

```

## Api Documentation
This addon consists only of a mixin that you can include in your route-driven controllers.
It is possible to generate the documentation running `ember ember-cli-yuidoc`.

## Running Tests

* `ember test`
* `ember test --server`
