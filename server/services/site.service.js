const {Site} = require('../models/site');
const {ApiError} = require( '../middleware/apiError');
const httpStatus = require('http-status');

const postSiteArgs = async(req) =>{
    try{
        const site = new Site({
            ...req.body
        })
        await site.save();
        return site
    } catch(error){
        throw error
    }
}

const getSiteArgs = async() =>{
    try{
        const site = await Site.find({});
        if(!site)
            throw new ApiError(httpStatus.NOT_FOUND,'Site not found')
        console.log(site[0])
        return site[0];
    } catch(error){
        throw error
    }
}
const updateSiteArgs= async(req) =>{
    try{
            const site = await Site.findOneAndUpdate(     
                    {_id:req.body._id},
                    {"$set" :req.body},
                    {new:true}   
            )
            if(!site)
                throw new ApiError(httpStatus.NOT_FOUND,'Site not found');
            return site;
    } catch(error){
        throw error
    }
}
module.exports = {
    postSiteArgs,getSiteArgs, updateSiteArgs
}