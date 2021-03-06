import Ember from "ember";
import ENV from "../config/environment";

export default Ember.Controller.extend(Ember.GoogleAnalyticsTrackingMixin, {
  map: Ember.inject.service(),
  zoom: 8,
  markerCenter: [46.122636, 14.81546],
  category: "fitnes",
  maxBounds: Ember.computed.alias("map.maxBounds"),
  flashMessages: Ember.inject.service(),
  categories: Ember.inject.service(),

  isCategorySupported: Ember.computed("category", function() {
    return this.get("categories").isSupported(this.get("category"));
  }),

  anyKlub: Ember.computed("filteredKlubs", function() {
    return this.get("filteredKlubs");
  }),

  filteredKlubs: Ember.computed("category", "model", function() {
    var category = this.get("category");

    if (!this.get("model")) {
      return Ember.A();
    }

    return this.get("model").filter(function(klub) {
      return klub.get("categories").indexOf(category) >= 0;
    });
  }),

  actions: {
    showKlub(klub) {
      this.transitionToRoute("klubs.klub", klub.get("id"));
    },
    zoomToMarker(klub) {
      this.send("zoomToLocation", klub.get("location"), 12);
      this.trackEvent("klub", "zoom-to-marker", klub.get("id"), 1);
    },
    zoomToLocation(location, zoomLevel) {
      this.get("map").zoomToLocation(location, zoomLevel);
    },
    setHoveredKlub(klubId, toHovered) {
      let klub = this.get("model").find(klub => klub.get("id") === klubId);
      klub.set("isHovered", toHovered.hovered);
    }
  }
});
