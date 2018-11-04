var express = require("express"), 
    router = express.Router(),
    User = require("../models/users"),
    passport = require("passport");

//Route for main page
router.get("/", function(req, res){
   res.render("landing");
});

//===============
// AUTH ROUTES
//===============

//Shows register form
router.get("/register", function(req, res) {
   res.render("register"); 
});

//Handle Sign up route, from users form sending data to register a new one
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username });
    
    //if works pass the new user to a callback function
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        
        //else Authenticate the user
        passport.authenticate("local")(req, res, function(){       
            req.flash("success", "Welcome to Magic Baker" + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show Login form
router.get("/login", function(req, res) {
   res.render("login"); 
});

//Handling login logic
router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res) {
});


//LOGOUT ROUTES
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds");
});

//Export the file to be used somewhere else
module.exports = router;