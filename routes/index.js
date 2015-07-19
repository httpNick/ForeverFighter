var express = require('express');
var router = express.Router();
var pg = require('pg');
var fs = require('fs');
var async = require('async');
var path = require('path');

var castbiodata;

var getFileData = function(filename, doneCallback) {
	fs.readFile(filename, "utf8", function(err, data) {
       if (err) {
       		return err;
       } else {
       	   return doneCallback(null, data);
   }
    });
}

var getCastBios = function(castobject, doneCallback) {
	var file = path.join(__dirname, castobject.bio);
	fs.readFile(file, "utf8", function(err, data) {
		if (err) {
			return err;
		} else {
			castobject.biotext = data;
			return doneCallback(null, castobject);
		}
	})
}

router.get('/castdata/:data', function(req, res, next) {
	castbiodata = JSON.parse(req.params.data);
	async.map(castbiodata, getCastBios, function(err, results) {
		for(x = 0; x < castbiodata.length; x++) {
			castbiodata[x] = results[x]; 
		}
		res.json(castbiodata);
	})
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
