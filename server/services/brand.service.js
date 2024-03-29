const {Brand} = require('../models/brand');
const {ApiError} = require('../middleware/apiError');
const httpStatus = require('http-status')
const addBrand = async(brandname) => {
    try{
        const brand = new Brand({
            name:brandname
        });
        await brand.save();
        return brand;
    } catch(error){
        throw error
    }
}

const getBrandbyId = async(id) =>  {
    try{
        const brand = await Brand.findById(id);
        if(!brand)
            throw new ApiError(httpStatus.NOT_FOUND,'Brand Not Found');
        return brand;
    }
    catch(error){

    }
}

const deleteBrandById = async (id) => {
    try {
        const brand = await Brand.findOneAndDelete({ _id: id });
        console.log(brand);
        if (!brand) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Brand Not Found or Already Deleted');
        }
        return brand;
    } catch (error) {
        throw error; // Rethrow the error to propagate it
    }
}
// remember as a developer you must know validation so that when you test the backend you show know what body you need to edit 
const getBrands = async(args) =>{

    //for now we do basic validation
    let order = args.order? args.order: "desc";
    let limit = args.limit? args.limit:10;
    try{
        const brands = await Brand.find({})
        .sort([
            ["_id",order] // useful when you want to fetch latest articles 
        ])
        .limit(limit);
        if(!brands){
            throw new ApiError(httpStatus.NOT_FOUND,'Brands not found')
            
        }
        return brands;
    }   
    catch(error){
        throw error;
    }

}

module.exports= {addBrand,getBrandbyId,deleteBrandById,getBrands}