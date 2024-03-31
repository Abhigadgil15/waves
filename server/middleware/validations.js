const{ check,validationResult } = require('express-validator');
const httpStatus = require('http-status');

// THIS IS THE MAIN PART OF YOUR JOB. YOU NEED TO ADD THOUSANDS OF VALIDATIONS!!!
const addProductValidator = [
    check('model')
        .trim().not().isEmpty().withMessage('You need to add a model').bail() // first check if product is not an empty.. Bail means to go to next line to check things
        .isLength({min:3}).withMessage('Minimum 3 characters are required!').bail(),
    check('brand')
    .trim().not().isEmpty().withMessage('You need to really add a brand'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(httpStatus.BAD_REQUEST).json({
                errors:errors.array()
            })
        }
        next();
    }

    ];

module.exports = {
    addProductValidator
}