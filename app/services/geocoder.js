import Ember from 'ember';

export default Ember.Service.extend({

  baseUrl: 'https://maps.googleapis.com/maps/api/geocode/json?',
  apiKey: 'AIzaSyCHW25YKlP2Z0ApfyLEEUEeKanMtJTj92Y',
  language: 'sl',
  components: 'country:SI',
  address: null,

  url: Ember.computed('address', function() {
    const baseUrl = this.get('baseUrl');
    const apiKey = this.get('apiKey');
    const language = this.get('language');
    const components = this.get('components');
    const address = encodeURIComponent(this.get('address'));

    return `${baseUrl}language=${language}&api=${apiKey}&components=${components}&address=${address}`;
  }),

  geocode(address) {
    this.set('address', address);
    return Ember.$.getJSON(this.get('url'));
  }
});