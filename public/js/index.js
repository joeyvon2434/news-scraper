//File: index.js
//Summary: This file provides the client side javascript for the home page including all click functionality and client side validation

$(document).ready(function () { //document ready cause page to load part way down
    $('.note-toggle').hide();
    $(this).scrollTop(0);


    //Scraper click function
    $('#scrape-button').on('click', function () {
        event.preventDefault();

        console.log("sent to scrape route");

        $.ajax({
            method: "GET",
            url: "/scrape",
            data: {}
        }).then(function () {
            location.reload();
        })
    });


    //Click function to bring up the notes page
    $(this).on('click', '.article-notes-button', function () {
        event.preventDefault();
        var title = $(this).data('title');
        console.log('Title: ' + title);
        $('#note-article-title').text(title);
        var id= $(this).data('id');
        console.log('Id: ' + id);
        $('#note-save-button').attr('data-id', id);
        $('#note-delete-button').attr('data-id', id);

        $('.note-toggle').slideToggle();
    });//end function to bring up notes


    //Click function to close the note without saving
    $('#close-button').on('click', function () {
        event.preventDefault();
        $('.note-toggle').slideToggle();
    });//end close note without saving button function


    //Click function to save a new note
    $('#note-save-button').on('click', function() {
        event.preventDefault();

        var thisId = $(this).data("id");
        console.log("thisId: " + thisId);
        var noteObject = {
            noteTitle: $("#note-title").val(),
            noteText: $("#note-text").val()
        };

        $.ajax({
            method: "POST",
            url: "/article/" + thisId,
            data: noteObject
        }).then(function() {
            //finish out response here (maybe page re-load)
        });

    });//close save note clck function

});//end document.ready