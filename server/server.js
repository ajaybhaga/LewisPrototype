// Lewis (server)

'use strict';

var express = require('express')
	, routes = require('./routes/routes')
	, db = require('./lib/db');

var app = express();

app.set('port', 3000);
app.set('title', 'Lewis');
app.set('version', 'v0.0.1');

app.set('mongoDbUrl', 'mongodb://localhost:27017/');
app.set('mongoDbName', 'lewis');

app.use(express.bodyParser());
app.use(express.methodOverride());

// ## CORS middleware
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

var errorHandler = function(err, req, res, next) {
	//res.status(500);
	//res.render('error', { error: err });
	res.send(500, 'Something broke!');
};

app.use(errorHandler);

// Routes
app.get('/', routes.getIndex);

// Retrieve API version
app.get('/api', function(req, res)
{
    res.send({
        'version': app.get('version')
    });
});

// List API paths
app.get('/api/restaurants', db.findRestaurants);

// Connect to database
console.log('Connecting to db...');
db.connect(app.get('mongoDbUrl'), app.get('mongoDbName'));

// Listen on port 3000
app.listen(3000);
console.log(app.get('title') + ' listening on port ' + app.get('port') + '...');

/*
db.createRestaurant('Golden China', 'This is a restaurant that serves hakka food.', 'Asian');
db.createRestaurant('Bamiyan Kabob', 'This is a restaurant that serves Halal meat.', 'Asian');
db.createRestaurant('Tangerine', 'This is a restaurant that serves hakka food.', 'Asian');
db.createRestaurant('Friendly Greek', 'This is a restaurant that serves healthy greek food.', 'Greek');
*/
