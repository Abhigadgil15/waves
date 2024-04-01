const { Product } = require('../models/product');
const { ApiError } = require('../middleware/apiError');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const addProduct = async(body) =>{
    try{
        const product = new Product({
            ...body
        })
        await product.save();
        return product;
    }
    catch(error) {
        throw error
    }
}

const getProductById = async(_id) =>{
    try{
        const product = await Product.findById(_id).populate('brand'); // you can call populuate as we made a reference when creating the model for products for brand:{}
        if(!product){
            throw new ApiError(httpStatus.NOT_FOUND,'Product not found');
        }
        return product;
    }
    catch(error) {
        throw error
    }
}

const updateProductById= async(_id,body) =>{
    try{
        const product = await Product.findOneAndUpdate(
            {_id},
            {"$set":body},
            {new:true}
        );
        if(!product)
            throw new ApiError(httpStatus.NOT_FOUND,'Product Not found')
        return product;
    }
    catch(error) {
        throw error
    }
}

const deleteProductById= async(_id) =>{
    try{
        const product = await Product.findOneAndDelete({ _id: _id });
        if(!product)
            throw new ApiError(httpStatus.NOT_FOUND,'Product Not found');
        return product;
    }
    catch(error) {
        throw error
    }
}
//the below service mostly would not be needed as we would be using the process of pagination for large web applications
const allProducts= async(req) =>{
    try{
        const products = await Product
        .find({})
        .populate('brand')
        .sort([
            // ['_id',req.query.order] // put order on postman and put asc or desc for 2nd col
            [req.query.sortBy,req.query.order]
            //here you may put req.query.sortByfrets/brand/date/price,etc
        ])
        .limit(parseInt(req.query.limit)) // check it on postman and put params as limit and put a number on second column
        
        
        if(!products)
            throw new ApiError(httpStatus.NOT_FOUND,'Product Not found');
        return products;
    }
    catch(error) {
        throw error
    }
}


const paginateProducts= async(req) =>{
    try{
        //need to do filtering
        // const example = {
        //     "keywords":"elite", // this is for search bar if user searches for word elite for example
        //     "brand":["6609923e48d171e30308aa41"], // array of ids(this should be in pbject of type string)
        //     "min":200, // lesser than and greater than for filtering prices. There is a range tool n mongo db but not available for free tier
        //     "max":500,
        //     "frets":24 // check filter by 24

        //     //in real life this is going to go crazy for filtering
        // }

        //create an aggregate function from mongo db
        let aggQueryArray = [
            // {price},
            // {keyword},
            
        ];
        if(req.body.keywords && req.body.keywords!=''){
            const re = new RegExp(`${req.body.keywords}`,'gi') // "g" means global and "i" is case insensitive
            aggQueryArray.push({
                $match:{model:{ $regex:re }} // searching for model in search bar. if user types iron anything with iron will be loaded
            })
        }
        if(req.body.brand && req.body.brand.length > 0){
            let newBrandsArray = req.body.brand.map((item)=>(
                new mongoose.Types.ObjectId(item) // we use new keyword even if its deprecated because postman does not work
            ));
            aggQueryArray.push({
                $match:{ brand:{ $in: newBrandsArray }} // input in BOody needs to be an array in postman
            });
        }
        if(req.body.frets && req.body.frets.length > 0){
            aggQueryArray.push({
                $match:{frets: { $in : req.body.frets }} // input in Body needs to be an array in postman
            })
        }
        if(req.body.min && req.body.min > 0 || req.body.max && req.body.max < 5000){
            /// { $range: { price:[0,100]}} // not supported for free mongo db tier
            if(req.body.min){
                aggQueryArray.push({$match:{price:{$gt:req.body.min}}});
                //minimum price, guitar with a price greaer than 
            }
            if(req.body.max){
                aggQueryArray.push({$match:{price:{$lt:req.body.max}}});
                //minimum price, guitar with a price greaer than 
            }
        }

//// ADD POPULATE FOR BRANDS
        aggQueryArray.push(
            {$lookup: // to match a id with same id in collection
            {
                from:"brands",// collection name in mongo db
                localField:"brand",// field name in collection
                foreignField:"_id",//field that we are matching basically brand id both in products and brand collection
                as: "brand"

            }},
            {$unwind:'$brand'} // this will return it in form of a object instead of an array
        )



        let aggQuery = Product.aggregate(aggQueryArray);
        const options = {
            page:req.body.page, // test this in postman
            limit:2, //put limit to requests
            sort:{ date:'desc'} // you can add more options. check on aggregate-paginate documentation
        }
        const products = await Product.aggregatePaginate(aggQuery,options);
        return products;
    }
    catch(error) {
        throw error
    }
}






module.exports = {
    addProduct,getProductById,updateProductById,deleteProductById,
    allProducts,paginateProducts
}