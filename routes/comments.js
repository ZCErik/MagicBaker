var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middleware = require("../middleware");

// ====================
// Comments ROUTES
// ====================

//Create a NEW comment
router.get("/new", middleware.isLoggedIn, function(req, res) {
    
    //Find by Id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Something went wrong");
        } else {
            res.render("comments/new", {campground: campground});        
        }
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
   //Lookup campground using ID
   Campground.findById(req.params.id, function(err, campground) {
      if(err){
          req.flash("error", "Something went wrong");
          res.redirect("/campgrounds");
      } else {
        //create new comment
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               
               //save comment
               comment.save();
               
               //connect new comment to campgrounds
               campground.comments.push(comment);
               campground.save();
               //redirect to that campground
               req.flash("Success", "Success added a comment");
               res.redirect("/campgrounds/" + campground._id);
           }
        });
      }
   });
});

//Edit a comment router
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
        }
    });
});

//Updte a comment router
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

//Destroy a comment router
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   //findByIdAndRemove
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
                
           req.flash("success", "Comment deleted");     
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

//Export the file to be used somewhere else
module.exports = router;