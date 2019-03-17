var mongoose = require("mongoose");

//Schema set up. (USES: Campground.find() or Campground.create(), or Campground.delete())
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    magicDescription: String,
    cateringDescription: String,
    price: String,
    magicPrice: String,
    cateringPrice: String,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
    
});

//compile the schema into a model
module.exports = mongoose.model("Campground", campgroundSchema);