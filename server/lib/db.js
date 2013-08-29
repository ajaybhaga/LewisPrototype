var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var url = require('url');

var db = mongoose.connection;


var JSON2 = require('JSON2');

var restaurantSchema = new Schema({
    name: String
    , description: String
    , type: { type: String, enum: ['Afghan','African','American','Armenian','Asian','Bagels','Bakery','Barbecue','Bistro','Brazilian','Breakfast / Brunch','British','Buffet','Burgers','California','Canadian','Caribbean','Chicken','Chinese','Coffee & Tea','Cuban','Delicatessen','Desserts','Dim Sum','Diner','Donair','Donuts','Eastern European','Ethiopian','European','Family Fare','Fast Food','Filipino','Fish and Chips','French','Fusion','Gastropub','German','Greek','Hot Dogs & Sausage','Indian','International','Iranian','Italian','Japanese','Korean','Kosher','Latin American','Lebanese','Malaysian','Mediterranean','Mexican','Middle Eastern','Moroccan','Pakistani','Pizza','Portuguese','Pub Food','Salads','Sandwiches/Subs','Seafood','Smoothies','Soups','Southern & Soul','Southwestern','Spanish','Steakhouse','Sushi','Tacos','Tapas','Tex-Mex','Thai','Turkish','Vegetarian','Vietnamese','Wine Bar','Other'] }
    , location: {
        name: String
      , address: String
      , city: String
      , province: String
      , postalCode: String
      , neighbourhood: { type: String, enum: ['Annex','Avenue & Lawrence','Baldwin Village','Bayview & leaside','Beaches','Bloor West Village','Bloorcourt','Bloordale Village','Cabbagetown','Chinatown','Church Wellesley Village','Corktown','Corso Italia','Danforth','Distillery Distrct','Dufferin Grove','Dundas West','East York','Eglinton West','Entertainment District','Etobicoke','Financial District','Forest Hill','Gerrard India Bazaar','Greektown','Harbourfront','High Park','Junction Triangle','Kensington Market','King East','King West','Koreatown','Lakeshore','Leslieville','Liberty Village','Little Italy','Midtown','North Toronto','North York','Ossington','Papevillage','Parkdale','Queen West','Riverdale','Roncesvalles Village','Rosedale','Scarborough','St Lawrence Market','St. Clair West','The Annex','The Bluffs','The Junction','University of Toronto','West Queen Street','West Toronto','Yonge and Dundas','Yonge and Eglinton','Yonge and Lawrence','Yonge and St. Clair','Yonge and Wellesley','York','Yorkville','Burlington','Halton Hills','Milton','Oakville','Brampton','Caledon','Mississauga','Ajax','Clarington','Oshawa','Pickering','Scugog','Uxbridge','Whitby','Aurora','East Gwillinbury','Georgina','King Township','Markham','Newmarket','Richmond Hill','Thornhill','Vaughan','Stouffville','Woodbridge'] }  
      , region: { type: String, enum: ['City of Toronto','GTA West','GTA East','GTA North'] }
      , features: [{ 
        name: { type: String, enum: ['Delivery Option','Free Wi-Fi','Late Night','Live Music','Liquore Licensed (LLBO)','Outdoor Patio/Dining','Private Room / Party Options','Romantic','Sports Bar','Waterfront','Valet Parking','Fastfood','Fast Casual','Casual Dining','Family Friendly','Chic / Trendy','Fine Dining','Winelist','Catering Option'] }
      }]
      , menus: [{
          name: String
        , courseType: { type: String, enum: ['breakfast','lunch','dinner'] }
        , menuItems: [{
            food: String
          , description: String
          , ingredients: [{
              name: String
            , sourceId: Number
          }]
          , alternatives: [{
              name: String
            , description: String
            , ingredients: [{
                name: String
              , sourceId: Number
            }]            
          }]
        }] 
      }]
      , contact: {
          name: String
        , phone1: String
        , phone2: String
        , fax: String
        , email: String
        , publicPhone: String
        , publicEmail: String
        , creationDate: Date
        , lastUpdateDate: Date
      }
    }
}, { strict: true });

