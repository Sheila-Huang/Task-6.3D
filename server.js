const bodyParser = require('body-parser');
const express=require("express");
const mongoose = require('mongoose');
const routes = require('./router/index');
const passport=require('passport')
const session=require('express-session')
var cookieParser = require("cookie-parser")
const userSchema = require('./model/users');
const server = express();
const DB_URL = 'mongodb://localhost:27017/iCrowdTaskDB';
mongoose.connect(DB_URL,{ useNewUrlParser: true });

server.use(passport.initialize());
server.use(passport.session());
server.use(express.static("public"))
server.use(express.static("router"))
server.use(express.static("views"))
server.set('view engine', 'html');
server.set('view engine', 'css');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


server.use(session({
    cookie:{maxAge: 1000*60},
    resave:false,
    saveUninitialized:false,
  secret: 'sheliar'
  }))
  

server.use(cookieParser())


routes(server);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

server.listen(port, (req,res)=>{
    console.log("Server is running successfullly!")
})
 