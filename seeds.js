var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");

//CREATE CAMPGROUNDSS

var data = [
   { 
      name: "Cheese Balls", 
      image: "https://i.imgur.com/XJhscTj.jpg",
      description: "Brazilian cheese balls. Filled with Mozzarella Cheese, Vegetarian. Packed frozen",
      magicDescription: "This savoury cheese balls, has the same ingredients plus our magic! 100ml of cannabis Sativa",
      cateringDescription: "100 of Cheese balls, serves 20 people! This item can be served on catering events, both regular and magic!",
      price: 4.00,
      magicPrice: 10.00,
      cateringPrice: 70.00
      
   },
   { 
      name: "Chocolate Brownie (GF)", 
      image: "https://i.imgur.com/n5D1Ldr.jpg",
      description: "Chocolate Brownies. Made with Almond Flour and Coconut Palm Sugar. Gluten free, Paleo. ",
      magicDescription: "This savoury cheese balls, has the same ingredients plus our magic! 100ml of cannabis Sativa",
      cateringDescription: "This item can be served on catering events, both regular and magic!",
      price: 4.00,
      magicPrice: 10.00,
      cateringPrice: 99.99
      
   },
   { 
      name: "Mini Honey Cakes", 
      image: "https://i.imgur.com/dfPg1IX.jpg",
      description: "Filled with Dulce de Leche, covered in Dark Chocolate",
      magicDescription: "This savoury cheese balls, has the same ingredients plus our magic! 100ml of cannabis Sativa",
      cateringDescription: "This item can be served on catering events, both regular and magic!",
      price: 8.00,
      magicPrice: 10.00,
      cateringPrice: 99.99
      
   },
   { 
      name: "French Onion Tart", 
      image: "https://i.imgur.com/RGsbBTQ.jpg",
      description: "Topped with bacon and gruyere cheese, Gluten Free, Paleo. Packed Frozen.",
      magicDescription: "This savoury cheese balls, has the same ingredients plus our magic! 100ml of cannabis Sativa",
      cateringDescription: "This item can be served on catering events, both regular and magic!",
      price: 10.00,
      magicPrice: 20.00,
      cateringPrice: 99.99
      
   },
   { 
      name: "Almond Butter Cup", 
      image: "https://i.imgur.com/E2Odhs4.jpg",
      description: "Smooth Almond Butter Centre. Covered in Dark Chocolate. Gluten Free, Paleo",
      magicDescription: "This savoury cheese balls, has the same ingredients plus our magic! 100ml of cannabis Sativa",
      cateringDescription: "This item can be served on catering events, both regular and magic!",
      price: 8.00,
      magicPrice: 10.00,
      cateringPrice: 99.99
   },
   {
      name: "Brigadeiros", 
      image: "https://i.imgur.com/8E3xRar.jpg",
      description: "Chocolate, Dulce de Leche, Coconut or Powdered Milk and Nutella. Gluten-free. Pack of 2",
      magicDescription: "This savoury cheese balls, has the same ingredients plus our magic! 100ml of cannabis Sativa",
      cateringDescription: "This item can be served on catering events, both regular and magic!",
      price: 8.00,
      magicPrice: 10.00,
      cateringPrice: 99.99
   },
   {
      name: "Chocolate Bars",
      image: "https://i.imgur.com/DVIHPvx.jpg",
      description: "Chocolate Bars",
      magicDescription: "This savoury cheese balls, has the same ingredients plus our magic! 100ml of cannabis Sativa",
      cateringDescription: "This item can be served on catering events, both regular and magic!",
      price: 10.00,
      magicPrice: 25.00,
      cateringPrice: 99.99
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