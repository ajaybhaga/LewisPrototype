// Lewis Data Models

Lewis.Contact = DS.Model.extend({
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

Lewis.Source = DS.Model.extend({
	name: DS.attr('string')
  , description: DS.attr('string')
  , type: DS.attr('string')
  , typeDescription: DS.attr('string')
  , contacts: DS.attr('Lewis.Contact') 
});

Lewis.Ingredient = DS.Model.extend({
	name: DS.attr('string')
  , sourceId: DS.belongsTo('Lewis.Source')	
});

Lewis.Alternative = DS.Model.extend({
	name: DS.attr('string')
  , description: DS.attr('string')
  , ingredients: DS.hasMany('Lewis.Ingredient')
});


Lewis.MenuItem = DS.Model.extend({
	food: DS.attr('string')
  , description: DS.attr('string')
  , ingredients: DS.hasMany('Lewis.Ingredient')
  , alternatives: DS.hasMany('Lewis.Alternative')
});

Lewis.Menu = DS.Model.extend({
	name: DS.attr('string')
  , courseType: DS.attr('string')
  , menuItems: DS.hasMany('Lewis.MenuItem')
});

Lewis.Feature = DS.Model.extend({
	name: DS.attr('string')
});

Lewis.Loc = DS.Model.extend({
	name: DS.attr('string')
  ,	address: DS.attr('string')
  , city: DS.attr('string')
  , province: DS.attr('string')
  , postalCode: DS.attr('string')
  , neighbourhood: DS.attr('string')
  , region: DS.attr('string')
  , features: DS.hasMany('Lewis.Feature')
  , menus: DS.hasMany('Lewis.Menu')
  , contacts: DS.hasMany('Lewis.Contact') 
});

Lewis.Restaurant = DS.Model.extend({
	name: DS.attr('string')
  , description: DS.attr('string')
  , type: DS.attr('string')
  , locations: DS.hasMany('Lewis.Loc')
  , menus: DS.hasMany('Lewis.Menu')
});
