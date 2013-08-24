// Data Models

App.Contact = DS.Model.extend({
	name: DS.attr('string')
  , phone1: DS.attr('string')
  , phone2: DS.attr('string')
  , fax: DS.attr('string')
  , email: DS.attr('string')
  , publicPhone: DS.attr('string')
  , publicEmail: DS.attr('string')
  , creationDate: DS.attr('date')
  , lastUpdateDate : DS.attr('date')
});

App.Source = DS.Model.extend({
	name: DS.attr('string')
  , description: DS.attr('string')
  , type: DS.attr('string')
  , typeDescription: DS.attr('string')
  , contacts: DS.attr('App.Contact') 
});

App.Ingredient = DS.Model.extend({
	name: DS.attr('string')
  , sourceId: DS.belongsTo('App.Source')	
});

App.Alternative = DS.Model.extend({
	name: DS.attr('string')
  , description: DS.attr('string')
  , ingredients: DS.hasMany('App.Ingredient')
});


App.MenuItem = DS.Model.extend({
	food: DS.attr('string')
  , description: DS.attr('string')
  , ingredients: DS.hasMany('App.Ingredient')
  , alternatives: DS.hasMany('App.Alternative')
});

App.Menu = DS.Model.extend({
	name: DS.attr('string')
  , courseType: DS.attr('string')
  , menuItems: DS.hasMany('App.MenuItem')
});

App.Feature = DS.Model.extend({
	name: DS.attr('string')
});

App.Loc = DS.Model.extend({
	name: DS.attr('string')
  ,	address: DS.attr('string')
  , city: DS.attr('string')
  , province: DS.attr('string')
  , postalCode: DS.attr('string')
  , neighbourhood: DS.attr('string')
  , region: DS.attr('string')
  , features: DS.hasMany('App.Feature')
  , menus: DS.hasMany('App.Menu')
  , contacts: DS.hasMany('App.Contact') 
});

App.Restaurant = DS.Model.extend({
	name: DS.attr('string')
  , description: DS.attr('string')
  , type: DS.attr('string')
  , locations: DS.hasMany('App.Loc')
  , menus: DS.hasMany('App.Menu')
});
