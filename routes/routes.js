//Pull in the cheerio scraping tool
var cheerio = require("cheerio");
var request = require("request");
var mongoose = require("mongoose");

//Pull in mogoose db files
var db = require("../models");

//Connect to Mongo DB
mongoose.connect("mongodb://localhost/news-scraper", {useNewUrlParser: true});

//export routes
module.exports = function (app) {

    app.get("/scrape", function (req, res) {
        //use request to get the HTML body from the indicated site
        request("https://www.npr.org/sections/news/", function (error, response, html) {

            //set the html body equal to $ with cheerio
            var $ = cheerio.load(html);

                console.log("Scrape Starting");
            //loop through the page to find all the articles
            $(".list-overflow article").each(function (i, element) {
                //set up an empty object for the scraping result. We will test each result to see if it is already in our database before writing it in. The link will be considered unique, and be used to test for repeats. Only new articles will be populated into the database
                var result = {};

                result.title =  $(this).find(".item-info h2 a").text();
                result.link = $(this).find(".item-info h2 a").attr("href");

                var imageLinkCheck = undefined;
                imageLinkCheck = $(this).find(".item-image .imagewrap a img").attr("src");

                //result.imageLink = imageLinkCheck;

                if (imageLinkCheck !== undefined) {
                    result.imageLink = imageLinkCheck;
                };
                
                //check to ensure a link exists, then insert the result into the database
                if (result.link !== undefined) {
                    db.article.findOne({link: result.link}).then(function (dbArticle){
                        if (dbArticle) {
                            console.log('Article already exists in database');
                        } else {
                            db.article.create(result).then(function (newArticle) {
                                console.log('New article added');
                            })
                            .catch(function (err) {
                                console.log(err)
                            });
                        }
                    });
                }
            })//end the loop for cheerio

            //send info letting user know the scrape was completed
            //Change this to res.end later, and add a location reload in the ajax call
            res.send("Scrape Complete");

        });//end scraper request
    });//end scrape route


}//end module.exports