const mongoose = require('mongoose');
const validator = require('validator');

var schema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength: 3,
        maxlength: 30,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error("name is inValid");
            }
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is inValid");
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        maxlength: 10,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        // validate: {
          
        //     validator: function(number) {
                
        //         // console.log(number)
        //         // return new libphonenumber.parsePhoneNumber(number).isValid()
        //         // if(number.length <5) {
        //         //     alert('Too Short ')
        //         //  } else if(isValidNumber(number)) {
        //         //    alert('Valid number')
        //         //  }
        //      }
           
        // },
        // validate(value){
        //     if(!validator.isMobilePhone(value)){
        //         throw new Error("Mobile number  is inValid");
        //     }
        // }
    }
    // img: String
})

const Userdb = mongoose.model('userdb', schema);
module.exports = Userdb; 