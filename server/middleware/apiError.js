// we use http-status library to  get status codes

const mongoose = require('mongoose');
const httpStatus = require('http-status');

class ApiError extends Error {
    constructor(statusCode, message){
        super(); // we need suyper in react to call constructor of its parent class
        this.statusCode = statusCode,
        this.message = message

        //you can add whatever you want here but for now we take only statuscode and message
    }
}
const handleError = (err,res) =>{
    const {statusCode,message} = err;
    res.status(statusCode).json({
        status:'error',
        statusCode,
        message
    })
}

// function to control errors from mongoose
const convertToApiError = (err,req,res,next) =>{
    let error = err;
    if(!(error instanceof ApiError)){
        const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST:httpStatus.INTERNAL_SERVER_ERROR;
        const message= error.message || httpStatus[statusCode];
        error = new ApiError(statusCode,message);
    }
    next(error)
}


module.exports = {
    handleError,
    convertToApiError,
    ApiError
}