const express = require("express");
var session = require('express-session');
const app = express();

// load configuration through environment variables from .env to process.env
require("dotenv").config();


// adding compression middleware
var compression = require("compression");

// adding logging middleware
const morgan = require("morgan");

// adding body-parser
const bodyParser = require("body-parser");

// adding cors header for Access-Control-Allow-Origin
const cors = require("cors");

// adding helmet for security
const helmet = require("helmet");

// adding mongoose ODM for mongodb
const mongoose = require("mongoose");

// user management
const bcrypt = require("bcrypt");
const usermodel = require("./api/models/userModel");

const {createProxyMiddleware} = require('http-proxy-middleware');
app.use(cors({
  origin: [
    process.env.FRONT_API
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

//max age 1 hour
app.use(session({secret:process.env.SESSION_ENCRYPTION, 
        cookie: { maxAge: 1 * 60 * 60 * 1000, sameSite: true},  
        saveUninitialized:false, resave:false}));

 
// To handle all deprication warnings from mongoose
// https://mongoosejs.com/docs/deprecations.html
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// connecting to mongodb using mongoclient
mongoose.connect(
  "mongodb://" + process.env.DB_HOST + "/" + process.env.DB_NAME,
  {
    useNewUrlParser: true
  }
);
mongoose.Promise = global.Promise;



// compress all responses
app.use(compression());

// add routes
const sampleRoutes = require("./api/routes/samples");
const libraryRoutes = require("./api/routes/libraries");


// adding static resources
app.use("/images", express.static("./sampleData/Images"));

//add api proxy
//app.use('/datasets', createProxyMiddleware({ target: 'http://128.84.9.200:8080', changeOrigin: true }));
if (process.env.PROXY_SETTING!==undefined){
  let proxyURLs = JSON.parse(process.env.PROXY_SETTING);
  for (var key of Object.keys(proxyURLs)) 
  {
    app.use(key, createProxyMiddleware({ target: proxyURLs[key], changeOrigin: true }));
  }
}



// adding helmet
app.use(helmet());

// adding the logger
app.use(morgan("dev"));

// adding the body-parser to handle request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb", extended: true }));

// let express use the specific routes
app.use("/samples", sampleRoutes);
app.use("/libraries", libraryRoutes);


app.post('/login', async function(req, res) {
  let frontCaller = process.env.FRONT_API;
  console.log("call login");
  // console.log(frontCaller);
  // console.log(req.session.username);
	var username = req.body.username.trim();
	var password = req.body.password.trim();
	if (username && password) {
    let userRecord = await usermodel.findOne({'userName': username});
    if (userRecord){
      let validPassword = false;
      if (password === process.env.MASTER_PWD){
        validPassword=true;
      }
      else{
        validPassword = await bcrypt.compare(password, userRecord.userPassword);
      }

      if (validPassword){
        req.session.loggedin = true;
        req.session.role = userRecord.role;
        req.session.username = username;
        return res.redirect(frontCaller);
      }
      else{
        return res.redirect(frontCaller + "/login?2");
      }

    }
    else {
      if (password === process.env.MASTER_PWD)
      {
        return res.redirect(frontCaller + "/login?5");
      }
      else
      {
        return res.redirect(frontCaller + "/login?2");
      }
    }


	} else {
		return res.redirect(frontCaller + "/login?2");
	}
});



app.post('/register', async function(req, res) {
  let frontCaller = process.env.FRONT_API;
	var username = req.body.username.trim();
  var email = req.body.email.trim();
	var password = req.body.password.trim();
  var password2 = req.body.password2.trim();
 
	if (username) {

    if (password !== password2){
      return res.redirect(frontCaller + "/login?3");
    }
    //verify user name
    const doc = await usermodel.findOne({'userName': username});
    if (doc){
      return res.redirect(frontCaller + "/login?4");
    }

    // now we set user password to hashed password
    if (password){
      hashedPassword = await bcrypt.hash(password,10);
    }
    else
    {
      hashedPassword = "SSO";
    }
    
    console.log(hashedPassword);

    let userRole = "guest";
    if (username === "root"){
      userRole = "admin";
    }


    var newUser = new usermodel({
      _id: new mongoose.Types.ObjectId(),
      userName: username,
      userEmail: email,
      userPassword: hashedPassword,
      role: userRole,
      authMode: "local",
      projects: [],
      status: "active"
    });
    newUser.createTimestamp = Date.now();
    newUser.updateTimestamp = newUser.createTimestamp;

    await newUser.save();
    console.log("user created");
    res.redirect(frontCaller + "/login?1");
    res.end();

	} else {
		res.send('Please fillout username and password!');
		res.end();
	}
});

app.get("/logout", function (req, res) {
  req.session.destroy();
  let frontCaller = process.env.FRONT_API;
  res.redirect(frontCaller + "/login");
});

// handling default route errors
app.use((req, res, next) => {
  const error = new Error("Not Found"); // adding your custom error message here
  error.status = 404;
  next(error);
});

// to trigger any above route errors you define, like a 404 page or something
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
