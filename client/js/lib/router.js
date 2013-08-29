App.Router.map(function () {  
  this.resource('main', { path: '/' });

  this.resource('restaurant', { path: '/restaurant/:restaurant_id' }, function() {
    this.route('edit');
  }); 

  this.route('addRestaurant', { path: '/restaurant/add' });

});

App.MainRoute = Ember.Route.extend({
  model: function () {
    return App.Restaurant.find( { name: 'x' } );
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }
});

App.MainController = Ember.ArrayController.extend({

 	search: function(name, foodTypes) { 		
 		if (!$('#resultsPanel').is(":visible")) {
 			$('#resultsPanel').fadeIn();
 		}
 		this.set('model', App.Restaurant.find( { name: name, type: foodTypes } ));
 	}
});

App.RestaurantNewRoute = Ember.Route.extend({
  model: function () {
    return App.Restaurant.find( { name: 'x' } );
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }
});

App.RestaurantNewController = Ember.ArrayController.extend({

 	search: function(name, foodTypes) { 		
 		if (!$('#resultsPanel').is(":visible")) {
 			$('#resultsPanel').fadeIn();
 		}
 		this.set('model', App.Restaurant.find( { name: name, type: foodTypes } ));
 	}
});


App.ClickableView = Ember.View.extend({
  click: function(evt) {
    this.get('controller').send('turnItUp', 11);
  }
});


App.MainView = Ember.View.extend({
  templateName: 'main',

  firstName: "Albert",
  lastName: "Hofmann"
});

App.ResultsView = Ember.View.extend({
  posts: 25,
  hobbies: "Riding bicycles"
});