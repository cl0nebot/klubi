import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Članki, novice in novosti',
  model: function() {
    return this.store.find('clanek');
  }
});
