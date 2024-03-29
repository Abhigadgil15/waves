// to validate user credentials

const { User } = require('../models/user');
require('dotenv').config();

const {Strategy: JwtStrategy,ExtractJwt} = require('passport-jwt');

const jwtOptions = {
    secretOrKey:process.env.DB_SECRET,
    //we use this to authenticate the token and check if token  is valid or not 
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
    
};

const jwtVerify = async(payload,done) => {
    try{
        const user = await User.findById(payload.sub);//getting user from payload which contains id of user to decode it from hexstring
        if(!user){
            return done(null,false)
        }
        done(null,user)
    } catch{
        done(error,false)
    }
}
const jwtStrategy = new JwtStrategy(jwtOptions,jwtVerify)

module.exports = {
    jwtStrategy
}