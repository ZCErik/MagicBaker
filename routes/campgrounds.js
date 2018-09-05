var express       = require("express"),
    router        = express.Router(),
    Campground    = require("../models/campground"),
    middlewareObj = require("../middleware");

//INDEX - Show all campgrounds
router.get("/", function(req, res){
    //Get all campgrounds from the database
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           //!The first one is the name we want, second one is the variable!
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
});

//Route to POST/CREATE a Campground
router.post("/", middlewareObj.isLoggedIn, function(req, res){

    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: desc, author: author}
    
    //Create a new Campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

//Route to show a form to  add a new Campground
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//Show any campground by getting its ID
router.get("/:id", function(req, res){
    //Find that ID provided and show that template
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err || !foundCampground){
           req.flash("error", "Campground not found");
           return res.redirect("back");
       } else {
           console.log(foundCampground);
           //render show table with that ID campground
            res.render("campgrounds/show", {campground: foundCampground}); 
       }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});   
        }
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    //Find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds/");
       } else {
           //redirect somewhere
           res.redirect("/campgrounds/" + req.params.id)
       }
    });
});

//DESTROY CAMPGROUND ROUNTE
router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

//Export the file to be used somewhere else
module.exports = router;