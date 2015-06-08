import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    },
    filter: {
      replace: true
    }
  }
});
