var Product = require("../models/product"),
    Comment    = require("../models/comment");

var middlewareObj = {};

//Middleware to check if user owns campgrounds
middlewareObj.checkProductOwnership = function(req, res, next) {
    //Only if user is logged in
    if(req.isAuthenticated()){
        Product.findById(req.params.id, function(err, foundProduct){
            if(err || !foundProduct){
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            } else {
                //Only if users is the owner - Uses Mongoose method to compare
                if(foundProduct.author.id.equals(req.user._id)) {
                    next();  
                } else {
                    req.flash("error", "You need to be logged in to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
} 
//Middleware to check if user owns comment
middlewareObj.checkCommentOwnership = function(req, res, next) {
    //Only if user is logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                //Only if users is the owner - Uses Mongoose method to compare
                if(foundComment.author.id.equals(req.user._id)) {
                    next();  
                } else {
                    req.flash("error", "You need to be logged in to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

//MIDDLEWARE TO CHECK IF THE USER IS LOGGED IN
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
}

module.exports = middlewareObj;