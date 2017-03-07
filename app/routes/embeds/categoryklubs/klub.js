import Ember from 'ember';
import KlubRoute from 'klubi/routes/klubs/klub';
import Prerenderable from 'klubi/mixins/after-render-prerenderable';

export default KlubRoute.extend(Prerenderable, {
  WANTED_ZOOM_LEVEL: 16,
  assetMap: Ember.inject.service('asset-map'),

  model(params, transition) {
    return this.store.findRecord('klub', params.klub_id);
  },
  afterModel(model) {
    // Preload the parent (to get all of its attributes)
    // This is necessary because the api never returns the parent's branches
    // (issue when a parent has multiple branches)
    if (model.get('parent.id')) {
      this.store.findRecord('klub', model.get('parent.id'));
    }
  },
  setupController(controller, model) {
    let parent = model;
    controller.set('selectedLocation', model)
    if (model.get('parent.id')) {
      parent = model.get('parent');
    }
    // controller.set('model', parent)

    this._super(controller, parent)

    var currentCategory = this.controllerFor('klubs').get('category')

    const klubsController = this.controllerFor('klubs')
    if (parent.get('categories').indexOf(currentCategory) === -1) {
      klubsController.set('category', parent.get('categories')[0])
    }

    let categoryKlubsController = this.controllerFor('embeds.categoryklubs');

    // Ask the controller to ask parent to set the map position correct
    categoryKlubsController.send('zoomToLocation', model.get('location'), this.WANTED_ZOOM_LEVEL);
  },
  actions: {
    goHomeToEmbedsKlubs() {
      console.log('going to categoryklubs index')
      this.transitionTo('embeds.categoryklubs.index');
    }
  },
  headTags() {
    var klub = this.modelFor(this.routeName)
    var category = this.controllerFor('embeds.categoryklubs').get('category')
    return [{
      type: 'meta',
      tagId: 'meta-description',
      attrs: {
        name: 'description',
        content: `${klub.get('name')} je ${category} klub v mestu ${klub.get('town')}. Najdi najboljši ${category} klub v svoji bližini.`
      }
    }, {
      type: 'meta',
      tagId: 'meta-og-description',
      attrs: {
        property: 'og:description',
        content: `${klub.get('name')} je ${category} klub v ${klub.get('town')}.`
      }
    }, {
      type: 'link',
      tagId: 'link-canonical',
      attrs: {
        rel: 'canonical',
        content: `http://www.klubi.si/${category}/${klub.get('id')}`
      }
    }, {
      type: 'meta',
      tagId: 'meta-og-url',
      attrs: {
        property: 'og:url',
        content: `http://www.klubi.si/${category}/${klub.get('id')}`
      }
    }, {
      type: 'meta',
      tagId: 'meta-og-title',
      attrs: {
        property: 'og:title',
        content: `${klub.get('name')}`
      }
    }]
  },
});
