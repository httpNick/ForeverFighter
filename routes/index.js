var express = require('express');
var router = express.Router();
var pg = require('pg');
var fs = require('fs');

var frontpagequote = "Hi, my name is Johnny Rayne, born Andi Hangiu (Hang-you) on August 24th, 1985 in Cluj-Napoca (CLU-jh NApoca), Romania. Came to the United States on July 24th, 1995. Raised all my life in Washington State, been around the world, but there is no place like my evergreen home. Wanted to be an Aerospace Engineer, but life had other plans. \\n As a child always wanted to be an actor, a storyteller. As one grows up one learns that we must do what all adults do and get a real job, so why not an engineer. I like math, physics, and flying so why not, Aerospace seemed logical to me. I was trying to go to school as W.S.U. (Washington State University), had all my paperwork filled out, application and what not, when an Art College came to my school. Cornish College of the Arts was doing a tour of all the high schools in our area and wanted to let all the students know that if you were interested in the Arts they had a free tour on this day, blah, blah, blah. I thought nothing of it. I was not asked what I wanted to be since I was like 7, but we all get all older and we all must choose something adult to do."; 
//console.log(process.env.DATABASE_URL);
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
	res.json(frontpagequote);
})

module.exports = router;