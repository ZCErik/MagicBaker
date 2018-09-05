//Require mongoose
var mongoose = require("mongoose");

//Require passportLocal to easily manage users password/login 
var passportLocalMongoose = require("passport-local-mongoose");

//Creates a user Schema on the database
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//Call passport plugin to run
UserSchema.plugin(passportLocalMongoose);

//Export the module to be used else where 
module.exports = mongoose.model("User", UserSchema);