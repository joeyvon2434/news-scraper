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
        //set fields with know data
        var title = $(this).data('title');
        $('#note-article-title').text(title);
        var id= $(this).data('id');
        $('#note-save-button').attr('data-id', id);
        $('#note-delete-button').attr('data-id', id);

        //ajax call to retreive note for article
        $.ajax({
            method: "GET",
            url: "/article/" + id
        }).then(function(response) {
            //take data from database and populate the note fields
            console.log(response);
            $("#note-title").val(response.note.noteTitle);
            $("#note-text").text(response.note.noteText);
        });

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
            $('.note-toggle').slideToggle();
        });

    });//close save note clck function

});//end document.ready