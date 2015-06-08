import Ember from 'ember';

/**
Inject this mixin in a route-driven controller in order to be able
to update query params with a debounce.

@class DebounceQueryParams
*/
export default Ember.Mixin.create({
  /**
  Setup the controller for debouncing query param by calling
  setupDebounceQueryParams

  @method init
  */
  init: function() {
    this._super();
    this.setupDebounceQueryParams();
  },

  /**
  Update the underneath property hence the query param

  @method updateQueryParam
  @param param {String} the name of the property to update
  @param value {String} the new value of the property to update
  */
  updateQueryParam: function(param, value) {
    this.set(param, value);
  },

  /**
  Decounce the query param update

  @method paramUpdate
  @param context {Object} the name of the property to update
  @param debounceParamName {String} the name of the property to update
  in the format debounce_paramName
  */
  paramUpdate: function(context, debounceParamName) {
    var originalParamName = debounceParamName.substr(9, debounceParamName.length);
    var originalParamValue = this.get(debounceParamName);

    Ember.run.debounce(this, this.updateQueryParam, originalParamName,
      originalParamValue, this.get(`debounceQueryParams.${originalParamName}`));
  },

  /**
  Create an observer for each of the properties in the debounceQueryParams obejct

  @method setupDebounceQueryParams
  */
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
