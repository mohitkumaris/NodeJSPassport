/**
 * Created by Mohit Kumar on 11/24/2017.
 */
var mongoose=require("mongoose");

var bcrypt=require("bcrypt-nodejs"); //

// define the schema for user model

var userSchema=mongoose.Schema({

    local: {
        email:string,
        password:string
    },
    facebook:{
        email:string,
        id:string,
        token:string,
        name:string
    }
});

//generating a hash

userSchema.methods.generateHash=function (password) {

    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

userSchema.methods.validPassword=function (password) {

    return bcrypt.compareSync(password,this.local.password);
}

// create the model for users and expose it to our app
module.exports=mongoose.model('User',userSchema);