const express = require('express');
const authRoute = require('./auth.route');
const router = express.Router()
const usersRoute = require('./user.route');
const brandsRoute = require('./brand.route');
const productsRoute = require('./product.route');

const routesIndex = [
    {
        path:'/auth',
        route : authRoute
    },
    {
        path:'/users',
        route : usersRoute
    },
    {
        path:'/brands',
        route : brandsRoute
    },
    {
        path:'/products',
        route : productsRoute
    },
]
routesIndex.forEach((route)=>{
    router.use(route.path,route.route);
})


module.exports = router;