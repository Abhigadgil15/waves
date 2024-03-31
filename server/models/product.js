const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    model:{
        required:[true,'You need a guitar a model'],
        type:String,
        unique:1,
        maxlength:250
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:'Brand', // this should be the name of the brand model you are referring to from brand.js
        required:true, /// by referencing to brand id, when we make a request a product. You can populate the brand_id from brand.js. By using the populate method it will return everything in doc thats related to brand_id. 
    },
    frets:{
        required:true,
        type:Number
    },
    woodtype:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:[true,'You need to add a description'],
        maxlength:10000

    },
    price:{
        required:true,
        type:Number,
        maxlength:255
    },
    available:{
        required:[true,'How many of this model we own:-'],
        type:Number,
        maxLength :5000,
        default:0
    },
    itemSold:{
        type:Number,
        default:0,
    },
    shipping:{
        type:Boolean,
        required:[true,'Specify if this product has free shipping'],
        default:false
    },
    images:{
        type:Array,
        default:[]
    },
    date:{
        type:Date,
        default:Date.now
    }
})
productSchema.plugin(aggregatePaginate);

const Product = mongoose.model('Product',productSchema);

module.exports = {
    Product
}