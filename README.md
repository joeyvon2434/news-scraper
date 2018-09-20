# news-scraper
## Summary
Basic news scraper to practice using MongoDB, Mongoose, and cheerio (for scraping).

## Deployed Website
https://powerful-meadow-82222.herokuapp.com/

## Github repo
https://github.com/joeyvon2434/news-scraper


## Quick summary:
News-Scraper is an application that pulls the headlines from a news site (it is specifically configured for NPR.org at the moment), and displays them to the user. The user can then make and save comments.

## Purpose:
This app was built with Express and Node,js to practice using Mongo DB, mongoose, and a scraping package (cheerio in this case);

## Contributors: 
Joseph Von Edwins

## Getting Started:
It's best to vist the deployed Heroku site at 
https://powerful-meadow-82222.herokuapp.com/

The site was built to be easy and intuitive to use. 
1. Start by clicking the Check for new articles button. This will activate the scrape route, and populate the page with any new articles.
2. The user can then click on the link to the article, or to review and make notes.
3. On the notes screen, the user can make new notes, or delete previous notes.

## Technologies:   
                Node.js
                Express
                HTML5
                CSS
                JavaScript
                Handlebars
                MongoDB
                Mongoose
                Request-promise

The GitHub repository is located at 
https://github.com/joeyvon2434/news-scraper


## Potential Future Improvements: 
        1. Add a login and authentication page and prevent users from commenting without logging in.
        2. Display comment authors.
        3. Set up the ability to query other sites, and allow the user to select which sites to query.
        4. Allow users to only delete their own posts.
        5. Add in validation and a check for vulgar content in the comments.
        6. Add a link to allow logged in user to report / flag offensive content for review by site moderators.
        7. Set up a moderator view.
        8. Add pagination.