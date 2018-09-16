//File: models/article.js
//Summary: this file sets up the article model to be used by mongoose and associates the proper note to the correct article 

//require mongoose
var mongoose = require("mongoose");

//set up a reference to the mongoose schema reference for use
var Schema = mongoose.Schema;

//use the schema constructor to create an article model
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    imageLink: {
        type: String
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note" //this may need to be lowercase, check once data is being pulled
    }

}); //end article schema

//Creates the model from the schema above
//Unnecessary additional variable, but good for clarity
var Article = mongoose.model("Article", ArticleSchema);

//Export the Article model
modeul.exports = Article;