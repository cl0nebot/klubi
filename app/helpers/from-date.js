import Ember from 'ember';

export function fromDate(date) {
  return moment(date[0]).fromNow();
}


export default Ember.HTMLBars.makeBoundHelper(fromDate);
