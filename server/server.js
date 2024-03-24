// import {PORT, mongoUri} from '/config.js'
const { PORT, mongoUri } = require('./config.js');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const xss = require('xss-clean'); //middleware library to check if information is correct
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const { handleError, convertToApiError} = require('./middleware/apiError.js')



mongoose.connect(mongoUri)
        .then(() => {
            console.log('App is listening to Database');
            app.listen(PORT, () =>{
                console.log(`App is listening to port: ${PORT}`);
            });
        })
        .catch((error) => {
            (console.log(error));
        });


//body parse
app.use(express.json())

//sanitize
app.use(xss());
app.use(mongoSanitize());





//routes
app.use('/api',routes)

//middleware

//1 Handle errors which cannot be controlled such as  response from DB
app.use(convertToApiError);

// 2) handle errors which we can control
app.use((err,req,res,next) =>{
    handleError(err,res)
})




// const port = process.env.PORT || 3001
// app.listen(port,() =>{
//     console.log(`App is running on port ${port}`)
// });