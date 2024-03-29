//here we make reusable functions related to user 
const { User } = require("../models/user");
const { ApiError } = require('../middleware/apiError');
const httpStatus = require("http-status");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const validateToken = async(token)=>{
    return jwt.verify(token,process.env.DB_SECRET)
}

const findUserByEmail = async(email) =>{
    return await User.findOne({email:email})
}
const findUserById = async(_id) =>{
    return await User.findById(_id);
}
const updateUserProfile = async(req) =>{

    // here if you want to make sure that suer cant edit apssword - test it here

    
    try{



        const user = await User.findOneAndUpdate(
            {_id : req.user._id},
            {
               "$set":{ 
                ...req.body.data // so make sure what you want to validate/edit
               }
            },
            {
                new :true //This is a setting where you can test your backend with postman with your current postman
            }
            );

            if(!user){
                throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            }
            return user;
    } catch(error){
        throw error;
    }
}

const updateUserEmail = async(req) =>{
try{
    if(await User.emailTaken(req.body.newemail)){
        throw new ApiError(httpStatus.BAD_REQUEST,'Sorry Email taken');
    }
    const user = await User.findOneAndUpdate(
        { _id : req.user._id, email:req.user.email},
        {
            "$set":{
                email : req.body.newemail,
                verified:false
            }
        },
        {new : true}
    )
    
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user
}
catch(error){
    throw error
}
}

module.exports = {
    findUserByEmail,findUserById,updateUserProfile,
    updateUserEmail,validateToken
}