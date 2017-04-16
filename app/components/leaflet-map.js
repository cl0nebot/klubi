// import Ember from 'ember'

import EmberLeafletComponent from "ember-leaflet/components/leaflet-map";

export default EmberLeafletComponent.extend({
  geolocator: Ember.inject.service(),
  didCreateLayer() {
    this._super(...arguments);
    let that = this;

    var zoomOptions = {
      position: "bottomleft",
      zoomInTitle: "Približaj",
      zoomOutTitle: "Oddalji"
    };
    var geolocateOptions = {
      position: "bottomleft",
      icon: "fa fa-location-arrow",
      strings: {
        title: "Pokaži svojo lokacijo", // title of the locate control
        metersUnit: "metrov", // string for metric units
        popup: "Vi ste tukaj (na {distance} {unit} natančno)", // text to appear if user clicks on circle
        outsideMapBoundsMsg: "Ste zunaj meja zemljevida" // default message for onLocationOutsideMapBounds
      },
      flyTo: true,
      locateOptions: {
        enableHighAccuracy: true,
        maxZoom: 14
      },
      onLocationError: function(err) {
        const PERMISSION_DENIED = 1;
        const flashMessages = that.get("flashMessages");
        if (err.code === PERMISSION_DENIED) {
          flashMessages.error(
            "V brskalniku omogočite možnost pridobivanja vaše lokacije, nato ponovno kliknite na gumb za prikaz vaše lokacije."
          );
        } else {
          flashMessages.error(err.message);
        }
      }
    };

    if (this.get("klubiZoomControl")) {
      this.L.control.zoom(zoomOptions).addTo(this._layer);
    }
    const locateControl = this.L.control
      .locate(geolocateOptions)
      .addTo(this._layer);
    this.get("geolocator").set("control", locateControl);
  }
});
