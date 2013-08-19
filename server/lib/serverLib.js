'use strict';

var cookie = require('cookie')
  , bcrypt = require('bcrypt')
  , db = require('./db')
  , express = require('express')
  , http = require('http')
  , MemoryStore = express.session.MemoryStore
  , ObjectID = require('mongodb').ObjectID;

var sessionStore = new MemoryStore();
var io;
var online = [];
var lastExchangeData = {};

module.exports = {
  getRestaurants: function(callback) {
    db.findRestaurants(function(err, data) {
      callback(err, err ? null : data);
    });
  },

  getRestaurantsByType: function(type, callback) {
    db.findRestaurantByType(type, function(err, data) {
      callback(err, err ? null : data);
    });
  },

  addStock: function(uid, stock, callback) {
    function doCallback() {
      counter++;
      if (counter == 2) {
        callback(null, price);
      }
    }
              
    var counter = 0;
    var price;

    module.exports.getStockPrices([stock], function(err, retrieved) {   
      price = retrieved[0];
      doCallback();
    });      
    db.push('users', new ObjectID(uid), {portfolio: stock}, doCallback);
  },
  
  createSocket: function(app) {
    io = require('socket.io').listen(app);
    io.configure(function (){
      io.set("transports", ["xhr-polling"]);
      io.set("polling duration", 10);
      io.set('authorization', function (handshakeData, callback) {
        if (handshakeData.headers.cookie) {
          handshakeData.cookie = cookie.parse(decodeURIComponent(handshakeData.headers.cookie));
          handshakeData.sessionID = handshakeData.cookie['connect.sid'];
          sessionStore.get(handshakeData.sessionID, function (err, session) {
            if (err || !session) {
              return callback(null, false);
            } else {
              handshakeData.session = session;
              console.log('session data', session);
              return callback(null, true);
            }
          });
        }
        else {
          return callback(null, false);
        }
      });
      io.sockets.on('connection', function (socket) {
        socket.on('clientchat', function (data) {
          var message = socket.handshake.session.username + ': '
            + data.message + '\n';
          socket.emit('chat', { message: message});
          socket.broadcast.emit('chat', { message: message});        
        });
        socket.on('disconnect', function (data) {
          var username = socket.handshake.session.username;
          var index = online.indexOf(username);
          online.splice(index, 1);
          socket.broadcast.emit('disconnect', { username: username});
        });
        socket.on('joined', function (data) {
          online.push(socket.handshake.session.username);
          var message = socket.handshake.session.username + ': ' + data.message + '\n';
          socket.emit('chat', { message: message, users: online});
          socket.broadcast.emit('chat', { message: message, username: socket.handshake.session.username});
        });
        socket.on('requestData', function (data) {
          socket.emit('initExchangeData', {exchangeData: transformExchangeData(lastExchangeData)});
        });
        socket.on('updateAccount', function (data) {       
          module.exports.updateEmail(socket.handshake.session._id, data.email, function(err, numUpdates) {
            socket.emit('updateSuccess', {});
          });
        });
      });
    });   
  },
      
  createUser: function(username, email, password, callback) {
    var user = {username: username, email: email, password: encryptPassword(password)};
    db.insertOne('users', user, callback);
  },
  
  ensureAuthenticated: function (req, res, next) {
    if (req.session._id) {
      return next();
    }
    res.redirect('/');
  },
  
  getSessionStore: function() {
    return sessionStore;
  },
  
  getStockPrices: function(stocks, callback) {
    var stockList = '';
    stocks.forEach(function(stock) {
      stockList += stock + ',';
    });
    
    var options = {  
      host: 'download.finance.yahoo.com',  
      port: 80,
      path: '/d/quotes.csv?s=' + stockList + '&f=sl1c1d1&e=.csv'
    };   
    
    http.get(options, function(res) { 
      var data = '';
      res.on('data', function(chunk) {
        data += chunk.toString();
      })
      .on('error', function(err) { 
        console.err('Error retrieving Yahoo stock prices');
        throw err; 
      })
      .on('end', function() {
        var tokens = data.split('\r\n');
        var prices = [];
        tokens.forEach(function(line) {
          var price = line.split(",")[1];
          if (price)
            prices.push(price);
          }); 
        callback(null, prices);
      });  
    });    
  },
  
  getUserById: function(id, callback) {
    db.findOne('users', {_id: new ObjectID(id)}, callback);
  },

  getUser: function(username, callback) {
    db.findOne('users', {username: username}, callback);
  },
  
  sendExchangeData: function(stock, exchangeData) {
    lastExchangeData[stock] = exchangeData;
    var current = transformStockData(stock, exchangeData);
    io.sockets.emit('exchangeData', current); 
  },

  sendTrades: function(trades) {
    io.sockets.emit('trade', JSON.stringify(trades));
  },
  
  updateEmail: function(id, email, callback) {
    db.updateById('users', new ObjectID(id), {email: email}, callback);
  }
}

function encryptPassword(plainText) {
  return crypto.createHash('md5').update(plainText).digest('hex');
}