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
            var title, release, rating;
            var json = { title : "", release : "", rating : ""};

            // We'll use the unique header class as a starting point.
            $('.summary_text').filter(function(){
	           	// Let's store the data we filter into a variable so we can easily see what's going on.
	            var data = $(this);

	           	// In examining the DOM we notice that the title rests within the first child element of the header tag. 
	            // Utilizing jQuery we can easily navigate and get the text by writing the following code:

	            //title = data.children().first().text();
	            title = data.text();

           		// Once we have our title, we'll store it to the our json object.
                json.title = title;
                res.json(title);
            });
        }
    })
})

app.listen('3000')
console.log('Magic happens on port 3000');
exports = module.exports = app;