//Pull in the cheerio scraping tool
var cheerio = require("cheerio");
var request = require("request");

//Pull in mogoose db files
var db = require("../models");

//export routes
module.exports = function (app) {

    app.get("/scrape", function (req, res) {
        //use request to get the HTML body from the indicated site
        request("https://www.npr.org/sections/news/", function (error, response, html) {

            //set the html body equal to $ with cheerio
            var $ = cheerio.load(html);

            //loop through the page to find all the articles
            $("article").each(function (i, element) {
                //set up an empty object for the scraping result. We will test each result to see if it is already in our database before writing it in. The link will be considered unique, and be used to test for repeats. Only new articles will be populated into the database
                var result = {};

                result.title =  $(this).children(".item-info a").text();
                result.link = $(this).children(".item-info a").attr("href");

            

            })//end the loop for cheerio

            //set up each item needed 

        });//end scraper request
    });//end scrape route


}//end module.exports