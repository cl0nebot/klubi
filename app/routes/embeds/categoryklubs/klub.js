import Ember from 'ember';
import KlubRoute from '../../klub';

export default KlubRoute.extend({
  setupController: function(controller, model) {
    // When navigating directly to a klub's page that is
    // not included in the default category, the model
    // is unloaded instantly. This fixes this.
    this._super(controller, model);

    let categoryKlubsController = this.controllerFor('embeds.categoryklubs');

    // Ask the controller to ask parent to set the map position correct
    categoryKlubsController.send('zoomToLocation', model.get('location'), this.WANTED_ZOOM_LEVEL);
  },
  actions: {
    goHome: function () {
      this.transitionTo('embeds.categoryklubs');
    }
  }
});