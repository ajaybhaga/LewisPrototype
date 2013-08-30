App.Router.map(function () {
  this.resource('restaurants', function() {
    this.route('new', { path: "/new" });
    this.resource('restaurant', {path: ':restaurant_id'});
  });

});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('restaurants.index');
  }
});

App.RestaurantsIndexRoute = Ember.Route.extend({
  model: function () {
    return App.Restaurant.find( { name: 'x' } );
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }
});

App.RestaurantsIndexController = Ember.ArrayController.extend({

 	search: function(name, foodTypes) { 		
 		if (!$('#resultsPanel').is(":visible")) {
 			$('#resultsPanel').fadeIn();
 		}
 		this.set('model', App.Restaurant.find( { name: name, type: foodTypes } ));
 	}
});

App.RestaurantsNewRoute = Ember.Route.extend({
  setupController: function(controller) {
    controller.newRecord();
  }
});

App.RestaurantsNewController = Ember.ObjectController.extend({
  newRecord: function() {
    this.set('content', App.Restaurant.createRecord({name: "New Restaurant"}));
  },

  save: function() {
      this.get('store').commit();
      this.get('target.router').transitionTo('restaurants.index');
  }
});