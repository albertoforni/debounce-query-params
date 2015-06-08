import Ember from 'ember';

export default Ember.Mixin.create({
  init: function() {
    this._super();
    this.setupDebounceQueryParams();
  },

  updateQueryParam: function(param, value) {
    this.set(param, value);
  },

  paramUpdate: function(context, debounceParamName) {
    var originalParamName = debounceParamName.substr(9, debounceParamName.length);
    var originalParamValue = this.get(debounceParamName);

    Ember.run.debounce(this, this.updateQueryParam, originalParamName,
      originalParamValue, this.get(`debounceQueryParams.${originalParamName}`));
  },

  setupDebounceQueryParams: function() {
    var debounceQueryParams = this.get('debounceQueryParams');

    for (let param in debounceQueryParams) {
      Ember.assert(this.get(param) != null, `${param} must be in queryParams`);

      Ember.run.schedule('actions', this, function() {
        this.set(`debounce_${param}`, this.get(param));

        this.addObserver(`debounce_${param}`, this, 'paramUpdate');
      });
    }
  }
});
