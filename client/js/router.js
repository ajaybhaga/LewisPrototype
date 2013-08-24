App.Router.map(function () {  
  this.resource('search', { path: '/search/:name' });
  this.resource('start', { path: '/' });
});

App.StartRoute = Ember.Route.extend({
  model: function () {
    return App.Restaurant.find( { name: 'x' } );
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }
});

App.SearchRoute = Ember.Route.extend({
  model: function (params) {
  	alert(params.name);
    return App.Restaurant.find( { name: params.name } );
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }
});

App.SearchController = Ember.ArrayController.extend({
	soundVolume: 1,
	myText: 'My value',

	turnItUp: function(level){
    	//Do your thing
    	alert("Whoa!");
    	myText = 'New value';

 	}
});

App.ClickableView = Ember.View.extend({
  click: function(evt) {
    this.get('controller').send('turnItUp', 11);
  }
});