var sourceSchema = new Schema({
    name: String
  , description: String
  , type: { type: String, enum: ['Local Produce','Organic Produce','Sustainable Produce','Locally Produced Meat','Sustainably Produced Meat','Free-Range Poultry'] }
  , typeDescription: { type: String, enum: ['Local food is food grown close to where its bought and consumed. The main difference is that it doesn’t travel too far before it reaches your plate. Transporting food across long distances burns fossil fuels and emits greenhouse gases. By buying from local markets, it not only reduces the fossil fuel use and greenhouse gases, it also supports your local economy!  \n\nIn this case we are referring specifically to locally produced vegetables and produce.','Producers of organic foods work in harmony with nature. Organic agriculture is a holistic production system which uses sustainable farming methods, respecting ecological balance.\n\nBy adding fertility to soil, biodiversity to farms, and sustainability to the operation, organic farmers are farming for your future.\n\nOrganic producers agree not to use GMOs; synthetic pesticides, herbicides or fungicides; irradiation; chemical fertilizers; sewage sludg;e or antibiotics.\nIn this case, we are referring specifically to the organic production of vegetables and produce. ','Sustainable food has a lower impact on the environment by being produced in a socially responsible manner, even though it is not always local. Food produced sustainably may even protect biodiversity, wildlife habitats, and respect workers.\n\nSustainability aims to support buying food as local as possible, but just because it’s local does not always mean it’s produced sustainably. Local food may involve chemicals, fertilizers, factory farming or hormone use. Therefore, when you go to buy local food, make sure to always ask and find out if the farmer or gardener used sustainable methods. \n\nIn this case, we are referring to the sustainable production of vegetables and produce.','Local food is food grown close to where its bought and consumed. The main difference is that it doesn’t travel too far before it reaches your plate. Transporting food across long distances burns fossil fuels and emits greenhouse gases. By buying from local markets, it not only reduces the fossil fuel use and greenhouse gases, it also supports your local economy!  \n\nIn this case we are referring specifically to locally produced red and white meat.','Sustainable food has a lower impact on the environment by being produced in a socially responsible manner, even though it is not always local. Food produced sustainably may even protect biodiversity, wildlife habitats, and respect workers.\n\nSustainability aims to support buying food as local as possible, but just because it’s local does not always mean it’s produced sustainably. Local food may involve chemicals, fertilizers, factory farming or hormone use. Therefore, when you go to buy local food, make sure to always ask and find out if the farmer or gardener used sustainable methods. \n\nIn this case, we are referring to the sustainable production red and white meat.','The term “free range” has not been legally defined in either Canada or the U.S. but generally, it refers to poultry that has been permitted to graze or forage outdoors. Since there is no hard and fast definition of this term, we recommend speaking to your butcher or grocer about what exactly is meant by free range, especially when buying chicken in the winter or early spring as chickens cannot be raised outdoors in most Canadian winters.'] }
  , contact: {
      name: String
    , phone1: String
    , phone2: String
    , fax: String
    , email: String
    , creationDate: Date
    , lastUpdateDate: Date 
  }
}, { strict: true });

var RestaurantModel = mongoose.model('Restaurant', restaurantSchema);
var RourceModel = mongoose.model('Source', sourceSchema);

db.on('error', console.error);
db.once('open', function() {
  console.log('Connected to db.');

});

var onError = function(res, err)
{
    if (res) res.send({ 'error': err.message });
};

var onSuccess = function(res, data)
{
    if (!res) return;
    if (data) {
        res.send(data);
    } else {
        res.send({ 'success': true });
    }
};

module.exports = {
  connect: function(url, dbName) {
    mongoose.connect(url + dbName);
  },

  createRestaurant: function(name, description, type) {
    var newRestaurant = new RestaurantModel({
        name: name
      , description: description
      , type: type
    });

    console.log('Creating restaurant: name = [' + name +'], description = [' + description +'], type = [' + type +']...');

    newRestaurant.save(function(err, newRestaurant) {
      if (err) return console.error(err);
      console.dir(newRestaurant);
    });
  },

  findRestaurants: function(req, res) {

    console.log('Received /api/findRestaurants request...');
    
    // Retrieve url query
    var url_parts = url.parse(req.url, true);
    console.log(url_parts.query);

/*
    if (!url_parts.query.name) {
        res.statusCode = 400;
        return res.send('Error 400: Get syntax incorrect.');
    }
*/

    console.log("findRestaurants: url_parts.query.name = " + url_parts.query.name);
    console.log("findRestaurants: url_parts.query.type = " + url_parts.query.type);

    if ((url_parts.query.name) && (url_parts.query.type)) {
    RestaurantModel.find({ name : url_parts.query.name, type: url_parts.query.type }, function(err, data) {
          if (err) return onError(res, err);        
          onSuccess(res, { 'restaurants': data });
    });
    }


    if ((!url_parts.query.name) && (url_parts.query.type)) {
    RestaurantModel.find({ type: url_parts.query.type }, function(err, data) {
          if (err) return onError(res, err);        
          onSuccess(res, { 'restaurants': data });
    });
    }

    if ((url_parts.query.name) && (!url_parts.query.type)) {
    RestaurantModel.find({ name: url_parts.query.name }, function(err, data) {
          if (err) return onError(res, err);        
          onSuccess(res, { 'restaurants': data });
    });
    }

    if ((!url_parts.query.name) && (!url_parts.query.type)) {
    RestaurantModel.find({ name: 'none' }, function(err, data) {
          if (err) return onError(res, err);        
          onSuccess(res, { 'restaurants': data });
    });
    }



  },

  findRestaurantsByName: function(name, req, res) {

    RestaurantModel.find({ name: name }, function(err, data) {
          if (err) return onError(res, err);        
          onSuccess(res, { 'restaurants': data });
    });

  },

  findRestaurantByType: function(type, callback) {
    RestaurantModel.find({ type: type }, function(err, data) {
      if (err) {
        console.log('Error during findRestaurantByType.');
      } else {
        console.log(data);
      }

      callback(err, err ? null : data);

      return results;
    });
  }
};