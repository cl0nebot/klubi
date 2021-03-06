import Ember from 'ember';

export default Ember.Mixin.create({
  afterModel(model, transition) {
    this._super(model, transition);
    transition.then(function() {
      Ember.run.scheduleOnce('afterRender', this, function() {
        // console.log('Done Transitioning');
        window.prerenderReady = true;
      });
    });
  }
});
