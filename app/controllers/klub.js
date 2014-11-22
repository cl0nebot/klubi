import Ember from 'ember';

export default Ember.ObjectController.extend({
  // needs: ['application'],
  isHovered: false,

  latlng: function() {
    return L.latLng(this.get('latitude'), this.get('longitude'));
  }.property('latitude', 'longitude'),

  location: function(){
    return this.get('latlng');
  }.property('latlng'),

  offCenterLatlng: function() {
    var offsetLatitude = 0;
    var offsetLongitude = 0.005;
    return L.latLng(this.get('latitude')+offsetLatitude, this.get('longitude')+offsetLongitude);
  }.property('latitude', 'longitude')
});
