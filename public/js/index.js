//File: index.js
//Summary: This file provides the client side javascript for the home page including all click functionality and client side validation

//Scraper click function
$('#scrape-button').on('click', function() {
    event.preventDefault();

    console.log("sent to scrape route");

    $.ajax({
        method: "GET",
        url: "/scrape",
        data: {}
    }).then(function(){
        location.reload();
    })
});