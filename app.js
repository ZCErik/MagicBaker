var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    Campground            = require("./models/campground"),
    Comment               = require("./models/comment"),
    User                  = require("./models/users"),
    seedDB                = require("./seeds"),
    passport              = require("passport"),
    passportLocalMongoose = require("passport-local-mongoose"),
    LocalStrategy         = require("passport-local"),
    methodOverride        = require("method-override"),
    flash                 = require("connect-flash");

//Require route files
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

//EXECUTE SEED DATABASE EVERYTIME
seedDB;

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Programming is hard and need a lot of effort",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));

//Tell our app to use Flash
app.use(flash());

//Creates new strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Check current user in every single page
app.use("/", function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next(); 
});

//Connect to a database (if does not exist, it will create one). 
//{useNewUrlParser: true} -> Avoid Warning when compiling
// mongoose.connect("mongodb://localhost:27017/yelp_camp2", { useNewUrlParser: true });

mongoose.connect("mongodb://eg:Erik0408@ds245762.mlab.com:45762/magicbaker", { useNewUrlParser: true });


app.use(bodyParser.urlencoded({extended: true}));

//Call CSS file
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get("/about", function(req, res){
   res.render("about"); 
});

//Tell our app to use those routes.
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


//Trying to fix another error
app.on('listening',function(){
    console.log('ok, server is running');
});

//TELL EXPRESS TO LISTEN FOR REQUEST
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Magic Baker server has started");
});

