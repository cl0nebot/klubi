import Ember from 'ember';

export default Ember.Controller.extend(Ember.GoogleAnalyticsTrackingMixin, {
  application: Ember.inject.controller('application'),
  zoom: 8,
  markerCenter: L.latLng(46.122636,14.81546), // Slivna, Slovenia,
  currentRouteName: Ember.computed.alias('application.currentRouteName'),
  queryParams: ['category'],
  category: 'fitnes',

  anyKlub: Ember.computed('filteredKlubs', function() {
    return this.get('filteredKlubs');
  }),

  filteredKlubs: Ember.computed('category', 'model', function() {
    var category = this.get('category');

    if (!this.get('model')) { return Ember.A(); };

    return this.get('model').filter(function(item) {
      return item.get('categories').indexOf(category) >= 0;
    });
  }),

  isShowPage: Ember.computed('currentRouteName', function() {
    // TODO: this is brittle.
    return this.get('currentRouteName') === 'klub.index';
  }),

  actions: {
    showKlub(klub) {
      this.transitionToRoute('klub', klub);
    },
    zoomToMarker(klub) {
      this.send('zoomToLocation', klub.get('location'), 12);

      this.trackEvent('klub', 'zoom-to-marker', klub.get('id'), 1);
    },
    zoomToLocation(location, zoomLevel) {
      this.set('zoom', zoomLevel);
      this.set('markerCenter', location);
    }

  }

});
