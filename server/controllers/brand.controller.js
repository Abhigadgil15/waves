const { brandService } = require('../services')

const brandController = {
    async addBrand(req,res,next){
        try{
                const brand = await brandService.addBrand(req.body.brandname);
                res.json(brand);
        }
        catch(error){
            next(error)
        }
    },

    async getBrand(req,res,next){
        try{
            const id = req.params.id;
            const brand = await brandService.getBrandbyId(id);
            res.json(brand);
        }catch(error){
            next(error)
        }
    },
    async deleteBrand(req,res,next){
        try{
            const id = req.params.id;
            const brand = await brandService.deleteBrandById(id);
            res.json(brand);
        }catch(error){
            next(error)
        }
    },
    async getBrands(req,res,next) {
        try{
            const brands = await brandService.getBrands(req.body)
            res.json(brands);
        }
        catch(error){

        }
    }
 
    
}
module.exports = brandController;