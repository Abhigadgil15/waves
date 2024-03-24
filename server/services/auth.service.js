const { User } = require('../models/user')
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const userService = require('./user.service')



const createUser = async(email,password) => {
    try{
        /// VERY IMPORTANT : WE ARE USING A INSTANCE HERE OF THE MODEL CLASS AND WE DONT HAVE PREVIOUS DATA. WE USE STATICS HERE
        //to check if user already exists we do it in if block
        if(await User.emailTaken(email)){
            throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry email taken');
        }



        const user = new User({
            email,
            password
        })
        await user.save()
        return user;
    } catch(error){
        throw error;
    }
}
// THIS IS A METHOD TO GENERATE TOKEN. BIG DIFFERENCE BETWEEN STATIC AND METHODS
const genAuthToken = (user) =>{
    const token = user.generateAuthToken();
    return token
}

const signInWithEmailAndPassword = async(email,password) =>{
    try{
        const user = await userService.findUserByEmail(email);
        if(!user){
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Sorry Bad Email')
        }
        if(!(await user.comparePassword(password))){
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Sorry Bad Password');
        }
        return user;
    
    } catch(error){
        throw error;
    }
}

module.exports = {
    createUser,genAuthToken,signInWithEmailAndPassword
};