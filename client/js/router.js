Lewis.Router.map(function () {
  this.resource('main', { path: '/' });
});

Lewis.MainRoute = Ember.Route.extend({

  model: function () {
    return Lewis.Restaurant.find();
  }
});