var express = require('express');
var router = express.Router();
var pg = require('pg');

//console.log(process.env.DATABASE_URL);

pg.connect(process.env.DATABASE_URL, function(err, client) {
  var query = client.query('SELECT * FROM test_table');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
}); 

module.exports = router;