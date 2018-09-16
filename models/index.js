//File: models/index.js
//summary: this file allows all mongo db models created using mongoose in the models directory to be exported as one object for use in the routes and server files


module.exports = {
    article: require("./article"),
    note: require("./note")
};