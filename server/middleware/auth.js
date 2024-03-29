const passport = require('passport');
const { ApiError } = require('./apiError');
const httpStatus = require('http-status');
const { roles } = require('../configuration/roles');

// console.log("Roles object:", roles);

const verify = async (req, res, resolve, reject, rights) => {
    passport.authenticate('jwt', { session: false }, async (err, user) => {
        if (err || !user) {
            reject(new ApiError(httpStatus.UNAUTHORIZED, 'Sorry, unauthorized'));
            return;
        }

        req.user = user;

        try {
            if (rights.length) {
                const action = rights[0];
                const resource = rights[1];
                const permission = roles.can(req.user.role)[action](resource);
                if (!permission.granted) {
                    throw new ApiError(httpStatus.FORBIDDEN, "Sorry, you don't have enough rights");
                }
                res.locals.permission = permission;
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    })(req, res);
};

const auth = (...rights) => async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            verify(req, res, resolve, reject, rights);
        });
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = auth;