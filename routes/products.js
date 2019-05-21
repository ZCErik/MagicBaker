var express       = require("express"),
    router        = express.Router(),
    Product       = require("../models/product"),
    middlewareObj = require("../middleware");

//INDEX - Show all products
router.get("/", function(req, res){
    //Get all products from the database
    Product.find({}, function(err, allProducts){
       if(err){
           console.log(err);
       } else {
           //!The first one is the name we want, second one is the variable!
           res.render("products/index", {products: allProducts});
       }
    });
});

//Route to POST/CREATE a Campground
router.post("/", middlewareObj.isLoggedIn, function(req, res){

    //get data from form and add to products array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newProduct = {name: name, price: price, image: image, description: desc, author: author}
    
    //Create a new Product and save to DB
    Product.create(newProduct, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to products page
            console.log(newlyCreated);
            res.redirect("/products");
        }
    });
});

//Route to show a form to  add a new Campground
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
   res.render("products/new"); 
});

//Show any campground by getting its ID
router.get("/:id", function(req, res){
    //Find that ID provided and show that template
    Product.findById(req.params.id).populate("comments").exec(function(err, foundProduct){
       if(err || !foundProduct){
           req.flash("error", "Product not found");
           return res.redirect("back");
       } else {
           console.log(foundProduct);
           //render show table with that ID prouct
            res.render("products/show", {product: foundProduct}); 
       }
    });
});

//EDIT PRODUCT ROUTE
router.get("/:id/edit", middlewareObj.checkProductOwnership, function(req, res) {
    Product.findById(req.params.id, function(err, foundProduct){
        if(err){
            res.redirect("back");
        } else {
            res.render("products/edit", {product: foundProduct});   
        }
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middlewareObj.checkProductOwnership, function(req, res){
    //Find and update the correct product
    Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedCampground){
       if(err){
           res.redirect("/products/");
       } else {
           //redirect somewhere
           res.redirect("/products/" + req.params.id)
       }
    });
});

//DESTROY CAMPGROUND ROUNTE
router.delete("/:id", middlewareObj.checkProductOwnership, function(req, res){
    Product.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/products");
        } else {
            res.redirect("/products");
        }
    })
})

//Export the file to be used somewhere else
module.exports = router;