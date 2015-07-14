var express = require('express');
var router = express.Router();
var pg = require('pg');
var fs = require('fs');
var async = require('async');
var path = require('path');

var getFileData = function(filename, doneCallback) {
	fs.readFile(filename, "utf8", function(err, data) {
       if (err) {
       		return err;
       } else {
       	   return doneCallback(null, data);
   }
    });
}

router.get('/db', function (req, res, next) {
	pg.connect(process.env.DATABASE_URL, function(err, client) {
	  var query = client.query('SELECT * FROM test_table');

	  query.on('row', function(row) {
	    console.log(JSON.stringify(row));
	    res.json(JSON.stringify(row));
	  });
	}); 
});

router.get('/bio', function(req, res, next) {
	var filePath = path.join(__dirname, 'frontpagebio.txt');
	async.map([filePath], getFileData, function(err, results) {
		res.json(results);
	}, function(err, results) {
		console.log(err);
	})
});

module.exports = router;
