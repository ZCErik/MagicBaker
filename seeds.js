var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");

//CREATE CAMPGROUNDSS

var data = [
   { 
      name: "Cheese Balls", 
      image: "https://i.imgur.com/Cb2DfdD.jpg",
      description: "Brazilian cheese balls. Filled with Mozzarella Cheese, Vegetarian. Packed frozen",
      price: 10.00
      
   },
   { 
      name: "Gluten-Free Chocolate Brownie", 
      image: "https://i.imgur.com/vOeSb3B.jpg",
      description: "Chocolate Brownies. Made with Almond Flour and Coconut Palm Sugar. Gluten free, Paleo. ",
      price: 10.00
      
   },
   { 
      name: "Mini Honey Cakes", 
      image: "https://i.imgur.com/K7ONuAL.jpg",
      description: "Filled with Dulce de Leche, covered in Dark Chocolate",
      price: 8.00
      
   },
   { 
      name: "French Onion Tart", 
      image: "https://i.imgur.com/RGsbBTQ.jpg",
      description: "Topped with bacon and gruyere cheese, Gluten Free, Paleo. Packed Frozen.",
      price: 20.00
      
   },
   { 
      name: "Almond Butter Cup", 
      image: "https://i.imgur.com/8qqCBrK.jpg",
      description: "Smooth Almond Butter Centre. Covered in Dark Chocolate. Gluten Free, Paleo",
      price: 8.00
   },
   {
      name: "Brigadeiros", 
      image: "https://i.imgur.com/8E3xRar.jpg",
      description: "Chocolate, Dulce de Leche, Coconut or Powdered Milk and Nutella. Gluten-free. Pack of 2",
      price: 8.00
   },
   
   {
      name: "Chocolate Bars",
      image: "https://i.imgur.com/DVIHPvx.jpg",
      description: "Chocolate Bars",
      price: 25.00
   }
]

function seedDB() {
   //Remove all campgrounds
   Campground.remove({}, function(err){
      if(err) {
          console.log(err);
      } else {
          console.log("removed all the products");
      }
      //Add a few campgrounds - Loop for each campground on DB and create it
      data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
            if(err){
               console.log(err);
            } else {
               console.log("Campground has been added");
               
               //Add comments
               Comment.create(
               {
                  text: "This is a yummy food!",
                  author: "Agnes T."
               }, function(err, comment){
                  if(err){ 
                     console.log(err);
                  } else {
                     campground.comments.push(comment);
                     campground.save();
                     console.log("Created new comment");
                  }
               })
            }
         })
      });
   });
}

module.exports = seedDB();