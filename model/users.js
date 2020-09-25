var mongoose = require('./db'),
    Schema = mongoose.Schema;
    
   // const passportLocalMongoose=require('passport-local-mongoose')
    var mongoose = require('mongoose')
    var validator=require("validator")
    
    function isPhone(str) {

        var reg= /^(00|\+)[1-9]{1}([0-9][\s]*){9,16}$/;
        
        return reg.test(str);
        
        }
        

var userSchema = new Schema({
    googleId:{type:String,trim:true},
    passemail:{
        type:String,trim:true},
passcookie:{
    type:String,trim:true},

    fname: {
                type: String,
                trim: true
            },
            lname: {
                type: String,
                trim: true
            },
            email: {
                type: String,
                lowercase:true,
                trim:true,
                validate:{
                    validator:function(v){
                        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                    }, 
                    message:"Please enter a valid email"
                    }
                
                // validate(value){
                //     if(!validator,isEmail(value))
                //     {
                //         throw new Error('The email is not valid!')
                //     }
                // }
            },
            ad:{
                type: String
            },
            city:{
                type: String
            },
            state:{
                type: String
            },
            phonenumber:{
                type: Number,
                
                validate(value){
                    if(!validator,isPhone(value))
                    {
                        throw new Error('The phone number is not valid!')
                    }
                }
            },
            psw: {
                type: String,
                minlength:8
            },
            cpsw: {
                type: String,
                minlength:8
            },
           
            
        });
       // userSchema.plugin(passportLocalMongoose)
        //exports
       module.exports = mongoose.model('Users', userSchema);
             
        