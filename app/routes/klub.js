import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, klub) {
    this._super(controller, klub);
    // Changing the zoom level is problematic while also re-centering
    this.controllerFor('application').setProperties({
      'zoom': 16
    });
    // Setting zoom and center simultaenously causes the map to sometime be innacurate. Delaying the centering solves the issue
    // Ideally, it should run after google map finished zooming in...
    Ember.run.later(function() {
      var center = controller.get('offCenterLatlng');
      this.controllerFor('application').set('center', center);
    }.bind(this), 500);
  }
});
