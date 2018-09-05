var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");

//CREATE CAMPGROUNDSS

var data = [
   { 
      name: "Cheese Balls", 
      image: "https://i.imgur.com/Cb2DfdD.jpg",
      description: "Brazilian cheese balls. Bacon ipsum dolor amet chuck pork loin venison meatball bresaola pancetta tongue landjaeger. Tail ball tip leberkas chicken. Sausage drumstick sirloin, spare ribs pastrami turkey pig filet mignon alcatra hamburger t-bone flank jowl. Beef pig beef ribs meatloaf jowl flank swine rump boudin filet mignon. Pancetta kevin turkey pork chop. Chuck short ribs pork loin, pork belly brisket pork ground round picanha tri-tip shoulder ball tip prosciutto cupim flank." 
   },
   { 
      name: "Chocolate Brownie", 
      image: "https://i.imgur.com/vOeSb3B.jpg",
      description: "Gluten free chocolate brownie. ood pictures are taken here. Bacon ipsum dolor amet chuck pork loin venison meatball bresaola pancetta tongue landjaeger. Tail ball tip leberkas chicken. Sausage drumstick sirloin, spare ribs pastrami turkey pig filet mignon alcatra hamburger t-bone flank jowl. Beef pig beef ribs meatloaf jowl flank swine rump boudin filet mignon. Pancetta kevin turkey pork chop. Chuck short ribs pork loin, pork belly brisket pork ground round picanha tri-tip shoulder ball tip prosciutto cupim flank." 
   },
   { 
      name: "Honey Bread", 
      image: "https://i.imgur.com/K7ONuAL.jpg",
      description: "A delicious honey bread. Not actually a Canyon. Bacon ipsum dolor amet chuck pork loin venison meatball bresaola pancetta tongue landjaeger. Tail ball tip leberkas chicken. Sausage drumstick sirloin, spare ribs pastrami turkey pig filet mignon alcatra hamburger t-bone flank jowl. Beef pig beef ribs meatloaf jowl flank swine rump boudin filet mignon. Pancetta kevin turkey pork chop. Chuck short ribs pork loin, pork belly brisket pork ground round picanha tri-tip shoulder ball tip prosciutto cupim flank." 
   },
   { 
      name: "Bacon Onion Tart", 
      image: "https://i.imgur.com/RGsbBTQ.jpg",
      description: "A campground on the cloud! Dark and interesting. Bacon ipsum dolor amet chuck pork loin venison meatball bresaola pancetta tongue landjaeger. Tail ball tip leberkas chicken. Sausage drumstick sirloin, spare ribs pastrami turkey pig filet mignon alcatra hamburger t-bone flank jowl. Beef pig beef ribs meatloaf jowl flank swine rump boudin filet mignon. Pancetta kevin turkey pork chop. Chuck short ribs pork loin, pork belly brisket pork ground round picanha tri-tip shoulder ball tip prosciutto cupim flank." 
   },
   { 
      name: "Almond Butter Cup", 
      image: "https://i.imgur.com/8qqCBrK.jpg",
      description: "Good pictures are taken here. Bacon ipsum dolor amet chuck pork loin venison meatball bresaola pancetta tongue landjaeger. Tail ball tip leberkas chicken. Sausage drumstick sirloin, spare ribs pastrami turkey pig filet mignon alcatra hamburger t-bone flank jowl. Beef pig beef ribs meatloaf jowl flank swine rump boudin filet mignon. Pancetta kevin turkey pork chop. Chuck short ribs pork loin, pork belly brisket pork ground round picanha tri-tip shoulder ball tip prosciutto cupim flank." 
   }
]

function seedDB() {
   //Remove all campgrounds
   Campground.remove({}, function(err){
      if(err) {
          console.log(err);
      } else {
          console.log("removed Campground");
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