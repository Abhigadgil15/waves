const { userService, authService, emailService} = require('../services');
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');

const usersController = {
    async profile(req,res,next){
        try{
            const user = await userService.findUserById(req.user._id);
            if(!user){
                throw new ApiError(httpStatus.NOT_FOUND,'User Not Found')
            }


            res.json(res.locals.permission.filter(user._doc)) // in built res function to display the specific contents of the doc 
        }
        catch(error){
            next(error);
        }
    },
    async updateProfile(req,res,next){
        try{
            const user = await userService.updateUserProfile(req)
            res.json(user);
        }   
        catch(error){
            next(error);
        }
    },
    async updateUserEmail(req,res, next){
        try{
            //now for updating email, we need to verify the account and hence we need to generate a new token after they update the email id
            const user = await userService.updateUserEmail(req);
            const token = await authService.genAuthToken(user);

            // await emailService.registerEmail(user.email,user) // we send this mail whenever email is updated
            res.cookie('x-access-token',token)
            .send({
                user,
                token
            })
        }catch(error){
            next(error)
        }
    },

    async verifyAccount(req,res,next){
        try{
            const token = await userService.validateToken(req.query.validation); // remmeber this time we are not doing a post or not sending as a json or a body. we need to get it using a query
            const user =await userService.findUserById(token.sub);
            if(!user){
                throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            }
            if(user.verified)
                throw new ApiError(httpStatus.BAD_REQUEST,'Already Verified')
            user.verified = true;
            user.save();
            res.status(httpStatus.CREATED).send({
                user //when using redux we need to keep the state of user updated
            })
        }
        catch(error){
            next(error)
        }
    }
}
module.exports = usersController;
