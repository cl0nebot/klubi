/* globals L */
import Ember from "ember";

var southWest = L.latLng(44.0, 12.0), // spodaj levo
  northEast = L.latLng(48, 18); // zgoraj desno

export default Ember.Service.extend({
  zoom: 8,
  center: [46.122636, 14.81546], // Slivna, Slovenia
  maxBounds: L.latLngBounds(southWest, northEast),
  map: null,

  invalidateSize: function() {
    // Call this method when the .leaflet-container
    // is resized

    // TODO: this could be triggered automatically
    // by observing the .leaflet-container size.
    const map = this.get("map");
    if (map) {
      Ember.run.scheduleOnce("afterRender", this, function() {
        map.invalidateSize();
      });
    }
  },

  zoomOut() {
    this.zoomToLocation([46.122636, 14.81546], 8);
  },

  zoomToLocation(location, zoomLevel) {
    this.setProperties({
      center: location,
      zoom: zoomLevel
    });

    // HACK: Call setView directly, as ember leaflet tries
    // setting the location and zoom separately, which does
    // not work consistently well (usually just does the
    // zooming, but position breaks)
    const map = this.get("map");
    if (!map) {
      return;
    }
    map.setView(location, zoomLevel);
  }
});
