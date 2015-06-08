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
