var serverLib = require('../lib/serverLib');

module.exports = {
  addStock: function(req, res) {
    if (req.xhr) {
      nocklib.addStock(req.session._id, req.body.stock, function(err, price) {
        res.send(price);
      });
    }
  },

  getIndex: function(req, res) {
    res.send("This is the index");
  }
}
