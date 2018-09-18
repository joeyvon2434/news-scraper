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

        $("#note-title").val("");
        $("#note-text").val("");

        //set fields with know data
        var title = $(this).data('title');
        $('#note-article-title').text(title);
        var id = $(this).data('id');
        $('#note-save-button').attr('data-id', id);
        $('#note-delete-button').attr('data-id', id);

        //ajax call to retreive note for article
        $.ajax({
            method: "GET",
            url: "/article/" + id
        }).then(function (response) {

            populateCommentBox(response);

        });

        $('.note-toggle').slideToggle();
    });//end function to bring up notes


    //Click function to close the note without saving
    //with the close button
    $('#close-button').on('click', function () {
        event.preventDefault();
        $('.note-toggle').slideToggle();
    });//end close note without saving button function

    //Click function to close the note without saving
    //by clicking outside of the comment box
    $('#note-background').on('click', function () {
        event.preventDefault();
        $('.note-toggle').slideToggle();
    });//end close note without saving button function

    //Click function to close the note without saving
    //by clicking the x in the top right
    $('#close-x').on('click', function () {
        event.preventDefault();
        $('.note-toggle').slideToggle();
    });//end close note without saving button function


    //Click function to save a new note
    $('#note-save-button').on('click', function () {
        event.preventDefault();

        var thisId = $(this).data("id");
        var noteObject = {
            noteTitle: $("#note-title").val(),
            noteText: $("#note-text").val()
        };

        //ajax call to post the new note to the database
        $.ajax({
            method: "POST",
            url: "/article/" + thisId,
            data: noteObject
        }).then(function () {
            $('.note-toggle').slideToggle();
        });
    });//close save note clck function


    //Click function to delete a note
    $(this).on('click', ".note-delete-button", function () {
        event.preventDefault();

        console.log('Deleting Note!')
        var noteId = $(this).attr('data-id');
        $(this).parent().remove();

        $.ajax({
            method: "DELETE",
            url: "/note/" + noteId
        }).then(function () {

        });

    });//end delete click function for notes / comments


});//end document.ready

//This function populates the comment box when called
function populateCommentBox(response) {
    $("#comment-box").empty();

    for (var i = response.note.length - 1; i > -1; i--) {
        var note = response.note[i];

        var comment = $("<div class='comment' data-id='" + note._id + "'></div>");
        var commentTitle = $("<h3 class='comment-title'>" + note.noteTitle + "</h3>");
        var commentText = $("<p class='comment-text'>" + note.noteText + "</p>");
        var deleteButton = $("<button class='note-delete-button' data-id='" + note._id + "'>Delete Comment</button>");

        comment.append(commentTitle);
        comment.append(commentText);
        comment.append(deleteButton);

        $("#comment-box").append(comment);
    }
};