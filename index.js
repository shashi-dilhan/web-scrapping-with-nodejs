var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/', function(req, res) {
    url = 'http://www.imdb.com/title/tt1229340/';
    request(url, function(error, response, html) {
        if(!error){
            var $ = cheerio.load(html);
	    var text = '';
            $('.summary_text').filter(function(){
	        var data = $(this);
	        text = data.text();
            });
            res.json(text);
        }
    })
})

app.listen('3000')
exports = module.exports = app;
