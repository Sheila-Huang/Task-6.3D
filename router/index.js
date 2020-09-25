const https = require("https")
const express = require("express")
const bodyParser = require("body-parser")
const Users = require('../model/users.js')
const mongoose = require("mongoose")
const validator = require("validator")
const crypto = require('crypto')
const passport=require('passport')
var cookieParser = require('cookie-parser');
const session=require('express-session');
const { stringify } = require("querystring");
const {OAuth2Client} = require('google-auth-library');
const sendMail=require('./send')

module.exports=function(app){
   
//    
    app.get('/sendmail', (req, res) => {
        res.sendFile(__dirname + "/sendmail.html")
    })

    app.post('/sendmail', function (req, res) {
        
        sendMail.send({
            from: 'sheliarhang@gmail.com',
            to: req.body.email,
            subject: 'Click the link to change your password',
            //text: content
            html:'<a href="http://localhost:8080/changepsw"> Click here for changing your password</a>'
          });
          
          res.send("Check the link in your email! ")
    });
    app.get('/changepsw',(req,res)=>{

        res.sendfile(__dirname+'/changepsw.html');
    })

    app.post('/changepsw',(req,res)=>{

    var  email =req.body.email;
    var newCpsw=req.body.password;

    var md5 = crypto.createHash('md5');
    var newCPas = md5.update(newCpsw).digest('hex');

    Users.find({email:email}, (err,obj)=> {
        if (err) {
            res.send("error!");
            
        } 
        else if(obj.length==0){
        res.send("Please input the right email address!")
        }
        else {
            // if (obj.length == 1) { 
                Users.updateOne({email:email},{psw:newCPas},(err,obj)=> {
                    if (err) {
                        return (err);
                    } else {
                        //console.log(" change succeed in mongoose!")
                        console.log("Change succeed!")
                        res.redirect('/reqlogin');
                    }
                    })
                //}
                
           // }
            } 
            res.send()
})

})

    app.get('/reqtask',(req,res)=>{
        
          res.redirect('/reqtask')
        
      })

    app.get('/reqlogin', function(req,res,next) {    // login
        res.sendfile(__dirname+'/reqlogin.html');
    });
   
    app.post('/reqlogin', function(req,res,next) {    // login
        //find

       var  email =req.body.email
         var Psw = req.body.password
        
        var md5 = crypto.createHash('md5');
       var newPas = md5.update(Psw).digest('hex');
    

        var updatestr = {email:email,psw:newPas};
       
        Users.find(updatestr, function(err,obj) {
            if (err) {
                return (err);
            } else {
                if (obj.length == 1) {  
                
                    req.session.user=obj

                    res.sendFile(__dirname+'/reqtask.html');
                }
                 else {
                    
                    res.sendFile(__dirname+'/index.html');
                
            }
            }
        })
       
        
    })
        

app.get('/', function(req,res,next) {   
  res.sendfile(__dirname+'/index.html');
    });

    
    app.post('/', function(req,res,next) { 
         // 注册
        var firstname =req.body.first_name
        var  lastname =req.body.last_name
        var email = req.body.email
        var  Psw =req.body.password
        var  zp =req.body.zp
        var ad = req.body.address
        var phonenumber =req.body.phone
        var  state=req.body.state
        var  city = req.body.city
        var  cpsw=req.body.cpassword

        var md5 = crypto.createHash('md5');
        var newPas = md5.update(Psw).digest('hex');
          
        var updatestr = {email: email};
       
        var user = new Users({
            fname : firstname,
            lname: lastname,
            email: email,
            psw:newPas,
            phonenumber:phonenumber,
            city:city,
            state:state
        })   

        Users.find(updatestr, function(err,obj) {
            if (err) {
                return(err);
            } else if (obj.length != 0) {
                   
                res.sendFile(__dirname+'/index.html');
            }
            else {
                if (obj.length == 0) {   
                    
                    user.save()
                    .catch((err) => console.log(err));
                        if (err) {
                           
                            res.sendFile(__dirname+'/index.html');
                        } else {
                          
                            res.sendFile(__dirname+'/reqlogin.html');  
                        }
                    
                } 
            }
        });

 })

 }

