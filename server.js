var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var massive = require("massive");
var port = 3000;
var conn = massive.connectSync({
    connectionString: "postgres://postgres@localhost/sql-massive-node"
})

var app = module.exports = express();
app.use(bodyParser.json());

app.set("db", conn);
var productsCtrl = require('./productsCtrl');


app.post('/products', productsCtrl.Create)

app.get('/products', function(req, res, next) {
    if (req.query.productid) {
      console.log(req.query.productid)
        productsCtrl.GetOne(req, res)
    }
    else {
        productsCtrl.GetAll(req, res)
    }
})


app.put('/products', productsCtrl.Update)

app.delete('/products', productsCtrl.Delete);



var db = app.get("db");

app.listen(port, function() {
    console.log("Started Server on Port " + port)
})
