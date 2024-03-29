const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true,
        trim:true, //eliminate spaces
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type: String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:['user','admin'],//new roles cant be added if we use this
        default:'user'
    },
    firstname:{
        type:String,
        maxLength:100,
        trim:true,
        default:''
    },
    lastname:{
        type:String,
        maxLength:100,
        trim:true,
        default:''
    },
    cart:{
        type:Array,
        default:[]
    },
    history:{
        type:Array,
        default:[]
    },
    verified:{
        type:Boolean,
        default:false
    }
});


//funcion to hash the password. We use pre because we want to run this function before we save it to our db
userSchema.pre('save', async function(next) {
//we need access to username and password;
    let user = this
    if(user.isModified('password')){ // to check if user is modifying the existing passowrd
        const salt = await bcrypt.genSalt(10); // salt will generate random string of 10 size
        const hash = await bcrypt.hash(user.password,salt);
        user.password = hash;
    }
    //middleware to run it since we have used pre
    next();

})

userSchema.methods.generateAuthToken = function(){
    let user = this;
    const userobj =  {sub:user._id.toHexString(),email:user.email}; // you can hash email too by adding any more after comma
    const token = jwt.sign(userobj,process.env.DB_SECRET,{ expiresIn:'1d'});
    return token;
}



//function to find if user exists
userSchema.statics.emailTaken = async function(email){
    const user = await this.findOne({email})
    return  !!user;
}

//statics to compare password after signing in and decrypting 
userSchema.methods.comparePassword = async function(userPassword){
    //user password = unhashed password
    const user = this;
    const match = await bcrypt.compare(userPassword, user.password);
    return match;

}

//this one is for email
userSchema.methods.generateRegisterToken = function(){
    let user = this;
    const userobj =  {sub:user._id.toHexString() }; 
    const token = jwt.sign(userobj,process.env.DB_SECRET,{ expiresIn:'10h'});
    return token;
}






const User = mongoose.model('User', userSchema);
module.exports = { User };